import React, { useState, useEffect } from 'react';
import { 
  User, 
  Edit3, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Code, 
  Save, 
  X, 
  Plus,
  Award,
  Target,
  TrendingUp,
  Clock,
  Users,
  Star,
  Settings,
  Bell,
  Shield,
  Download,
  ArrowLeft
} from 'lucide-react';
import './User-Profile.css';

const UserProfile = ({ 
  userProfile, 
  setUserProfile, 
  onSetupComplete,
  onBackToMain 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile || {});
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sample data - in a real app, this would come from an API
  const [profileData, setProfileData] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    college: userProfile?.college || '',
    department: userProfile?.department || '',
    year: userProfile?.year || '',
    bio: userProfile?.bio || '',
    avatar: userProfile?.avatar || null,
    role: userProfile?.role || 'Student',
    joinDate: userProfile?.joinDate || new Date().toISOString().split('T')[0],
    skills: userProfile?.skills || [],
    interests: userProfile?.interests || [],
    societiesMember: userProfile?.societiesMember || 0,
    eventsAttended: userProfile?.eventsAttended || 0,
    achievementPoints: userProfile?.achievementPoints || 0
  });

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'event',
      title: 'Attended Tech Workshop',
      description: 'Participated in AI & ML fundamentals workshop',
      date: '2024-01-15',
      icon: 'graduation'
    },
    {
      id: 2,
      type: 'society',
      title: 'Joined Coding Society',
      description: 'Became a member of the college coding society',
      date: '2024-01-10',
      icon: 'users'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Profile Completed',
      description: 'Successfully set up your profile with all details',
      date: '2024-01-08',
      icon: 'award'
    }
  ]);

  const availableSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'HTML/CSS',
    'Machine Learning', 'Data Analysis', 'UI/UX Design', 'Project Management',
    'Public Speaking', 'Leadership', 'Photography', 'Content Writing'
  ];

  const availableInterests = [
    'Technology', 'Artificial Intelligence', 'Web Development', 'Mobile Apps',
    'Data Science', 'Cybersecurity', 'Blockchain', 'IoT', 'Robotics',
    'Photography', 'Music', 'Sports', 'Reading', 'Travel', 'Gaming',
    'Volunteering', 'Environment', 'Social Work', 'Entrepreneurship'
  ];

  useEffect(() => {
    setEditedProfile(profileData);
  }, [profileData]);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProfileData(editedProfile);
      setUserProfile(editedProfile);
      setIsEditing(false);
      
      // In a real app, you would make an API call here
      console.log('Profile saved:', editedProfile);
      
      // If there's a setup complete handler, use it
      if (onSetupComplete) {
        onSetupComplete();
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedProfile(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !editedProfile.skills?.includes(newSkill.trim())) {
      setEditedProfile(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setEditedProfile(prev => ({
      ...prev,
      skills: prev.skills?.filter(skill => skill !== skillToRemove) || []
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !editedProfile.interests?.includes(newInterest.trim())) {
      setEditedProfile(prev => ({
        ...prev,
        interests: [...(prev.interests || []), newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interestToRemove) => {
    setEditedProfile(prev => ({
      ...prev,
      interests: prev.interests?.filter(interest => interest !== interestToRemove) || []
    }));
  };

  const toggleAvailableSkill = (skill) => {
    const currentSkills = editedProfile.skills || [];
    if (currentSkills.includes(skill)) {
      removeSkill(skill);
    } else {
      setEditedProfile(prev => ({
        ...prev,
        skills: [...currentSkills, skill]
      }));
    }
  };

  const toggleAvailableInterest = (interest) => {
    const currentInterests = editedProfile.interests || [];
    if (currentInterests.includes(interest)) {
      removeInterest(interest);
    } else {
      setEditedProfile(prev => ({
        ...prev,
        interests: [...currentInterests, interest]
      }));
    }
  };

  const renderActivityIcon = (type) => {
    switch (type) {
      case 'event':
        return <Calendar size={18} />;
      case 'society':
        return <Users size={18} />;
      case 'achievement':
        return <Award size={18} />;
      default:
        return <Star size={18} />;
    }
  };

  const getProfileCompletion = () => {
    const currentData = isEditing ? editedProfile : profileData;
    let completed = 0;
    let total = 4;

    if (currentData.name && currentData.email) completed += 1;
    if ((currentData.skills?.length || 0) > 0 && (currentData.interests?.length || 0) > 0) completed += 1;
    if (currentData.bio && currentData.college) completed += 1;
    if (currentData.department && currentData.year) completed += 1;

    return Math.round((completed / total) * 100);
  };

  const currentData = isEditing ? editedProfile : profileData;

  return (
    <div className="uprof-container">
      {/* Back Button */}
      {onBackToMain && (
        <div style={{ 
          position: 'absolute', 
          top: 'var(--uprof-space-lg)', 
          left: 'var(--uprof-space-lg)', 
          zIndex: 10 
        }}>
          <button
            onClick={onBackToMain}
            className="uprof-btn uprof-btn-ghost"
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <ArrowLeft size={16} />
            Back to Platform
          </button>
        </div>
      )}

      <div className="uprof-header">
        <h1 className="uprof-title">Your Profile</h1>
        <p className="uprof-subtitle">
          Manage your personal information and build your digital presence
        </p>
      </div>

      <div className="uprof-content">
        {/* Sidebar - Profile Overview */}
        <div className="uprof-sidebar">
          {/* Profile Avatar Card */}
          <div className="uprof-card">
            <div className="uprof-avatar-section">
              <div className="uprof-avatar-container">
                <div className="uprof-avatar">
                  {currentData.avatar ? (
                    <img src={currentData.avatar} alt="Profile" />
                  ) : (
                    currentData.name?.charAt(0)?.toUpperCase() || 'U'
                  )}
                  {isEditing && (
                    <button className="uprof-avatar-upload-btn" title="Change Avatar">
                      <Camera size={16} />
                    </button>
                  )}
                </div>
              </div>
              <h3 className="uprof-name">
                {currentData.name || 'Your Name'}
              </h3>
              <div className="uprof-role">{currentData.role}</div>
              
              <div className="uprof-stats">
                <div className="uprof-stat-item">
                  <span className="uprof-stat-number">{currentData.societiesMember || 0}</span>
                  <span className="uprof-stat-label">Societies</span>
                </div>
                <div className="uprof-stat-item">
                  <span className="uprof-stat-number">{currentData.eventsAttended || 0}</span>
                  <span className="uprof-stat-label">Events</span>
                </div>
                <div className="uprof-stat-item">
                  <span className="uprof-stat-number">{currentData.achievementPoints || 0}</span>
                  <span className="uprof-stat-label">Points</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Completion Card */}
          <div className="uprof-card">
            <h3 className="uprof-card-title">
              <TrendingUp className="uprof-card-icon" />
              Profile Completion
            </h3>
            <div className="uprof-progress-container">
              <div className="uprof-progress-item">
                <span className="uprof-progress-label">Overall Progress</span>
                <span className="uprof-progress-percentage">{getProfileCompletion()}%</span>
              </div>
              <div className="uprof-progress-bar">
                <div 
                  className="uprof-progress-fill" 
                  style={{ width: `${getProfileCompletion()}%` }}
                ></div>
              </div>

              <div className="uprof-progress-item" style={{ marginTop: 'var(--uprof-space-md)' }}>
                <div>
                  <span className="uprof-progress-label">Basic Info</span>
                  <span className="uprof-progress-percentage">
                    {currentData.name && currentData.email ? '100%' : '50%'}
                  </span>
                </div>
              </div>
              <div className="uprof-progress-bar">
                <div 
                  className="uprof-progress-fill" 
                  style={{ width: currentData.name && currentData.email ? '100%' : '50%' }}
                ></div>
              </div>

              <div className="uprof-progress-item">
                <div>
                  <span className="uprof-progress-label">Skills & Interests</span>
                  <span className="uprof-progress-percentage">
                    {(currentData.skills?.length || 0) > 0 && (currentData.interests?.length || 0) > 0 ? '100%' : '0%'}
                  </span>
                </div>
              </div>
              <div className="uprof-progress-bar">
                <div 
                  className="uprof-progress-fill" 
                  style={{ width: (currentData.skills?.length || 0) > 0 && (currentData.interests?.length || 0) > 0 ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="uprof-card">
            <h3 className="uprof-card-title">
              <Clock className="uprof-card-icon" />
              Recent Activity
            </h3>
            <div className="uprof-activity-feed">
              {recentActivities.slice(0, 3).map(activity => (
                <div key={activity.id} className="uprof-activity-item">
                  <div className="uprof-activity-icon">
                    {renderActivityIcon(activity.type)}
                  </div>
                  <div className="uprof-activity-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <span className="uprof-activity-date">
                      {new Date(activity.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="uprof-main">
          {/* Personal Information Card */}
          <div className="uprof-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--uprof-space-md)' }}>
              <h3 className="uprof-card-title">
                <User className="uprof-card-icon" />
                Personal Information
              </h3>
              {!isEditing && (
                <button 
                  className="uprof-btn uprof-btn-secondary"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit3 size={16} />
                  Edit
                </button>
              )}
            </div>

            <form className="uprof-form">
              <div className="uprof-form-row">
                <div className="uprof-form-group">
                  <label className="uprof-form-label">Full Name</label>
                  <input
                    type="text"
                    className="uprof-form-input"
                    value={currentData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="uprof-form-group">
                  <label className="uprof-form-label">Email Address</label>
                  <input
                    type="email"
                    className="uprof-form-input"
                    value={currentData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    placeholder="your.email@college.edu"
                  />
                </div>
              </div>

              <div className="uprof-form-row">
                <div className="uprof-form-group">
                  <label className="uprof-form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="uprof-form-input"
                    value={currentData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="uprof-form-group">
                  <label className="uprof-form-label">College</label>
                  <input
                    type="text"
                    className="uprof-form-input"
                    value={currentData.college || ''}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Your College Name"
                  />
                </div>
              </div>

              <div className="uprof-form-row">
                <div className="uprof-form-group">
                  <label className="uprof-form-label">Department</label>
                  <select
                    className="uprof-form-select"
                    value={currentData.department || ''}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics & Communication</option>
                    <option value="Mechanical">Mechanical Engineering</option>
                    <option value="Civil">Civil Engineering</option>
                    <option value="Electrical">Electrical Engineering</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="uprof-form-group">
                  <label className="uprof-form-label">Academic Year</label>
                  <select
                    className="uprof-form-select"
                    value={currentData.year || ''}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                  </select>
                </div>
              </div>

              <div className="uprof-form-group">
                <label className="uprof-form-label">Bio</label>
                <textarea
                  className="uprof-form-textarea"
                  value={currentData.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                  rows="4"
                />
              </div>
            </form>
          </div>

          {/* Skills Card */}
          <div className="uprof-card">
            <h3 className="uprof-card-title">
              <Code className="uprof-card-icon" />
              Skills & Expertise
            </h3>
            
            {isEditing && (
              <div style={{ marginBottom: 'var(--uprof-space-md)' }}>
                <p style={{ color: 'var(--uprof-text-secondary)', fontSize: 'var(--uprof-text-sm)', marginBottom: 'var(--uprof-space-sm)' }}>
                  Select skills from the list or add your own
                </p>
                <div className="uprof-tags-container">
                  {availableSkills.map(skill => (
                    <div
                      key={skill}
                      className={`uprof-tag ${(currentData.skills || []).includes(skill) ? 'uprof-tag-selected' : ''}`}
                      onClick={() => toggleAvailableSkill(skill)}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', gap: 'var(--uprof-space-xs)', marginTop: 'var(--uprof-space-sm)' }}>
                  <input
                    type="text"
                    className="uprof-form-input"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add custom skill..."
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button 
                    type="button"
                    className="uprof-btn uprof-btn-secondary"
                    onClick={addSkill}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}

            <div className="uprof-tags-container">
              {(currentData.skills || []).map(skill => (
                <div key={skill} className={`uprof-tag uprof-tag-selected ${isEditing ? 'uprof-tag-removable' : ''}`}>
                  {skill}
                  {isEditing && (
                    <button 
                      type="button"
                      className="uprof-tag-remove"
                      onClick={() => removeSkill(skill)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {(currentData.skills || []).length === 0 && (
                <p style={{ color: 'var(--uprof-text-muted)', fontStyle: 'italic' }}>
                  {isEditing ? 'Select or add your skills above' : 'No skills added yet'}
                </p>
              )}
            </div>
          </div>

          {/* Interests Card */}
          <div className="uprof-card">
            <h3 className="uprof-card-title">
              <Heart className="uprof-card-icon" />
              Interests & Hobbies
            </h3>
            
            {isEditing && (
              <div style={{ marginBottom: 'var(--uprof-space-md)' }}>
                <p style={{ color: 'var(--uprof-text-secondary)', fontSize: 'var(--uprof-text-sm)', marginBottom: 'var(--uprof-space-sm)' }}>
                  Select interests from the list or add your own
                </p>
                <div className="uprof-tags-container">
                  {availableInterests.map(interest => (
                    <div
                      key={interest}
                      className={`uprof-tag ${(currentData.interests || []).includes(interest) ? 'uprof-tag-selected' : ''}`}
                      onClick={() => toggleAvailableInterest(interest)}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', gap: 'var(--uprof-space-xs)', marginTop: 'var(--uprof-space-sm)' }}>
                  <input
                    type="text"
                    className="uprof-form-input"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add custom interest..."
                    onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                  />
                  <button 
                    type="button"
                    className="uprof-btn uprof-btn-secondary"
                    onClick={addInterest}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}

            <div className="uprof-tags-container">
              {(currentData.interests || []).map(interest => (
                <div key={interest} className={`uprof-tag uprof-tag-selected ${isEditing ? 'uprof-tag-removable' : ''}`}>
                  {interest}
                  {isEditing && (
                    <button 
                      type="button"
                      className="uprof-tag-remove"
                      onClick={() => removeInterest(interest)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {(currentData.interests || []).length === 0 && (
                <p style={{ color: 'var(--uprof-text-muted)', fontStyle: 'italic' }}>
                  {isEditing ? 'Select or add your interests above' : 'No interests added yet'}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="uprof-actions">
              <button 
                className={`uprof-btn uprof-btn-primary ${isLoading ? 'uprof-btn-loading' : ''}`}
                onClick={handleSaveProfile}
                disabled={isLoading}
              >
                <Save size={16} />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                className="uprof-btn uprof-btn-secondary"
                onClick={handleCancelEdit}
                disabled={isLoading}
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          )}

          {!isEditing && (
            <div className="uprof-actions">
              <button 
                className="uprof-btn uprof-btn-primary"
                onClick={() => window.print()}
              >
                <Download size={16} />
                Export Profile
              </button>
              <button 
                className="uprof-btn uprof-btn-secondary"
                onClick={() => setIsEditing(true)}
              >
                <Settings size={16} />
                Account Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;