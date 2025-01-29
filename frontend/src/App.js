import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login_signup from './components/Login_Signup/Login_Signup';
import Home from './components/Home/Home';
import Explore from './components/Explore/Explore';
import Destination from './components/Destination/Destination';
import TourismBlog from './components/TourismBlog/TourismBlog';
import Contact from './components/Contact/Contact';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      {/* Navbar inside Router to use useLocation */}
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={<Login_signup setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/Explore"
          element={isAuthenticated ? <Explore /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/Destination"
          element={isAuthenticated ? <Destination /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/Contact"
          element={isAuthenticated ? <Contact /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/Blog"
          element={isAuthenticated ? <TourismBlog /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
