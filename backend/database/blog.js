const mongoose = require("mongoose");

const model = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
    default: "",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  userId: String,
  postedBy: String,
  comments: [],
});

module.exports = new mongoose.model("Blog", model);
