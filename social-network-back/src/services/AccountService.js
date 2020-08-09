let UserModel = require("../models/UserModel");
let { generateToken } = require("../utils/JwtUtility");
let { uploadProfileImage } = require("../utils/FileUploadUtility");
const IError = require("../common/models/IError");

const loginAsync = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email: email, password: password });
    if (user === null) {
      throw new IError({
        statusCode: 401,
        statusMessage: "Email and Password doesn't match any user",
      });
    }
    let token = await generateToken(
      (userName = user.userName),
      (role = user.role),
      (id = user.id)
    );
    res.json({ token, ...user._doc });
  } catch (error) {
    next(error);
  }
};

const refreshAsync = async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.user.id);
    if (user === null) {
      res.status(401).send();
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  console.log("logout");

  const { userName, role, id } = req.user;
  let token = await generateToken(userName, role, id, "0s");
  res.cookie("token", token, { maxAge: 0, httpOnly: true });
  res.json({});
};

const updateProfileImageAsync = async (req, res, next) => {
  try {
    const { profileImage } = req.body;

    let user = await UserModel.findOne({ _id: req.user.id });
    if (user === null) {
      res.status(401).send();
    }

    let link = await uploadProfileImage(profileImage, req.user.id);
    user.proPic = link;
    await user.save();
    res.send();
  } catch (error) {
    next(error);
  }
};

const replaceAccountAsync = async (req, res, next) => {
  const { user } = req.body;
  try {
    UserModel.replaceOne({ _id: req.user.id }, user);
  } catch (error) {
    next(error);
  }
};

const updateAccountAsync = async (req, res, next) => {
  const { userName, name, newPassword } = req.body;
  try {
    let user = await UserModel.findById(req.user.id);
    if (user === null) {
      res.status(401).send();
    }

    if (!!userName && userName.length > 0) user.userName = userName;
    if (!!name && name.length > 0) user.name = name;
    if (!!newPassword && newPassword.length > 0) user.password = newPassword;

    await UserModel.replaceOne({ _id: req.user.id }, user);
    res.send();
  } catch (error) {
    next(error);
  }
};

const GetAllFollowersAsync = async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.user.id).select({
      followers: 1,
      _id: 0,
    });
    let followersDetails = await UserModel.find({
      _id: { $in: user.followers },
    });

    res.json(followersDetails);
  } catch (error) {
    next(error);
  }
};

const GetAllFollowingsAsync = async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.user.id).select({
      followings: 1,
      _id: 0,
    });
    let followersDetails = await UserModel.find({
      _id: { $in: user.followings },
    });

    res.json(followersDetails);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginAsync,
  refreshAsync,
  logout,
  updateAccountAsync,
  replaceAccountAsync,
  GetAllFollowersAsync,
  GetAllFollowingsAsync,
  updateProfileImageAsync,
};
