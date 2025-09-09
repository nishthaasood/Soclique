import React, { useState, useEffect, useRef } from 'react';
import { Search, Users, Crown } from 'lucide-react';
import './Get-started.css';

const GetStarted = ({ setCurrentPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const modalRef = useRef(null);

  // Open modal
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // Navigation handler
  const handleNavigation = (userType) => {
    switch (userType) {
      case 'explorer':
        setCurrentPage('explorer');
        break;
      case 'member':
        setCurrentPage('societies');
        break;
      case 'head':
        setCurrentPage('dashboard');
        break;
      default:
        break;
    }
    setIsModalOpen(false);
  };

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="page-container">
      <div className="main-content">
        <h1 className="main-heading">Enter as...</h1>

        <div className="card-container">
          {/* Explorer Card */}
          <div onClick={() => openModal('explorer')} className="card">
            <div className="card-icon">
              <Search size={48} strokeWidth={1.5} />
            </div>
            <h2 className="card-title">Visit as an Explorer</h2>
            <p className="card-text">Explore the platform and its features.</p>
          </div>

          {/* Society Member Card */}
          <div onClick={() => openModal('member')} className="card">
            <div className="card-icon">
              <Users size={48} strokeWidth={1.5} />
            </div>
            <h2 className="card-title">Visit as a Society Member</h2>
            <p className="card-text">Stay updated with your society's events and announcements.</p>
          </div>

          {/* Society Head Card */}
          <div onClick={() => openModal('head')} className="card">
            <div className="card-icon">
              <Crown size={48} strokeWidth={1.5} />
            </div>
            <h2 className="card-title">Visit as a Society Head</h2>
            <p className="card-text">Manage your society, create events, and share highlights.</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div ref={modalRef} className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsModalOpen(false)}
                className="modal-close-button"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <h2 className="modal-title">
              {modalType === 'explorer'
                ? 'Continue as Explorer'
                : modalType === 'member'
                ? 'Society Member Login'
                : 'Society Head Dashboard'}
            </h2>

            <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
              {modalType === 'explorer' ? (
                <button
                  onClick={() => handleNavigation('explorer')}
                  type="button"
                  className="button"
                >
                  Explore Societies
                </button>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="form-input"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    required
                  />

                  {modalType === 'member' && (
                    <input
                      type="text"
                      placeholder="Society Name (Optional)"
                      className="form-input"
                    />
                  )}

                  <button
                    onClick={() => handleNavigation(modalType)}
                    type="button"
                    className="button"
                  >
                    {modalType === 'member'
                      ? 'Find Your Society'
                      : 'Login to Dashboard'}
                  </button>
                  {/* Auth links */}
                  <div className="auth-links">
                    <a
                      href="#"
                      className="auth-link"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle forgot password logic
                        console.log('Forgot password clicked');
                      }}
                    >
                      Forgot password?
                    </a>
                    <span className="auth-separator">•</span>
                    <a
                      href="#"
                      className="auth-link"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle create account logic
                        console.log('Create account clicked');
                      }}
                    >
                      Create account
                    </a>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetStarted;