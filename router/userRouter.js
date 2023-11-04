const express = require("express");
const {
  createUser,
  deleteUser,
  signinUser,
  updateUser,
  getAllUser,
  getOneUser,
} = require("../controller/userController");
const { upload } = require("../utils/multer");

const router = express.Router();

router.route("/signin").post(signinUser);
router.route("/register").post(upload, createUser);
router.route("/all").get(getAllUser);
router.route("/:userID/one").get(getOneUser);
router.route("/:userID/update").patch(updateUser);
router.route("/:userID/delete").delete(deleteUser);

export default router;
