import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoveredReason, setHoveredReason] = useState(null);
  const [hoveredHighlight, setHoveredHighlight] = useState(null);

  // Data for events
  const events = [
    {
      title: "Hackathon 2025",
      date: "15th Sept, 2025",
      description: "Join us for 24 hours of coding and innovation!",
      gradient: "linear-gradient(135deg, #8bb847 0%, #b7c656 100%)",
      tags: ["Coding", "Innovation", "24hrs"],
      registrations: "200+"
    },
    {
      title: "Tech Workshop",
      date: "1st Oct, 2025",
      description: "Learn React, GitHub, and Netlify deployment hands-on.",
      gradient: "linear-gradient(135deg, #91a53a 0%, #8bb847 100%)",
      tags: ["React", "GitHub", "Netlify"],
      registrations: "150+"
    },
    {
      title: "AI Bootcamp",
      date: "20th Oct, 2025",
      description: "Explore AI, ML and build intelligent projects.",
      gradient: "linear-gradient(135deg, #b7c656 0%, #91a53a 100%)",
      tags: ["AI", "ML", "Projects"],
      registrations: "300+"
    }
  ];

  // Data for highlights
  const highlights = [
    {
      title: "Cultural Fest 2025",
      date: "April 2025",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Tech Summit 2025",
      date: "March 2025",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Sports Championship",
      date: "February 2025",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Innovation Expo",
      date: "January 2025",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  // Data for reasons
  const reasons = [
    {
      icon: "🌟",
      title: "Expert Mentors",
      description: "Learn from industry professionals and experienced seniors.",
      color: "#8bb847",
      details: "1:5 mentor-student ratio"
    },
    {
      icon: "🚀",
      title: "Hands-on Projects",
      description: "Work on real-world problems and build your portfolio.",
      color: "#b7c656",
      details: "50+ projects completed"
    },
    {
      icon: "🤝",
      title: "Strong Community",
      description: "Collaborate with like-minded peers and grow together.",
      color: "#91a53a",
      details: "500+ active members"
    }
  ];

  const handleBrowseCollege = () => {
    console.log('Browse by College clicked');
    // Add your navigation logic here
  };

  useEffect(() => {
    // Add smooth animations and interactions
    const buttons = document.querySelectorAll('.hero-btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    const featureItems = document.querySelectorAll('.hero-feature-item');
    featureItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
      });
      
      item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
      });
    });

    return () => {
      // Cleanup event listeners
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', () => {});
        button.removeEventListener('mouseleave', () => {});
      });
      featureItems.forEach(item => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">Discover Events. Join Societies. Connect Together.</h1>
            <p className="hero-subheading">One hub for all clubs and events across your campus. Build connections that matter.</p>
          </div>
          
          <div className="hero-buttons">
            <button className="hero-btn btn-primary" onClick={handleBrowseCollege}>
              <i className="fas fa-university"></i>
              <span>Browse by College</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="bg-decoration decoration-1"></div>
        <div className="bg-decoration decoration-2"></div>
        <div className="bg-decoration decoration-3"></div>
      </section>

      {/* Upcoming Events Section */}
      <div className="upcoming-events">
        <div className="section-header">
          <h2>Upcoming Events</h2>
          <p>Join our exciting events and expand your network</p>
        </div>
        <div className="events-list">
          {events.map((event, index) => (
            <div 
              key={index} 
              className={`event-card ${hoveredEvent === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredEvent(index)}
              onMouseLeave={() => setHoveredEvent(null)}
              style={{ '--gradient': event.gradient }}
            >
              <div className="card-background"></div>
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
                <button className="register-btn">
                  Register Now
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Highlights Section */}
      <div className="event-highlights">
        <div className="section-header">
          <h2>Event Highlights</h2>
          <p>Relive the moments from our most exciting events</p>
        </div>
        <div className="highlights-grid">
          {highlights.map((highlight, index) => (
            <div 
              key={index} 
              className={`highlight-card ${hoveredHighlight === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredHighlight(index)}
              onMouseLeave={() => setHoveredHighlight(null)}
            >
              <div className="highlight-image-container">
                <img src={highlight.image} alt={highlight.title} className="highlight-image" />
                <div className="highlight-overlay">
                  <div className="overlay-content">
                    <i className="fas fa-play-circle play-icon"></i>
                    <span>View Gallery</span>
                  </div>
                </div>
              </div>
              <div className="highlight-content">
                <h3 className="highlight-title">{highlight.title}</h3>
                <p className="highlight-date">{highlight.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="highlights-footer">
          <button className="view-more-btn">
            <span>View More Highlights</span>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us">
        <div className="section-header">
          <h2>Why Choose Soclique?</h2>
          <p>Discover what makes our community special</p>
        </div>
        <div className="reasons">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className={`reason-card ${hoveredReason === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredReason(index)}
              onMouseLeave={() => setHoveredReason(null)}
              style={{ '--accent-color': reason.color }}
            >
              <div className="card-glow"></div>
              <div className="icon-container">
                <span className="icon">{reason.icon}</span>
              </div>
              <div className="reason-content">
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
                <div className="reason-details">{reason.details}</div>
              </div>
              <div className="card-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;