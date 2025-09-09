import "./HomePage.css";

const HomePage = () => {
  // Data for events
  const events = [
    {
      title: "Hackathon 2025",
      date: "15th Sept, 2025",
      description: "Join us for 24 hours of coding and innovation!"
    },
    {
      title: "Tech Workshop",
      date: "1st Oct, 2025",
      description: "Learn React, GitHub, and Netlify deployment hands-on."
    },
    {
      title: "AI Bootcamp",
      date: "20th Oct, 2025",
      description: "Explore AI, ML and build intelligent projects."
    }
  ];

  // Data for reasons
  const reasons = [
    {
      icon: "🌟",
      title: "Expert Mentors",
      description: "Learn from industry professionals and experienced seniors."
    },
    {
      icon: "🚀",
      title: "Hands-on Projects",
      description: "Work on real-world problems and build your portfolio."
    },
    {
      icon: "🤝",
      title: "Strong Community",
      description: "Collaborate with like-minded peers and grow together."
    }
  ];

  return (
    <div className="homepage">
      {/* Upcoming Events Section */}
      <div className="upcoming-events">
        <h2>Upcoming Events</h2>
        <div className="events-list">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <h3>{event.title}</h3>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="reasons">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card">
              <span className="icon">{reason.icon}</span>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;