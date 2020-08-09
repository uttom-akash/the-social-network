let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  name: { type: String },
  proPic: { type: String },
  password: { type: String },
  role: { type: String },
  date: { type: Date, default: Date.now },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followings: [{ type: Schema.Types.ObjectId, ref: "User" }],
  ratedStories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

module.exports = mongoose.model("User", userSchema);
