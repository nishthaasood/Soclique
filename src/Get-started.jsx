import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, Users, Crown, GraduationCap, Plus, ArrowLeft, X, Send, ChevronRight, ChevronLeft, Check, Building2 } from 'lucide-react';
import './Get-started.css';

const GetStarted = ({ setCurrentPage, setSelectedCollege }) => {
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
      text: 'Hi! I\'m your Soclique assistant. I can help you choose the right option or answer any questions about our platform! 🎉',
      timestamp: Date.now()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  // Enhanced AI responses
  const getAIResponse = useCallback((message) => {
    const responses = {
      explorer: 'Great choice! 🚀 As an Explorer, you can browse all societies and events without needing to log in. Perfect for discovering amazing opportunities across your college!',
      'society member': 'Awesome! 🎯 Society members get personalized updates, event notifications, and can connect with fellow members. You\'ll need to log in for the full experience.',
      'society head': 'Excellent choice! 👑 Society Heads get powerful management tools - create events, post announcements, manage members, and track engagement analytics!',
      'create society': 'Creating a new society is exciting! 🌟 The process involves 6 simple steps: Society name, category, your college email, proposed society email, description with mentor details, and finally review. It typically takes 2-3 business days for approval!',
      college: `We support ${colleges.length - 1} amazing colleges including MAIT, BPIT, VIPS, BVCOE, MSIT, and ADGIPS! 🏫 More colleges are added regularly. Which one\'s your home campus?`,
      registration: 'Registration is quick and secure! 🔒 Just basic details and college verification. Society members and heads get email verification for extra security.',
      features: '✨ Soclique offers event discovery, society management, member networking, event creation tools, announcement systems, and real-time updates! What interests you most?',
      categories: 'We have 6 main society categories: 💻 Technical, 🎭 Cultural, 📚 Literary, ⚽ Sports, 🤝 Social, and 🌈 Others. Each category has unique features and templates!',
      approval: 'Society approval usually takes 2-3 business days! 📋 Our team reviews the application, verifies college email, and checks for duplicate names. You\'ll get updates via email!',
      help: 'I can help with:\n🎯 Choosing user types\n🏫 College selection\n📝 Society creation process\n✨ Platform features\n🚀 Getting started tips\nWhat would you like to explore?',
      difference: 'Here\'s the breakdown: 🔍 Explorers browse freely, 👥 Society Members get personalized updates, 👑 Society Heads manage everything! Choose what fits your goals!',
      default: 'Great question! 💭 I\'m here to make your Soclique journey smooth. Ask about user types, colleges, society creation, or any features - I\'ve got you covered!'
    };

    const lowercaseMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key)) {
        return response;
      }
    }
    
    return responses.default;
  }, [colleges.length]);

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
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowConfirmation(true);
    } catch (error) {
      console.error('Society submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Enhanced form handlers
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
      handleNavigation(modalType);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [modalType, formData, validateForm]);

  // Chat functionality
  const handleChatToggle = useCallback(() => {
    setChatOpen(prev => {
      if (!prev && chatInputRef.current) {
        setTimeout(() => chatInputRef.current?.focus(), 300);
      }
      return !prev;
    });
  }, []);

  const addMessage = useCallback((type, text) => {
    const newMessage = {
      id: messageIdCounter.current++,
      type,
      text,
      timestamp: Date.now()
    };
    setChatMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const handleSendMessage = useCallback(async () => {
    const message = currentMessage.trim();
    if (!message || isTyping) return;
    
    setCurrentMessage('');
    addMessage('user', message);
    setIsTyping(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
      const aiResponse = getAIResponse(message);
      addMessage('ai', aiResponse);
    } catch (error) {
      addMessage('ai', 'Sorry, I encountered an error. Please try again!');
    } finally {
      setIsTyping(false);
    }
  }, [currentMessage, isTyping, addMessage, getAIResponse]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setCurrentMessage(value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
  }, []);

  // College selection handler
  const handleCollegeSelect = useCallback((e) => {
    e.preventDefault();
    
    console.log('Continue button clicked');
    console.log('Selected college value:', selectedCollegeLocal);
    
    if (!selectedCollegeLocal || selectedCollegeLocal === '') {
      console.warn('No college selected');
      alert('Please select a college before continuing.');
      return;
    }
    
    try {
      // Call setSelectedCollege if it exists and is a function
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
            🎉 Society Submitted Successfully!
          </h3>
          
          <p style={{ marginBottom: '24px', lineHeight: '1.6', color: '#666' }}>
            <strong>Society "{societyFormData.societyName}"</strong> has been submitted for approval. 
            You will be notified via your college email ({societyFormData.collegeEmail}) once reviewed.
          </p>
          
          <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '32px' }}>
            ⏱️ Approval usually takes 1-2 business days.
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
              <label htmlFor="society-category" style={{ display: 'block',color: 'blue' , marginBottom: '16px', fontWeight: '500' }}>
                Choose your society's category.
              </label>
              <select
                id="society-category"
                className={`form-input ${societyFormErrors.category ? 'error' : ''}`}
                value={societyFormData.category}
                onChange={(e) => handleSocietyFormChange('category', e.target.value)}
                style={{
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234a6b35' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  backgroundSize: '20px',
                  paddingRight: '48px'
                }}
              >
                {societyCategories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              {societyFormErrors.category && (
                <span className="error-message">{societyFormErrors.category}</span>
              )}
            </div>
            
            <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#46474970', borderRadius: '8px', fontSize: '0.9rem', color: '#3a5379ff' }}>
               <strong>Quick Guide:</strong><br/>
              • <strong>Technical:</strong> Programming, robotics, AI clubs<br/>
              • <strong>Cultural:</strong> Dance, music, drama societies<br/>
              • <strong>Literary:</strong> Writing, debate, literature clubs<br/>
              • <strong>Sports:</strong> Athletics, games, fitness groups<br/>
              • <strong>Social:</strong> Community service, volunteer work<br/>
              • <strong>Others:</strong> Photography, entrepreneurship, etc.
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <div className="form-group">
              <label htmlFor="college-email" style={{ display: 'block',color: 'blue' , marginBottom: '8px', fontWeight: '500' }}>
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
                This will be used for verification and approval notifications
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <div className="form-group">
              <label htmlFor="proposed-email" style={{ display: 'block', color: 'blue' , marginBottom: '8px', fontWeight: '500' }}>
               Society email
              </label>
              <input
                id="proposed-email"
                type="email"
                placeholder="society.name@gmail.com"
                className={`form-input ${societyFormErrors.proposedEmail ? 'error' : ''}`}
                value={societyFormData.proposedEmail}
                onChange={(e) => handleSocietyFormChange('proposedEmail', e.target.value)}
              />
              {societyFormErrors.proposedEmail && (
                <span className="error-message">{societyFormErrors.proposedEmail}</span>
              )}
              <p style={{ fontSize: '0.85rem', color: '#615f5f80', marginTop: '8px' }}>
                This will be your society's official contact email
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label htmlFor="society-description" style={{ display: 'block',color: 'blue' , marginBottom: '8px', fontWeight: '500' }}>
                Society Description
              </label>
              <textarea
                id="society-description"
                placeholder="Tell us about your society's mission, goals, and planned activities... (minimum 50 characters)"
                className={`form-input ${societyFormErrors.description ? 'error' : ''}`}
                value={societyFormData.description}
                onChange={(e) => handleSocietyFormChange('description', e.target.value)}
                rows="4"
                style={{ resize: 'vertical', minHeight: '100px' }}
              />
              {societyFormErrors.description && (
                <span className="error-message">{societyFormErrors.description}</span>
              )}
              <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>
                {societyFormData.description.length}/50 characters minimum
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="faculty-mentor" style={{ display: 'block',color: 'blue' , marginBottom: '8px', fontWeight: '500' }}>
                Faculty Mentor <span style={{ color: '#888', fontWeight: 'normal' }}>(Optional)</span> 👨‍🏫
              </label>
              <input
                id="faculty-mentor"
                type="text"
                placeholder="Dr. John Smith, Department of Computer Science"
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
            <h4 style={{ marginBottom: '24px', color: '#333' }}>📋 Review Your Society Details</h4>
            
            <div style={{ backgroundColor: '#f8f9fa', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <strong style={{ color: '#555' }}>Society Name:</strong>
                  <div style={{ marginTop: '4px', fontSize: '1.1rem' }}>{societyFormData.societyName}</div>
                </div>
                
                <div>
                  <strong style={{ color: '#555' }}>Category:</strong>
                  <div style={{ marginTop: '4px' }}>
                    {societyCategories.find(cat => cat.value === societyFormData.category)?.label}
                  </div>
                </div>
                
                <div>
                  <strong style={{ color: '#555' }}>Your College Email:</strong>
                  <div style={{ marginTop: '4px' }}>{societyFormData.collegeEmail}</div>
                </div>
                
                <div>
                  <strong style={{ color: '#555' }}>Proposed Society Email:</strong>
                  <div style={{ marginTop: '4px' }}>{societyFormData.proposedEmail}</div>
                </div>
                
                <div>
                  <strong style={{ color: '#555' }}>Description:</strong>
                  <div style={{ marginTop: '4px', lineHeight: '1.5' }}>{societyFormData.description}</div>
                </div>
                
                {societyFormData.facultyMentor && (
                  <div>
                    <strong style={{ color: '#555' }}>Faculty Mentor:</strong>
                    <div style={{ marginTop: '4px' }}>{societyFormData.facultyMentor}</div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ backgroundColor: '#e3f2fd', padding: '16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem' }}>
              <strong style={{ color: '#1976d2' }}>What happens next?</strong>
              <ul style={{ marginTop: '8px', marginLeft: '16px', lineHeight: '1.6' }}>
                <li>Our team will review your application (2-3 business days)</li>
                <li>Email verification will be sent to your college email</li>
                <li>You'll receive approval/feedback notifications</li>
                <li>Once approved, you can start managing your society!</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={handlePrevStep}
                className="button"
                style={{ 
                  backgroundColor: '#f5f5f5', 
                  color: '#666',
                  border: '1px solid #ddd',
                  minWidth: '120px'
                }}
                disabled={isSubmitting}
              >
                ← Back
              </button>
              <button
                onClick={handleSocietySubmit}
                className="button"
                style={{ minWidth: '180px' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Render regular form fields
  const renderFormFields = () => {
    switch (modalType) {
      case 'explorer':
        return (
          <button
            onClick={() => handleNavigation('explorer')}
            type="button"
            className="button"
          >
            Start Exploring
          </button>
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
    <div className="page-container">
      <div className="main-content">
        {showLanding ? (
          // Landing Page - College Selection
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
                minHeight: '350px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '32px'
              }}>
                <div className="card-icon" aria-hidden="true">
                  <GraduationCap size={64} strokeWidth={1.5} />
                </div>
                <h2 className="card-title">Choose Your College</h2>
                <p className="card-text" style={{ marginBottom: '24px' }}>
                  Select your college to connect with your campus community
                </p>
                
                <div className="form-group" style={{ width: '100%', maxWidth: '400px' }}>
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
                  onClick={handleCollegeSelect}
                  disabled={!selectedCollegeLocal}
                  className="button"
                  style={{
                    maxWidth: '400px',
                    width: '100%'
                  }}
                  aria-describedby={!selectedCollegeLocal ? 'college-requirement' : undefined}
                >
                  Continue
                </button>
                
                {!selectedCollegeLocal && (
                  <span id="college-requirement" className="sr-only">
                    Please select a college to continue
                  </span>
                )}
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
                  background: 'linear-gradient(135deg, #667eea 0%, #2d2d49ff 100%)',
                  color: 'bluewhite',
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

      {/*Multi-Step Society Creation */}
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
                    color: 'blue', 
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
              {modalType === 'createSociety' && (showConfirmation ? '🎉 Success!' : 'Create New Society')}
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
                      color: currentStep === 1 ? '#ccc' : '#666',
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

      {/* Enhanced AI Chat */}
      <div className="ai-chat-container" ref={chatContainerRef}>
        <button 
          className={`chat-toggle ${chatOpen ? 'active' : ''}`}
          onClick={handleChatToggle}
          title="AI Chat Assistant"
          aria-label="Toggle AI Chat Assistant"
          aria-expanded={chatOpen}
          style={{
            background: chatOpen ? '#667eea' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            transition: 'all 0.3s ease'
          }}
        >
          {chatOpen ? <X size={20} /> : '🤖'}
        </button>
        
        <div 
          className={`chat-box ${chatOpen ? 'open' : ''}`}
          role="dialog"
          aria-label="AI Chat Assistant"
          aria-hidden={!chatOpen}
        >
          <div className="chat-header">
            <div className="ai-icon" aria-hidden="true">🤖</div>
            <div>
              <div className="chat-title">AI Assistant</div>
              <div className="chat-subtitle">Need help getting started? ✨</div>
            </div>
          </div>
          
          <div 
            className="chat-messages" 
            ref={chatMessagesRef}
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {chatMessages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.text.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex}>
                      {line}
                      {lineIndex < message.text.split('\n').length - 1 && <br />}
                    </div>
                  ))}
                </div>
                <div className="message-time" aria-hidden="true">
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="typing-indicator" aria-live="polite">
                <span>AI is typing</span>
                <div className="typing-dots" aria-hidden="true">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <label htmlFor="chat-input" className="sr-only">
                Type your message
              </label>
              <textarea
                id="chat-input"
                ref={chatInputRef}
                className="chat-input"
                placeholder="Ask about user types, society creation, or features... 💬"
                value={currentMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                rows={1}
                disabled={isTyping}
                aria-describedby="chat-input-help"
              />
              <span id="chat-input-help" className="sr-only">
                Press Enter to send, Shift+Enter for new line
              </span>
              <button 
                className="chat-send-btn"
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping}
                title="Send message"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;