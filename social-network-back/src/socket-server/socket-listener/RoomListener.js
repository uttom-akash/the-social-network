import {
  JOIN_ROOM,
  NEW_JOINING_ROOM,
  LEAVE_ROOM,
  LEFT_ROOM,
  DISCONNECTING,
  ALL_ROOM,
  ROOM_INFO,
  ALL_CLIENT_IN_ROOM,
  CHANGE_ROOM_INFO,
} from "../sockets/EventType.mjs";
import redis from "redis";
import { KICK_OUT } from "../sockets/EventType.mjs";

const RoomService = function (redisClient, socket, chatApp) {
  this.redisClient = redisClient;
  this.socket = socket;
  this.chatApp = chatApp;
};

RoomService.prototype.listen = function () {
  this.onJoinRoom();
  this.onLeaveRoom();
  this.onKickOut();
  this.onDisconnecting();

  this.getAllRoom();
  this.getRoomInfo();
  this.getAllClientOf();
  this.onChangeRoomInfo();
};

RoomService.prototype.onJoinRoom = function () {
  this.socket.on(JOIN_ROOM, (joinInfo, ackCallback) => {
    let userInfo = joinInfo.userInfo;
    this.redisClient
      .get(`${userInfo.userRoom}`)
      .then((room) => {
        room = JSON.parse(room);
        let roomIsExist = !!room;
        let candidate = userInfo.userRole === "Candidate";

        if (roomIsExist === false && candidate) {
          ackCallback(
            "This room doesn't exist and candidate is not allowed to create one"
          );
          return;
        }
        if (
          candidate &&
          !!room.candidate &&
          room.candidate !== userInfo.userName
        ) {
          ackCallback("This room already contains candidate");
          return;
        }

        if (candidate && room.owner === userInfo.userName) {
          ackCallback("As you are candidate.please change the username");
          return;
        }

        if (roomIsExist === false) {
          room = {
            name: userInfo.userRoom,
            owner: userInfo.userName,
            password: joinInfo.roomPassword,
          };
          this.redisClient.set(`${userInfo.userRoom}`, JSON.stringify(room));
          this.redisClient.rpush(
            [
              "rooms",
              JSON.stringify({
                name: userInfo.userRoom,
                private: !!joinInfo.roomPassword,
              }),
            ],
            redis.print
          );
        }

        if (room.password !== joinInfo.roomPassword) {
          ackCallback("Password doesn't match");
          return;
        }

        this.socket.join(userInfo.userRoom, (error) => {
          if (error) {
            console.log("JOIN ROOM ERROR : ", error);
            ackCallback(error.message);
          }
          if (candidate) {
            room.candidate = userInfo.userName;
            this.redisClient.set(`${userInfo.userRoom}`, JSON.stringify(room));
          }
          userInfo.userId = this.socket.id;
          this.redisClient.set(this.socket.id, JSON.stringify(userInfo));
          this.broadcastToRoom(NEW_JOINING_ROOM, userInfo.userRoom, userInfo);
          ackCallback();
        });
      })
      .catch((error) => {
        console.log(error.message);
        ackCallback(error.message);
      });
  });
};

RoomService.prototype.onLeaveRoom = function () {
  this.socket.on(LEAVE_ROOM, (room, ackCallback) => {
    this.socket.leave(room, (error) => {
      if (error) {
        console.log("LEAVE ROOM ERROR : ", error);
        ackCallback(error.message);
      }
      this.redisClient.get(this.socket.id).then((userInfo) => {
        userInfo = JSON.parse(userInfo);
        let candidate = userInfo.userRole === "Candidate";
        if (candidate) {
          this.redisClient.get(`${room}`).then((roomInfo) => {
            roomInfo = JSON.parse(roomInfo);
            roomInfo.candidate = "";
            this.redisClient.set(`${room}`, JSON.stringify(roomInfo));
            this.redisClient.del(this.socket.id);
          });
        }
      });
      ackCallback();
      this.broadcastToRoom(LEFT_ROOM, room, this.socket.id);
    });
  });
};

RoomService.prototype.onKickOut = function () {
  this.socket.on(KICK_OUT, ({ room, payload: { socketId } }) => {
    console.log("kick ---> ", socketId);
    if (!!this.chatApp.in(room).sockets[socketId]) {
      this.chatApp.in(room).sockets[socketId].emit(KICK_OUT);
      this.chatApp.in(room).sockets[socketId].disconnect();
    }
  });
};

RoomService.prototype.onDisconnecting = function () {
  this.socket.on(DISCONNECTING, () => {
    let socketId = this.socket.id;
    console.log("di in --> ", socketId);

    let roomCol = Object.keys(this.socket.rooms);
    roomCol.map((room) => {
      this.broadcastToRoom(LEFT_ROOM, room, socketId);
    });
    this.redisClient
      .get(socketId)
      .then((userInfo) => {
        if (userInfo == null) return;
        userInfo = JSON.parse(userInfo);
        let candidate = userInfo.userRole === "Candidate";
        if (candidate) {
          roomCol.map((room) => {
            this.redisClient
              .get(`${room}`)
              .then((roomInfo) => {
                roomInfo = JSON.parse(roomInfo);
                roomInfo.candidate = "";
                this.redisClient.set(`${room}`, JSON.stringify(roomInfo));
              })
              .catch((error) =>
                console.log("DISCONNECT ERROR:", error.message)
              );
          });
        }
      })
      .catch((error) => console.log("DISCONNECT ERROR:", error.message));
  });
};

RoomService.prototype.getAllRoom = function () {
  this.socket.on(ALL_ROOM, (responseCallback) => {
    this.redisClient.lrange("rooms", 0, -1, (error, rooms = []) => {
      if (error) {
        console.log("ALL ROOM ERROR: ", error.message);
        responseCallback([]);
      } else {
        let parsedRooms = rooms.map((room) => JSON.parse(room));
        responseCallback(parsedRooms);
      }
    });
  });
};

RoomService.prototype.getRoomInfo = function () {
  this.socket.on(ROOM_INFO, (room, callback) => {
    this.redisClient
      .get(`${room}`)
      .then((info) => callback(JSON.parse(info)))
      .catch((error) => callback({}));
  });
};

RoomService.prototype.onChangeRoomInfo = function () {
  this.socket.on(CHANGE_ROOM_INFO, ({ room, payload: info }, callback) => {
    console.log(info);

    this.redisClient
      .set(`${room}`, JSON.stringify(info))
      .then((resp) => {
        this.broadcastToRoom(CHANGE_ROOM_INFO, room, info);
        callback();
      })
      .catch((error) => callback(error));
  });
};

RoomService.prototype.getAllClientOf = function () {
  this.socket.on(ALL_CLIENT_IN_ROOM, (room, responseCallback) => {
    this.chatApp.in(room).clients((error, clientList) => {
      if (error) {
        console.log("All CLIENT ROOM ERROR : ", error);
        responseCallback([]);
        return;
      }
      let usersInfo = clientList.map((clientID) =>
        this.redisClient.get(clientID)
      );
      Promise.all(usersInfo).then((users) =>
        responseCallback(users.map((user) => JSON.parse(user)))
      );
    });
  });
};
RoomService.prototype.broadcastToRoom = function (event, room, message) {
  this.chatApp.in(room).emit(event, message);
};
export default RoomService;
