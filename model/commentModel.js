const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const commentModel = new Schema(
  {
    comment: {
      type: String,
    },
    username: {
      type: String,
    },
    useravatar: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    ],

    blog: {
      type: mongoose.Types.ObjectId,
      ref: "blogs",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentModel)