const express = require("express");
const cloudinary = require("cloudinary");
const userModel = require("../model/userModel");
const blogModel = require("../model/blogModel");

export const createBlog = async (req, res) => {
  try {
    const { userID } = req.params;
    const { title, content, category } = req.body;
    const user = await userModel.findById(userID);

    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file?.path
    );

    const blog = await blogModel.create({
      title,
      content,
      category,
      image: secure_url,
      imageID: public_id,
      userID: user._id,
      user: user,
    });

    user?.blog?.push(new mongosose.Types.ObjectId(blog._id));
    user?.save();

    return res.status(201).json({
      message: "blog created",
      data: blog,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to create blog",
    });
  }
};
export const getAllBlog = async (req, res) => {
  try {
    const blog = await blogModel.find();

    return res.status(200).json({
      message: "get blog",
      data: blog,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to get blog",
    });
  }
};

export const getBlogCategory = async (req, res) => {
  try {
    const makeSearch = req.query.search
      ? {
          $or: [
            { category: { $regex: req.query.search, $options: "i" } },
            // { content: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const blog = await blogModel.find(makeSearch);
    // const post = await postModel.find({ category: req.query.search });

    return res.status(200).json({
      message: "get blog",
      data: blog,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to get blog",
    });
  }
};

export const getOneBlog = async (req, res) => {
  try {
    const { blogID } = req.params;
    const blog = await blogModel.findById(blogID);

    return res.status(200).json({
      message: "get blog",
      data: blog,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to get blog",
    });
  }
};

export const getUserBlog = async (req, res) => {
  try {
    const { userID } = req.params;
    const blog = await userModel.findById(userID).populate({
      path: "blog",
      options: {
        sort: {
          createAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "get blog",
      data: blog?.blog,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to get blog",
    });
  }
};

export const UpdateOneBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { blogID } = req.params;
    const blog = await blogModel.findByIdAndUpdate(
      blogID,
      { title, content },
      { new: true }
    );

    return res.status(201).json({
      message: "update blog",
      data: blog,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to update blog",
    });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const { userID, blogID } = req.params;

    const user = await userModel.findById(userID);
    const blog = await blogModel.findById(blogID);

    if (user) {
      blog?.likes?.push(new mongoose.Types.ObjectId(user._id));
      blog?.save();

      return res.status(201).json({
        message: "like a blog",
        length: blog?.likes.length,
        data: blog,
      });
    } else {
      return res.status(404).json({
        message: "Error",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Unable to like blog",
    });
  }
};

export const unLikeBlog = async (req, res) => {
  try {
    const { userID, blogID } = req.params;

    const user = await userModel.findById(userID);
    const blog = await blogModel.findById(blogID);

    if (user) {
      blog?.likes?.pull(new mongoose.Types.ObjectId(user._id));
      blog?.save();

      return res.status(201).json({
        message: "unlike blog",
        data: blog,
        length: blog?.likes.length,
      });
    } else {
      return res.status(404).json({
        message: "Error",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Unable to unlike a blog",
    });
  }
};

export const deleteOneBlog = async (req, res) => {
  try {
    const { blogID } = req.params;
    const blog = await blogModel.findByIdAndDelete(blogID);

    return res.status(201).json({
      message: "delete blog",
      data: blog,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to delete blog",
    });
  }
};
