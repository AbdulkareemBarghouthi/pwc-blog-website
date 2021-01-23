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

  // function that parses user requested options for the select mongoose function
  const parsedOptions = handleUserSelectedOptions(req.query.options);

  // get all posts 
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
  // get blog id
  const blogId = req.params.id;
  // function that parses user requested options for the select mongoose function
  const parsedOptions = handleUserSelectedOptions(req.query.options);

  // look for the blog in the db and response to the client
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
  
  // decodeToken parses user's header token using JWT to an object
  const user = decodeToken(req.headers.authorization);

  // build object to create entity inside collection
  const blogDetails = {
    title: body.title,
    content: body.content,
    comments: [],
    postedBy: user.username, 
    userId: user._id
  };

  const newPost = Blog(blogDetails);

  // Save Blog and respond respectively
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


// edit a blog
router.put("/blog/:id", verifyUser, async (req, res) => {
  // Grab client sent options and blog id from the params
  const changedOptions = req.body;
  const blogId = req.params.id;

  // check if the blog exists
  const selelctedBlog = await Blog.findOne({ _id: blogId });

  if (!selelctedBlog) {
    res.status(404).json({
      message: "Blog not found",
      success: false,
      status: 404,
    });
  }

  // make sure the user is authorized to do this operation
  if (!userAuthorized(req.headers.authorization, selelctedBlog.userId)) {
    res.status(401).json({
      message: "User not authorized to do this operation",
      success: false,
      status: 401,
      selelctedBlog,
    });
    return;
  }

  // do the update
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


// add comment
router.post("/blog/:id/comment", verifyUser, async (req, res) => {
  // grab the id
  const blogId = req.params.id;

  // find the blog
  const selectedBlog = await Blog.findOne({ _id: blogId });

  // get the user
  const user = decodeToken(req.headers.authorization);

  const { body } = req;

  // check if blog exits
  if (!selectedBlog) {
    res
      .status(404)
      .json({ message: "Blog not found", status: 404, success: false });
    return;
  }

  // validate a comment is given
  if (!body.comment || body.comment.length === 0) {
    res.status(404).json({
      message: "Please provide a comment",
      status: 404,
      success: false,
    });
    return;
  }

  // create comment array
  const comments = [...selectedBlog.comments];
  comments.push({
    comment: body.comment,
    dateCommented: Date.now(),
    commentedBy: user.username,
  });

  // update the blog with the comments
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
  // grab id
  const blogId = req.params.id;

  
  try {
    //  find blog and validate if it exists
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
