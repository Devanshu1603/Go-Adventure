import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import './Footer.css';
import axios from "axios";

const Footer = () => {
  // Refs for each section
  const servicesRef = useRef(null);
  const pageLinksRef = useRef(null);
  const subscribeRef = useRef(null);
  const contactRef = useRef(null); // Ref for Contact Us section
  const [email, setEmail] = useState(""); // State for the email input

  // Visibility states
  const isServicesInView = useInView(servicesRef, { once: true });
  const isPageLinksInView = useInView(pageLinksRef, { once: true });
  const isSubscribeInView = useInView(subscribeRef, { once: true });
  const isContactInView = useInView(contactRef, { once: true }); // Tracking visibility for "Contact Us" section

  // Animations for links
  const linkVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.2, duration: 0.5 },
    }),
  };

  const handleSubscribe = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    try {
      // Sending POST request to your backend API
      const response = await axios.post("https://tourism-five-azure.vercel.app/api/subscribers/subscribe", { email });
      window.alert(response.data.message); 
      setEmail(" "); // Clear email input field
    } catch (error) {
      // Display error message
      window.alert(error.response?.data?.error || "Something went wrong. Please try again.");    
    }
  };

  return (
    <div className="footer">
      <div className="Footer-container">
        <div className="ROW" id="row1">
          {/* Services Section */}
          <motion.div
            ref={servicesRef}
            className="link-container"
            initial="hidden"
            animate={isServicesInView ? 'visible' : 'hidden'}
          >
            <motion.div className="single_footer">
              <h4>Services</h4>
              <ul className="footer-links">
                {['Destination Discovery', 'Cultural Experiences', 'Customized Tour', 'Local Experiences', 'Type specimen book'].map(
                  (item, index) => (
                    <motion.li
                      key={index}
                      custom={index}
                      variants={linkVariant}
                      initial="hidden"
                      animate={isServicesInView ? 'visible' : 'hidden'}
                    >
                      <a href="#">{item}</a>
                    </motion.li>
                  )
                )}
              </ul>
            </motion.div>
          </motion.div>

          {/* Page Links Section */}
          <motion.div
            ref={pageLinksRef}
            className="link-container"
            initial="hidden"
            animate={isPageLinksInView ? 'visible' : 'hidden'}
          >
            <motion.div className="single_footer">
              <h4>Page Link</h4>
              <ul className="footer-links">
                {['Home', 'Explore', 'Blog', 'Contact'].map((item, index) => (
                  <motion.li
                    key={index}
                    custom={index}
                    variants={linkVariant}
                    initial="hidden"
                    animate={isPageLinksInView ? 'visible' : 'hidden'}
                  >
                    <Link className="footer-link" to={`/${item === 'Home' ? '' : item}`}>
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Subscribe Section */}
          <motion.div
            ref={subscribeRef}
            className="col-md-4 col-sm-4 col-xs-12"
            initial="hidden"
            animate={isSubscribeInView ? 'visible' : 'hidden'}
          >
            <motion.div className="single_footer">
              <h4>Subscribe today</h4>
              <div className="signup_form">
                <form className="subscribe">
                  <input
                    type="email"
                    className="subscribe__input"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="button" className="subscribe__btn" onClick={handleSubscribe}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </motion.div>

            <div className="social_profile">
              <ul className="footer-links">
                {['facebook-f', 'twitter', 'google-plus-g', 'instagram'].map(
                  (icon, index) => (
                    <motion.li
                      key={index}
                      custom={index}
                      variants={linkVariant}
                      initial="hidden"
                      animate={isSubscribeInView ? 'visible' : 'hidden'}
                    >
                      <a href="#">
                        <i className={`fab fa-${icon}`}></i>
                      </a>
                    </motion.li>
                  )
                )}
              </ul>
            </div>
          </motion.div>

          {/* Contact Us Section with Animation */}
          <motion.div
            ref={contactRef}
            id='contact'
            className="single_footer"
            initial="hidden"
            animate={isContactInView ? 'visible' : 'hidden'}
          >
            <h4>Contact Us</h4>
            <ul>
              <motion.li custom={0} variants={linkVariant} initial="hidden" animate={isContactInView ? 'visible' : 'hidden'}>
                <i className="fa-solid fa-phone"></i>+91 9798830805
              </motion.li>
              <motion.li custom={1} variants={linkVariant} initial="hidden" animate={isContactInView ? 'visible' : 'hidden'}>
                <i className="fa-solid fa-envelope"></i>xyz@gmail.com
              </motion.li>
              <motion.li custom={2} variants={linkVariant} initial="hidden" animate={isContactInView ? 'visible' : 'hidden'}>
                <i className="fa-solid fa-location-dot"></i>Chandigarh
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom Section */}
        <div className="ROW" id="row2">
          <div className="col-lg-12 col-sm-12 col-xs-12">
            <motion.p
              className="copyright"
              initial={{ opacity: 0, y: 50 }}
              animate={isSubscribeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1 }}
            >
              Copyright © 2025 <a href="#">G0-Adventure</a>.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
