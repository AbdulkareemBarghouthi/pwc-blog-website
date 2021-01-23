const express = require("express");
const { Schema } = require("mongoose");
const router = express.Router();
const Blog = require("../database/blog");
const {
  handleUserSelectedOptions,
  userAuthorized,
} = require("../helpers/blogHelpers");
const { verifyUser, decodeToken } = require("../helpers/authHelpers");
const User = require("../database/user");

// list all blogs
router.get("/blog", async (req, res) => {
  const parsedOptions = handleUserSelectedOptions(req.query.options);
  try {
    const allPosts = await Blog.find({}).select(parsedOptions);
    console.log(allPosts, 'posts');
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
router.post("/blog", verifyUser, async (req, res) => {
  const { body } = req;
  
  const user = decodeToken(req.headers.authorization);

  const blogDetails = {
    title: body.title,
    content: body.content,
    comments: [],
    postedBy: user.username, 
  };

  const newPost = Blog(blogDetails);

  try {
    const createdPost = await newPost.save();
    res.status(200).json({
      message: "Post Created Successfully",
      data: createdPost,
      status: 200,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error, status: 500, success: false });
  }
});

// decodeToken(req.headers.authorization)

// edit a blog
router.put("/blog/:id", verifyUser, async (req, res) => {
  const changedOptions = req.body;
  const blogId = req.params.id;
  const selelctedBlog = await Blog.findOne({ _id: blogId });

  if (!selelctedBlog) {
    res.status(404).json({
      message: "Blog not found",
      success: false,
      status: 404,
    });
  }

  if (!userAuthorized(req.headers.authorization, selelctedBlog.postedBy)) {
    res.status(401).json({
      message: "User not authorized to do this operation",
      success: false,
      status: 401,
      selelctedBlog,
    });
    return;
  }

  try {
    const updatedResult = await Blog.findOneAndUpdate(
      { _id: blogId },
      { $set: { ...changedOptions } }
    );
    if (updatedResult) {
      res.status(200).json({
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
router.delete("/blog/:id", verifyUser, async (req, res) => {
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

// add comment
router.post("/blog/:id/comment", verifyUser, async (req, res) => {
  const blogId = req.params.id;
  const selectedBlog = await Blog.findOne({ _id: blogId });
  const user = decodeToken(req.headers.authorization);
  const { body } = req;

  if (!selectedBlog) {
    res
      .status(404)
      .json({ message: "Blog not found", status: 404, success: false });
    return;
  }

  if (!body.comment || body.comment.length === 0) {
    res.status(404).json({
      message: "Please provide a comment",
      status: 404,
      success: false,
    });
    return;
  }

  const comments = [...selectedBlog.comments];
  comments.push({
    comment: body.comment,
    dateCommented: Date.now(),
    commentedBy: user.username,
  });

  try {
    const updatedResult = await Blog.findOneAndUpdate(
      { _id: blogId },
      { $set: { comments } }
    );
    if (updatedResult) {
      res.status(200).json({
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
    res.status(500).json({ message: error, status: 500, success: false });
  }
});

// get comments
router.get("/blog/:id/comment", async (req, res) => {
  const blogId = req.params.id;
  try {
    const selectedBlog = await Blog.findOne({ _id: blogId });
    if (!selectedBlog) {
      res
        .status(404)
        .json({ message: "Blog not found", status: 404, success: false });
      return;
    }

    res.status(200).json({
      message: "Comments Retrieved Successfully",
      status: 200,
      success: false,
      data: selectedBlog.comments,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: error ? error : "something went wrong",
        status: 500,
        success: false,
      });
  }
});

module.exports = router;
