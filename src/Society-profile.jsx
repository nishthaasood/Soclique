import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  UserPlus, 
  Users, 
  Calendar, 
  Star, 
  Award, 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Github, 
  Youtube,
  Image as ImageIcon,
  Zap,
  Clock,
  Target,
  TrendingUp,
  X,
  ExternalLink,
  Share2,
  Eye,
  MessageCircle
} from 'lucide-react';
import './Society-profile.css';

const SocietyProfile = ({ 
  society, 
  userProfile, 
  onBack, 
  onJoin, 
  onFavorite, 
  isFavorited 
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [aiMatchScore, setAiMatchScore] = useState(null);
  const [isJoining, setIsJoining] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  // Calculate AI match score
  useEffect(() => {
    if (userProfile && society) {
      let score = society.aiMatchScore || 0;
      
      // Enhance score based on user interests
      if (userProfile.interests) {
        const commonInterests = society.tags.filter(tag => 
          userProfile.interests.some(interest => 
            interest.toLowerCase().includes(tag.toLowerCase()) || 
            tag.toLowerCase().includes(interest.toLowerCase())
          )
        );
        score += commonInterests.length * 5;
      }
      
      // Enhance score based on user skills
      if (userProfile.skills) {
        const relevantSkills = society.tags.filter(tag => 
          userProfile.skills.some(skill => 
            skill.toLowerCase().includes(tag.toLowerCase()) || 
            tag.toLowerCase().includes(skill.toLowerCase())
          )
        );
        score += relevantSkills.length * 3;
      }
      
      setAiMatchScore(Math.min(score, 99));
    }
  }, [society, userProfile]);

  // Handle image load error
  const handleImageError = (imageUrl, index) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [imageUrl]: true
    }));
  };

  // Get fallback image
  const getFallbackImage = () => {
    return `https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`;
  };

  const getSocialIcon = (platform) => {
    const iconProps = { size: 18 };
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram {...iconProps} />;
      case 'facebook': return <Facebook {...iconProps} />;
      case 'linkedin': return <Linkedin {...iconProps} />;
      case 'github': return <Github {...iconProps} />;
      case 'youtube': return <Youtube {...iconProps} />;
      default: return <ExternalLink {...iconProps} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en', { month: 'short' })
    };
  };

  const getMatchBadgeClass = (score) => {
    if (score >= 80) return 'high-match';
    if (score >= 60) return 'medium-match';
    return 'low-match';
  };

  const handleJoinClick = async () => {
    if (isJoining) return;
    
    setIsJoining(true);
    try {
      await onJoin(society);
      // You could show a success message here
    } catch (error) {
      console.error('Error joining society:', error);
      // You could show an error message here
    } finally {
      setIsJoining(false);
    }
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowShareMenu(false);
      // You could show a toast message here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  if (!society) return null;

  return (
    <div className="sprof-society-profile">
      {/* Header Section */}
      <div className="sprof-society-header">
        {society.images && society.images[0] && !imageLoadErrors[society.images[0]] && (
          <div 
            className="sprof-header-background" 
            style={{ backgroundImage: `url(${society.images[0]})` }}
            onError={() => handleImageError(society.images[0], 0)}
          />
        )}
        <div className="sprof-header-overlay" />
        
        <div className="sprof-header-content">
          <div className="sprof-header-top">
            <button className="sprof-back-button" onClick={onBack}>
              <ArrowLeft size={20} />
              Back to Explorer
            </button>
            
            <div className="sprof-header-actions">
              <button 
                className={`sprof-favorite-button ${isFavorited ? 'favorited' : ''}`}
                onClick={() => onFavorite(society.id)}
                title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart 
                  size={18} 
                  fill={isFavorited ? 'currentColor' : 'none'} 
                />
                {isFavorited ? 'Favorited' : 'Add to Favorites'}
              </button>

              <div className="sprof-share-container" style={{ position: 'relative' }}>
                <button className="sprof-share-button" onClick={handleShare}>
                  <Share2 size={18} />
                  Share
                </button>
                {showShareMenu && (
                  <div className="sprof-share-menu">
                    <button onClick={() => copyToClipboard(window.location.href)}>
                      Copy Link
                    </button>
                  </div>
                )}
              </div>
              
              <button 
                className="sprof-join-button" 
                onClick={handleJoinClick}
                disabled={isJoining}
              >
                <UserPlus size={18} />
                {isJoining ? 'Joining...' : 'Join Society'}
              </button>
            </div>
          </div>

          <div className="sprof-society-info">
            <div className="sprof-society-logo">
              {society.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="sprof-society-details">
              <h1 className="sprof-society-name">{society.name}</h1>
              <div className="sprof-society-category">{society.category}</div>
              <p className="sprof-society-description">{society.fullDescription || society.description}</p>
              
              <div className="sprof-society-stats">
                <div className="sprof-stat-item">
                  <span className="sprof-stat-number">{society.memberCount}</span>
                  <span className="sprof-stat-label">Members</span>
                </div>
                <div className="sprof-stat-item">
                  <span className="sprof-stat-number">{society.eventsCount}</span>
                  <span className="sprof-stat-label">Events</span>
                </div>
                <div className="sprof-stat-item">
                  <span className="sprof-stat-number">{society.rating}</span>
                  <span className="sprof-stat-label">Rating</span>
                </div>
                <div className="sprof-stat-item">
                  <span className="sprof-stat-number">{society.founded}</span>
                  <span className="sprof-stat-label">Founded</span>
                </div>
              </div>

              {aiMatchScore && aiMatchScore > 0 && (
                <div className="sprof-ai-match-section">
                  <Zap size={28} />
                  <div>
                    <div className="sprof-match-score">{aiMatchScore}%</div>
                    <div className="sprof-match-description">AI Match Score</div>
                  </div>
                  <div className="sprof-match-description">
                    Based on your interests and skills, this society is a {aiMatchScore >= 80 ? 'perfect' : aiMatchScore >= 60 ? 'great' : 'good'} match for you!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="sprof-society-content">
        <div className="sprof-main-content">
          {/* About Section */}
          <div className="sprof-content-card">
            <h2 className="sprof-card-title">
              <Users size={24} />
              About {society.name}
            </h2>
            <div className="sprof-card-content">
              <p>{society.fullDescription || society.description}</p>
              
              {society.tags && society.tags.length > 0 && (
                <div className="sprof-tags-container">
                  {society.tags.map((tag, index) => (
                    <span key={index} className="sprof-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Gallery Section */}
          {society.images && society.images.length > 0 && (
            <div className="sprof-content-card">
              <h2 className="sprof-card-title">
                <ImageIcon size={24} />
                Gallery
              </h2>
              <div className="sprof-gallery-grid">
                {society.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="sprof-gallery-item"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={imageLoadErrors[image] ? getFallbackImage() : image} 
                      alt={`${society.name} ${index + 1}`}
                      loading="lazy"
                      onError={() => handleImageError(image, index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events */}
          {society.upcomingEvents && society.upcomingEvents.length > 0 && (
            <div className="sprof-content-card">
              <h2 className="sprof-card-title">
                <Calendar size={24} />
                Upcoming Events
              </h2>
              <div className="sprof-events-list">
                {society.upcomingEvents.map((event, index) => {
                  const eventDate = formatDate(event.date);
                  return (
                    <div key={index} className="sprof-event-item">
                      <div className="sprof-event-date">
                        <span className="sprof-event-day">{eventDate.day}</span>
                        <span className="sprof-event-month">{eventDate.month}</span>
                      </div>
                      <div className="sprof-event-info">
                        <h3>{event.name}</h3>
                        <div className="sprof-event-type">{event.type}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Achievements */}
          {society.achievements && society.achievements.length > 0 && (
            <div className="sprof-content-card">
              <h2 className="sprof-card-title">
                <Award size={24} />
                Achievements & Recognition
              </h2>
              <div className="sprof-achievements-list">
                {society.achievements.map((achievement, index) => (
                  <div key={index} className="sprof-achievement-item">
                    <Award className="sprof-achievement-icon" size={20} />
                    <span className="sprof-achievement-text">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="sprof-sidebar">
          {/* Contact Information */}
          {society.president && (
            <div className="sprof-sidebar-card">
              <h3 className="sprof-sidebar-title">
                <Mail size={20} />
                Contact Information
              </h3>
              <div className="sprof-contact-list">
                <div className="sprof-contact-item">
                  <Users className="sprof-contact-icon" size={18} />
                  <span>{society.president.name} (President)</span>
                </div>
                {society.president.email && (
                  <div className="sprof-contact-item">
                    <Mail className="sprof-contact-icon" size={18} />
                    <a href={`mailto:${society.president.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {society.president.email}
                    </a>
                  </div>
                )}
                {society.president.phone && (
                  <div className="sprof-contact-item">
                    <Phone className="sprof-contact-icon" size={18} />
                    <a href={`tel:${society.president.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {society.president.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Social Media Links */}
          {society.socialLinks && Object.keys(society.socialLinks).length > 0 && (
            <div className="sprof-sidebar-card">
              <h3 className="sprof-sidebar-title">
                <Instagram size={20} />
                Follow Us
              </h3>
              <div className="sprof-social-links">
                {Object.entries(society.socialLinks).map(([platform, handle]) => (
                  <a 
                    key={platform} 
                    href="#" 
                    className="sprof-social-link"
                    onClick={(e) => e.preventDefault()}
                    title={`Follow us on ${platform}`}
                  >
                    <div className="sprof-social-icon">
                      {getSocialIcon(platform)}
                    </div>
                    <span>{handle}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="sprof-sidebar-card">
            <h3 className="sprof-sidebar-title">
              <TrendingUp size={20} />
              Quick Stats
            </h3>
            <div className="sprof-quick-stats">
              <div className="sprof-quick-stat">
                <span className="sprof-quick-stat-label">Active Members</span>
                <span className="sprof-quick-stat-value">{society.memberCount}</span>
              </div>
              <div className="sprof-quick-stat">
                <span className="sprof-quick-stat-label">Events This Year</span>
                <span className="sprof-quick-stat-value">{society.eventsCount}</span>
              </div>
              <div className="sprof-quick-stat">
                <span className="sprof-quick-stat-label">Rating</span>
                <span className="sprof-quick-stat-value">{society.rating}/5.0</span>
              </div>
              <div className="sprof-quick-stat">
                <span className="sprof-quick-stat-label">Category</span>
                <span className="sprof-quick-stat-value">{society.category}</span>
              </div>
              {society.founded && (
                <div className="sprof-quick-stat">
                  <span className="sprof-quick-stat-label">Established</span>
                  <span className="sprof-quick-stat-value">{society.founded}</span>
                </div>
              )}
            </div>
          </div>

          {/* How to Join */}
          <div className="sprof-sidebar-card">
            <h3 className="sprof-sidebar-title">
              <Target size={20} />
              How to Join
            </h3>
            <div className="sprof-join-steps">
              <div className="sprof-join-step">
                <div className="sprof-step-number">1</div>
                <div className="sprof-step-text">
                  Click the "Join Society" button above
                </div>
              </div>
              <div className="sprof-join-step">
                <div className="sprof-step-number">2</div>
                <div className="sprof-step-text">
                  Fill out the membership application form
                </div>
              </div>
              <div className="sprof-join-step">
                <div className="sprof-step-number">3</div>
                <div className="sprof-step-text">
                  Attend the orientation session
                </div>
              </div>
              <div className="sprof-join-step">
                <div className="sprof-step-number">4</div>
                <div className="sprof-step-text">
                  Start participating in events and activities!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="sprof-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="sprof-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="sprof-modal-close" 
              onClick={() => setSelectedImage(null)}
              aria-label="Close image modal"
            >
              <X size={24} />
            </button>
            <img 
              src={imageLoadErrors[selectedImage] ? getFallbackImage() : selectedImage} 
              alt="Gallery item" 
              className="sprof-modal-image"
              onError={() => handleImageError(selectedImage, -1)}
            />
          </div>
        </div>
      )}

      {/* Share Menu Styles (inline for simplicity) */}
      <style jsx>{`
        .sprof-share-container {
          position: relative;
        }
        
        .sprof-share-button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: rgba(0, 212, 170, 0.15);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(0, 212, 170, 0.25);
          border-radius: var(--radius-full);
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-bounce);
          font-weight: 600;
          font-size: 1rem;
          box-shadow: var(--shadow-soft);
        }
        
        .sprof-share-button:hover {
          background: rgba(0, 212, 170, 0.25);
          transform: translateY(-3px);
          box-shadow: var(--shadow-medium);
          border-color: rgba(0, 212, 170, 0.4);
        }
        
        .sprof-share-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: var(--bg-secondary);
          border: 2px solid rgba(179, 207, 229, 0.2);
          border-radius: var(--radius-md);
          padding: 0.5rem;
          box-shadow: var(--shadow-strong);
          z-index: 1000;
          min-width: 120px;
        }
        
        .sprof-share-menu button {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 0.9rem;
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: background var(--transition-normal);
        }
        
        .sprof-share-menu button:hover {
          background: rgba(179, 207, 229, 0.15);
        }
      `}</style>
    </div>
  );
};

export default SocietyProfile;