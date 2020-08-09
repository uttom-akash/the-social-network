let StoryModel = require("../models/StoryModel");
let UserModel = require("../models/UserModel");
let { writeToMemory } = require("../utils/FileUploadUtility");

const createStoryAsync = async (req, res, next) => {
  try {
    const { storyDto } = req.body;
    let contentUrls = await writeToMemory(storyDto.streamContents);
    let storyModel = new StoryModel({
      ...storyDto,
      contentUrls,
      ratedBy: [],
      replies: [],
    });
    let savedStory = await (await storyModel.save())
      .populate({
        path: "user",
        select: { userName: 1, proPic: 1 },
      })
      .execPopulate();
    if (!!storyDto.parentId) {
      let parentStory = await StoryModel.findById(storyDto.parentId);
      parentStory.replies.push(savedStory._id);
      await parentStory.save();
    }
    res.status(201).json({ story: savedStory });
  } catch (error) {
    next(error);
  }
};

const getStoryByIdAsync = async (req, res, next) => {
  const { storyId } = req.params;
  try {
    let story = await StoryModel.findOne({
      _id: storyId,
      state: { $ne: 3 },
    }).populate({
      path: "user",
      select: { userName: 1, proPic: 1 },
    });
    res.json({ story });
  } catch (error) {
    next(error);
  }
};
const getAllStoriesByUserAsync = async (req, res, next) => {
  const { userId } = req.params;
  const { offset = 0, limit = 30 } = req.query;
  try {
    let stories = await StoryModel.find({
      userId: userId,
      rootId: "41224d776a326fb40f000001",
      state: { $ne: 3 },
    })
      .populate({
        path: "user",
        select: { userName: 1, proPic: 1 },
      })
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .sort({ date: -1 });

    res.json({ stories });
  } catch (error) {
    next(error);
  }
};
const getMyAllStoriesAsync = async (req, res, next) => {
  req.params.userId = req.user.id;
  return getAllStoriesByUserAsync(req, res, next);
};

const getStoriesOfFriendsAsync = async (req, res, next) => {
  const { offset = 0, limit = 30 } = req.query;
  try {
    let user = await UserModel.findById(req.user.id).select({
      followings: 1,
    });
    let followings = user.followings;
    followings.push(req.user.id);
    let stories = await StoryModel.find({
      userId: { $in: followings },
      rootId: "41224d776a326fb40f000001",
      state: { $ne: 3 },
    })
      .populate({ path: "user", select: { userName: 1, proPic: 1 } })
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .sort({ date: -1 });
    console.log(stories[0]);
    res.json({ stories });
  } catch (error) {
    next(error);
  }
};

const getAllRatedStoriesAsync = async (req, res, next) => {
  try {
    let stories = await UserModel.find({
      _id: req.user.id,
      rootId: "41224d776a326fb40f000001",
      state: { $ne: 3 },
    }).select({
      ratedStories: 1,
      _id: 0,
    });
    res.json({ stories });
  } catch (error) {
    next(error);
  }
};

const replaceStoryAsync = async (req, res, next) => {
  try {
    const { storyDto } = req.body;
    if (!!storyDto.streamContents) {
      let newContentUrls = await writeToMemory(storyDto.streamContents);
      storyDto.contentUrls = []
        .concat(storyDto.contentUrls)
        .concat(newContentUrls)
        .filter((url) => !!url);
    }
    storyDto.state = 2;
    await StoryModel.replaceOne({ _id: storyDto._id }, storyDto);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const toggleStoryRatingAsync = async (req, res, next) => {
  try {
    const { storyId } = req.body;
    const userId = req.user.id;
    const story = await StoryModel.findOne({
      _id: storyId,
      ratedBy: userId,
    });
    console.log(story);
    let rated;
    if (!!story) {
      rated = false;
      await story.updateOne({ $pull: { ratedBy: userId } });
    } else {
      rated = true;
      await StoryModel.updateOne(
        { _id: storyId },
        { $push: { ratedBy: userId } }
      );
    }
    res.status(200).json({ rated });
  } catch (error) {
    next(error);
  }
};

const deleteStoryAsync = async (req, res, next) => {
  const { storyId } = req.params;
  try {
    await StoryModel.updateOne({ _id: storyId }, { state: 3 });
    // await StoryModel.deleteOne({ _id: storyId });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStoryAsync,
  getStoriesOfFriendsAsync,
  getStoryByIdAsync,
  getAllStoriesByUserAsync,
  getMyAllStoriesAsync,
  getAllRatedStoriesAsync,
  replaceStoryAsync,
  toggleStoryRatingAsync,
  deleteStoryAsync,
};
