// Routes/blog.js
const express = require('express');
const multer = require('multer');
const Blog = require('../Models/Blog');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploaded files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filenames
  },
});

const upload = multer({ storage });

// POST route to create a new blog
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const image = req.file ? req.file.filename : null;

    // Create a new blog entry
    const newBlog = new Blog({
      title,
      content,
      author,
      image,
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog posted successfully!', blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error posting the blog' });
  }
});

// GET route to fetch all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blogs from the database
    res.status(200).json(blogs); // Send blogs as the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});

module.exports = router;
