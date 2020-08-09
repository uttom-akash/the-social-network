import { Axios, AuthorizedAxios } from "../settings/Axios";

export default {
  login: (data) => Axios.post("/account/login", data).then((resp) => resp.data),
  refresh: () =>
    AuthorizedAxios.get("/account/refresh").then((resp) => resp.data.user),
  logout: () =>
    AuthorizedAxios.get("/account/logout").then((resp) => resp.data),
  update: (data) =>
    AuthorizedAxios.patch("/account", data).then((resp) => resp.data),
  replace: (user) =>
    AuthorizedAxios.put("/account", user).then((resp) => resp.data),

  updateProfileImage: (data) =>
    AuthorizedAxios.patch("/account/image", data).then((resp) => resp.data),
  getProfileImage: () =>
    AuthorizedAxios.get("/account/get-profile-image").then((resp) => resp.data),

  followers: () =>
    AuthorizedAxios.get("/account/followers").then((resp) => resp.data),
  followings: () =>
    AuthorizedAxios.get("/account/followings").then((resp) => resp.data),
};
