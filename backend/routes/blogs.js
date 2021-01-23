const express = require("express");
const { Schema } = require("mongoose");
const router = express.Router();
const Blog = require("../database/blog");
const { handleUserSelectedOptions } = require("../helpers/blogHelpers");

// list all blogs
router.get("/blog", async (req, res) => {
  const parsedOptions = handleUserSelectedOptions(req.query.options);
  try {
    const allPosts = await Blog.find({}).select(parsedOptions);
    res.status(200).json({
      message: "Blogs retrieved successfully",
      status: 200,
      success: true,
      data: allPosts,
    });
  } catch (error) {
    res.status(500).json({ message: error, status: 500, success: false });
  }
});

// list specific blog
router.get("/blog/:id", async (req, res) => {
  const blogId = req.params.id;
  const parsedOptions = handleUserSelectedOptions(req.query.options);

  try {
    const foundBlog = await Blog.findOne({ _id: blogId }).select(parsedOptions);
    if (!foundBlog)
      res
        .status(404)
        .json({ message: "Blog not found", status: 404, success: false });
    else
      res.status(200).json({
        data: foundBlog,
        message: "Blog retrieved successfully",
        status: 200,
        success: 200,
      });
  } catch (error) {
    res.status(500).json({ message: error, status: 500, success: false });
  }
});

// upload a blog
router.post("/blog", async (req, res) => {
  const { body } = req;

  const blogDetails = {
    title: body.title,
    content: body.content,
    comments: [],
  };
  const newPost = Blog(blogDetails);

  try {
    const createdPost = await newPost.save();
    res.status(200).json({
      message: "Post Created Successfully",
      data: blogDetails,
      status: 200,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error, status: 500, success: false });
  }
});

// edit a blog
router.put("/blog/:id", async (req, res) => {
  const changedOptions = req.body;
  const blogId = req.params.id;

  try {
    const updatedResult = await Blog.findOneAndUpdate(
      { _id: blogId },
      { $set: { ...changedOptions } }
    );
    if (updatedResult) {
      res
        .status(200)
        .json({
          message: "Blog updated successfully",
          data: updatedResult,
          status: 200,
          success: true,
        });
    } else {
      res
        .status(404)
        .json({ message: "Blog not found", status: 404, success: false });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
      status: 500,
      success: false,
    });
  }
});

// delete a blog
router.delete("/blog/:id", async (req, res) => {
  const blogId = req.params.id;

  try {
    const deletedBlog = await Blog.deleteOne({ _id: blogId });
    res.status(200).json({
      message: "Blog deleted successfully",
      data: deletedBlog,
      status: 200,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error, status: 500, success: false });
  }
});

module.exports = router;
