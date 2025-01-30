import React, { useState } from "react";
import "./Home.css";
import Testimonial from "../Testimonial/Testimonial";
import About from "../About/About";
import Footer from "../footer/Footer";
import Service from "../Services/Services";
// import leaf from "../images/leaf.jpg";
import river from "../images/River.jpg";
import { motion } from "framer-motion";
import axios from "axios";

const Home = () => {
  const [email, setEmail] = useState(""); // State for the email input

  const handleSubscribe = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    try {
      // Sending POST request to your backend API
      const response = await axios.post("https://tourism-five-azure.vercel.app/api/subscribers/subscribe", { email });
      window.alert(response.data.message); 
      setEmail(""); // Clear email input field
    } catch (error) {
      // Display error message
 window.alert(error.response?.data?.error || "Something went wrong. Please try again.");    }
  };

  return (
    <>
      <div className="home-container">
        <img src={river} alt="Background Leaf" />
        <div className="text-overlay">
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          >
            Let's Discover The World Together
          </motion.h1>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            Enjoy Your Vacation With Us
          </motion.p>

          {/* Subscription Form */}
          <div className="form">
            <motion.input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              initial={{ x: -100, opacity: 0 }} // Start animation off-screen to the left
              animate={{ x: 0, opacity: 1 }} // Animate into view
              transition={{
                duration: 1,
                ease: "easeInOut",
                delay: 0.5, // Delay after text animations
              }}
            />
            <motion.button
              type="submit"
              className="sub-btn"
              onClick={handleSubscribe} // Call the subscription handler
              initial={{ x: 100, opacity: 0 }} // Start animation off-screen to the right
              animate={{ x: 0, opacity: 1 }} // Animate into view
              transition={{
                duration: 1,
                ease: "easeInOut",
                delay: 0.7, // Delay after input animation
              }}
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <div className="contact">
        <About />
      </div>
      <div className="Home-service">
        <Service />
      </div>
      <div>
            <Testimonial/>
          </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home; 