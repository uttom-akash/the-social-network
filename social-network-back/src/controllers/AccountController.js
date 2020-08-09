let express = require("express");
let {
  loginAsync,
  refreshAsync,
  logout,
  updateAccountAsync,
  replaceAccountAsync,
  GetAllFollowersAsync,
  GetAllFollowingsAsync,
  updateProfileImageAsync,
} = require("../services/AccountService");
let authorize = require("../common/middleware/AuthorizeMiddleware");

let accountManagementRouter = express.Router();

accountManagementRouter.post("/login", loginAsync);
accountManagementRouter.get(
  "/refresh",
  authorize(["USER", "ADMIN"]),
  refreshAsync
);
accountManagementRouter.get("/logout", authorize(["USER", "ADMIN"]), logout);

accountManagementRouter.put(
  "/",
  authorize(["USER", "ADMIN"]),
  replaceAccountAsync
);

accountManagementRouter.patch(
  "/image",
  authorize(["USER", "ADMIN"]),
  updateProfileImageAsync
);

accountManagementRouter.patch(
  "/",
  authorize(["USER", "ADMIN"]),
  updateAccountAsync
);

accountManagementRouter.get(
  "/followers",
  authorize(["USER", "ADMIN"]),
  GetAllFollowersAsync
);
accountManagementRouter.get(
  "/followings",
  authorize(["USER", "ADMIN"]),
  GetAllFollowingsAsync
);

module.exports = accountManagementRouter;
