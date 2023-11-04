const express = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file?.path
    );

    const user = await userModel.create({
      email,
      password: hash,
      username,
      avatar: secure_url,
      avatarID: public_id,
    });

    return res.status(201).json({
      message: "user created",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "failure to create user",
    });
  }
};

export const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    console.log(user);
    console.log(email);

    if (user) {
      const checkPassword = await bcrypt.compare(password, user?.password);

      if (checkPassword) {
        return res.status(201).json({
          message: "user signed in",
          data: user._id,
        });
      } else {
        return res.status(404).json({
          message: "User's password is not correct'",
        });
      }
    } else {
      return res.status(404).json({
        message: "User doesn't exit",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Unable to sign in user",
    });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find();
    return res.status(200).json({
      message: "get users",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to get users",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username } = req.body;
    const { userID } = req.params;
    const user = await userModel.findByIdAndUpdate(
      userID,
      {
        username,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "update user",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to update user",
    });
  }
};
export const getOneUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    return res.status(200).json({
      message: "get user",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to get user",
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findByIdAndDelete(userID);

    return res.status(200).json({
      message: "user deleted",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to delete user",
    });
  }
};
