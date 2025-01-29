import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./About.css";
import { Link } from "react-router-dom";

// Import Images
import Mountain from "../images/Mountain.jpg";
import Church from "../images/Church.jpg";
import Tree from "../images/Tree.jpg";
import Hampi from "../images/img1.jpg";
import Taj_Mahal from "../images/Taj_Mahal.jpg";
import Shimla from "../images/Shimla.jpg";
import Hawa_Mahal from "../images/Hawa_Mahal.jpg";

const aboutDetails = [
  { icon: "fa-location", count: 100, label: "Destination", delay: 0.1 },
  { icon: "fa-users-cog", count: 50, label: "Guides", delay: 0.3 },
];

const images = [
  { src: Church, className: "number1img" },
  { src: Hampi, className: "number2img" },
  { src: Taj_Mahal, className: "number3img" },
  { src: Shimla, className: "number5img" },
  { src: Tree, className: "number4vid" },
  { src: Hawa_Mahal, className: "number7img" },
  { src: Mountain, className: "number6img" },
];

// Counter Component
const Counter = ({ targetValue, duration, shouldStart }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) return; // Don't start counting if not triggered

    let start = 0;
    const increment = targetValue / (duration * 60); // Calculate increment for 60fps
    const interval = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        clearInterval(interval);
        start = targetValue; // Set final value
      }
      setValue(Math.ceil(start));
    }, 1000 / 60); // Update every frame (~60fps)

    return () => clearInterval(interval); // Cleanup
  }, [targetValue, duration, shouldStart]);

  return <>{value}+</>;
};

const About = () => {
  const shouldReduceMotion = useReducedMotion();
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [startCounting, setStartCounting] = useState(false); // Track when to start the counter

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollPosition / pageHeight) * 100;

      if (scrolled > 20 && !startCounting) {
        setStartCounting(true); // Start counting once 50% is scrolled
      }

      setScrollPercentage(scrolled); // Update scroll percentage
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [startCounting]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="About_container">
      <div className="responsive-container-block bigContainer">
        <div className="responsive-container-block Container">
          {/* Left Side */}
          <motion.div
            className="responsive-container-block leftSide"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1 }}
          >
            <motion.h1
              className="about-us-text"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1 }}
            >
              Who We <span style={{ fontSize: "37px", color: "#007bff" }}>Are</span>?
            </motion.h1>
            <motion.p
              className="text-blk heading"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.5, delay: 0.1 }}
            >
              Welcome To <span className="text-blk heading2">Go-Adventure</span>
            </motion.p>
            <motion.p
              className="text-blk subHeading"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            >
              Welcome to Go-Adventure, your ultimate companion in exploring the
              world’s most captivating destinations. Our mission is to inspire
              and empower travelers by providing expert advice, comprehensive
              guides, and insider tips to make every journey extraordinary. Join us
              on a journey to create unforgettable experiences and memories.
            </motion.p>
            <div className="about-row">
              {aboutDetails.map((detail, index) => (
                <motion.div
                  className="about-detail"
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 1.5,
                    delay: detail.delay,
                  }}
                >
                  <div className="detail">
                    <i className={`fa ${detail.icon} fa-5x text-primary`}></i>
                    <div className="detail-text">
                      <h2>
                        <Counter
                          targetValue={detail.count}
                          duration={2}
                          shouldStart={startCounting} // Pass the start condition
                        />
                      </h2>
                      <p>{detail.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link to="/Explore">
              <motion.button
                className="btn btn-primary"
                id="ripple"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              >
                Explore More
              </motion.button>
            </Link>
          </motion.div>

          {/* Right Side */}
          <div className="responsive-container-block rightSide">
            {images.map((image, index) => (
              <motion.img
                key={index}
                className={image.className}
                src={image.src}
                alt={`Image ${index + 1}`}
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
