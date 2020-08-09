let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let StorySchema = new Schema(
  {
    rootId: {
      type: Schema.Types.ObjectId,
      ref: "Story",
      default: "41224d776a326fb40f000001",
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Story",
      default: "41224d776a326fb40f000001",
    },
    userId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String },
    contentUrls: [{ type: String }],
    date: { type: Date, default: Date.now },

    state: { type: Number, default: 1 }, // 1=created, 2=edited, 3=deleted
    ratedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    replies: [{ type: Schema.Types.ObjectId, ref: "Story" }],
  },
  { toJSON: { virtuals: true } }
);

StorySchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("Story", StorySchema);
