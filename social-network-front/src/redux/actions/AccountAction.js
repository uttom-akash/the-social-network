import {
  LOGIN,
  UPDATE_PROFILE_IMAGE,
  UPDATE_PROFILE,
  FOLLOW,
  UNFOLLOW,
} from "../type/Type";
import AccountApi from "../../api/endpoints/AccountApi";

const loginAction = (data) => ({
  type: LOGIN,
  payload: data,
});

const updateProfileImageAction = (data) => ({
  type: UPDATE_PROFILE_IMAGE,
  payload: data,
});

const updateProfileAction = (data) => ({
  type: UPDATE_PROFILE,
  payload: data,
});

const followAction = (data) => ({
  type: FOLLOW,
  payload: data,
});

const unfollowAction = (data) => ({
  type: UNFOLLOW,
  payload: data,
});

export const login = (data) => (dispatch) =>
  AccountApi.login(data).then((user) => {
    localStorage.setItem("__I_Token", user.token);
    return dispatch(loginAction(user));
  });

export const refresh = () => (dispatch) =>
  AccountApi.refresh().then((user) => dispatch(loginAction(user)));

export const logout = () => (dispatch) =>
  new Promise((resolve, reject) => {
    try {
      localStorage.clear();
      let action = dispatch(loginAction({}));
      resolve(action);
    } catch (error) {
      reject(error);
    }
  });

export const changeProfileImage = (data) => (dispatch) =>
  AccountApi.updateProfileImage(data).then((resp) =>
    dispatch(updateProfileImageAction(data))
  );

export const updateProfile = (data) => (dispatch) =>
  AccountApi.update(data).then((resp) => dispatch(updateProfileAction(data)));

export const onFollow = (data) => (dispatch) =>
  AccountApi.follow(data).then((resp) => dispatch(followAction(data)));
export const onUnfollow = (data) => (dispatch) =>
  AccountApi.unfollow(data).then((resp) => dispatch(unfollowAction(data)));
