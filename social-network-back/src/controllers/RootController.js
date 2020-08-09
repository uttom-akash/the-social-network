const express = require("express");
let path = require("path");
let rootRouter = express.Router();

let userManagementRouter = require("./UserController");
let accountManagementRouter = require("./AccountController");
let storyManagementRouter = require("./StoryController");

rootRouter.use("/static", express.static(path.join(__dirname, "../uploads")));

rootRouter.use("/user", userManagementRouter);
rootRouter.use("/account", accountManagementRouter);
rootRouter.use("/story", storyManagementRouter);

module.exports = rootRouter;
