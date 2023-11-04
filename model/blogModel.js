const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const blogModel = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    userID: {
      type: String,
    },
    views: {
      type: Array,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
      },
    ],
    category: {
      type: String,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("blogs",blogModel)
