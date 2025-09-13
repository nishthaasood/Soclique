import React, { useState, useEffect, useRef, useCallback } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoveredReason, setHoveredReason] = useState(null);
  const [hoveredHighlight, setHoveredHighlight] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { 
      type: 'ai', 
      text: 'Hi! I\'m your Soclique AI assistant. I can help you discover events, find societies, get registration info, and answer any questions about our platform. What would you like to explore?' 
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  
  const observerRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const chatInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // AI Chat Prompts
  const chatPrompts = [
    "What events are happening this week?",
    "Help me find societies for my interests",
    "How do I register for events?",
    "Show me tech-related events",
    "What's the difference between events?",
    "Connect me with like-minded people"
  ];

  // Enhanced AI responses with more personality and context
  const getAIResponse = useCallback((message) => {
    const responses = {
      'events': 'Great question! We have some amazing events lined up:\n\n💻 Hackathon 2025 (Sept 15) - 24 hours of pure innovation\n⚛️ Tech Workshop (Oct 1) - Master React, GitHub & deployment\n🤖 AI Bootcamp (Oct 20) - Dive deep into AI and ML\n\nWhich one catches your interest? I can provide more details!',
      'societies': 'We\'re connected with 50+ societies across 25+ colleges! From tech clubs to cultural groups, sports teams to academic societies - there\'s something for everyone. Want to explore by your college or by interest category?',
      'hackathon': 'The Hackathon 2025 is going to be epic! 🚀\n\n📅 Sept 15th, 9 AM - Sept 16th, 9 AM\n📍 Tech Campus Main Hall\n💰 $10,000 Prize Pool\n👥 200+ developers already registered\n\nIt\'s 24 hours of coding, innovation, and networking. Perfect for building something amazing and meeting talented developers. Ready to join the coding marathon?',
      'tech workshop': 'The Tech Workshop is perfect for hands-on learning! 💻\n\n📅 Oct 1st, 10 AM - 4 PM\n📍 Computer Science Lab\n🎯 Learn React, GitHub, Netlify\n✅ Beginner-friendly\n👥 150+ participants registered\n\nYou\'ll build and deploy your first full-stack app. Great for your portfolio!',
      'ai bootcamp': 'The AI Bootcamp is our most popular event! 🤖\n\n📅 Oct 20th, 9 AM - 5 PM\n📍 Innovation Center\n🧠 AI, ML, and intelligent projects\n🏆 Certificate included\n👥 300+ registered participants\n\nFrom basics to advanced applications with industry experts. Perfect for diving into the future of tech!',
      'registration': 'Registration is super easy! Just click the "Register Now" button on any event card. The process is:\n\n1️⃣ Fill out basic info\n2️⃣ Select your preferences\n3️⃣ Confirm attendance\n4️⃣ Get confirmation email\n\nSecure, quick, and you\'ll get all event updates. Need help with a specific event?',
      'colleges': 'We currently partner with 10+ colleges and expanding rapidly! You can filter events and societies by:\n\n🏛️ Your specific college\n📚 Academic departments\n🎯 Interest categories\n📍 Location preferences\n\nWhich college are you from? I can show you what\'s happening there!',
      'help': 'I\'m here to help with everything Soclique! 🌟\n\n✨ Find perfect events for you\n🏛️ Discover college societies\n📝 Registration assistance\n💡 Platform features\n🤝 Networking opportunities\n📊 Event recommendations\n\nJust ask me anything - from "What events are this weekend?" to "How do I join the robotics club?"',
      'contact': 'You can reach our team through:\n\n💬 This chat (I\'m available 24/7!)\n📧 Contact form on our website\n📱 Social media @Soclique\n🎫 Support tickets for technical issues\n\nFor immediate help, keep chatting with me. For complex issues, our human team responds within 24 hours!',
      'networking': 'Networking is what Soclique is all about! 🤝\n\nOur platform helps you:\n• Meet like-minded peers at events\n• Join collaborative projects\n• Connect with industry professionals\n• Build lasting friendships\n• Grow your professional network\n\nEvery event is designed for meaningful connections. Ready to expand your circle?',
      'default': 'That\'s an interesting question! 🤔 I\'m here to help with:\n\n🎪 Event discovery and info\n🏛️ Society connections\n📝 Registration support\n💡 Platform guidance\n🤝 Networking advice\n\nTry asking about specific events, colleges, or what type of activities interest you. I love helping students find their perfect community!'
    };

    const lowercaseMessage = message.toLowerCase();
    
    // Enhanced matching with multiple keywords
    for (const [key, response] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key) || 
          (key === 'tech workshop' && (lowercaseMessage.includes('workshop') || lowercaseMessage.includes('react'))) ||
          (key === 'ai bootcamp' && (lowercaseMessage.includes('bootcamp') || lowercaseMessage.includes('machine learning') || lowercaseMessage.includes('ml')))) {
        return response;
      }
    }
    
    return responses.default;
  }, []);

  // Enhanced events data with consistent structure for better alignment
  const events = [
    {
      title: "Hackathon 2025",
      date: "15th Sept, 2025",
      description: "Join us for 24 hours of coding innovation! Build groundbreaking projects, compete for prizes, and network with top developers from across all colleges.",
      gradient: "linear-gradient(135deg, #3A3E5C 0%, #8A94AC 100%)",
      tags: ["Coding", "Innovation", "24hrs", "Prizes"],
      registrations: "200+",
      icon: "💻",
      details: {
        time: "9:00 AM - 9:00 AM (Next Day)",
        venue: "Tech Campus Main Hall",
        special: "$10,000 Prize Pool"
      }
    },
    {
      title: "Tech Workshop",
      date: "1st Oct, 2025", 
      description: "Master modern web development! Learn React fundamentals, GitHub workflows, and deploy your first full-stack application with expert guidance.",
      gradient: "linear-gradient(135deg, #959B85 0%, #B3B7C8 100%)",
      tags: ["React", "GitHub", "Netlify", "Deployment"],
      registrations: "150+",
      icon: "⚛️",
      details: {
        time: "10:00 AM - 4:00 PM",
        venue: "Computer Science Lab",
        special: "Beginner Friendly"
      }
    },
    {
      title: "AI Bootcamp",
      date: "20th Oct, 2025",
      description: "Dive deep into Artificial Intelligence and Machine Learning. Build intelligent projects from scratch with hands-on guidance from industry experts.",
      gradient: "linear-gradient(135deg, #8A94AC 0%, #3A3E5C 100%)",
      tags: ["AI", "Machine Learning", "Projects", "Industry Experts"],
      registrations: "300+",
      icon: "🤖",
      details: {
        time: "9:00 AM - 5:00 PM",
        venue: "Innovation Center",
        special: "Professional Certificate"
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
      description: "A spectacular celebration of diversity, creativity, and talent showcasing the rich cultural heritage from across all participating colleges."
    },
    {
      title: "Tech Summit 2025",
      date: "March 2025", 
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Technology",
      participants: "500+",
      description: "Industry leaders and tech innovators sharing cutting-edge insights on emerging technologies, future trends, and career opportunities."
    },
    {
      title: "Sports Championship",
      date: "February 2025",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Sports",
      participants: "800+",
      description: "Inter-college sports competition promoting fitness, teamwork, and sportsmanship across multiple sporting disciplines."
    },
    {
      title: "Innovation Expo",
      date: "January 2025",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Innovation",
      participants: "600+",
      description: "Showcasing breakthrough projects and innovative solutions from talented student developers and entrepreneurs."
    }
  ];

  // Enhanced reasons data
  const reasons = [
    {
      icon: "🌟",
      title: "Discover Societies Effortlessly",
      description: "Find all the societies from your college in one unified platform. Connect with clubs that match your interests, passions, and career goals seamlessly.",
      color: "#959B85",
      details: "50+ societies across 25+ colleges",
      benefits: ["Easy Discovery", "Interest Matching", "College-Specific", "Career Focused"],
      stats: "500+ active connections"
    },
    {
      icon: "🚀",
      title: "Stay Always Updated",
      description: "Get real-time notifications about fests, events, workshops, and activities happening across your campus and beyond. Never miss an opportunity again.",
      color: "#3A3E5C", 
      details: "10+ colleges covered",
      benefits: ["Real-time Updates", "Smart Alerts", "Cross-Campus", "Personalized Feed"],
      stats: "50+ events monthly"
    },
    {
      icon: "🤝",
      title: "Build Lasting Connections",
      description: "Collaborate with like-minded peers, join meaningful projects, and grow together. Create friendships and professional networks that last beyond college.",
      color: "#8A94AC",
      details: "Growing student network",
      benefits: ["Peer Collaboration", "Project Teams", "Mentorship", "Professional Growth"],
      stats: "1000+ meaningful connections"
    }
  ];

  // Enhanced button interaction handler
  const handleBrowseCollege = () => {
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

  const handlePromptClick = (prompt) => {
    setCurrentMessage(prompt);
    setShowPrompts(false);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage = currentMessage;
    setCurrentMessage('');
    setShowPrompts(false);
    
    setChatMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage);
      setChatMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  // Enhanced scroll animations with intersection observer
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
      { threshold: 0.1, rootMargin: '-80px' }
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

  // Click outside to close chat
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
      const scrollHeight = chatMessagesRef.current.scrollHeight;
      const height = chatMessagesRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chatMessagesRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [chatMessages, isTyping]);

  // Enhanced event registration handler
  const handleEventRegistration = (eventTitle) => {
    setChatMessages(prev => [...prev, 
      { type: 'ai', text: `Excellent choice! ${eventTitle} is going to be amazing! 🎉\n\nI can help you with the registration process. Would you like me to:\n\n1️⃣ Guide you through registration steps\n2️⃣ Send you event details\n3️⃣ Add it to your calendar\n4️⃣ Connect you with other participants\n\nWhat would be most helpful?` }
    ]);
    setChatOpen(true);
  };

  // Set initial visibility for hero section
  useEffect(() => {
    setIsVisible(prev => ({ ...prev, hero: true }));
  }, []);

  return (
    <div className="homepage">
      {/* Enhanced Hero Section */}
      <section className="hero" data-section="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-icon">✨</div>
            <span>Welcome to the Future of Campus Connection</span>
          </div>
          
          <h1 className="hero-headline">
            <span className="gradient-text">Discover Events.</span>
            <span className="gradient-text">Join Societies.</span>
            <span className="gradient-text">Connect Together.</span>
          </h1>
          
          <p className="hero-subheading">
            Your ultimate platform for campus life. One hub for all clubs, events, and meaningful connections across your college community.
          </p>
          
          <div className="hero-buttons">
            <button className="hero-btn btn-primary" onClick={handleBrowseCollege}>
              <i className="fas fa-university"></i>
              <span>Explore by College</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Active Members</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Monthly Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Partner Colleges</span>
            </div>
          </div>
        </div>
        
        {/* Improved mesh background animation */}
        <div className="floating-elements"></div>
      </section>

      {/* Enhanced Upcoming Events Section */}
      <section className="content-section upcoming-events" data-section="events">
        <div className="section-header">
          <h2 className={`section-title ${isVisible.events ? 'animate-in' : ''}`}>
            Upcoming Events
          </h2>
          <p className={`section-description ${isVisible.events ? 'animate-in' : ''}`}>
            Join our exciting events and expand your network with like-minded peers from across the campus community
          </p>
        </div>
        
        <div className="events-grid">
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
              <div className="event-icon">{event.icon}</div>
              
              <div className="event-header">
                <h3 className="event-title">{event.title}</h3>
                <div className="event-badge">{event.registrations} registered</div>
              </div>
              
              <div className="event-date">
                <i className="fas fa-calendar date-icon"></i>
                <span>{event.date}</span>
              </div>
              
              <p className="event-description">{event.description}</p>
              
              <div className="event-details">
                {event.details.time && (
                  <div className="detail-item">
                    <i className="fas fa-clock detail-icon"></i>
                    <span><strong>Time:</strong> {event.details.time}</span>
                  </div>
                )}
                {event.details.venue && (
                  <div className="detail-item">
                    <i className="fas fa-map-marker-alt detail-icon"></i>
                    <span><strong>Venue:</strong> {event.details.venue}</span>
                  </div>
                )}
                {event.details.special && (
                  <div className="detail-item">
                    <i className="fas fa-star detail-icon"></i>
                    <span><strong>Special:</strong> {event.details.special}</span>
                  </div>
                )}
              </div>

              <div className="event-tags">
                {event.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="event-tag">{tag}</span>
                ))}
              </div>
              
              <button 
                className="register-btn"
                onClick={() => handleEventRegistration(event.title)}
              >
                <span className="btn-text">Register Now</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Event Highlights Section */}
      <section className="content-section event-highlights" data-section="highlights">
        <div className="section-header">
          <h2 className={`section-title ${isVisible.highlights ? 'animate-in' : ''}`}>
            Event Highlights
          </h2>
          <p className={`section-description ${isVisible.highlights ? 'animate-in' : ''}`}>
            Relive the magic of our most spectacular events and get inspired for what's coming next
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
                <p className="highlight-description">{highlight.description}</p>
                
                <div className="highlight-meta">
                  <div className="highlight-date">
                    <i className="fas fa-calendar"></i>
                    <span>{highlight.date}</span>
                  </div>
                  <span className="participants-badge">{highlight.participants} participants</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="view-more-btn">
            <span>View More Highlights</span>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </section>

      {/* Enhanced Why Choose Us Section */}
      <section className="content-section why-choose-us" data-section="reasons">
        <div className="section-header">
          <h2 className={`section-title ${isVisible.reasons ? 'animate-in' : ''}`}>
            Why Choose Soclique?
          </h2>
          <p className={`section-description ${isVisible.reasons ? 'animate-in' : ''}`}>
            Discover what makes our community special and how we're revolutionizing campus connections
          </p>
        </div>
        
        <div className="reasons-grid">
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
              <div className="reason-icon-container">
                <span className="reason-icon">{reason.icon}</span>
                <div className="reason-icon-bg"></div>
              </div>
              
              <div className="reason-content">
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-description">{reason.description}</p>
                
                <div className="reason-stats-container">
                  <div className="reason-details">{reason.details}</div>
                  <div className="reason-stats">{reason.stats}</div>
                </div>

                <div className="benefits-list">
                  {reason.benefits.map((benefit, idx) => (
                    <span key={idx} className="benefit-tag">{benefit}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced AI Chat Box */}
      <div className="ai-chat-container" ref={chatContainerRef}>
        <button 
          className={`chat-toggle ${chatOpen ? 'active' : ''}`}
          onClick={handleChatToggle}
          title="AI Chat Assistant"
          aria-label="Toggle AI Chat Assistant"
        >
          {chatOpen ? '×' : '🤖'}
        </button>
        
        <div className={`chat-box ${chatOpen ? 'open' : ''}`}>
          <div className="chat-header">
            <div className="chat-ai-icon">🤖</div>
            <div className="chat-header-content">
              <div className="chat-title">Soclique AI Assistant</div>
              <div className="chat-subtitle">Here to help you explore!</div>
            </div>
          </div>
          
          {showPrompts && chatMessages.length === 1 && (
            <div className="chat-prompts">
              {chatPrompts.map((prompt, index) => (
                <div
                  key={index}
                  className="prompt-chip"
                  onClick={() => handlePromptClick(prompt)}
                >
                  {prompt}
                </div>
              ))}
            </div>
          )}
          
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
                <span className="typing-text">AI is typing</span>
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