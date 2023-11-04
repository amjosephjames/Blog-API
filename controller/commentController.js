const express = require("express");
const cloudinary = require("express");
const blogModel = require("../model/blogModel");
const userModel = require("../model/userModel");
const mongoose = require("mongoose");
const commentModel = require("../model/commentModel");

export const createComment = async (req, res) => {
  try {
    const { userID, blogID } = req.params;
    const { comment } = req.body;

    const user = await userModel.findById(userID);
    const blog = await blogModel.findById(blogID);

    const commentData = await commentModel.create({
      comment,
      username: user.username,
      useravatar: user.avatar,
    });

    blog?.comments?.push(new mongoose.Types.ObjectId(commentData._id));
    blog?.save();

    return res.status(201).json({
      message: "comment created",
      data: commentData,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to create comment",
    });
  }
};

export const getComment = async (req, res) => {
  try {
    const blog = await commentModel.find();

    return res.status(200).json({
      message: "get comment",
      data: comment,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to get comemnt",
    });
  }
};

export const getOneComment = async (req, res) => {
  try {
    const { commentID } = req.params;
    const blog = await commentModel.findById(commentID);

    return res.status(200).json({
      message: "get comment",
      data: blog,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to get comment",
    });
  }
};

export const getBlogComment = async (req, res) => {
  try {
    const { blogID } = req.params;
    const blog = await blogModel.findById(blogID).populate({
      path: "comments",
      options: {
        sort: {
          createAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "get blog comment",
      data: blog?.comments,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to get  blog comment",
    });
  }
};

export const likeBlogComment = async (req, res) => {
  try {
    const { userID, commentID } = req.params;

    const user = await userModel.findById(userID);
    const comment = await commentModel.findById(commentID);

    if (user) {
      comment?.likes?.push(new mongoose.Types.ObjectId(user._id));
      comment?.save();

      return res.status(201).json({
        message: "like a comment",
        length: comment?.likes.length,
        data: comment,
      });
    } else {
      return res.status(404).json({
        message: "Error",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Unable to like blog comment",
    });
  }
};

export const unLikeBlogComment = async (req, res) => {
  try {
    const { userID, commentID } = req.params;

    const user = await userModel.findById(userID);
    const comment = await commentModel.findById(commentID);

    if (user) {
      comment?.likes?.pull(new mongoose.Types.ObjectId(user._id));
      comment?.save();

      return res.status(201).json({
        message: "unlike a blog comment",
        data: comment,
        length: comment?.likes.length,
      });
    } else {
      return res.status(404).json({
        message: "Error",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Unable to unlike a blog comment",
    });
  }
};

export const deleteOneComment = async (req, res) => {
  try {
    const { blogID, commentID } = req.params;
    const blog = await blogModel.findByIdAndDelete(blogID);
    const comment = await commentModel.findByIdAndDelete(commentID);

    blog?.comments?.pull(new mongoose.Types.ObjectId(commentID));
    blog.save();

    return res.status(201).json({
      message: "delete blog comment",
      data: comment,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to delete blog",
    });
  }
};
