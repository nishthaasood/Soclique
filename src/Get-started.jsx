import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, Users, Crown, GraduationCap, Plus, ArrowLeft, X, Send, ChevronRight, ChevronLeft, Check, Building2, User } from 'lucide-react';
import './Get-started.css';
import AIChat from './AIChat';
import UserProfile from './User-profile.jsx';

const GetStarted = ({ setCurrentPage, setSelectedCollege, onLogin, setIsLoggedIn }) => {
  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showLanding, setShowLanding] = useState(true);
  const [selectedCollegeLocal, setSelectedCollegeLocal] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1,
      type: 'ai', 
      text: 'Hi! I\'m your Soclique assistant. I can help you choose the right option or answer any questions about our platform!',
      timestamp: Date.now()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Profile state
  const [userProfile, setUserProfile] = useState({});
  const [showProfilePage, setShowProfilePage] = useState(false);
  
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const [societyFormData, setSocietyFormData] = useState({
    societyName: '',
    category: '',
    collegeEmail: '',
    proposedEmail: '',
    description: '',
    facultyMentor: ''
  });
  const [societyFormErrors, setSocietyFormErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Refs
  const modalRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const chatInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messageIdCounter = useRef(2);

  // Constants
  const colleges = useMemo(() => [
    { value: '', label: 'Select your college' },
    { value: 'mait', label: 'Maharaja Agrasen Institute of Technology (MAIT)' },
    { value: 'bpit', label: 'Bhagwan Parshuram Institute of Technology (BPIT)' },
    { value: 'vips', label: 'Vivekanand Institute of Professional Studies (VIPS)' },
    { value: 'bvcoe', label: 'Bhartiya Vidyapeeth College of Engineering (BVCOE)' },
    { value: 'msit', label: 'Maharaja Surajmal Institute of Technology (MSIT)' },
    { value: 'adgips', label:'Akhilesh Das Gupta Institute of Professional Studies (ADGIPS)' }
  ], []);

  const societyCategories = useMemo(() => [
    { value: '', label: 'Select category' },
    { value: 'technical', label: 'Technical' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'literary', label: 'Literary' },
    { value: 'sports', label: 'Sports' },
    { value: 'social', label: 'Social' },
    { value: 'others', label: 'Others' }
  ], []);

  const cardConfigs = useMemo(() => [
    {
      type: 'explorer',
      icon: Search,
      title: 'Visit as an Explorer',
      description: 'Explore the platform and its features without registration.',
      color: '#271e4dff'
    },
    {
      type: 'member',
      icon: Users,
      title: 'Visit as Society Member',
      description: 'Stay updated with your society\'s events and announcements.',
      color: '#140f2bff'
    },
    {
      type: 'head',
      icon: Crown,
      title: 'Visit as a Society Head',
      description: 'Manage your society, create events, and share highlights.',
      color: '#FFD700'
    }
  ], []);

  const stepTitles = useMemo(() => ({
    1: 'Society Name',
    2: 'Category Selection',
    3: 'College Email',
    4: 'Society Email',
    5: 'Description & Mentor',
    6: 'Review & Submit'
  }), []);

  // College selection handler
  const handleCollegeSelect = useCallback(() => {
    console.log('Continue button clicked');
    console.log('Selected college value:', selectedCollegeLocal);
    
    if (!selectedCollegeLocal || selectedCollegeLocal === '') {
      console.warn('No college selected');
      alert('Please select a college before continuing.');
      return;
    }
    
    try {
      if (setSelectedCollege && typeof setSelectedCollege === 'function') {
        console.log('Calling setSelectedCollege with:', selectedCollegeLocal);
        setSelectedCollege(selectedCollegeLocal);
      } else {
        console.warn('setSelectedCollege prop not provided or not a function');
      }
      
      console.log('Navigating to main page');
      setShowLanding(false);
      
    } catch (error) {
      console.error('Error in handleCollegeSelect:', error);
      setShowLanding(false);
    }
  }, [selectedCollegeLocal, setSelectedCollege]);

  // Society form validation
  const validateSocietyStep = useCallback((step, data) => {
    const errors = {};
    
    switch (step) {
      case 1:
        if (!data.societyName?.trim()) {
          errors.societyName = 'Society name is required';
        } else if (data.societyName.trim().length < 3) {
          errors.societyName = 'Society name must be at least 3 characters';
        }
        break;
      case 2:
        if (!data.category) {
          errors.category = 'Please select a category';
        }
        break;
      case 3:
        if (!data.collegeEmail?.trim()) {
          errors.collegeEmail = 'College email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.collegeEmail)) {
          errors.collegeEmail = 'Please enter a valid email address';
        }
        break;
      case 4:
        if (!data.proposedEmail?.trim()) {
          errors.proposedEmail = 'Proposed society email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.proposedEmail)) {
          errors.proposedEmail = 'Please enter a valid email address';
        }
        break;
      case 5:
        if (!data.description?.trim()) {
          errors.description = 'Society description is required';
        } else if (data.description.trim().length < 50) {
          errors.description = 'Description must be at least 50 characters';
        }
        break;
    }
    
    return errors;
  }, []);

  // Regular form validation
  const validateForm = useCallback((type, data) => {
    const errors = {};
    
    if (type === 'member' || type === 'head') {
      if (!data.email?.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!data.password?.trim()) {
        errors.password = 'Password is required';
      }
    }
    
    return errors;
  }, []);

  // Society form handlers
  const handleSocietyFormChange = useCallback((field, value) => {
    setSocietyFormData(prev => ({ ...prev, [field]: value }));
    if (societyFormErrors[field]) {
      setSocietyFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [societyFormErrors]);

  const handleNextStep = useCallback(() => {
    const errors = validateSocietyStep(currentStep, societyFormData);
    
    if (Object.keys(errors).length > 0) {
      setSocietyFormErrors(errors);
      return;
    }
    
    setSocietyFormErrors({});
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, societyFormData, validateSocietyStep]);

  const handlePrevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setSocietyFormErrors({});
    }
  }, [currentStep]);

  const handleSocietySubmit = useCallback(async () => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowConfirmation(true);
    } catch (error) {
      console.error('Society submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Form handlers
  const handleFormChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [formErrors]);

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    const errors = validateForm(modalType, formData);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set login state with form data
      const loginData = {
        name: formData.name || formData.email?.split('@')[0] || 'User',
        email: formData.email,
        college: selectedCollegeLocal,
        role: modalType === 'head' ? 'Society Head' : modalType === 'member' ? 'Society Member' : 'Explorer'
      };
      
      // Call onLogin to set login state in App
      if (onLogin) {
        onLogin(loginData);
      }
      
      // Set logged in state
      if (setIsLoggedIn) {
        setIsLoggedIn(true);
      }
      
      closeModal();
      setTimeout(() => {
        setShowProfilePage(true);
      }, 500);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [modalType, formData, validateForm, onLogin, setIsLoggedIn, selectedCollegeLocal]);

  // Modal handlers
  const openModal = useCallback((type) => {
    setModalType(type);
    setIsModalOpen(true);
    setFormData({});
    setFormErrors({});
    setCurrentStep(1);
    setSocietyFormData({
      societyName: '',
      category: '',
      collegeEmail: '',
      proposedEmail: '',
      description: '',
      facultyMentor: ''
    });
    setSocietyFormErrors({});
    setShowConfirmation(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setFormData({});
    setFormErrors({});
    setIsSubmitting(false);
    setCurrentStep(1);
    setSocietyFormData({
      societyName: '',
      category: '',
      collegeEmail: '',
      proposedEmail: '',
      description: '',
      facultyMentor: ''
    });
    setSocietyFormErrors({});
    setShowConfirmation(false);
  }, []);

  // Navigation handler
  const handleNavigation = useCallback((userType) => {
    const navigationMap = {
      explorer: 'explorer',
      member: 'societyMember',
      head: 'societyHead'
    };

    const page = navigationMap[userType];
    if (page) {
      setCurrentPage?.(page);
    }
    closeModal();
  }, [setCurrentPage, closeModal]);

  // Profile handlers
  const handleProfileSetupComplete = useCallback(() => {
    setShowProfilePage(false);
    if (modalType === 'member') {
      setCurrentPage?.('societyMember');
    } else if (modalType === 'head') {
      setCurrentPage?.('societyHead');
    } else if (modalType === 'explorer') {
      setCurrentPage?.('explorer');
    }
  }, [modalType, setCurrentPage]);

  // Outside click handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
        setChatOpen(false);
      }
    };

    if (chatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chatOpen]);

  // Auto-scroll chat messages
  useEffect(() => {
    if (chatMessagesRef.current) {
      const scrollElement = chatMessagesRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, closeModal]);

  // Get selected college name
  const selectedCollegeName = useMemo(() => {
    return colleges.find(c => c.value === selectedCollegeLocal)?.label.split('(')[0].trim();
  }, [colleges, selectedCollegeLocal]);

  // If showing profile page, render UserProfile component
  if (showProfilePage) {
    return (
      <UserProfile 
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        onSetupComplete={handleProfileSetupComplete}
        onBackToMain={() => {
          setShowProfilePage(false);
          handleProfileSetupComplete();
        }}
      />
    );
  }

  // Render society creation steps
  const renderSocietyCreationStep = () => {
    if (showConfirmation) {
      return (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            backgroundColor: '#4CAF50', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 24px',
            color: 'white'
          }}>
            <Check size={40} />
          </div>
          
          <h3 style={{ color: '#2E7D32', marginBottom: '16px', fontSize: '1.5rem' }}>
            Society Submitted Successfully!
          </h3>
          
          <p style={{ marginBottom: '24px', lineHeight: '1.6', color: '#666' }}>
            <strong>Society "{societyFormData.societyName}"</strong> has been submitted for approval. 
            You will be notified via your college email ({societyFormData.collegeEmail}) once reviewed.
          </p>
          
          <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '32px' }}>
            Approval usually takes 1-2 business days.
          </p>
          
          <button
            onClick={closeModal}
            className="button"
            style={{ maxWidth: '200px' }}
          >
            Got it!
          </button>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div>
            <div className="form-group">
              <label htmlFor="society-name" style={{ display: 'block', color: 'blue' , marginBottom: '8px', fontWeight: '500' }}>
                What's your society name?
              </label>
              <input
                id="society-name"
                type="text"
                placeholder="e.g., Tech Innovators Club"
                className={`form-input ${societyFormErrors.societyName ? 'error' : ''}`}
                value={societyFormData.societyName}
                onChange={(e) => handleSocietyFormChange('societyName', e.target.value)}
                autoFocus
              />
              {societyFormErrors.societyName && (
                <span className="error-message">{societyFormErrors.societyName}</span>
              )}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <div className="form-group">
              <label htmlFor="society-category" style={{ display: 'block', color: 'blue', marginBottom: '8px', fontWeight: '500' }}>
                Select society category
              </label>
              <select
                id="society-category"
                className={`form-input ${societyFormErrors.category ? 'error' : ''}`}
                value={societyFormData.category}
                onChange={(e) => handleSocietyFormChange('category', e.target.value)}
                style={{
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  backgroundSize: '20px',
                  paddingRight: '48px'
                }}
              >
                {societyCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {societyFormErrors.category && (
                <span className="error-message">{societyFormErrors.category}</span>
              )}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
            <div className="form-group">
              <label htmlFor="college-email" style={{ display: 'block', color: 'blue', marginBottom: '8px', fontWeight: '500' }}>
                Your college email address
              </label>
              <input
                id="college-email"
                type="email"
                placeholder="your.name@college.edu"
                className={`form-input ${societyFormErrors.collegeEmail ? 'error' : ''}`}
                value={societyFormData.collegeEmail}
                onChange={(e) => handleSocietyFormChange('collegeEmail', e.target.value)}
              />
              {societyFormErrors.collegeEmail && (
                <span className="error-message">{societyFormErrors.collegeEmail}</span>
              )}
              <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '8px' }}>
                We'll use this to verify your college affiliation
              </p>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <div className="form-group">
              <label htmlFor="proposed-email" style={{ display: 'block', color: 'blue', marginBottom: '8px', fontWeight: '500' }}>
                Proposed society email
              </label>
              <input
                id="proposed-email"
                type="email"
                placeholder="societyname@college.edu"
                className={`form-input ${societyFormErrors.proposedEmail ? 'error' : ''}`}
                value={societyFormData.proposedEmail}
                onChange={(e) => handleSocietyFormChange('proposedEmail', e.target.value)}
              />
              {societyFormErrors.proposedEmail && (
                <span className="error-message">{societyFormErrors.proposedEmail}</span>
              )}
              <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '8px' }}>
                This will be your society's official email address
              </p>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div>
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label htmlFor="society-description" style={{ display: 'block', color: 'blue', marginBottom: '8px', fontWeight: '500' }}>
                Society description
              </label>
              <textarea
                id="society-description"
                placeholder="Describe your society's mission, goals, and activities..."
                className={`form-input ${societyFormErrors.description ? 'error' : ''}`}
                value={societyFormData.description}
                onChange={(e) => handleSocietyFormChange('description', e.target.value)}
                rows="4"
                style={{ resize: 'vertical' }}
              />
              {societyFormErrors.description && (
                <span className="error-message">{societyFormErrors.description}</span>
              )}
              <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '8px' }}>
                Minimum 50 characters required
              </p>
            </div>
            
            <div className="form-group">
              <label htmlFor="faculty-mentor" style={{ display: 'block', color: 'blue', marginBottom: '8px', fontWeight: '500' }}>
                Faculty mentor (optional)
              </label>
              <input
                id="faculty-mentor"
                type="text"
                placeholder="Dr. Faculty Name"
                className="form-input"
                value={societyFormData.facultyMentor}
                onChange={(e) => handleSocietyFormChange('facultyMentor', e.target.value)}
              />
              <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '8px' }}>
                Having a faculty mentor strengthens your application
              </p>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div>
            <h3 style={{ color: '#0a1931', marginBottom: '24px', fontSize: '1.2rem' }}>
              Review Your Society Details
            </h3>
            
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#0a1931' }}>Society Name:</strong>
                <p style={{ margin: '4px 0 0 0', color: '#333' }}>{societyFormData.societyName}</p>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#0a1931' }}>Category:</strong>
                <p style={{ margin: '4px 0 0 0', color: '#333' }}>
                  {societyCategories.find(c => c.value === societyFormData.category)?.label || societyFormData.category}
                </p>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#0a1931' }}>Your Email:</strong>
                <p style={{ margin: '4px 0 0 0', color: '#333' }}>{societyFormData.collegeEmail}</p>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#0a1931' }}>Society Email:</strong>
                <p style={{ margin: '4px 0 0 0', color: '#333' }}>{societyFormData.proposedEmail}</p>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#0a1931' }}>Description:</strong>
                <p style={{ margin: '4px 0 0 0', color: '#333', lineHeight: '1.5' }}>{societyFormData.description}</p>
              </div>
              
              {societyFormData.facultyMentor && (
                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ color: '#0a1931' }}>Faculty Mentor:</strong>
                  <p style={{ margin: '4px 0 0 0', color: '#333' }}>{societyFormData.facultyMentor}</p>
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={handlePrevStep}
                className="button"
                style={{ 
                  backgroundColor: '#f5f5f5', 
                  color: '#333',
                  border: '1px solid #ddd'
                }}
              >
                <ChevronLeft size={16} /> Edit Details
              </button>
              <button
                type="button"
                onClick={handleSocietySubmit}
                className="button"
                disabled={isSubmitting}
                style={{ 
                  background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                  minWidth: '150px'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Society'}
              </button>
            </div>
          </div>
        );
      
      default:
        return <div>Step {currentStep} content</div>;
    }
  };

  // Render regular form fields
  const renderFormFields = () => {
    switch (modalType) {
      case 'explorer':
        return (
          <div>
            <p style={{ marginBottom: '24px', color: '#666', textAlign: 'center', lineHeight: '1.5' }}>
              Continue exploring without registration, or set up a profile for personalized recommendations.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
              <button
                onClick={() => {
                  closeModal();
                  setTimeout(() => {
                    setShowProfilePage(true);
                  }, 500);
                }}
                type="button"
                className="button"
                style={{ background: 'linear-gradient(135deg, #4a7fa7 0%, #1a3d63 100%)' }}
              >
                Set Up Profile First
              </button>
              <button
                onClick={() => handleNavigation('explorer')}
                type="button"
                className="button"
                style={{ 
                  background: 'transparent',
                  border: '2px solid #4a7fa7',
                  color: '#4a7fa7'
                }}
              >
                Continue Without Profile
              </button>
            </div>
          </div>
        );

      case 'createSociety':
        return renderSocietyCreationStep();

      default: // member or head
        return (
          <>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                className={`form-input ${formErrors.email ? 'error' : ''}`}
                value={formData.email || ''}
                onChange={(e) => handleFormChange('email', e.target.value)}
                required
              />
              {formErrors.email && (
                <span className="error-message">{formErrors.email}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className={`form-input ${formErrors.password ? 'error' : ''}`}
                value={formData.password || ''}
                onChange={(e) => handleFormChange('password', e.target.value)}
                required
              />
              {formErrors.password && (
                <span className="error-message">{formErrors.password}</span>
              )}
            </div>

            {modalType === 'member' && (
              <input
                type="text"
                placeholder="Society Name (Optional)"
                className="form-input"
                value={formData.societyName || ''}
                onChange={(e) => handleFormChange('societyName', e.target.value)}
              />
            )}

            <button
              type="submit"
              className="button"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? 'Processing...' 
                : modalType === 'member' 
                  ? 'Find Your Society' 
                  : 'Access Dashboard'
              }
            </button>

            {modalType === 'member' && (
              <div className="auth-links">
                <button
                  type="button"
                  className="auth-link"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Forgot password clicked');
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="main-content">
          {showLanding ? (
            //College Selection
            <div role="main" aria-labelledby="main-heading">
              <h1 id="main-heading" className="main-heading">Welcome to Soclique</h1>
              
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
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '32px',
                  padding: '40px'
                }}>
                  <div className="card-icon" aria-hidden="true">
                    <GraduationCap size={64} strokeWidth={1.5} />
                  </div>
                  
                  <h2 className="card-title">Choose Your College</h2>
                  
                  <p className="card-text" style={{ 
                    marginBottom: '24px', 
                    textAlign: 'center',
                    lineHeight: '1.6' 
                  }}>
                    Select your college to connect with your campus community and explore societies
                  </p>
                  
                  <div style={{ width: '100%', maxWidth: '400px' }}>
                    <div className="form-group" style={{ marginBottom: '24px' }}>
                      <label htmlFor="college-select" className="sr-only">
                        Select your college
                      </label>
                      <select 
                        id="college-select"
                        value={selectedCollegeLocal}
                        onChange={(e) => setSelectedCollegeLocal(e.target.value)}
                        className="form-input"
                        style={{
                          width: '100%',
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
                    </div>

                    <button
                      type="button"
                      onClick={handleCollegeSelect}
                      disabled={!selectedCollegeLocal || selectedCollegeLocal === ''}
                      className="button"
                      style={{
                        width: '100%',
                        minHeight: '48px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        borderRadius: '12px',
                        background: (!selectedCollegeLocal || selectedCollegeLocal === '') 
                          ? '#e0e0e0' 
                          : 'linear-gradient(135deg, #667eea 0%, #41416fff 100%)',
                        color: (!selectedCollegeLocal || selectedCollegeLocal === '') 
                          ? '#999' 
                          : 'white',
                        border: 'none',
                        cursor: (!selectedCollegeLocal || selectedCollegeLocal === '') 
                          ? 'not-allowed' 
                          : 'pointer',
                        transition: 'all 0.3s ease',
                        transform: 'translateY(0)',
                        boxShadow: (!selectedCollegeLocal || selectedCollegeLocal === '') 
                          ? 'none' 
                          : '0 4px 15px rgba(102, 126, 234, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        outline: 'none',
                        position: 'relative'
                      }}
                    >
                      <span>Continue to Platform</span>
                      {selectedCollegeLocal && selectedCollegeLocal !== '' && (
                        <ChevronRight size={20} />
                      )}
                    </button>
                    
                    {!selectedCollegeLocal || selectedCollegeLocal === '' ? (
                      <p id="college-requirement" style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        textAlign: 'center',
                        marginTop: '12px',
                        lineHeight: '1.4'
                      }}>
                        Please select your college from the dropdown above
                      </p>
                    ) : (
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#4CAF50',
                        textAlign: 'center',
                        marginTop: '12px',
                        lineHeight: '1.4',
                        fontWeight: '500'
                      }}>
                        Ready to explore {colleges.find(c => c.value === selectedCollegeLocal)?.label.split('(')[0].trim()}!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Main User Type Selection Page
            <div role="main" aria-labelledby="college-heading">
              {/* Create Society button*/}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                marginBottom: '32px',
                padding: '0 24px'
              }}>
                <button
                  onClick={() => openModal('createSociety')}
                  className="create-society-btn"
                  style={{
                    background: 'linear-gradient(135deg, #363e64ff 0%, #2d2d49ff 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    font: 'inherit',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease',
                    transform: 'translateY(0)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                  }}
                  aria-label="Create a new society"
                >
                  <Building2 size={24} strokeWidth={2} aria-hidden="true" />
                  <span>Create a Society</span>
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
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <button
                    onClick={() => setShowLanding(true)}
                    className="back-button"
                    aria-label="Go back to college selection"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '8px',
                      transition: 'var(--transition-quick)',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <h1 id="college-heading" className="main-heading" style={{ 
                    marginBottom: '0',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
                  }}>
                    {selectedCollegeName}
                  </h1>
                </div>
              </div>
              
              <div className="card-container" role="list" aria-label="User type options">
                {cardConfigs.map((config) => {
                  const IconComponent = config.icon;
                  return (
                    <div 
                      key={config.type}
                      onClick={() => openModal(config.type)} 
                      className="card"
                      role="listitem"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openModal(config.type);
                        }
                      }}
                      aria-label={`${config.title}. ${config.description}`}
                    >
                      <div className="card-icon" style={{ color: config.color }} aria-hidden="true">
                        <IconComponent size={48} strokeWidth={1.5} />
                      </div>
                      <h2 className="card-title">{config.title}</h2>
                      <p className="card-text">{config.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Multi-Step Society Creation Modal */}
        {isModalOpen && (
          <div 
            className="modal-backdrop" 
            role="dialog" 
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div ref={modalRef} className="modal-content" style={{ 
              maxWidth: modalType === 'createSociety' ? '600px' : '400px',
              minHeight: modalType === 'createSociety' ? '500px' : 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                {modalType === 'createSociety' && !showConfirmation && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ 
                      background: '#8f95afff', 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: '32px', 
                      height: '32px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      {currentStep}
                    </span>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Step {currentStep} of 6</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{stepTitles[currentStep]}</div>
                    </div>
                  </div>
                )}
                <button
                  onClick={closeModal}
                  className="modal-close-button"
                  aria-label="Close modal"
                  style={{ marginLeft: 'auto' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Progress bar for society creation */}
              {modalType === 'createSociety' && !showConfirmation && (
                <div style={{ 
                  width: '100%', 
                  height: '4px', 
                  backgroundColor: '#e0e0e0', 
                  borderRadius: '2px', 
                  marginBottom: '32px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${(currentStep / 6) * 100}%`, 
                    height: '100%', 
                    backgroundColor: '#6a75a8ff',
                    transition: 'width 0.3s ease',
                    borderRadius: '2px'
                  }} />
                </div>
              )}

              <h2 id="modal-title" className="modal-title">
                {modalType === 'explorer' && 'Continue as Explorer'}
                {modalType === 'member' && 'Society Member Login'}
                {modalType === 'head' && 'Society Head Dashboard'}
                {modalType === 'createSociety' && (showConfirmation ? 'Success!' : 'Create New Society')}
              </h2>

              <form 
                className="modal-form" 
                onSubmit={modalType === 'createSociety' ? (e) => e.preventDefault() : handleFormSubmit}
                noValidate
              >
                {renderFormFields()}
                
                {/* Navigation buttons for society creation */}
                {modalType === 'createSociety' && !showConfirmation && currentStep !== 6 && (
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', marginTop: '32px' }}>
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={currentStep === 1}
                      className="button"
                      style={{ 
                        backgroundColor: currentStep === 1 ? '#f5f5f5' : '#f5f5f5', 
                        color: currentStep === 1 ? '#090808ff' : '#000000ff',
                        border: '1px solid #ddd',
                        minWidth: '100px'
                      }}
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="button"
                      style={{ minWidth: '100px' }}
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
        
        <AIChat />
      </div>
    </>
  );
};

export default GetStarted;