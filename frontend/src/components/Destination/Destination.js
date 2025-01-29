import React, { useEffect, useState } from 'react';
import Fort from '../images/Home.jpg';
import Animation from '../images/Animation.gif';
import Footer from '../footer/Footer';
import './Destination.css';

const PopularDestinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const resultsPerPage = 8; // Number of destinations per page

    const top25Places = [
        'Taj Mahal', 'Hawa Mahal', 'Gateway of India', 'Charminar',
        'Red Fort', 'India Gate', 'kedarnath', 'Chhatrapati Shivaji Terminus', 'Mysore Palace', 'Meenakshi Temple', 'Sundarbans',
        'Ajanta Caves', 'Konark Sun Temple', 'Golden Temple', 'Ranthambore National Park',
        'Kaziranga National Park', 'Darjeeling', 'Leh Ladakh', 'Andaman and Nicobar Islands', 'Rishikesh',
        'Udaipur', 'Jaipur', 'Agra Fort', 'Varanasi', 'Shimla'
    ];

    useEffect(() => {
        const fetchDestinations = async () => {
            const promises = top25Places.map(async (place) => {
                const response = await fetch(`http://localhost:8000/api/destination/${encodeURIComponent(place)}`);
                if (response.ok) {
                    return response.json();
                } else {
                    console.error(`Failed to fetch data for ${place}`);
                    return null;
                }
            });

            const results = await Promise.all(promises);
            setDestinations(results.filter((result) => result !== null));
            setLoading(false);
        };

        fetchDestinations();
    }, []);

    // Calculate the destinations to display for the current page
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = destinations.slice(indexOfFirstResult, indexOfLastResult);

    // Pagination handler
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="destination-container">
                <img src={Fort} alt="" />
                <div className="text-overlay">
                    <h1>Let's Discover The World Together</h1>
                    <p style={{ color: '#fff', fontSize: '18px', position: 'relative', left: '450px', top: '150px' }}>
                        Enjoy Your Vacation With Us
                    </p>
                    <div className="destination-form">
                        <input type="text" placeholder="Enter your email" />
                        <button type="submit">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="popular-destinations">
                <h1>Popular Destinations in India</h1>
                <div className="content-container">
                    {loading ? (
                        <div id="preloader">
                           <img src={Animation} alt="" />
                        </div>
                    ) : (
                        <>
                            <div className="destination-tiles">
                                {currentResults.map((destination, index) => (
                                    <a
                                        key={index}
                                        className="tile"
                                        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(destination.title)}`}
                                    >
                                        <img src={destination.image || 'placeholder.jpg'} alt={destination.title} />
                                        <div className="details">
                                            <span className="title">{destination.title}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            <nav aria-label="Page navigation example" className="pagination-container">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                            Previous
                                        </button>
                                    </li>
                                    {Array.from({ length: Math.ceil(destinations.length / resultsPerPage) }, (_, i) => (
                                        <li
                                            key={i + 1}
                                            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li
                                        className={`page-item ${
                                            currentPage === Math.ceil(destinations.length / resultsPerPage)
                                                ? 'disabled'
                                                : ''
                                        }`}
                                    >
                                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </>
                    )}
                </div>
            </div>
            <div className="destination-Footer">
                <Footer />
            </div>
        </>
    );
};

export default PopularDestinations;
