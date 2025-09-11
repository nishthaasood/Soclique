import React, { useState, useEffect, useRef, useCallback } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoveredReason, setHoveredReason] = useState(null);
  const [hoveredHighlight, setHoveredHighlight] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', text: 'Hi! I\'m your Soclique assistant. Ask me about events, societies, or anything else!' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const observerRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const chatInputRef = useRef(null);

  // Enhanced AI responses with more context
  const getAIResponse = useCallback((message) => {
    const responses = {
      'events': 'We have exciting events coming up! Check out our Hackathon 2025 on Sept 15th, Tech Workshop on Oct 1st, and AI Bootcamp on Oct 20th. Which one interests you most?',
      'societies': 'We cover 50+ societies across 25+ colleges! You can discover tech clubs, cultural societies, sports teams, and academic groups all in one place. Want to explore by category?',
      'hackathon': 'Our Hackathon 2025 is a 24-hour coding marathon on September 15th! Over 200+ participants are already registered. It\'s perfect for innovation and networking. Ready to register?',
      'registration': 'You can register for events directly through our platform. Just click the "Register Now" button on any event card! Registration is quick and secure.',
      'colleges': 'We currently cover 10+ colleges with plans to expand further. You can browse events and societies by your specific college. Which college are you from?',
      'help': 'I can help you with:\n• Finding events and societies\n• Registration information\n• College-specific content\n• Platform features\n• Networking opportunities\nWhat would you like to know more about?',
      'contact': 'You can reach out to us through the contact section on our website, or continue chatting with me for immediate assistance! I\'m here 24/7.',
      'tech': 'Our Tech Workshop on October 1st covers React, GitHub, and Netlify deployment. It\'s hands-on learning with 150+ registered participants! Perfect for building your portfolio.',
      'ai': 'The AI Bootcamp on October 20th explores AI, ML, and helps you build intelligent projects. Over 300+ people are registered - it\'s going to be incredible!',
      'networking': 'Soclique is all about building meaningful connections! Join our events to meet like-minded peers, collaborate on projects, and grow your professional network.',
      'cultural': 'Our Cultural Fest 2025 in April will be amazing with 1000+ participants! It showcases talent from across colleges with music, dance, art, and much more.',
      'sports': 'The Sports Championship in February brings together 800+ athletes from different colleges. It\'s not just competition, but celebration of sportsmanship!',
      'innovation': 'Innovation Expo in January features 600+ participants showcasing groundbreaking projects. It\'s where creativity meets technology!',
      'default': 'That\'s a great question! I\'d recommend checking out our events section or browsing societies by your college. Is there something specific you\'re looking for? I\'m here to help!'
    };

    const lowercaseMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key)) {
        return response;
      }
    }
    
    return responses.default;
  }, []);

  // Enhanced events data with more details
  const events = [
    {
      title: "Hackathon 2025",
      date: "15th Sept, 2025",
      description: "Join us for 24 hours of coding and innovation! Build amazing projects, win prizes, and network with top developers.",
      gradient: "linear-gradient(135deg, #8bb847 0%, #b7c656 100%)",
      tags: ["Coding", "Innovation", "24hrs", "Prizes"],
      registrations: "200+",
      icon: "💻",
      details: {
        time: "9:00 AM - 9:00 AM",
        venue: "Tech Campus Main Hall",
        prizes: "$10,000 Prize Pool"
      }
    },
    {
      title: "Tech Workshop",
      date: "1st Oct, 2025", 
      description: "Learn React, GitHub, and Netlify deployment hands-on. Build and deploy your first full-stack application.",
      gradient: "linear-gradient(135deg, #91a53a 0%, #8bb847 100%)",
      tags: ["React", "GitHub", "Netlify", "Deployment"],
      registrations: "150+",
      icon: "⚛️",
      details: {
        time: "10:00 AM - 4:00 PM",
        venue: "Computer Science Lab",
        level: "Beginner Friendly"
      }
    },
    {
      title: "AI Bootcamp",
      date: "20th Oct, 2025",
      description: "Explore AI, ML and build intelligent projects. From basics to advanced applications with industry experts.",
      gradient: "linear-gradient(135deg, #b7c656 0%, #91a53a 100%)",
      tags: ["AI", "ML", "Projects", "Industry"],
      registrations: "300+",
      icon: "🤖",
      details: {
        time: "9:00 AM - 5:00 PM",
        venue: "Innovation Center",
        certification: "Certificate Included"
      }
    }
  ];

  // Enhanced highlights data
  const highlights = [
    {
      title: "Cultural Fest 2025",
      date: "April 2025",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Cultural",
      participants: "1000+",
      description: "A celebration of diversity, creativity, and talent from across all colleges."
    },
    {
      title: "Tech Summit 2025",
      date: "March 2025", 
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Technology",
      participants: "500+",
      description: "Leading tech innovators sharing insights on future technologies and trends."
    },
    {
      title: "Sports Championship",
      date: "February 2025",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Sports",
      participants: "800+",
      description: "Inter-college sports competition promoting fitness, teamwork, and sportsmanship."
    },
    {
      title: "Innovation Expo",
      date: "January 2025",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Innovation",
      participants: "600+",
      description: "Showcasing breakthrough projects and innovative solutions from student developers."
    }
  ];

  // Enhanced reasons data
  const reasons = [
    {
      icon: "🌟",
      title: "Discover Societies Easily",
      description: "Find all the societies from your college in one place. Connect with clubs that match your interests and passions.",
      color: "#8bb847",
      details: "50+ societies across 25+ colleges",
      benefits: ["Connect Easily", "Latest Events", "Explore Interests", "Join Communities"],
      stats: "500+ active members"
    },
    {
      icon: "🚀",
      title: "Stay Updated",
      description: "Get instant updates about fests, events and activities happening across your campus and beyond.",
      color: "#b7c656", 
      details: "10+ Colleges Covered",
      benefits: ["Hot Updates", "Event Alerts", "Fresh Feed", "Never Miss Out"],
      stats: "50+ events monthly"
    },
    {
      icon: "🤝",
      title: "Strong Community",
      description: "Collaborate with like-minded peers and grow together. Build lasting friendships and professional networks.",
      color: "#91a53a",
      details: "Growing network of students",
      benefits: ["Networking", "Collaboration", "Peer Learning", "Mentorship"],
      stats: "1000+ connections made"
    }
  ];

  // Enhanced button interaction handler
  const handleBrowseCollege = () => {
    console.log('Browse by College clicked');
    // Smooth scroll to events section
    const eventsSection = document.querySelector('.upcoming-events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Enhanced chat functionality
  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
    if (!chatOpen && chatInputRef.current) {
      setTimeout(() => chatInputRef.current.focus(), 300);
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage = currentMessage;
    setCurrentMessage('');
    
    // Add user message
    setChatMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI response delay for realism
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage);
      setChatMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-resize textarea
  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
  };

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Enhanced button interactions
      const buttons = document.querySelectorAll('.interactive-btn');
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--mouse-x', `${x}px`);
        button.style.setProperty('--mouse-y', `${y}px`);
      });

      // Card hover effects
      const cards = document.querySelectorAll('.event-card, .highlight-card, .reason-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Enhanced scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Auto-scroll chat messages
  useEffect(() => {
    if (chatMessagesRef.current) {
      const scrollHeight = chatMessagesRef.current.scrollHeight;
      const height = chatMessagesRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chatMessagesRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [chatMessages, isTyping]);

  // Enhanced event registration handler
  const handleEventRegistration = (eventTitle) => {
    console.log(`Registering for ${eventTitle}`);
    // Add registration logic here
    setChatMessages(prev => [...prev, 
      { type: 'ai', text: `Great choice! I can help you register for ${eventTitle}. Would you like me to guide you through the registration process?` }
    ]);
    setChatOpen(true);
  };

  return (
    <div className="homepage">
      {/* Enhanced Hero Section */}
      <section className="hero" data-section="hero">
        <div className="hero-content">
          <div className={`hero-text ${isVisible.hero ? 'animate-in' : ''}`}>
            <div className="hero-badge">
              <span className="badge-text">✨ Welcome to Soclique</span>
            </div>
            <h1 className="hero-headline">
              <span className="gradient-text">Discover Events.</span>
              <span className="gradient-text">Join Societies.</span>
              <span className="gradient-text">Connect Together.</span>
            </h1>
            <p className="hero-subheading">
              One hub for all clubs and events across your campus. Build connections that matter and create memories that last forever.
            </p>
          </div>
          
          <div className={`hero-buttons ${isVisible.hero ? 'animate-in' : ''}`}>
            <button className="hero-btn btn-primary interactive-btn" onClick={handleBrowseCollege}>
              <span className="btn-content">
                <i className="fas fa-university"></i>
                <span>Browse by College</span>
                <i className="fas fa-arrow-right"></i>
              </span>
              <div className="btn-shine"></div>
            </button>
          </div>
          
          {/* Enhanced stats with animations */}
          <div className={`hero-stats ${isVisible.hero ? 'animate-in' : ''}`}>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Active Members</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Events Monthly</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Colleges</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced background elements */}
        <div className="bg-decoration decoration-1">
          <div className="decoration-inner"></div>
        </div>
        <div className="bg-decoration decoration-2">
          <div className="decoration-inner"></div>
        </div>
        <div className="bg-decoration decoration-3">
          <div className="decoration-inner"></div>
        </div>
        
        {/* Enhanced floating particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${(i % 5) + 1}`}></div>
          ))}
        </div>
      </section>

      {/* Enhanced Upcoming Events Section */}
      <div className="upcoming-events" data-section="events">
        <div className="section-header">
          <h2 className={isVisible.events ? 'animate-in' : ''}>Upcoming Events</h2>
          <p className={isVisible.events ? 'animate-in' : ''}>
            Join our exciting events and expand your network with like-minded peers
          </p>
        </div>
        <div className="events-list">
          {events.map((event, index) => (
            <div 
              key={index} 
              className={`event-card ${hoveredEvent === index ? 'hovered' : ''} ${isVisible.events ? 'animate-in' : ''}`}
              onMouseEnter={() => setHoveredEvent(index)}
              onMouseLeave={() => setHoveredEvent(null)}
              style={{ 
                '--gradient': event.gradient,
                '--delay': `${index * 0.2}s`
              }}
            >
              <div className="card-background"></div>
              <div className="event-icon">{event.icon}</div>
              <div className="card-content">
                <div className="event-header">
                  <h3>{event.title}</h3>
                  <div className="registrations">{event.registrations} registered</div>
                </div>
                <div className="event-date">
                  <span className="date-icon">📅</span>
                  {event.date}
                </div>
                <p className="event-description">{event.description}</p>
                
                {/* Enhanced event details */}
                <div className="event-details" style={{ 
                  margin: '1rem 0',
                  padding: '0.75rem',
                  background: 'rgba(230, 221, 156, 0.1)',
                  borderRadius: '12px',
                  fontSize: '0.9rem'
                }}>
                  {event.details.time && (
                    <div style={{ marginBottom: '0.25rem' }}>
                      <i className="fas fa-clock" style={{ marginRight: '0.5rem', color: '#8bb847' }}></i>
                      <strong>Time:</strong> {event.details.time}
                    </div>
                  )}
                  {event.details.venue && (
                    <div style={{ marginBottom: '0.25rem' }}>
                      <i className="fas fa-map-marker-alt" style={{ marginRight: '0.5rem', color: '#8bb847' }}></i>
                      <strong>Venue:</strong> {event.details.venue}
                    </div>
                  )}
                  {(event.details.prizes || event.details.level || event.details.certification) && (
                    <div>
                      <i className="fas fa-star" style={{ marginRight: '0.5rem', color: '#8bb847' }}></i>
                      <strong>Special:</strong> {event.details.prizes || event.details.level || event.details.certification}
                    </div>
                  )}
                </div>

                <div className="event-tags">
                  {event.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
                <button 
                  className="register-btn interactive-btn"
                  onClick={() => handleEventRegistration(event.title)}
                >
                  <span className="btn-content">
                    Register Now
                    <span className="btn-arrow">→</span>
                  </span>
                  <div className="btn-shine"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Event Highlights Section */}
      <div className="event-highlights" data-section="highlights">
        <div className="section-header">
          <h2 className={isVisible.highlights ? 'animate-in' : ''}>Event Highlights</h2>
          <p className={isVisible.highlights ? 'animate-in' : ''}>
            Relive the moments from our most exciting events and get inspired for what's coming next
          </p>
        </div>
        <div className="highlights-grid">
          {highlights.map((highlight, index) => (
            <div 
              key={index} 
              className={`highlight-card ${hoveredHighlight === index ? 'hovered' : ''} ${isVisible.highlights ? 'animate-in' : ''}`}
              onMouseEnter={() => setHoveredHighlight(index)}
              onMouseLeave={() => setHoveredHighlight(null)}
              style={{ '--delay': `${index * 0.15}s` }}
            >
              <div className="highlight-image-container">
                <img src={highlight.image} alt={highlight.title} className="highlight-image" />
                <div className="highlight-overlay">
                  <div className="overlay-content">
                    <i className="fas fa-play-circle play-icon"></i>
                    <span>View Gallery</span>
                  </div>
                </div>
                <div className="highlight-badge">{highlight.category}</div>
              </div>
              <div className="highlight-content">
                <h3 className="highlight-title">{highlight.title}</h3>
                <p style={{ 
                  color: 'var(--light-text)', 
                  fontSize: '0.9rem', 
                  marginBottom: '1rem',
                  lineHeight: '1.5'
                }}>
                  {highlight.description}
                </p>
                <div className="highlight-meta">
                  <p className="highlight-date">
                    <i className="fas fa-calendar" style={{ marginRight: '0.5rem', color: '#8bb847' }}></i>
                    {highlight.date}
                  </p>
                  <span className="participants">{highlight.participants} participants</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="highlights-footer">
          <button className="view-more-btn interactive-btn">
            <span className="btn-content">
              <span>View More Highlights</span>
              <i className="fas fa-arrow-right"></i>
            </span>
            <div className="btn-shine"></div>
          </button>
        </div>
      </div>

      {/* Enhanced Why Choose Us Section */}
      <div className="why-choose-us" data-section="reasons">
        <div className="section-header">
          <h2 className={isVisible.reasons ? 'animate-in' : ''}>Why Choose Soclique?</h2>
          <p className={isVisible.reasons ? 'animate-in' : ''}>
            Discover what makes our community special and how we're revolutionizing campus connections
          </p>
        </div>
        <div className="reasons">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className={`reason-card ${hoveredReason === index ? 'hovered' : ''} ${isVisible.reasons ? 'animate-in' : ''}`}
              onMouseEnter={() => setHoveredReason(index)}
              onMouseLeave={() => setHoveredReason(null)}
              style={{ 
                '--accent-color': reason.color,
                '--delay': `${index * 0.2}s`
              }}
            >
              <div className="card-glow"></div>
              <div className="icon-container">
                <span className="icon">{reason.icon}</span>
                <div className="icon-bg"></div>
              </div>
              <div className="reason-content">
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
                
                {/* Enhanced stats display */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div className="reason-details">{reason.details}</div>
                  <div style={{ 
                    color: reason.color,
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    {reason.stats}
                  </div>
                </div>

                <div className="benefits-list">
                  {reason.benefits.map((benefit, idx) => (
                    <span key={idx} className="benefit-tag">{benefit}</span>
                  ))}
                </div>
              </div>
              <div className="card-pattern"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced AI Chat Box */}
      <div className="ai-chat-container">
        <button 
          className={`chat-toggle ${chatOpen ? 'active' : ''}`}
          onClick={handleChatToggle}
          title="AI Chat Assistant"
          aria-label="Toggle AI Chat Assistant"
        >
          {chatOpen ? '✕' : '🤖'}
        </button>
        
        <div className={`chat-box ${chatOpen ? 'open' : ''}`}>
          <div className="chat-header">
            <div className="ai-icon">🤖</div>
            <div>
              <div className="chat-title">AI Assistant</div>
              <div className="chat-subtitle">Ask me anything!</div>
            </div>
          </div>
          
          <div className="chat-messages" ref={chatMessagesRef}>
            {chatMessages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.text.split('\n').map((line, lineIndex) => (
                  <div key={lineIndex}>
                    {line}
                    {lineIndex < message.text.split('\n').length - 1 && <br />}
                  </div>
                ))}
              </div>
            ))}
            
            {isTyping && (
              <div className="typing-indicator">
                <span>AI is typing</span>
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <textarea
                ref={chatInputRef}
                className="chat-input"
                placeholder="Ask about events, societies, or anything..."
                value={currentMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                rows={1}
                aria-label="Chat message input"
              />
              <button 
                className="chat-send-btn"
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping}
                title="Send message"
                aria-label="Send message"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;