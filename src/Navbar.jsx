import React, { useState } from 'react';
import './App.css'; // Import the updated CSS

const Navbar = ({ setCurrentPage, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (page, e) => {
    e.preventDefault();
    setCurrentPage(page);
    setIsMenuOpen(false); // Close mobile menu
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a 
          href="#" 
          className="logo"
          onClick={(e) => handleNavClick('home', e)}
        >
          Soclique
        </a>
        
        <ul className="nav-links">
          <li>
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('home', e)}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('about', e)}
            >
              About Us
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'get-started' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('get-started', e)}
            >
              Get Started
            </a>
          </li>
        </ul>

        <button 
          className="mobile-menu-btn"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <a 
          href="#" 
          className="mobile-nav-link"
          onClick={(e) => handleNavClick('home', e)}
        >
          Home
        </a>
        <a 
          href="#" 
          className="mobile-nav-link"
          onClick={(e) => handleNavClick('about', e)}
        >
          About Us
        </a>
        <a 
          href="#" 
          className="mobile-nav-link"
          onClick={(e) => handleNavClick('get-started', e)}
        >
          Get Started
        </a>
      </div>
    </nav>
  );
};

export default Navbar;