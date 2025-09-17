import React, { useEffect, useRef, useState } from "react";
import "./About.css";

function About() {
  const observerRef = useRef(null);
  const [isVisible, setIsVisible] = useState({});

  // Enhanced team members with updated data
  const teamMembers = [
    {
      name: "Arshia Gupta",
      role: "Product Lead",
      description: "Turns wild ideas into structured plans, keeping the product vision sharp and user-first.",
      img: "./src/assets/arshia.jpeg",
      github: "https://github.com/arshiagupta0807",
      linkedin: "https://www.linkedin.com/in/arshia-gupta-ba4672284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      color: "#4A7FA7"
    },
    {
      name: "Nishtha Sood",
      role: "Tech Lead",
      description: "Brains behind the build. Turning caffeine and code into seamless, scalable systems.",
      img: "./src/assets/nishtha.jpeg",
      github: "https://github.com/nishthaasood",
      linkedin: "https://www.linkedin.com/in/nishtha-sood-53a75a306",
      color: "#1A3D63"
    },
    {
      name: "Mansi Bhandari",
      role: "Head Of Operations",
      description: "Keeps the chaos in check, ensuring everything runs smoother than butter on hot toast.",
      img: "./src/assets/mansi.jpeg",
      github: "https://github.com/mansibhandarilab",
      linkedin: "https://www.linkedin.com/in/mansibhandari94872a326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      color: "#B3CFE5"
    },
    {
      name: "Aadhya Sharma",
      role: "UI Designer",
      description: "Designs with heart, making every pixel feel like it belongs in the user’s story.",
      img: "./src/assets/aadhya.jpeg",
      github: "https://github.com/4adhya",
      linkedin: "https://www.linkedin.com/in/aadhya-sharma-225778326",
      color: "#4A7FA7"
    },
    {
      name: "Janvi Mathur",
      role: "Innovation Lead",
      description: "Data whisperer who mixes numbers with creativity to unlock smarter solutions.",
      img: "./src/assets/janvi.jpeg",
      github: "https://github.com",
      linkedin: "http://linkedin.com/in/janvi-mathur-74012a370",
      color: "#1A3D63"
    },
    {
      name: "Upasna Saxena",
      role: "Documentation Head",
      description: "Guardian of clarity. Documenting, organizing, and polishing until perfection shines through.",
      img: "./src/assets/upasna.jpeg",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      color: "#B3CFE5"
    },
  ];

  // Enhanced intersection observer with better performance
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '-20px',
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-card-id');
          setIsVisible(prev => ({
            ...prev,
            [id]: entry.isIntersecting
          }));
        });
      },
      observerOptions
    );

    // Observe all cards
    const cards = document.querySelectorAll('[data-card-id]');
    cards.forEach(card => {
      if (observerRef.current) {
        observerRef.current.observe(card);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Handle image loading errors
  const handleImageError = (event) => {
    event.target.src = "/api/placeholder/320/320";
  };

  return (
    <section className="about-container" aria-label="Meet the Soclique team">
      {/* Hero Section */}
      <div className="team-section">
        <h1 className="section-title">Meet the Soclique Team</h1>

        <p className="team-intro">
          We're a passionate team of innovators building the future of campus connections. 
          Our mission is to unite college communities through smart automation, meaningful 
          interactions, and cutting-edge technology that brings students together across the globe.
        </p>

        {/* Enhanced Team Grid */}
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <article 
              key={index} 
              className={`team-card card-${index + 1}`}
              data-card-id={`card-${index}`}
              tabIndex="0"
              role="article"
              aria-labelledby={`member-name-${index}`}
              aria-describedby={`member-desc-${index}`}
            >
              <div className="card-inner">
                {/* Enhanced Image Container */}
                <div className="member-image-container">
                  <img 
                    src={member.img} 
                    alt={`Portrait of ${member.name}, ${member.role} at Soclique`} 
                    className="member-image" 
                    loading="lazy"
                    onError={handleImageError}
                    width="320"
                    height="320"
                  />
                  
                  {/* Enhanced Overlay with Social Links */}
                  <div className="image-overlay" aria-label="Social media links">
                    <div className="social-links">
                      <a 
                        href={member.github} 
                        className="social-link github" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={`View ${member.name}'s GitHub profile`}
                        title="GitHub Profile"
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                      
                      <a 
                        href={member.linkedin} 
                        className="social-link linkedin" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={`View ${member.name}'s LinkedIn profile`}
                        title="LinkedIn Profile"
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Enhanced Member Information */}
                <div className="member-info">
                  <h3 
                    id={`member-name-${index}`} 
                    className="member-name"
                  >
                    {member.name}
                  </h3>
                  
                  <p className="member-role">{member.role}</p>
                  
                  <p 
                    id={`member-desc-${index}`} 
                    className="member-description"
                  >
                    {member.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;