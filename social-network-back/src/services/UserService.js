let UserModel = require("../models/UserModel");
let sendMailAsync = require("../utils/MailUtility");

const registerAsync = async (req, res, next) => {
  try {
    const { user } = req.body;
    let userModel = new UserModel({ ...user });
    let savedUser = await userModel.save();
    let emailResp = await sendConfirmationEmail(savedUser._id, user.email);
    res.status(201).json({ id: savedUser._id });
  } catch (error) {
    next(error);
  }
};

const reSendEmailAsync = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email: email, password: password });
    if (user === null) {
      throw new IError({
        statusCode: 401,
        statusMessage: "Email and Password doesn't match any user",
      });
    }
    let emailResp = await sendConfirmationEmail(user._id, email);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const confirmEmailAsync = async (req, res, next) => {
  const { id, code } = req.query;
  try {
    if (code !== "akash") {
      throw new IError({
        statusCode: 404,
        statusMessage: "code is not valid",
      });
    }

    let user = await UserModel.findById(id);
    if (user === null) {
      throw new IError({
        statusCode: 404,
        statusMessage: "userId is not valid",
      });
    }

    let dbResp = await UserModel.updateOne({ _id: id }, { role: "USER" });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const searchUserByNameAsync = async (req, res, next) => {
  let { name } = req.params;
  let { offset = 0, limit = 30 } = req.query;
  try {
    let users = await UserModel.find()
      .where("userName")
      .regex(new RegExp(`^${name}.*`, "i"))
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .select({ _id: 1, proPic: 1, userName: 1 });
    res.json([...users]);
  } catch (error) {
    next(error);
  }
};

const getUserByIdAsync = async (req, res, next) => {
  const { userId } = req.params;
  try {
    let user = await UserModel.findById(userId);
    user = getUserWithFollowedMetadata(user._doc, req.user.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const getUsersAsync = async (req, res, next) => {
  const { offset, limit } = req.query;
  const { id } = req.user;
  try {
    let users = await UserModel.find({ _id: { $ne: id } }).select({
      _id: 1,
      proPic: 1,
      userName: 1,
    });

    let modeUsers = users.map((user) =>
      getUserWithFollowedMetadata(user._doc, id)
    );

    res.json(modeUsers);
  } catch (error) {
    next(error);
  }
};

const getSpecifiedUsersAsync = async (req, res, next) => {
  const { userIds } = req.body;
  try {
    let users = await UserModel.find({ _id: { $in: userIds } }).select({
      _id: 1,
      proPic: 1,
      userName: 1,
    });

    let resp = users.map((user) =>
      getUserWithFollowedMetadata(user._doc, req.user.id)
    );
    res.json([...resp]);
  } catch (error) {
    next(error);
  }
};

const followUserAsync = async (req, res, next) => {
  const { toFollowId } = req.body;
  try {
    await UserModel.updateOne(
      { _id: req.user.id },
      { $push: { followings: toFollowId } }
    );
    await UserModel.updateOne(
      { _id: toFollowId },
      { $push: { followers: req.user.id } }
    );
    res.send();
  } catch (error) {
    next(error);
  }
};

const unfollowUserAsync = async (req, res, next) => {
  const { toUnfollowId } = req.body;
  try {
    await UserModel.updateOne(
      { _id: req.user.id },
      { $pull: { followings: toUnfollowId } }
    );
    await UserModel.updateOne(
      { _id: toUnfollowId },
      { $pull: { followers: req.user.id } }
    );
    res.send();
  } catch (error) {
    next(error);
  }
};

const removeUserAsync = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await UserModel.deleteOne({ _id: userId });
    res.json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};

//utill

const sendConfirmationEmail = async (id, email) => {
  return await sendMailAsync(
    (to = email),
    (link = `http://localhost:3000/confirm-email/${id}/akash`)
  );
};

const getUserWithFollowedMetadata = (userBeFollowed, userIdFollowing) => {
  if (userBeFollowed.followers.includes(userIdFollowing)) {
    userBeFollowed.followed = true;
  } else {
    userBeFollowed.followed = false;
  }
  return userBeFollowed;
};
