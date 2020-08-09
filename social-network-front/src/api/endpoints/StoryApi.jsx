import { AuthorizedAxios } from "../settings/Axios";

export default {
  createStory: (story) =>
    AuthorizedAxios.post("/story", story).then((resp) => resp.data),
  updateStory: (story) =>
    AuthorizedAxios.put("/story", story).then((resp) => resp.data),
  toggleStoryRating: (storyInfo) =>
    AuthorizedAxios.patch("/story", storyInfo).then((resp) => resp.data),
  deleteStory: (storyId) =>
    AuthorizedAxios.delete(`/story/${storyId}`).then((resp) => resp.data),
  getStoryById: (storyId) =>
    AuthorizedAxios.get(`/story/${storyId}`).then((resp) => resp.data),
  getMyStories: () => AuthorizedAxios.get("/story").then((resp) => resp.data),
  getFollowingsStories: (offset = 0, limit = 30) =>
    AuthorizedAxios.get(
      `/story/followings?offset=${offset}&limit=${limit}`
    ).then((resp) => resp.data),
  getUserStories: (userId) =>
    AuthorizedAxios.get(`/story/User/${userId}`).then((resp) => resp.data),
  getRatedStories: () =>
    AuthorizedAxios.get("/story/rated").then((resp) => resp.data),
};
