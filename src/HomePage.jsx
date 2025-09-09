import React, { useState } from 'react';

const HomePage = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoveredReason, setHoveredReason] = useState(null);

  // Data for events
  const events = [
    {
      title: "Hackathon 2025",
      date: "15th Sept, 2025",
      description: "Join us for 24 hours of coding and innovation!",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      tags: ["Coding", "Innovation", "24hrs"],
      registrations: "200+"
    },
    {
      title: "Tech Workshop",
      date: "1st Oct, 2025",
      description: "Learn React, GitHub, and Netlify deployment hands-on.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      tags: ["React", "GitHub", "Netlify"],
      registrations: "150+"
    },
    {
      title: "AI Bootcamp",
      date: "20th Oct, 2025",
      description: "Explore AI, ML and build intelligent projects.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      tags: ["AI", "ML", "Projects"],
      registrations: "300+"
    }
  ];

  // Data for reasons
  const reasons = [
    {
      icon: "🌟",
      title: "Expert Mentors",
      description: "Learn from industry professionals and experienced seniors.",
      color: "#f6d365",
      details: "1:5 mentor-student ratio"
    },
    {
      icon: "🚀",
      title: "Hands-on Projects",
      description: "Work on real-world problems and build your portfolio.",
      color: "#ffa726",
      details: "50+ projects completed"
    },
    {
      icon: "🤝",
      title: "Strong Community",
      description: "Collaborate with like-minded peers and grow together.",
      color: "#42a5f5",
      details: "500+ active members"
    }
  ];

  return (
    <div className="homepage">
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

      <style jsx>{`
        .homepage {
          padding: 0;
          background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%);
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.5rem;
          position: relative;
        }

        .section-header h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #f6d365 0%, #fda085 100%);
          border-radius: 2px;
        }

        .section-header p {
          color: #718096;
          font-size: 1.1rem;
          margin-top: 1rem;
        }

        /* Upcoming Events Styles */
        .upcoming-events {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .events-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .event-card {
          position: relative;
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          cursor: pointer;
        }

        .event-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: var(--gradient);
          transition: height 0.4s ease;
        }

        .event-card.hovered::before {
          height: 100%;
          opacity: 0.1;
        }

        .event-card.hovered {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }

        .card-content {
          position: relative;
          z-index: 2;
        }

        .event-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .event-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0;
        }

        .registrations {
          background: rgba(246, 211, 101, 0.2);
          color: #d69e2e;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .event-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4a5568;
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .date-icon {
          font-size: 1.2rem;
        }

        .event-description {
          color: #718096;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .event-tags {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .tag {
          background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .register-btn {
          background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
          width: 100%;
        }

        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(246, 211, 101, 0.4);
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .register-btn:hover .btn-arrow {
          transform: translateX(5px);
        }

        /* Why Choose Us Styles */
        .why-choose-us {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #d4c875 0%, #c4b565 50%, #b4a555 100%);
          position: relative;
          overflow: hidden;
        }

        .why-choose-us::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .why-choose-us .section-header h2,
        .why-choose-us .section-header p {
          color: white;
        }

        .reasons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .reason-card {
          position: relative;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 2.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }

        .reason-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--accent-color), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .reason-card.hovered::before {
          opacity: 0.1;
        }

        .reason-card.hovered {
          transform: translateY(-15px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .reason-card.hovered .card-glow {
          opacity: 0.1;
        }

        .icon-container {
          position: relative;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--accent-color), rgba(255,255,255,0.3));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: transform 0.4s ease;
        }

        .reason-card.hovered .icon-container {
          transform: scale(1.1) rotate(10deg);
        }

        .icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 15px;
          transition: transform 0.4s ease;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        .reason-card.hovered .icon {
          transform: scale(1.2) rotate(10deg);
        }

        .reason-content {
          position: relative;
          z-index: 2;
        }

        .reason-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 1rem;
        }

        .reason-card p {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .reason-details {
          color: var(--accent-color);
          font-weight: 600;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 2rem;
          }
          
          .events-list,
          .reasons {
            grid-template-columns: 1fr;
          }
          
          .event-card,
          .reason-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;