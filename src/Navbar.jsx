import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import './App.css'; // Import the updated CSS

const Navbar = ({ setCurrentPage, currentPage, isLoggedIn, userProfile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Debug logging to track props
  useEffect(() => {
    console.log('Navbar props - isLoggedIn:', isLoggedIn, 'userProfile:', userProfile);
  }, [isLoggedIn, userProfile]);

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
          {/* Profile button - visible when logged in */}
          {isLoggedIn && userProfile && (
            <li>
              <a 
                href="#" 
                className={`nav-link profile-link ${currentPage === 'profile' ? 'active' : ''}`}
                onClick={(e) => handleNavClick('profile', e)}
                title="Your Profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: currentPage === 'profile' 
                    ? 'linear-gradient(135deg, #B8C2A5 0%, #A5B1CC 100%)' 
                    : 'rgba(216, 220, 232, 0.1)',
                  border: currentPage === 'profile' 
                    ? 'none'
                    : '1px solid rgba(216, 220, 232, 0.2)',
                  color: currentPage === 'profile' ? '#0A1125' : '#E8EAF0',
                  fontWeight: currentPage === 'profile' ? '700' : '600'
                }}
              >
                <User size={16} />
                <span className="profile-name">
                  {userProfile?.name?.split(' ')[0] || 'Profile'}
                </span>
              </a>
            </li>
          )}
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
          className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
          onClick={(e) => handleNavClick('home', e)}
        >
          Home
        </a>
        <a 
          href="#" 
          className={`mobile-nav-link ${currentPage === 'about' ? 'active' : ''}`}
          onClick={(e) => handleNavClick('about', e)}
        >
          About Us
        </a>
        <a 
          href="#" 
          className={`mobile-nav-link ${currentPage === 'get-started' ? 'active' : ''}`}
          onClick={(e) => handleNavClick('get-started', e)}
        >
          Get Started
        </a>
        {/* Mobile Profile Link */}
        {isLoggedIn && userProfile && (
          <a 
            href="#" 
            className={`mobile-nav-link profile-mobile ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={(e) => handleNavClick('profile', e)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: currentPage === 'profile' 
                ? 'linear-gradient(135deg, #B8C2A5 0%, #A5B1CC 100%)' 
                : 'transparent',
              color: currentPage === 'profile' ? '#0A1125' : '#E8EAF0',
              fontWeight: currentPage === 'profile' ? '600' : '500'
            }}
          >
            <User size={16} />
            {userProfile?.name?.split(' ')[0] || 'Profile'}
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;