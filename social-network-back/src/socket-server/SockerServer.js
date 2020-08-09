import io from "socket.io";
import { CONNECT } from "./EventType.mjs";
import RoomService from "../services/room_service.mjs";
import MessageService from "../services/message_service.mjs";
import ProblemService from "../services/problem_service.mjs";
import SolutionService from "../services/solution_service.mjs";

const SocketServer = function () {};

SocketServer.prototype.createServer = function (redisClient) {
  this.redisClient = redisClient;
  this.chatApp = io(80);
};

// io dependent
SocketServer.prototype.use = function () {
  this.chatApp.use((socket, next) => {
    try {
      next();
    } catch (error) {
      console.log(error);
    }
  });
};

SocketServer.prototype.listen = function () {
  this.chatApp.on(CONNECT, (socket) => {
    new RoomService(this.redisClient, socket, this.chatApp).listen();
    new MessageService(this.redisClient, socket, this.chatApp).listen();
    new ProblemService(this.redisClient, socket, this.chatApp).listen();
    new SolutionService(this.redisClient, socket, this.chatApp).listen();
  });
};

// singleton
const socketServer = new SocketServer();

export default socketServer;
