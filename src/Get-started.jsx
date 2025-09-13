import React, { useState, useEffect, useRef } from 'react';
import { Search, Users, Crown, GraduationCap, Plus } from 'lucide-react';
import './Get-started.css';

const GetStarted = ({ setCurrentPage, setSelectedCollege }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showLanding, setShowLanding] = useState(true);
  const [selectedCollegeLocal, setSelectedCollegeLocal] = useState('');
  const modalRef = useRef(null);

  const colleges = [
    { value: '', label: 'Select your college' },
    { value: 'mait', label: 'Maharaja Agrasen Institute of Technology (MAIT)' },
    { value: 'bpit', label: 'Bhagwan Parshuram Institute of Technology (BPIT)' },
    { value: 'vips', label: 'Vivekanand Institute of Professional Studies (VIPS)' },
    { value: 'bvcoe', label: 'Bhartiya Vidyapeeth College of Engineering (BVCOE)' },
    { value: 'msit', label: 'Maharaja Surajmal Institute of Technology (MSIT)' },
    { value: 'adgips', label: 'Akhilesh Das Gupta Institute of Professional Studies (ADGIPS)' }
  ];

  // Handle college selection and proceed
  const handleCollegeSelect = () => {
    if (selectedCollegeLocal) {
      // Pass the selected college to the parent component
      setSelectedCollege && setSelectedCollege(selectedCollegeLocal);
      setShowLanding(false);
    }
  };

  // Open modal
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // Navigation handler
  const handleNavigation = (userType) => {
    // Pass the selected college when navigating
    switch (userType) {
      case 'explorer':
        setCurrentPage('explorer');
        break;
      case 'member':
        setCurrentPage('societyMember');
        break;
      case 'head':
        // Navigate to Society Head dashboard with college info
        setCurrentPage('societyHead');
        break;
      case 'addSociety':
        // Navigate to Add Society page
        setCurrentPage('addSociety');
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
        {showLanding ? (
          // Landing Page - College Selection
          <>
            <h1 className="main-heading">Welcome to Soclique</h1>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '32px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <div className="card" style={{ 
                maxWidth: '500px', 
                width: '100%',
                minHeight: '350px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '32px'
              }}>
                <div className="card-icon">
                  <GraduationCap size={64} strokeWidth={1.5} />
                </div>
                <h2 className="card-title">Choose Your College</h2>
                <p className="card-text" style={{ marginBottom: '24px' }}>
                  Select your college to connect with your campus community
                </p>
                
                <select 
                  value={selectedCollegeLocal}
                  onChange={(e) => setSelectedCollegeLocal(e.target.value)}
                  className="form-input"
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234a6b35' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '20px',
                    paddingRight: '48px'
                  }}
                >
                  {colleges.map((college) => (
                    <option key={college.value} value={college.value}>
                      {college.label}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleCollegeSelect}
                  disabled={!selectedCollegeLocal}
                  className="button"
                  style={{
                    maxWidth: '400px',
                    width: '100%'
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : (
          // Main User Type Selection Page
          <>
            {/* Add Society button - positioned at top */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              marginBottom: '16px',
              padding: '0 24px'
            }}>
              <button
                onClick={() => openModal('addSociety')}
                className="add-society-btn"
              >
                <Plus size={20} strokeWidth={2} />
                <span>Add Society</span>
              </button>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              marginBottom: '32px',
              padding: '0 24px'
            }}>
              {/* Back button and college name */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <button
                  onClick={() => setShowLanding(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '8px',
                    transition: 'var(--transition-quick)',
                    fontSize: '24px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--text-primary)';
                    e.target.style.backgroundColor = 'var(--cream)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--text-muted)';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  ← 
                </button>
                <h1 className="main-heading" style={{ 
                  marginBottom: '0',
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
                }}>
                  {colleges.find(c => c.value === selectedCollegeLocal)?.label.split('(')[0].trim()}
                </h1>
              </div>
            </div>
            
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
          </>
        )}
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
                : modalType === 'head'
                ? 'Society Head Dashboard'
                : 'Add New Society'}
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
              ) : modalType === 'addSociety' ? (
                <>
                  <input
                    type="text"
                    placeholder="Society Name"
                    className="form-input"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    className="form-input"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Create Password"
                    className="form-input"
                    required
                  />
                  <textarea
                    placeholder="Society Description"
                    className="form-input"
                    rows="3"
                    style={{ resize: 'vertical', minHeight: '80px' }}
                  />
                  <button
                    onClick={() => handleNavigation('addSociety')}
                    type="button"
                    className="button"
                  >
                    Create Society
                  </button>
                </>
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
                      : 'Access Dashboard'}
                  </button>
                  
                  {/* Auth links - only forgot password for member login */}
                  {modalType === 'member' && (
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
                    </div>
                  )}
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