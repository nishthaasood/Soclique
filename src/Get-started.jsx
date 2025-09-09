import React, { useState, useEffect, useRef } from 'react';
import './Get-started.css';

// GetStarted component (not App)
const GetStarted = ({ setCurrentPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const modalRef = useRef(null);

  // Function to open the modal and set its type
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // Function to handle explorer navigation
  const handleExplorerNavigation = () => {
    setIsModalOpen(false);
    setCurrentPage('explorer'); // Navigate to explorer page
  };

  // Effect to handle clicks outside the modal to close it
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
        <h1 className="main-heading">Welcome to Socique</h1>
        <div className="card-container">
          {/* Explorer Card */}
          <div
            onClick={() => openModal('explorer')}
            className="card"
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <svg className="card-icon blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              <h2 className="card-title">Visit as an Explorer</h2>
              <p className="card-text">
                Explore the platform and its features.
              </p>
            </div>
          </div>

          {/* Society Member Card */}
          <div
            onClick={() => openModal('member')}
            className="card"
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <svg className="card-icon emerald" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <h2 className="card-title">Visit as a Society Member</h2>
              <p className="card-text">
                Join the community and connect with others.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Login/Signup Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div
            ref={modalRef}
            className="modal-content"
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsModalOpen(false)}
                className="modal-close-button"
                aria-label="Close modal"
              >
                <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6" style={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', color: '#1f2937', marginBottom: '1.5rem' }}>
              {modalType === 'explorer' ? 'Continue as Explorer' : 'Log In to Society'}
            </h2>
            <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
              {modalType === 'explorer' ? (
                <button
                  onClick={handleExplorerNavigation}
                  type="button"
                  className="button"
                >
                  Explore Societies
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Society Name"
                    className="form-input"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                  />
                  <button
                    type="submit"
                    className="button"
                  >
                    Log In to Society
                  </button>
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