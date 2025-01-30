import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Explore.css';
import Navbar from '../Navbar/Navbar';
import Gallery from '../Gallery/Gallery';
import Footer from '../footer/Footer';
import Process from '../Process/Process';
import Article from '../Article/Article';
import hill from '../images/hill.jpg';
import Testimonial from '../Testimonial/Testimonial';

// Helper function to strip HTML tags and limit description
const formatDescription = (html) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const textContent = tempDiv.textContent || tempDiv.innerText || '';

  // Limit to 200 characters and add "..." if necessary
  const maxLength = 200;
  return textContent.length > maxLength
    ? textContent.slice(0, maxLength) + '...'
    : textContent;
};

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('https://tourism-five-azure.vercel.app/api/places/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location: searchQuery }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      // Filter out the first result and results with null or missing images
      const filteredResults = data.slice(1).filter((place) => place.imageUrl);

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const hasResults = searchResults.length > 0;

  return (
    <>
      <header>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <div className="explore-header">
            <h1>Ready To</h1>
            <h1 style={{ color: '#f59e0b' }}>Explore ?</h1>
          </div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
        >
          <div className="explore-subheader">
            Search For Your Next Adventure Now!
          </div>
        </motion.h3>

        <motion.div
          className="search-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
        >
          <div className="footer-search-box">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a destination..."
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </motion.div>
      </header>

      {!hasResults && (
        <>
          <div className="gallery">
            <Gallery />
          </div>
         
          <div className="PROCESS">
            <Process />
          </div>
          
        </>
      )}

      <div>
        {hasResults && (
          <h1 style={{ position: 'relative', top: '40px' }}>
            Famous places in {searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)}
          </h1>
        )}
        <ul className="results">
          {searchResults.map((place, index) => (
            <li key={place.pageid}>
              <div className="result-article">
                <img src={place.imageUrl} alt={place.title} />
                <div className="article-info">
                  <h4>
                    <a href={place.url}>{place.title}</a>
                  </h4>
                  <p>{formatDescription(place.description)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="Footer">
        <Footer />
      </div>
    </>
  );
};

export default Explore;
