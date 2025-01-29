import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TourismBlog.css';
import Footer from '../footer/Footer';
import Article from '../Article/Article';

const TourismBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    author: '',
    image: null,
  });

  // Fetch blogs from the backend when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/blogs');
        setBlogs(response.data); // Set the blogs state with the fetched data
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setBlogData({ ...blogData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('content', blogData.content);
    formData.append('author', blogData.author);
    if (blogData.image) {
      formData.append('image', blogData.image);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setBlogs([response.data.blog, ...blogs]); // Prepend the new blog to the list
      setBlogData({ title: '', content: '', author: '', image: null }); // Clear the form
      alert('Blog posted successfully!');
    } catch (error) {
      console.error('Error posting the blog:', error);
      alert('Failed to post blog.');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Our Blog</h1>
      </section>

      {/* Blogs Section */}
      <section className="blogs">
        <div className="Blog-Title">
          <h1>Popular</h1>
          <h1 style={{ color: '#f59e0b' }}>Blogs</h1>
        </div>
        <div className="blog-grid">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div className="blog-card" key={blog._id}>
                <img src={`http://localhost:8000/uploads/${blog.image}`} alt={blog.title} />
                <div className="content">
                  <h3>{blog.title}</h3>
                  <p>{blog.content.substring(0, 100)}...</p>
                  <p className="author-details" style={{ fontSize: '13px', position: 'relative', bottom: '10px' }}>
                    Author: {blog.author}
                    <p style={{ position: 'relative', bottom: '15px', fontSize: '13px' }}>
                      Posted On: {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available at the moment.</p>
          )}
        </div>
      </section>

      {/* New Blog Section */}
      <section className="new-blog">
        <h2>Post a New Blog</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={blogData.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            rows="5"
            name="content"
            placeholder="Write your blog here..."
            value={blogData.content}
            onChange={handleInputChange}
            required
          ></textarea>
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={blogData.author}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          <button type="submit">Post Blog</button>
        </form>
      </section>

 <div className="Article">
            <Article />
          </div>

      
      <div className="Footer">
        <Footer />
      </div>
    </>
  );
};

export default TourismBlog;
