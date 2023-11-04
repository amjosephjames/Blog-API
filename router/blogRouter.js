const express = require("express");
const {
  UpdateOneBlog,
  createBlog,
  deleteOneBlog,
  likeBlog,
  getOneBlog,
  getAllBlog,
  getBlogCategory,
  getUserBlog,
  unLikeBlog,
} = require("../controller/blogController");
const { upload } = require("../utils/multer");

const router = express.Router();

router.route("/:userID/create").post(upload, createBlog);
// router.route("/posts").get(readPost);

router.route("/category/blogs").get(getBlogCategory);

router.route("/:blogID/one").get(getOneBlog);
router.route("/:userID/read-user-blog").get(getUserBlog);
router.route("/:blogID/update").patch(UpdateOneBlog);
router.route("/:blogID/delete").delete(deleteOneBlog);

router.route("/:userID/:blogID/unlike").patch(unLikeBlog);
router.route("/:userID/:blogID/like").patch(likeBlog);

export default router;
