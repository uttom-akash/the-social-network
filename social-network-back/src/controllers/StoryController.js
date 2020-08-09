let express = require("express");
let {
  createStoryAsync,
  getStoriesOfFriendsAsync,
  getStoryByIdAsync,
  getAllStoriesByUserAsync,
  getMyAllStoriesAsync,
  getAllRatedStoriesAsync,
  replaceStoryAsync,
  toggleStoryRatingAsync,
  deleteStoryAsync,
} = require("../services/StoryService");
let authorize = require("../common/middleware/AuthorizeMiddleware");

let storyManagementRouter = express.Router();

storyManagementRouter.post("/", authorize(["USER", "ADMIN"]), createStoryAsync);
storyManagementRouter.put("/", authorize(["USER", "ADMIN"]), replaceStoryAsync);
storyManagementRouter.patch(
  "/",
  authorize(["USER", "ADMIN"]),
  toggleStoryRatingAsync
);

storyManagementRouter.delete(
  "/:storyId",
  authorize(["USER", "ADMIN"]),
  deleteStoryAsync
);

storyManagementRouter.get(
  "/followings",
  authorize(["USER", "ADMIN"]),
  getStoriesOfFriendsAsync
);

storyManagementRouter.get(
  "/user/:userId",
  authorize(["USER", "ADMIN"]),
  getAllStoriesByUserAsync
);

storyManagementRouter.get(
  "/rated",
  authorize(["USER", "ADMIN"]),
  getAllRatedStoriesAsync
);

storyManagementRouter.get(
  "/:storyId",
  authorize(["USER", "ADMIN"]),
  getStoryByIdAsync
);

storyManagementRouter.get(
  "/",
  authorize(["USER", "ADMIN"]),
  getMyAllStoriesAsync
);

module.exports = storyManagementRouter;
