import { AuthorizedAxios, Axios } from "../settings/Axios";

export default {
  register: (user) =>
    Axios.post("/user/register", user).then((resp) => resp.data),
  resendEmail: (userInfo) =>
    Axios.post("/user/resend-email", userInfo).then((resp) => resp.data),
  confirmEmail: (id, code) =>
    Axios.get(`/user/confirm-email?id=${id}&code=${code}`).then(
      (resp) => resp.data
    ),
  searchUser: (userName) =>
    AuthorizedAxios.get(`/user/search/${userName}`).then((resp) => resp.data),
  getUser: (userId) =>
    AuthorizedAxios.get(`/user/${userId}`).then((resp) => resp.data),
  getUsers: (offset = 0, limit = 20) =>
    AuthorizedAxios.get(`/user?offset=${offset}&limit=${limit}`).then(
      (resp) => resp.data
    ),
  getSpecifiedUser: (userIds) =>
    AuthorizedAxios.post("/user/ids", userIds).then((resp) => resp.data),
  follow: (userInfo) =>
    AuthorizedAxios.post("/user/follow", userInfo).then((resp) => resp.data),
  unfollow: (userInfo) =>
    AuthorizedAxios.post("/user/unfollow", userInfo).then((resp) => resp.data),

  removeUser: (userId) =>
    AuthorizedAxios.delete(`/user/${userId}`).then((resp) => resp.data),
};
