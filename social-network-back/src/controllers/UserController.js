let express = require("express");
let {
  registerAsync,
  confirmEmailAsync,
  reSendEmailAsync,
  searchUserByNameAsync,
  removeUserAsync,
  getUserByIdAsync,
  getUsersAsync,
  getSpecifiedUsersAsync,
  followUserAsync,
  unfollowUserAsync,
} = require("../services/UserService");
let authorize = require("../common/middleware/AuthorizeMiddleware");
let userManagementRouter = express.Router();
userManagementRouter.post("/register", registerAsync);
userManagementRouter.post("/resend-email", reSendEmailAsync);
userManagementRouter.get("/confirm-email", confirmEmailAsync);
userManagementRouter.get(
  "/search/:name",
  authorize(["USER", "ADMIN"]),
  searchUserByNameAsync
);
userManagementRouter.get(
  "/:userId",
  authorize(["USER", "ADMIN"]),
  getUserByIdAsync
);
userManagementRouter.get("/", authorize(["USER", "ADMIN"]), getUsersAsync);
userManagementRouter.post(
  "/ids",
  authorize(["USER", "ADMIN"]),
  getSpecifiedUsersAsync
);
userManagementRouter.patch(
  "/follow",
  authorize(["USER", "ADMIN"]),
  followUserAsync
);
userManagementRouter.patch(
  "/unfollow",
  authorize(["USER", "ADMIN"]),
  unfollowUserAsync
);

userManagementRouter.delete("/:userId", authorize(["ADMIN"]), removeUserAsync);

module.exports = userManagementRouter;
