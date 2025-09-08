import React, { useState, useEffect, useRef } from 'react';

// Main App component
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const modalRef = useRef(null);

  // Function to open the modal and set its type
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
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
    <>
      <style>
        {`
          /* Overall Page Styling */
          .page-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 1rem;
            font-family: Georgia, serif;
            background-color: rgb(244, 231, 167);
          }

          /* Main Content Styling */
          .main-content {
            text-align: center;
          }

          /* Heading Styling */
          .main-heading {
            font-size: 2.25rem;
            font-weight: 800;
            color: #111827;
            margin-bottom: 2.5rem;
          }
          @media (min-width: 768px) {
            .main-heading {
              font-size: 3rem;
            }
          }

          /* Cards Container Styling */
          .card-container {
            display: flex;
            flex-direction: row;
            gap: 1.5rem;
            justify-content: center;
            align-items: stretch; /* This ensures cards have the same height */
          }

          /* Individual Card Styling */
          .card {
            cursor: pointer;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
            transition-property: all;
            transition-duration: 300ms;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateY(0);
            background-color: rgb(248, 239, 216);
            border: 1px solid #e5e7eb;
            flex: 1; /* This makes the cards take up equal space */
            max-width: 20rem; /* Prevents cards from getting too wide on large screens */
          }
          .card:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            transform: translateY(-0.5rem);
          }

          /* Card Icon Styling */
          .card-icon {
            width: 4rem;
            height: 4rem;
            margin-bottom: 1rem;
            transition-property: transform;
            transition-duration: 300ms;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          .card:hover .card-icon {
            transform: scale(1.1);
          }

          .card-icon.blue {
            color: #2563eb;
          }

          .card-icon.emerald {
            color: #10b981;
          }

          /* Card Text Styling */
          .card-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 0.5rem;
          }

          .card-text {
            color: #6b7280;
            font-size: 0.875rem;
            text-align: center;
          }

          /* Modal Backdrop */
          .modal-backdrop {
            position: fixed;
            inset: 0;
            z-index: 50;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            padding: 1rem;
          }

          /* Modal Content */
          .modal-content {
            background-color: #fff;
            border-radius: 1rem;
            padding: 2rem;
            width: 100%;
            max-width: 24rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            transform: scale(1);
            opacity: 1;
            transition-property: all;
            transition-duration: 300ms;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Modal Close Button */
          .modal-close-button {
            color: #9ca3af;
            transition-property: color;
            transition-duration: 150ms;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          .modal-close-button:hover {
            color: #4b5563;
          }

          /* Modal Form */
          .modal-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          
          /* Modal Input Fields */
          .form-input {
            width: 100%;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            border: 1px solid #d1d5db;
            outline: none;
            transition-property: all;
            transition-duration: 150ms;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          .form-input:focus {
            box-shadow: 0 0 0 2px #3b82f6;
          }

          /* Button Styling */
          .button {
            width: 100%;
            background-color: #2563eb;
            color: #fff;
            font-weight: 700;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            transition-property: background-color;
            transition-duration: 150ms;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          }
          .button:hover {
            background-color: #1d4ed8;
          }
        `}
      </style>

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
              <form className="modal-form">
                {modalType === 'explorer' ? (
                  <button
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
    </>
  );
};

export default App;
