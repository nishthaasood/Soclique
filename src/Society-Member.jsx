import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Calendar, 
  Trophy, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  ArrowLeft,
  Bell,
  Upload,
  Download,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Brain,
  FileText,
  Target,
  Clock,
  ThumbsUp,
  UserCheck,
  Zap,
  Award,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import './Society-Member.css';

const SocietyHead = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const modalRef = useRef(null);

  // Sample data - in a real app, this would come from an API
  const [societyData] = useState({
    name: "ABC SOCIETY",
    memberCount: 142,
    activeEvents: 5,
    totalEvents: 23,
    rating: 4.8,
    founded: "2019"
  });

  const [members, setMembers] = useState([
    { id: 1, name: "Nishtha Sood", email: "soodnishtha@soclique.com", phone: "+91-9876543210", role: "Core Member", status: "Active", joinDate: "2023-08-15", department: "CSE" },
    { id: 2, name: "Aadhya Sharma", email: "aadhya017@example.com", phone: "+91-9876543211", role: "Volunteer", status: "Active", joinDate: "2023-09-20", department: "ECE" },
    { id: 3, name: "Mansi Bhandari", email: "mansibhandari9@example.com", phone: "+91-9876543212", role: "Core Member", status: "Inactive", joinDate: "2023-07-10", department: "IT" },
    { id: 4, name: "Arshia Gupta", email: "arshiaa1@example.com", phone: "+91-9876543213", role: "Core Member", status: "Active", joinDate: "2023-10-05", department: "CSE" },
    { id: 4, name: "Janvi Mathur", email: "mathur89@example.com", phone: "+91-9876543213", role: "Junior Council", status: "Active", joinDate: "2023-10-08", department: "CSE" },
    { id: 4, name: "Upasna Saxena", email: "supasna2@example.com", phone: "+91-9876543213", role: "Member", status: "Inactive", joinDate: "2023-10-09", department: "CSE" }
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: "Tech Talk: AI & ML", date: "2024-01-15", time: "14:00", venue: "Auditorium A", status: "Upcoming", attendees: 85, description: "Learn about the latest in AI and Machine Learning" },
    { id: 2, title: "Coding Bootcamp", date: "2024-01-20", time: "10:00", venue: "Lab 1", status: "Upcoming", attendees: 45, description: "Intensive coding workshop for beginners" },
    { id: 3, title: "Hackathon 2024", date: "2024-02-01", time: "09:00", venue: "Main Hall", status: "Planning", attendees: 120, description: "24-hour coding marathon with exciting prizes" }
  ]);

  const [activities, setActivities] = useState([
    { id: 1, title: "Workshop Registration Open", date: "2024-01-10", type: "Announcement", description: "Registration for upcoming workshops is now open" },
    { id: 2, title: "Orientation 2025", date: "2024-01-08", type: "Event", description: "Welcome session for new society members" },
    { id: 3, title: "Achievement: Best Society Award", date: "2024-01-05", type: "Achievement", description: "Our society won the Best Technical Society award" }
  ]);

  // AI Insights Data
  const [aiInsights] = useState({
    memberEngagement: {
      activeMembers: 89,
      inactiveMembers: 53,
      engagementRate: 73,
      trend: "up"
    },
    eventAnalytics: {
      avgAttendance: 85,
      popularEventTypes: ["Workshops", "Tech Talks", "Hackathons"],
      bestPerformingEvent: "AI Workshop 2024",
      worstPerformingEvent: "Study Session #3"
    },
    insights: [
      "Member engagement has increased by 15% this month",
      "Workshop events show 40% higher attendance than lectures",
      "New members are 60% more likely to attend hands-on events",
      "Evening events (6-8 PM) have optimal attendance rates"
    ],
    reports: {
      lastEventReport: {
        eventName: "AI & ML Workshop",
        date: "2024-01-15",
        attendance: 89,
        feedback: 4.6,
        highlights: [
          "95% attendee satisfaction rate",
          "Strong networking opportunities created",
          "3 follow-up project collaborations initiated",
          "Requested more advanced sessions"
        ],
        improvements: [
          "Extend session duration by 30 minutes",
          "Provide more hands-on coding time",
          "Include Q&A session at the end"
        ]
      }
    },
    predictions: [
      "Next hackathon event likely to have 120+ registrations",
      "Core member retention rate expected to be 92%",
      "Technical workshops show highest growth potential"
    ]
  });

  // Filter members based on search and status
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || member.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Modal handlers
  const openModal = (type, data = null) => {
    setModalType(type);
    setSelectedMember(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  // Handle form submissions
  const handleMemberSubmit = (e) => {
    e.preventDefault();
    console.log('Member form submitted');
    closeModal();
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    console.log('Event form submitted');
    closeModal();
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const renderDashboard = () => (
    <div className="soc-dashboard-content">
      {/* Stats Cards */}
      <div className="soc-stats-grid">
        <div className="soc-stat-card">
          <div className="soc-stat-icon">
            <Users size={24} />
          </div>
          <div className="soc-stat-content">
            <h3>{societyData.memberCount}</h3>
            <p>Total Members</p>
            <span className="soc-stat-change positive">+12 this month</span>
          </div>
        </div>
        
        <div className="soc-stat-card">
          <div className="soc-stat-icon">
            <Calendar size={24} />
          </div>
          <div className="soc-stat-content">
            <h3>{societyData.activeEvents}</h3>
            <p>Active Events</p>
            <span className="soc-stat-change neutral">{societyData.totalEvents} total</span>
          </div>
        </div>
        
        <div className="soc-stat-card">
          <div className="soc-stat-icon">
            <Star size={24} />
          </div>
          <div className="soc-stat-content">
            <h3>{societyData.rating}</h3>
            <p>Society Rating</p>
            <span className="soc-stat-change positive">+0.2 this month</span>
          </div>
        </div>
        
        <div className="soc-stat-card">
          <div className="soc-stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="soc-stat-content">
            <h3>85%</h3>
            <p>Event Attendance</p>
            <span className="soc-stat-change positive">+5% vs last month</span>
          </div>
        </div>
      </div>

      {/* Recent Activities & Upcoming Events */}
      <div className="soc-dashboard-grid">
        <div className="soc-dashboard-card">
          <div className="soc-card-header">
            <h3>Recent Activities</h3>
            <button className="soc-btn-secondary" onClick={() => setActiveTab('activities')}>
              View All
            </button>
          </div>
          <div className="soc-activities-list">
            {activities.slice(0, 3).map(activity => (
              <div key={activity.id} className="soc-activity-item">
                <div className={`soc-activity-icon ${activity.type.toLowerCase()}`}>
                  {activity.type === 'Achievement' ? <Trophy size={16} /> : <Activity size={16} />}
                </div>
                <div className="soc-activity-content">
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                  <span className="soc-activity-date">{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="soc-dashboard-card">
          <div className="soc-card-header">
            <h3>Upcoming Events</h3>
            <button className="soc-btn-primary" onClick={() => openModal('addEvent')}>
              <Plus size={16} />
              Add Event
            </button>
          </div>
          <div className="soc-events-list">
            {events.filter(event => event.status === 'Upcoming').slice(0, 3).map(event => (
              <div key={event.id} className="soc-event-item">
                <div className="soc-event-date">
                  <span className="soc-day">{new Date(event.date).getDate()}</span>
                  <span className="soc-month">{new Date(event.date).toLocaleDateString('en', { month: 'short' })}</span>
                </div>
                <div className="soc-event-content">
                  <h4>{event.title}</h4>
                  <p><MapPin size={14} /> {event.venue} • {event.time}</p>
                  <span className="soc-attendees">{event.attendees} registered</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="soc-members-content">
      <div className="soc-content-header">
        <div className="soc-header-left">
          <h2>Society Members</h2>
          <p>Manage your society members and their roles</p>
        </div>
        <button className="soc-btn-primary" onClick={() => openModal('addMember')}>
          <Plus size={16} />
          Add Member
        </button>
      </div>

      {/* Filters */}
      <div className="soc-filters-bar">
        <div className="soc-search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="soc-filter-select"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="soc-btn-secondary">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Members Table */}
      <div className="soc-table-container">
        <table className="soc-members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map(member => (
              <tr key={member.id}>
                <td>
                  <div className="soc-member-info">
                    <div className="soc-member-avatar">{member.name.charAt(0)}</div>
                    <span>{member.name}</span>
                  </div>
                </td>
                <td>{member.email}</td>
                <td>{member.department}</td>
                <td>
                  <span className={`soc-role-badge ${member.role.toLowerCase().replace(' ', '-')}`}>
                    {member.role}
                  </span>
                </td>
                <td>
                  <span className={`soc-status-badge ${member.status.toLowerCase()}`}>
                    {member.status}
                  </span>
                </td>
                <td>{new Date(member.joinDate).toLocaleDateString()}</td>
                <td>
                  <div className="soc-action-buttons">
                    <button 
                      className="soc-action-btn view"
                      onClick={() => openModal('viewMember', member)}
                      title="View Details"
                    >
                      <Eye size={14} />
                    </button>
                    <button 
                      className="soc-action-btn edit"
                      onClick={() => openModal('editMember', member)}
                      title="Edit Member"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button 
                      className="soc-action-btn delete"
                      onClick={() => handleDeleteMember(member.id)}
                      title="Delete Member"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="soc-events-content">
      <div className="soc-content-header">
        <div className="soc-header-left">
          <h2>Events Management</h2>
          <p>Create and manage society events</p>
        </div>
        <button className="soc-btn-primary" onClick={() => openModal('addEvent')}>
          <Plus size={16} />
          Create Event
        </button>
      </div>

      <div className="soc-events-grid">
        {events.map(event => (
          <div key={event.id} className="soc-event-card">
            <div className="soc-event-card-header">
              <h3>{event.title}</h3>
              <span className={`soc-event-status ${event.status.toLowerCase()}`}>
                {event.status}
              </span>
            </div>
            <div className="soc-event-card-content">
              <p className="soc-event-description">{event.description}</p>
              <div className="soc-event-details">
                <div className="soc-event-detail">
                  <Calendar size={14} />
                  <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                </div>
                <div className="soc-event-detail">
                  <MapPin size={14} />
                  <span>{event.venue}</span>
                </div>
                <div className="soc-event-detail">
                  <Users size={14} />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
            </div>
            <div className="soc-event-card-actions">
              <button 
                className="soc-btn-secondary"
                onClick={() => openModal('editEvent', event)}
              >
                <Edit3 size={14} />
                Edit
              </button>
              <button 
                className="soc-btn-danger"
                onClick={() => handleDeleteEvent(event.id)}
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivities = () => (
    <div className="soc-activities-content">
      <div className="soc-content-header">
        <div className="soc-header-left">
          <h2>Society Activities</h2>
          <p>Track and manage all society activities</p>
        </div>
        <button className="soc-btn-primary" onClick={() => openModal('addActivity')}>
          <Plus size={16} />
          Add Activity
        </button>
      </div>

      <div className="soc-activities-timeline">
        {activities.map(activity => (
          <div key={activity.id} className="soc-timeline-item">
            <div className={`soc-timeline-icon ${activity.type.toLowerCase()}`}>
              {activity.type === 'Achievement' ? <Trophy size={16} /> : 
               activity.type === 'Event' ? <Calendar size={16} /> : <Bell size={16} />}
            </div>
            <div className="soc-timeline-content">
              <div className="soc-timeline-header">
                <h3>{activity.title}</h3>
                <span className="soc-timeline-date">{activity.date}</span>
              </div>
              <p>{activity.description}</p>
              <span className={`soc-activity-type ${activity.type.toLowerCase()}`}>
                {activity.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="soc-settings-content">
      <div className="soc-content-header">
        <div className="soc-header-left">
          <h2>Society Settings</h2>
          <p>Manage society information and preferences</p>
        </div>
      </div>

      <div className="soc-settings-grid">
        <div className="soc-settings-card">
          <h3>Society Information</h3>
          <form className="soc-settings-form">
            <div className="soc-form-group">
              <label>Society Name</label>
              <input type="text" defaultValue={societyData.name} className="form-input" />
            </div>
            <div className="soc-form-group">
              <label>Description</label>
              <textarea className="soc-form-input" rows="3" placeholder="Describe your society..."></textarea>
            </div>
            <div className="soc-form-group">
              <label>Contact Email</label>
              <input type="email" className="soc-form-input" placeholder="contact@society.com" />
            </div>
            <button type="submit" className="soc-btn-primary">Save Changes</button>
          </form>
        </div>

        <div className="soc-settings-card">
          <h3>Society Logo</h3>
          <div className="soc-logo-upload">
            <div className="soc-logo-preview">
              <div className="soc-logo-placeholder">
                <Upload size={32} />
                <p>Upload Logo</p>
              </div>
            </div>
            <button className="soc-btn-secondary">
              <Upload size={16} />
              Choose File
            </button>
          </div>
        </div>

        <div className="soc-settings-card">
          <h3>Notification Settings</h3>
          <div className="soc-notification-settings">
            <div className="soc-setting-item">
              <label className="soc-setting-label">
                <input type="soc-checkbox" defaultChecked />
                <span className="soc-checkmark"></span>
                Email notifications for new members
              </label>
            </div>
            <div className="soc-setting-item">
              <label className="soc-setting-label">
                <input type="soc-checkbox" defaultChecked />
                <span className="soc-checkmark"></span>
                Event reminder notifications
              </label>
            </div>
            <div className="soc-setting-item">
              <label className="soc-setting-label">
                <input type="soc-checkbox" />
                <span className="soc-checkmark"></span>
                Weekly activity summaries
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIInsights = () => (
    <div className="soc-insights-content">
      <div className="soc-content-header">
        <div className="soc-header-left">
          <h2>AI-Powered Insights</h2>
          <p>Data-driven insights to optimize your society's performance</p>
        </div>
        <button className="soc-btn-primary" onClick={() => window.print()}>
          <FileText size={16} />
          Generate Report
        </button>
      </div>

      {/* Key Metrics Overview */}
      <div className="soc-insights-overview">
        <div className="soc-insight-card primary">
          <div className="soc-insight-icon">
            <UserCheck size={24} />
          </div>
          <div className="soc-insight-content">
            <h3>{aiInsights.memberEngagement.engagementRate}%</h3>
            <p>Member Engagement Rate</p>
            <div className="soc-insight-trend positive">
              <TrendingUp size={14} />
              <span>+15% from last month</span>
            </div>
          </div>
        </div>

        <div className="soc-insight-card">
          <div className="soc-insight-icon">
            <Target size={24} />
          </div>
          <div className="soc-insight-content">
            <h3>{aiInsights.eventAnalytics.avgAttendance}%</h3>
            <p>Average Event Attendance</p>
            <div className="soc-insight-trend positive">
              <TrendingUp size={14} />
              <span>Above target by 10%</span>
            </div>
          </div>
        </div>

        <div className="soc-insight-card">
          <div className="soc-insight-icon">
            <Users size={24} />
          </div>
          <div className="soc-insight-content">
            <h3>{aiInsights.memberEngagement.activeMembers}</h3>
            <p>Active Members</p>
            <div className="soc-insight-trend neutral">
              <span>{aiInsights.memberEngagement.inactiveMembers} inactive</span>
            </div>
          </div>
        </div>

        <div className="soc-insight-card">
          <div className="soc-insight-icon">
            <Award size={24} />
          </div>
          <div className="soc-insight-content">
            <h3>4.6/5</h3>
            <p>Event Satisfaction</p>
            <div className="soc-insight-trend positive">
              <Star size={14} />
              <span>Excellent rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="soc-insights-grid">
        {/* AI Recommendations */}
        <div className="soc-insight-panel">
          <div className="soc-panel-header">
            <div className="soc-panel-title">
              <Zap size={20} />
              <h3>AI Recommendations</h3>
            </div>
          </div>
          <div className="soc-panel-content">
            {aiInsights.insights.map((insight, index) => (
              <div key={index} className="soc-recommendation-item">
                <div className="soc-rec-icon">
                  <Brain size={16} />
                </div>
                <p>{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Event Types */}
        <div className="soc-insight-panel">
          <div className="soc-panel-header">
            <div className="soc-panel-title">
              <Trophy size={20} />
              <h3>Popular Event Categories</h3>
            </div>
          </div>
          <div className="soc-panel-content">
            {aiInsights.eventAnalytics.popularEventTypes.map((type, index) => (
              <div key={index} className="soc-popular-event">
                <div className="soc-event-type-bar">
                  <div className="soc-event-type-name">{type}</div>
                  <div className="soc-event-type-progress">
                    <div 
                      className="soc-progress-fill" 
                      style={{ width: `${90 - (index * 20)}%` }}
                    ></div>
                  </div>
                  <span className="soc-event-percentage">{90 - (index * 20)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predictions */}
        <div className="soc-insight-panel">
          <div className="soc-panel-header">
            <div className="soc-panel-title">
              <TrendingUp size={20} />
              <h3>Future Predictions</h3>
            </div>
          </div>
          <div className="soc-panel-content">
            {aiInsights.predictions.map((prediction, index) => (
              <div key={index} className="soc-prediction-item">
                <div className="soc-pred-icon">
                  <ChevronRight size={16} />
                </div>
                <p>{prediction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Report Section */}
      <div className="soc-event-report-section">
        <div className="soc-report-header">
          <h3>Last Event Report - Ready for Dean Submission</h3>
          <button className="soc-btn-primary">
            <Download size={16} />
            Download PDF Report
          </button>
        </div>

        <div className="soc-event-report-card">
          <div className="soc-report-overview">
            <div className="soc-report-basic-info">
              <h4>{aiInsights.reports.lastEventReport.eventName}</h4>
              <div className="soc-report-meta">
                <span className="soc-report-date">
                  <Calendar size={14} />
                  {new Date(aiInsights.reports.lastEventReport.date).toLocaleDateString()}
                </span>
                <span className="soc-report-attendance">
                  <Users size={14} />
                  {aiInsights.reports.lastEventReport.attendance} attendees
                </span>
                <span className="soc-report-rating">
                  <Star size={14} />
                  {aiInsights.reports.lastEventReport.feedback}/5.0 rating
                </span>
              </div>
            </div>
          </div>

          <div className="soc-report-details">
            <div className="soc-report-section">
              <h5>Event Highlights</h5>
              <ul className="soc-highlight-list">
                {aiInsights.reports.lastEventReport.highlights.map((highlight, index) => (
                  <li key={index}>
                    <ThumbsUp size={14} />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="soc-report-section">
              <h5>Areas for Improvement</h5>
              <ul className="soc-improvement-list">
                {aiInsights.reports.lastEventReport.improvements.map((improvement, index) => (
                  <li key={index}>
                    <Clock size={14} />
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="soc-report-actions">
            <button className="soc-btn-primary">
              <FileText size={16} />
              Submit to Dean
            </button>
            <button className="soc-btn-secondary">
              <Edit3 size={16} />
              Edit Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="soc-society-head-container">
      {/* Header */}
      <header className="soc-society-header">
        <div className="vheader-left">
          <button 
            onClick={() => setCurrentPage('getstarted')} 
            className="soc-back-button"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="soc-society-info">
            <h1>{societyData.name}</h1>
            <p>Society Dashboard • {societyData.memberCount} members</p>
          </div>
        </div>
        <div className="soc-header-right">
          <button className="soc-notification-btn">
            <Bell size={20} />
            <span className="soc-notification-badge">3</span>
          </button>
          <div className="soc-profile-avatar">
            SH
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="society-nav">
        <button 
          className={`soc-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart3 size={16} />
          Dashboard
        </button>
        <button 
          className={`soc-nav-item ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <Users size={16} />
          Members
        </button>
        <button 
          className={`soc-nav-item ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <Calendar size={16} />
          Events
        </button>
        <button 
          className={`soc-nav-item ${activeTab === 'activities' ? 'active' : ''}`}
          onClick={() => setActiveTab('activities')}
        >
          <Activity size={16} />
          Activities
        </button>
        <button 
          className={`soc-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={16} />
          Settings
        </button>
        <button 
          className={`soc-nav-item ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          <Brain size={16} />
          AI Insights
        </button>
      </nav>

      {/* Main Content */}
      <main className="society-main">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'members' && renderMembers()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'activities' && renderActivities()}
        {activeTab === 'settings' && renderSettings()}
        {activeTab === 'insights' && renderAIInsights()}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="soc-modal-backdrop">
          <div ref={modalRef} className="soc-modal-content large-modal">
            <div className="soc-modal-header">
              <h2>
                {modalType === 'addMember' && 'Add New Member'}
                {modalType === 'editMember' && 'Edit Member'}
                {modalType === 'viewMember' && 'Member Details'}
                {modalType === 'addEvent' && 'Create New Event'}
                {modalType === 'editEvent' && 'Edit Event'}
                {modalType === 'addActivity' && 'Add New Activity'}
              </h2>
              <button onClick={closeModal} className="soc-modal-close-button">
                ✕
              </button>
            </div>

            <div className="soc-modal-body">
              {(modalType === 'addMember' || modalType === 'editMember') && (
                <form onSubmit={handleMemberSubmit} className="soc-modal-form">
                  <div className="soc-form-row">
                    <div className="vform-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        className="soc-form-input" 
                        defaultValue={selectedMember?.name || ''}
                        required 
                      />
                    </div>
                    <div className="soc-form-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        className="soc-form-input" 
                        defaultValue={selectedMember?.email || ''}
                        required 
                      />
                    </div>
                  </div>
                  <div className="soc-form-row">
                    <div className="soc-form-group">
                      <label>Phone</label>
                      <input 
                        type="tel" 
                        className="soc-form-input" 
                        defaultValue={selectedMember?.phone || ''}
                      />
                    </div>
                    <div className="soc-form-group">
                      <label>Department</label>
                      <select className="soc-form-input" defaultValue={selectedMember?.department || ''}>
                        <option value="">Select Department</option>
                        <option value="CSE">Computer Science</option>
                        <option value="ECE">Electronics</option>
                        <option value="IT">Information Technology</option>
                        <option value="ME">Mechanical</option>
                      </select>
                    </div>
                  </div>
                  <div className="soc-form-row">
                    <div className="soc-form-group">
                      <label>Role</label>
                      <select className="soc-form-input" defaultValue={selectedMember?.role || ''}>
                        <option value="Member">Member</option>
                        <option value="Core Member">Core Member</option>
                        <option value="Junior Council">Junior Council</option>
                        <option value="Volunteer">Volunteer</option>
                      </select>
                    </div>
                    <div className="soc-form-group">
                      <label>Status</label>
                      <select className="soc-form-input" defaultValue={selectedMember?.status || 'Active'}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="soc-modal-actions">
                    <button type="button" onClick={closeModal} className="soc-btn-secondary">
                      Cancel
                    </button>
                    <button type="submit" className="soc-btn-primary">
                      {modalType === 'addMember' ? 'Add Member' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              )}

              {modalType === 'viewMember' && selectedMember && (
                <div className="soc-member-details">
                  <div className="soc-member-profile">
                    <div className="soc-profile-avatar large">
                      {selectedMember.name.charAt(0)}
                    </div>
                    <div className="soc-profile-info">
                      <h3>{selectedMember.name}</h3>
                      <span className={`role-badge ${selectedMember.role.toLowerCase().replace(' ', '-')}`}>
                        {selectedMember.role}
                      </span>
                    </div>
                  </div>
                  <div className="soc-member-info-grid">
                    <div className="soc-info-item">
                      <Mail size={16} />
                      <span>{selectedMember.email}</span>
                    </div>
                    <div className="soc-info-item">
                      <Phone size={16} />
                      <span>{selectedMember.phone}</span>
                    </div>
                    <div className="soc-info-item">
                      <Users size={16} />
                      <span>{selectedMember.department}</span>
                    </div>
                    <div className="soc-info-item">
                      <Calendar size={16} />
                      <span>Joined {new Date(selectedMember.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {(modalType === 'addEvent' || modalType === 'editEvent') && (
                <form onSubmit={handleEventSubmit} className="soc-modal-form">
                  <div className="soc-form-group">
                    <label>Event Title</label>
                    <input 
                      type="text" 
                      className="soc-form-input" 
                      placeholder="Enter event title"
                      required 
                    />
                  </div>
                  <div className="soc-form-group">
                    <label>Description</label>
                    <textarea 
                      className="soc-form-input" 
                      rows="3" 
                      placeholder="Describe your event..."
                    ></textarea>
                  </div>
                  <div className="soc-form-row">
                    <div className="soc-form-group">
                      <label>Date</label>
                      <input type="date" className="soc-form-input" required />
                    </div>
                    <div className="soc-form-group">
                      <label>Time</label>
                      <input type="time" className="soc-form-input" required />
                    </div>
                  </div>
                  <div className="soc-form-group">
                    <label>Venue</label>
                    <input type="text" className="soc-form-input" placeholder="Event location" />
                  </div>
                  <div className="soc-modal-actions">
                    <button type="button" onClick={closeModal} className="soc-btn-secondary">
                      Cancel
                    </button>
                    <button type="submit" className="soc-btn-primary">
                      {modalType === 'addEvent' ? 'Create Event' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocietyHead;