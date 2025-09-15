import React, { useState, useEffect, useRef, useCallback } from 'react';
import './HomePage.css';
import AIChat from './AIChat';
import GetStarted from './Get-started.jsx';

const HomePage = () => {
  const [showGetStarted, setShowGetStarted] = useState(false);

  
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoveredReason, setHoveredReason] = useState(null);
  const [hoveredHighlight, setHoveredHighlight] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [currentFilter, setCurrentFilter] = useState('all');
  const [heroStats, setHeroStats] = useState({
    members: 0,
    events: 0,
    colleges: 0
  });
  
  const observerRef = useRef(null);
  if (showGetStarted) {
    return <GetStarted />;
  }

  // Enhanced events data with your exact color palette
  const events = [
    {
      title: "Hackathon 2025",
      date: "15th Sept, 2025",
      description: "Join us for 24 hours of coding innovation! Build groundbreaking projects, compete for amazing prizes, and network with top developers from across all colleges. Experience the thrill of rapid prototyping and collaborative problem-solving.",
      gradient: "linear-gradient(135deg, #0A1931 0%, #1A3D63 100%)",
      tags: ["Coding", "Innovation", "24hrs", "Prizes", "Networking"],
      registrations: "200+",
      icon: "💻",
      category: "tech",
      details: {
        time: "9:00 AM - 9:00 AM (Next Day)",
        venue: "Tech Campus Main Hall",
        special: "$10,000 Prize Pool",
        capacity: "300 participants"
      }
    },
    {
      title: "Tech Workshop",
      date: "1st Oct, 2025", 
      description: "Master modern web development with hands-on learning! Dive deep into React fundamentals, master GitHub workflows, and deploy your first full-stack application with expert guidance and real-world projects.",
      gradient: "linear-gradient(135deg, #B3CFE5 0%, #4A7FA7 100%)",
      tags: ["React", "GitHub", "Netlify", "Deployment", "Beginner"],
      registrations: "150+",
      icon: "⚛️",
      category: "tech",
      details: {
        time: "10:00 AM - 4:00 PM",
        venue: "Computer Science Lab",
        special: "Beginner Friendly",
        capacity: "200 participants"
      }
    },
    {
      title: "AI Bootcamp",
      date: "20th Oct, 2025",
      description: "Dive deep into Artificial Intelligence and Machine Learning with industry leaders. Build intelligent projects from scratch, understand cutting-edge algorithms, and get hands-on experience with real-world AI applications.",
      gradient: "linear-gradient(135deg, #4A7FA7 0%, #1A3D63 100%)",
      tags: ["AI", "Machine Learning", "Projects", "Industry Experts", "Certificate"],
      registrations: "300+",
      icon: "🤖",
      category: "tech",
      details: {
        time: "9:00 AM - 5:00 PM",
        venue: "Innovation Center",
        special: "Professional Certificate",
        capacity: "400 participants"
      }
    },
    {
      title: "Cultural Fest",
      date: "5th Nov, 2025",
      description: "Celebrate diversity and creativity in our grand cultural festival! Showcase your talents, experience different cultures, enjoy performances, and participate in competitions that bring our community together.",
      gradient: "linear-gradient(135deg, #1A3D63 0%, #B3CFE5 100%)",
      tags: ["Cultural", "Performance", "Competition", "Diversity", "Community"],
      registrations: "500+",
      icon: "🎭",
      category: "cultural",
      details: {
        time: "6:00 PM - 10:00 PM",
        venue: "Main Auditorium",
        special: "Multi-cultural Showcase",
        capacity: "1000 participants"
      }
    }
  ];

  // Enhanced highlights data with more variety
  const highlights = [
    {
      title: "Cultural Fest 2025",
      date: "April 2025",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Cultural",
      participants: "1000+",
      description: "A spectacular celebration of diversity, creativity, and talent showcasing the rich cultural heritage from across all participating colleges and communities."
    },
    {
      title: "Tech Summit 2025",
      date: "March 2025", 
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Technology",
      participants: "500+",
      description: "Industry leaders and tech innovators sharing cutting-edge insights on emerging technologies, future trends, and career opportunities in the digital landscape."
    },
    {
      title: "Sports Championship",
      date: "February 2025",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Sports",
      participants: "800+",
      description: "Inter-college sports competition promoting fitness, teamwork, and sportsmanship across multiple sporting disciplines and athletic events."
    },
    {
      title: "Innovation Expo",
      date: "January 2025",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Innovation",
      participants: "600+",
      description: "Showcasing breakthrough projects and innovative solutions from talented student developers, entrepreneurs, and creative minds."
    },
    {
      title: "Leadership Summit",
      date: "December 2024",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Leadership",
      participants: "400+",
      description: "Developing next-generation leaders through workshops, mentorship sessions, and networking with industry executives and thought leaders."
    }
  ];

  // Enhanced reasons data with your exact color palette
  const reasons = [
    {
      icon: "🌟",
      title: "Discover Societies Effortlessly",
      description: "Find all the societies from your college in one unified platform. Connect with clubs that match your interests, passions, and career goals seamlessly with our intelligent matching system.",
      color: "#B3CFE5",
      details: "50+ societies across 25+ colleges",
      benefits: ["Smart Discovery", "Interest Matching", "College-Specific", "Career Focused"],
      stats: "500+ active connections made"
    },
    {
      icon: "🚀",
      title: "Stay Always Updated",
      description: "Get real-time notifications about fests, events, workshops, and activities happening across your campus and beyond. Never miss an opportunity with our smart alert system and personalized recommendations.",
      color: "#4A7FA7", 
      details: "10+ colleges covered",
      benefits: ["Real-time Updates", "Smart Alerts", "Cross-Campus", "Personalized Feed"],
      stats: "50+ events monthly"
    },
    {
      icon: "🎯",
      title: "Personalized Experience",
      description: "Our AI-powered recommendation engine learns your preferences and suggests events, societies, and connections that align with your interests and career aspirations.",
      color: "#0A1931",
      details: "Smart AI recommendations",
      benefits: ["AI Matching", "Personal Growth", "Career Focus", "Skill Development"],
      stats: "95% satisfaction rate"
    }
  ];

  // Enhanced event categories for filtering
  const eventCategories = [
    { id: 'all', label: 'All Events', icon: '🌟' },
    { id: 'tech', label: 'Technology', icon: '💻' },
    { id: 'cultural', label: 'Cultural', icon: '🎭' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'academic', label: 'Academic', icon: '📚' }
  ];

  // Counter animation for hero stats
  const animateCounter = useCallback((target, key) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setHeroStats(prev => ({ ...prev, [key]: Math.floor(current) }));
    }, 20);
  }, []);



  // Enhanced event filtering
  const filteredEvents = events.filter(event => {
    const matchesCategory = currentFilter === 'all' || event.category === currentFilter;
    return matchesCategory;
  });

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

  // Initialize hero stats animation
  useEffect(() => {
    const timer = setTimeout(() => {
      animateCounter(500, 'members');
      setTimeout(() => animateCounter(50, 'events'), 200);
      setTimeout(() => animateCounter(25, 'colleges'), 400);
    }, 1500);

    return () => clearTimeout(timer);
  }, [animateCounter]);

  // Set initial visibility for hero section
  useEffect(() => {
    setIsVisible(prev => ({ ...prev, hero: true }));
  }, []);

  return (
    <div className="homepage">
      {/* Enhanced Hero Section */}
      <section className="hero" data-section="hero">
        <div className="hero-background">
          <div className="floating-shapes"></div>
          <div className="gradient-orbs"></div>
          <div className="mesh-gradient"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-headline">
            <span className="gradient-text">Discover Events.</span>
            <span className="gradient-text">Join Societies.</span>
            <span className="gradient-text">Connect Together.</span>
          </h1>
          
          <p className="hero-subheading">
            Your ultimate platform for campus life. One unified hub for all clubs, events, and meaningful connections across your college community and beyond.
          </p>
          
          <div className="hero-buttons">
            <button 
              className="hero-btn btn-primary" 
              onClick={() => setShowGetStarted(true)}
            >
              <span>Explore by College</span>
              <div className="btn-shine"></div>
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{heroStats.members}+</span>
              <span className="stat-label">Active Members</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{heroStats.events}+</span>
              <span className="stat-label">Monthly Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{heroStats.colleges}+</span>
              <span className="stat-label">Partner Colleges</span>
            </div>
          </div>
        </div>
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
          
          {/* Enhanced Filter and Search */}
          <div className="event-controls">
            <div className="category-filters">
              {eventCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setCurrentFilter(category.id)}
                  className={`filter-btn ${currentFilter === category.id ? 'active' : ''}`}
                >
                  {category.icon} {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="events-grid">
          {filteredEvents.map((event, index) => (
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
                {event.details.capacity && (
                  <div className="detail-item">
                    <i className="fas fa-users detail-icon"></i>
                    <span><strong>Capacity:</strong> {event.details.capacity}</span>
                  </div>
                )}
              </div>

              <div className="event-tags">
                {event.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="event-tag">{tag}</span>
                ))}
              </div>
              
              <button className="register-btn">
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
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
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

      {/* AI Chat Component */}
      <AIChat />
    </div>
  );
};

export default HomePage;