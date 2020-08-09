import {
  NEW_MESSAGE,
  ALL_MESSAGE,
  REMOVE_ALL_MESSAGES,
  MESSAGE_TYPING,
} from "../sockets/EventType.mjs";
import redis from "redis";
const MessageService = function (redisClient, socket, chatApp) {
  this.redisClient = redisClient;
  this.socket = socket;
  this.chatApp = chatApp;
};

MessageService.prototype.listen = function () {
  this.onTypingMessage();
  this.onNewMessage();
  this.getAllMessages();
  this.removeAllMessages();
};
MessageService.prototype.onTypingMessage = function () {
  this.socket.on(MESSAGE_TYPING, (room, userIfo) => {
    this.socket.to(room).emit(MESSAGE_TYPING, userIfo);
  });
};

MessageService.prototype.onNewMessage = function () {
  this.socket.on(NEW_MESSAGE, ({ room, payload }, ackCallback) => {
    payload.timeStamp = new Date();
    this.redisClient.rpush(
      [`${room}:messages`, JSON.stringify(payload)],
      redis.print
    );
    ackCallback();
    this.broadcastToRoom(NEW_MESSAGE, room, payload);
  });
};

MessageService.prototype.getAllMessages = function () {
  this.socket.on(ALL_MESSAGE, (room, callback) => {
    this.redisClient.lrange(
      `${room}:messages`,
      0,
      -1,
      (error, messages = []) => {
        if (error) {
          console.log("GET ALL SMS ERROR : ", error.message);
          callback([]);
        }
        let parsedMessages = messages.map((message) => JSON.parse(message));
        callback(parsedMessages);
      }
    );
  });
};

MessageService.prototype.removeAllMessages = function () {
  this.socket.on(REMOVE_ALL_MESSAGES, (room, callback) => {
    this.redisClient.del(`${room}:messages`, (error, reply) => {
      if (error) {
        console.log("REMOVE ALL SMS ERROR : ", error.message);
        callback(error);
      }
      callback();
      this.broadcastToRoom(REMOVE_ALL_MESSAGES, room);
    });
  });
};
MessageService.prototype.broadcastToRoom = function (event, room, message) {
  this.chatApp.in(room).emit(event, message);
};
export default MessageService;
