import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import './Process.css';

// Process card data
const processData = [
  {
    icon: 'fa-globe',
    title: 'Explore Destinations',
    description: 'Start your journey by exploring our wide range of destinations tailored to your preferences.',
    delay: 0.1,
  },
  {
    icon: 'fa-dollar-sign',
    title: 'Research and Compare',
    description: 'Compare destinations and activities to find the perfect fit for your travel style and budget.',
    delay: 0.2,
  },
  {
    icon: 'fa-plane',
    title: 'Plan Your Itinerary',
    description: 'Use our interactive itinerary planner to map out your trip, including must-see spots, travel times.',
    delay: 0.3,
  },
  {
    icon: 'fa-swimmer',
    title: 'Share Your Experience',
    description: 'After your trip, share your stories, photos, and reviews to inspire others for their next adventure.',
    delay: 0.4,
  },
];

const Process = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Initial state: hidden and below
    visible: { opacity: 1, y: 0 }, // Visible state: fully shown and at normal position
  };

  return (
    <div className="process-container">
      <div className="text-center">
        <h3 className="process-section-title text-primary">Process</h3>
        <h1>4 Easy Steps</h1>
      </div>
      <div className="process-row">
        {/* Map through processData to dynamically render process cards */}
        {processData.map((process, index) => (
          <motion.div
            className="process"
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: process.delay }}
          >
            <div className="process-item rounded" href="">
              <div className="process-icon">
                <div>
                  <i className={`fa ${process.icon} fa-2x text-primary`}></i>
                </div>
              </div>
              <h4>{process.title}</h4>
              <p>{process.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Process;