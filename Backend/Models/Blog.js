const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Path to the uploaded image
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the date of blog creation
    },
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
