const express = require("express");
const {
  createComment,
  deleteOneComment,
  likeBlogComment,
  getComment,
  getOneComment,
  getBlogComment,
  unLikeBlogComment,
} = require("../controller/commentController");

const router = express.Router();

router.route("/:authID/:postID/create-comment").post(createComment);

router.route("/comments").get(getComment);

router.route("/:commentID/one").get(getOneComment);

router.route("/:postID/read-post-comment").get(getBlogComment);

router.route("/:authID/:commentID/like-comment").patch(likeBlogComment);

router.route("/:authID/:commentID/unlike-comment").patch(unLikeBlogComment);

router.route("/:postID/:commentID/delete-comment").delete(deleteOneComment);

export default router;
