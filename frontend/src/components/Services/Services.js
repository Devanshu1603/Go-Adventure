import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const serviceData = [
  {
    icon: 'fa-hotel',
    title: 'Destination Discovery',
    description: 'Detailed guides to iconic landmarks, museums, and historical sites. Spotlight on lesser-known destinations.',
    delay: 0.1,
  },
  {
    icon: 'fa-utensils',
    title: 'Cultural Experiences',
    description: 'Lists of must-try local dishes, food tours, and cooking classes. Tours of galleries, theaters, historical monuments.',
    delay: 0.2,
  },
  {
    icon: 'fa-spa',
    title: 'Customized Tour Services',
    description: 'Connect with certified local guides for a personalized experience. Curated one-day plans for quick exploration.',
    delay: 0.3,
  },
  {
    icon: 'fa-swimmer',
    title: 'Local Experiences',
    description: 'Highlight local markets and artisanal crafts unique to the region. Opportunities to live with local families or participate in village life.',
    delay: 0.4,
  },
];

const Service = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="service-container">
      <div className="text-center">
        <h1 className="service-title">
          Explore Our <span className="text-primary">Services</span>
        </h1>
      </div>
      <div className="row">
        {serviceData.map((service, index) => (
          <motion.div
            className="service"
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: service.delay }}
          >
             <div className="service-item rounded" href="">
              <div className="service-icon">
                <div>
                  <i className={`fa ${service.icon} fa-2x text-primary`}></i>
                </div>
              </div>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Service;
