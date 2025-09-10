import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
const HomePage = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoveredReason, setHoveredReason] = useState(null);
  const [hoveredHighlight, setHoveredHighlight] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);

  // Data for events
  const events = [
    {
      title: "Hackathon 2025",
      date: "15th Sept, 2025",
      description: "Join us for 24 hours of coding and innovation!",
      gradient: "linear-gradient(135deg, #8bb847 0%, #b7c656 100%)",
      tags: ["Coding", "Innovation", "24hrs"],
      registrations: "200+",
      icon: "💻"
    },
    {
      title: "Tech Workshop",
      date: "1st Oct, 2025",
      description: "Learn React, GitHub, and Netlify deployment hands-on.",
      gradient: "linear-gradient(135deg, #91a53a 0%, #8bb847 100%)",
      tags: ["React", "GitHub", "Netlify"],
      registrations: "150+",
      icon: "⚛️"
    },
    {
      title: "AI Bootcamp",
      date: "20th Oct, 2025",
      description: "Explore AI, ML and build intelligent projects.",
      gradient: "linear-gradient(135deg, #b7c656 0%, #91a53a 100%)",
      tags: ["AI", "ML", "Projects"],
      registrations: "300+",
      icon: "🤖"
    }
  ];

  // Data for highlights
  const highlights = [
    {
      title: "Cultural Fest 2025",
      date: "April 2025",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Cultural",
      participants: "1000+"
    },
    {
      title: "Tech Summit 2025",
      date: "March 2025",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Technology",
      participants: "500+"
    },
    {
      title: "Sports Championship",
      date: "February 2025",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Sports",
      participants: "800+"
    },
    {
      title: "Innovation Expo",
      date: "January 2025",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Innovation",
      participants: "600+"
    }
  ];

  // Data for reasons
  const reasons = [
    {
      icon: "🌟",
      title: "Expert Mentors",
      description: "Learn from industry professionals and experienced seniors.",
      color: "#8bb847",
      details: "1:5 mentor-student ratio",
      benefits: ["Industry Insights", "Career Guidance", "Technical Support"]
    },
    {
      icon: "🚀",
      title: "Hands-on Projects",
      description: "Work on real-world problems and build your portfolio.",
      color: "#b7c656",
      details: "50+ projects completed",
      benefits: ["Real Experience", "Portfolio Building", "Skill Development"]
    },
    {
      icon: "🤝",
      title: "Strong Community",
      description: "Collaborate with like-minded peers and grow together.",
      color: "#91a53a",
      details: "500+ active members",
      benefits: ["Networking", "Collaboration", "Peer Learning"]
    }
  ];

  const handleBrowseCollege = () => {
    console.log('Browse by College clicked');
    // Add your navigation logic here
  };

  // Intersection Observer for scroll animations
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

  // Enhanced button interactions
  useEffect(() => {
    const handleMouseMove = (e) => {
      const buttons = document.querySelectorAll('.interactive-btn');
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--mouse-x', `${x}px`);
        button.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
            <p className="hero-subheading">One hub for all clubs and events across your campus. Build connections that matter and create memories that last forever.</p>
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
          
          {/* Enhanced stats */}
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
        
        {/* Floating particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
      </section>

      {/* Enhanced Upcoming Events Section */}
      <div className="upcoming-events" data-section="events">
        <div className="section-header">
          <h2 className={isVisible.events ? 'animate-in' : ''}>Upcoming Events</h2>
          <p className={isVisible.events ? 'animate-in' : ''}>Join our exciting events and expand your network</p>
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
                <div className="event-tags">
                  {event.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
                <button className="register-btn interactive-btn">
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
          <p className={isVisible.highlights ? 'animate-in' : ''}>Relive the moments from our most exciting events</p>
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
                <div className="highlight-meta">
                  <p className="highlight-date">{highlight.date}</p>
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
          <p className={isVisible.reasons ? 'animate-in' : ''}>Discover what makes our community special</p>
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
                <div className="reason-details">{reason.details}</div>
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
    </div>
  );
};

export default HomePage;