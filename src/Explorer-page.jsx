import React, { useState, useEffect } from "react";
import { 
  Heart, 
  Search, 
  Brain, 
  Star, 
  Users, 
  Calendar, 
  MapPin,
  Zap,
  Filter,
  TrendingUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  X,
  Eye
} from "lucide-react";
import "./Explorer-page.css";
import SocietyProfile from "./Society-profile";

const ExplorerPage = ({ userProfile = null, onBack }) => {
  const [selectedSociety, setSelectedSociety] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [likedSocieties, setLikedSocieties] = useState({});
  const [favoriteSocieties, setFavoriteSocieties] = useState(new Set());
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [aiModeEnabled, setAiModeEnabled] = useState(true);
  const [showSocietyProfile, setShowSocietyProfile] = useState(false);
  const [imageIntervals, setImageIntervals] = useState({});

  // Dummy user profile for AI matching (when no profile is provided)
  const dummyUserProfile = {
    interests: ["Technology", "Programming", "AI", "Innovation", "Drama", "Theatre", "Community Service"],
    skills: ["JavaScript", "Python", "Web Development", "Acting", "Public Speaking", "Team Leadership"],
    preferences: ["Technical", "Cultural", "Social"],
    experience: ["Coding", "Performance", "Volunteering"]
  };

  // Use provided profile or fallback to dummy
  const currentUserProfile = userProfile || dummyUserProfile;

  // Enhanced society data with AI matching and more details
  const societies = [
    {
      id: 1,
      name: "Anveshan",
      description: "Anveshan is a technology society dedicated to fostering innovation and technical skills. We host coding workshops, hackathons, and seminars on emerging technologies to prepare our members for a future in the tech industry.",
      fullDescription: "Anveshan stands at the forefront of technological innovation in our institution. Our society organizes regular coding bootcamps, AI/ML workshops, web development sessions, and competitive programming contests. We collaborate with industry professionals to provide real-world exposure and internship opportunities. Our members have successfully launched several tech startups and won national-level hackathons.",
      images: ["Anveshan.png", "Anveshan1.png", "Anveshan2.png"],
      likes: 42,
      memberCount: 156,
      eventsCount: 24,
      rating: 4.8,
      tags: ["Technology", "AI/ML", "Web Development", "Competitive Programming", "Innovation"],
      category: "Technical",
      aiMatchScore: 95,
      founded: "2019",
      achievements: [
        "Winner - National Tech Fest 2024",
        "Best Innovation Award 2023",
        "500+ Alumni in Tech Industry"
      ],
      upcomingEvents: [
        { name: "AI Workshop", date: "2024-01-15", type: "Workshop" },
        { name: "Hackathon 2024", date: "2024-02-01", type: "Competition" }
      ],
      socialLinks: {
        instagram: "@anveshan_tech",
        linkedin: "anveshan-society",
        github: "anveshan-org"
      },
      president: {
        name: "Rahul Sharma",
        email: "president@anveshan.com",
        phone: "+91-9876543210"
      }
    },
    {
      id: 2,
      name: "Drishti",
      description: "Drishti is a charity society committed to making a positive impact in our community. We organize donation drives, volunteer for local shelters, and run fundraising events to support various humanitarian causes.",
      fullDescription: "Drishti believes in the power of collective action to create meaningful change. Our initiatives include monthly food distribution drives, educational support for underprivileged children, environmental cleanup campaigns, and health awareness programs. We have partnered with over 15 NGOs and have impacted more than 5000 lives through our various social welfare projects.",
      images: ["Drishti.png", "Drishti1.png", "Drishti2.png"],
      likes: 38,
      memberCount: 89,
      eventsCount: 18,
      rating: 4.6,
      tags: ["Social Service", "Community", "Volunteering", "Environment", "Education"],
      category: "Social",
      aiMatchScore: 67,
      founded: "2020",
      achievements: [
        "5000+ Lives Impacted",
        "15+ NGO Partnerships",
        "Community Service Excellence Award"
      ],
      upcomingEvents: [
        { name: "Beach Cleanup Drive", date: "2024-01-20", type: "Community Service" },
        { name: "Educational Workshop", date: "2024-01-28", type: "Workshop" }
      ],
      socialLinks: {
        instagram: "@drishti_community",
        facebook: "drishti.society"
      },
      president: {
        name: "Priya Singh",
        email: "president@drishti.com",
        phone: "+91-9876543211"
      }
    },
    {
      id: 3,
      name: "Avaran",
      description: "Avaran is the drama society of our college that celebrates the art of theatre and performance. We organize stage plays, street theatre, and creative workshops to inspire expression, storytelling, and social awareness.",
      fullDescription: "Avaran believes in the power of theatre to entertain, educate, and inspire change. Our productions range from classical plays to thought-provoking street performances that address social issues. We conduct workshops on acting, direction, and scriptwriting to nurture talent and creativity.",
      images: ["Avaran1.png", "Avaran2.png", "Avaran3.png"],
      likes: 35,
      memberCount: 67,
      eventsCount: 15,
      rating: 4.7,
      tags: ["Theatre", "Drama", "Performance", "Creativity", "Arts"],
      category: "Cultural",
      aiMatchScore: 78,
      founded: "2018",
      achievements: [
        "Best Drama Society 2023",
        "10+ Successful Productions",
        "Cultural Excellence Award"
      ],
      upcomingEvents: [
        { name: "Annual Theatre Festival", date: "2024-02-15", type: "Festival" },
        { name: "Acting Workshop", date: "2024-01-25", type: "Workshop" }
      ],
      socialLinks: {
        instagram: "@avaran_drama",
        youtube: "avaran-theatre"
      },
      president: {
        name: "Arjun Mehta",
        email: "president@avaran.com",
        phone: "+91-9876543212"
      }
    }
  ];

  // Calculate AI match score based on user profile
  const calculateAIMatch = (society, userProfile) => {
    if (!userProfile || !aiModeEnabled) return null;
    
    let score = 0;
    
    // Base score from society's inherent appeal
    score += society.aiMatchScore || 50;
    
    // Enhance score based on user interests (higher weight)
    if (userProfile.interests) {
      const commonInterests = society.tags.filter(tag => 
        userProfile.interests.some(interest => 
          interest.toLowerCase().includes(tag.toLowerCase()) || 
          tag.toLowerCase().includes(interest.toLowerCase())
        )
      );
      score += commonInterests.length * 8; // Increased weight
    }
    
    // Enhance score based on user skills
    if (userProfile.skills) {
      const relevantSkills = society.tags.filter(tag => 
        userProfile.skills.some(skill => 
          skill.toLowerCase().includes(tag.toLowerCase()) || 
          tag.toLowerCase().includes(skill.toLowerCase())
        )
      );
      score += relevantSkills.length * 5;
    }
    
    // Category preference bonus
    if (userProfile.preferences && userProfile.preferences.includes(society.category)) {
      score += 15;
    }
    
    // Experience relevance bonus
    if (userProfile.experience) {
      const relevantExperience = society.tags.filter(tag =>
        userProfile.experience.some(exp =>
          exp.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(exp.toLowerCase())
        )
      );
      score += relevantExperience.length * 6;
    }
    
    // Normalize score to 0-99 range
    return Math.min(Math.max(score, 10), 99);
  };

  // Get match badge class
  const getMatchBadgeClass = (score) => {
    if (score >= 80) return 'high-match';
    if (score >= 60) return 'medium-match';
    return 'low-match';
  };

  // Initialize current image index for each society
  useEffect(() => {
    const initialIndexes = {};
    const intervals = {};
    
    societies.forEach((society) => {
      initialIndexes[society.id] = 0;
      
      // Auto-rotate images every 5 seconds if there are multiple images
      if (society.images.length > 1) {
        intervals[society.id] = setInterval(() => {
          setCurrentImageIndex(prev => ({
            ...prev,
            [society.id]: (prev[society.id] + 1) % society.images.length
          }));
        }, 5000);
      }
    });
    
    setCurrentImageIndex(initialIndexes);
    setImageIntervals(intervals);
    
    // Cleanup intervals on unmount
    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, []);

  // Navigate to previous image
  const previousImage = (societyId, e) => {
    e.stopPropagation();
    const society = societies.find((s) => s.id === societyId);
    
    // Clear auto-rotation interval
    if (imageIntervals[societyId]) {
      clearInterval(imageIntervals[societyId]);
      setImageIntervals(prev => ({ ...prev, [societyId]: null }));
    }
    
    setCurrentImageIndex((prev) => ({
      ...prev,
      [societyId]: prev[societyId] === 0 ? society.images.length - 1 : prev[societyId] - 1,
    }));
  };

  // Navigate to next image
  const nextImage = (societyId, e) => {
    e.stopPropagation();
    const society = societies.find((s) => s.id === societyId);
    
    // Clear auto-rotation interval
    if (imageIntervals[societyId]) {
      clearInterval(imageIntervals[societyId]);
      setImageIntervals(prev => ({ ...prev, [societyId]: null }));
    }
    
    setCurrentImageIndex((prev) => ({
      ...prev,
      [societyId]: (prev[societyId] + 1) % society.images.length,
    }));
  };

  // Go to specific image
  const goToImage = (societyId, imageIndex, e) => {
    e.stopPropagation();
    
    // Clear auto-rotation interval
    if (imageIntervals[societyId]) {
      clearInterval(imageIntervals[societyId]);
      setImageIntervals(prev => ({ ...prev, [societyId]: null }));
    }
    
    setCurrentImageIndex((prev) => ({
      ...prev,
      [societyId]: imageIndex,
    }));
  };

  // Toggle like for society
  const toggleLike = (societyId, e) => {
    e.stopPropagation();
    setLikedSocieties((prev) => ({
      ...prev,
      [societyId]: !prev[societyId],
    }));
  };

  // Toggle favorite for society
  const toggleFavorite = (societyId, e) => {
    e.stopPropagation();
    setFavoriteSocieties(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(societyId)) {
        newFavorites.delete(societyId);
      } else {
        newFavorites.add(societyId);
      }
      return newFavorites;
    });
  };

  // Open society profile
  const openSocietyProfile = (society) => {
    setSelectedSociety(society);
    setShowSocietyProfile(true);
  };

  // Close society profile
  const closeSocietyProfile = () => {
    setShowSocietyProfile(false);
    setSelectedSociety(null);
  };

  // Handle join society
  const handleJoinSociety = (society) => {
    console.log(`Joining society: ${society.name}`);
    // Add your join logic here
  };

  // Filter and sort societies
  const getFilteredSocieties = () => {
    let filtered = societies;

    // Filter by tab
    if (activeTab === 'favorites') {
      filtered = filtered.filter(society => favoriteSocieties.has(society.id));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(society =>
        society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        society.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        society.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        society.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort societies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'members':
          return b.memberCount - a.memberCount;
        case 'rating':
          return b.rating - a.rating;
        case 'match':
          if (aiModeEnabled) {
            const scoreA = calculateAIMatch(a, currentUserProfile) || 0;
            const scoreB = calculateAIMatch(b, currentUserProfile) || 0;
            return scoreB - scoreA;
          }
          return 0;
        case 'events':
          return b.eventsCount - a.eventsCount;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredSocieties = getFilteredSocieties();

  if (showSocietyProfile) {
    return (
      <SocietyProfile 
        society={selectedSociety} 
        userProfile={currentUserProfile}
        onBack={closeSocietyProfile}
        onJoin={handleJoinSociety}
        onFavorite={(societyId) => toggleFavorite(societyId, { stopPropagation: () => {} })}
        isFavorited={favoriteSocieties.has(selectedSociety?.id)}
      />
    );
  }

  return (
    <div className="explorer-page">
      <div className="explorer-header">
        <h1 className="explorer-title">Discover Societies</h1>
        <p className="explorer-subtitle">
          Find your perfect community and connect with like-minded people
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="explorer-tabs">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <Users size={18} />
          All Societies
        </button>
        <button
          className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <Heart size={18} />
          Favorites ({favoriteSocieties.size})
        </button>
      </div>

      {/* Controls */}
      <div className="explorer-controls">
        <div className="search-sort-container">
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search societies, categories, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="members">Sort by Members</option>
            <option value="rating">Sort by Rating</option>
            <option value="events">Sort by Events</option>
            {aiModeEnabled && <option value="match">Sort by AI Match</option>}
          </select>
        </div>

        <button
          className={`ai-toggle ${aiModeEnabled ? 'active' : ''}`}
          onClick={() => setAiModeEnabled(!aiModeEnabled)}
          title={aiModeEnabled ? 'Disable AI matching' : 'Enable AI matching'}
        >
          <Brain size={18} />
          AI Match
        </button>
      </div>

      {/* Societies Grid */}
      {filteredSocieties.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            {activeTab === 'favorites' ? '💙' : '🔍'}
          </div>
          <h3>
            {activeTab === 'favorites' 
              ? 'No favorite societies yet' 
              : 'No societies found'
            }
          </h3>
          <p>
            {activeTab === 'favorites'
              ? 'Start exploring and add societies to your favorites!'
              : 'Try adjusting your search terms or filters.'
            }
          </p>
        </div>
      ) : (
        <div className="societies-grid">
          {filteredSocieties.map((society) => {
            const aiMatch = calculateAIMatch(society, currentUserProfile);
            const isFavorited = favoriteSocieties.has(society.id);
            
            return (
              <div
                key={society.id}
                className={`society-card ${isFavorited ? 'favorited' : ''}`}
                onClick={() => openSocietyProfile(society)}
              >
                {/* AI Match Badge - Enhanced visibility when AI mode is enabled */}
                {aiModeEnabled && (
                  <div className={`ai-match-badge ${aiMatch ? getMatchBadgeClass(aiMatch) : 'no-match'}`}>
                    <Zap size={14} />
                    {aiMatch ? `${aiMatch}% Match` : 'No Match Data'}
                  </div>
                )}

                {/* Favorite Button - Fixed positioning and visibility */}
                <button
                  className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
                  onClick={(e) => toggleFavorite(society.id, e)}
                  title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                  aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart 
                    size={22} 
                    fill={isFavorited ? 'currentColor' : 'none'}
                    strokeWidth={isFavorited ? 2 : 2.5}
                  />
                </button>

                {/* Photo Gallery Section */}
                <div className="photo-gallery">
                  <div className="gallery-container">
                    {society.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${society.name} ${index + 1}`}
                        className={`gallery-image ${
                          currentImageIndex[society.id] === index ? "active" : ""
                        }`}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`;
                        }}
                      />
                    ))}

                    {/* Navigation Arrows */}
                    {society.images.length > 1 && (
                      <>
                        <button
                          className="nav-arrow prev"
                          onClick={(e) => previousImage(society.id, e)}
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          className="nav-arrow next"
                          onClick={(e) => nextImage(society.id, e)}
                          aria-label="Next image"
                        >
                          <ChevronRight size={20} />
                        </button>

                        {/* Photo Dots Indicator */}
                        <div className="photo-dots">
                          {society.images.map((_, index) => (
                            <span
                              key={index}
                              className={`dot ${
                                currentImageIndex[society.id] === index ? "active" : ""
                              }`}
                              onClick={(e) => goToImage(society.id, index, e)}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <h2 className="society-name">{society.name}</h2>
                  <p className="society-description">{society.description}</p>

                  {/* Society Stats */}
                  <div className="society-stats">
                    <div className="stat-item">
                      <Users size={14} />
                      <span>{society.memberCount} members</span>
                    </div>
                    <div className="stat-item">
                      <Calendar size={14} />
                      <span>{society.eventsCount} events</span>
                    </div>
                    <div className="stat-item">
                      <Star size={14} />
                      <span>{society.rating}/5</span>
                    </div>
                    <div className="stat-item">
                      <MapPin size={14} />
                      <span>{society.category}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="card-actions">
                    <button
                      className={`like-button ${
                        likedSocieties[society.id] ? "liked" : ""
                      }`}
                      onClick={(e) => toggleLike(society.id, e)}
                      aria-label={`Like ${society.name}`}
                    >
                      <span className="like-icon">
                        {likedSocieties[society.id] ? "❤️" : "🤍"}
                      </span>
                      <span>
                        {society.likes +
                          (likedSocieties[society.id] ? 1 : 0)}{" "}
                        likes
                      </span>
                    </button>

                    <button 
                      className="know-more-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openSocietyProfile(society);
                      }}
                    >
                      <Eye size={16} />
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExplorerPage;