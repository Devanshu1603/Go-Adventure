import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const Contact = () => {
  // State to handle form data
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // State for form submission feedback
  const [feedback, setFeedback] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tourism-five-azure.vercel.app/api/contact/submit', formData);
      setFeedback(response.data.message); // Show success message
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Error submitting form:', error);
      setFeedback('Failed to send message. Please try again.'); // Show error message
    }
  };

  // Variants for animations
  const sectionVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const reverseSectionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerVariants = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <>
      <Navbar />
      <div className="contact-container">
        {/* Contact Form Section */}
        <motion.div
          className="contact-form-wrapper d-flex justify-content-center"
          variants={reverseSectionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
          >
            <motion.h5 className="title" variants={itemVariants}>
              Contact us
            </motion.h5>
            <motion.p className="description" variants={itemVariants}>
              Feel free to contact us if you need any assistance, any help, or another question.
            </motion.p>
            <motion.div variants={itemVariants}>
              <input
                type="text"
                className="form-control rounded border-white mb-3 form-input"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="email"
                className="form-control rounded border-white mb-3 form-input"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <textarea
                id="message"
                className="form-control rounded border-white mb-3 form-text-area"
                rows="5"
                cols="30"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </motion.div>
            <motion.div className="submit-button-wrapper" variants={itemVariants}>
              <input type="submit" value="Send" />
            </motion.div>
            {feedback && (
              <motion.p className="feedback" variants={itemVariants}>
                {feedback}
              </motion.p>
            )}
          </motion.form>
        </motion.div>

        {/* Contact Details Section */}
        <motion.div
          className="contact-description-wrapper"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="contact-detail"
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
          >
            <motion.div
              className="contact-detail-section"
              variants={staggerVariants}
            >
              <motion.h4 className="title" variants={itemVariants}>
                Visit Us
              </motion.h4>
              <motion.p className="description" variants={itemVariants}>
                University Institute Of Engineering And Technology
                <br />
                Panjab University
                <br />
                Sector-25 Chandigarh, 160014
              </motion.p>
            </motion.div>

            <motion.div
              className="contact-detail-section"
              variants={staggerVariants}
            >
              <motion.h4 className="title" variants={itemVariants}>
                Contact Info
              </motion.h4>
              <motion.p className="description" variants={itemVariants}>
                <i className="fa-solid fa-envelope"> </i> XYZ123@gmail.com
                <br />
                <i className="fa-solid fa-phone"> </i> +91 97456 72385
              </motion.p>
            </motion.div>

            <motion.div
              className="contact-detail-section"
              variants={staggerVariants}
            >
              <motion.h4 className="title" variants={itemVariants}>
                Connect With Us
              </motion.h4>
              <motion.p className="description-icons" variants={itemVariants}>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-twitter"></i>
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
