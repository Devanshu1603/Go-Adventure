import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const location = useLocation(); // Use safely within Router context

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    // Hide Navbar on the login page
    if (!isAuthenticated || location.pathname === '/login') {
        return null;
    }

    const linkVariant = {
        hidden: { opacity: 0, x: 50 },
        visible: (index) => ({
            opacity: 1,
            x: 0,
            transition: { delay: index * 0.2, duration: 0.5 },
        }),
    };

    return (
        <motion.div
            className="nav-container"
            initial="hidden"
            animate="visible"
        >
            {['Home', 'Explore', 'Blog', 'Contact'].map((item, index) => (
                <motion.div
                    key={index}
                    custom={index}
                    variants={linkVariant}
                    className="link-motion"
                >
                    <Link className="link" to={`/${item === 'Home' ? '' : item}`}>
                        {item}
                    </Link>
                </motion.div>
            ))}

            <motion.div
                custom={['Home', 'Explore', 'Blog', 'Contact'].length}
                variants={linkVariant}
                className="link-motion"
            >
                <button className="logout-button" onClick={handleLogout}>
                    <span class="material-symbols-outlined">
                        power_settings_new
                    </span>
                </button>
            </motion.div>
        </motion.div>
    );
};

export default Navbar;
