import React, { useState, useEffect, useRef, useCallback } from 'react';
import './AIChat.css';

const AIChat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { 
      type: 'ai', 
      text: 'Hi! I\'m your Soclique AI assistant. I can help you navigate our platform - from choosing your college to finding societies and registering for events. I also help society heads with AI-powered suggestions!\n\nNew to Soclique? Try "How do I get started?" or "Help me choose my college"' 
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  
  const chatMessagesRef = useRef(null);
  const chatInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // AI Chat Prompts - Updated for Soclique workflow
  const chatPrompts = [
    "Help me choose my college",
    "Show me societies in my college",
    "How do I get started on Soclique?",
    "I'm a society head - how can AI help?",
    "Find events matching my interests",
    "How does college selection work?"
  ];

  // Enhanced AI responses aligned with Soclique's actual workflow
  const getAIResponse = useCallback((message) => {
    const responses = {
      // Core Soclique workflow responses
      'get started': 'Welcome to Soclique! Here\'s how to get started:\n\n1️⃣ Click "Get Started" in the navigation\n2️⃣ Choose your college from the list\n3️⃣ Browse societies in your college\n4️⃣ Join societies that match your interests\n5️⃣ Register for their events\n\nIt\'s that simple! Ready to explore your college\'s societies?',
      
      'college': 'College selection is the first step on Soclique:\n\n🏛️ We have 25+ partner colleges\n🎯 Choose your specific college to see:\n   • All societies in your college\n   • Events organized by those societies\n   • Connect with students from your campus\n\nWant to know which colleges are available? Or need help choosing?',
      
      'societies': 'Societies are the heart of Soclique! Once you select your college:\n\n🔍 Browse all societies in your college\n📚 Filter by categories (Tech, Cultural, Sports, etc.)\n👥 See member count and activity level\n📅 View upcoming events from each society\n🚀 Join societies that match your interests\n\nEach society runs their own events and activities. Which type interests you most?',
      
      'society head': 'Perfect! As a society head, our AI can help you:\n\n🤖 Get AI-powered event suggestions\n📊 Analyze what events work best\n🎯 Target the right audience for your events\n📈 Track registration trends\n💡 Generate creative event ideas\n📱 Optimize event descriptions\n\nThe AI learns from successful events across all colleges. Want specific suggestions for your society type?',
      
      'ai help': 'Our AI assists society heads in multiple ways:\n\n💡 Smart Event Ideas: AI suggests events based on trends\n📝 Content Generation: Help with event descriptions\n🎯 Audience Targeting: Find the right participants\n📊 Performance Analytics: Track what works\n🔄 Best Practices: Learn from successful events\n📅 Optimal Timing: When to schedule events\n\nWhich area would you like AI assistance with?',
      
      'events': 'Events on Soclique work through societies:\n\n🏛️ Each college has multiple societies\n🎪 Societies organize their own events\n📝 Students register for events they\'re interested in\n🔔 Get notifications about events from joined societies\n🤝 Connect with other participants\n\nTo find events: Choose College → Browse Societies → Join → See Events. Simple!',
      
      'registration': 'Event registration is straightforward:\n\n1️⃣ Choose your college\n2️⃣ Browse and join societies\n3️⃣ View events from joined societies\n4️⃣ Click "Register" on events you like\n5️⃣ Fill in required details\n6️⃣ Confirm registration\n7️⃣ Get event updates via notifications\n\nYou can only register for events from societies you\'ve joined. Makes sense?',
      
      'workflow': 'Here\'s the complete Soclique workflow:\n\n🌟 Homepage → Get Started → Choose College\n🏛️ Browse Societies in Your College\n🎯 Join Societies That Interest You\n📅 View Events from Joined Societies\n✅ Register for Events You Like\n🔔 Get Updates and Notifications\n🤝 Connect at Events\n\nEach step builds on the previous one. Where would you like to start?',
      
      'colleges list': 'We currently partner with these types of institutions:\n\n🎓 Engineering Colleges\n🏥 Medical Colleges  \n💼 Business Schools\n🎨 Arts & Design Colleges\n🔬 Science Colleges\n📚 Liberal Arts Universities\n\nOver 25+ institutions and growing! The exact list is shown when you click "Get Started" and choose your college. Want me to walk you through that process?',
      
      'how it works': 'Soclique connects you with your college community:\n\n🏠 Start at Homepage\n▶️ Click "Get Started"\n🏛️ Select Your College\n👥 Browse College Societies\n🎯 Join Societies You Like\n🎪 See Their Events\n✅ Register & Participate\n\nIt\'s designed to be simple - college first, then societies, then events. Ready to try it?',
      
      'navigation': 'Navigation is simple:\n\n🏠 Homepage: Overview and highlights\n▶️ Get Started: Choose college → societies\n👤 Profile: Your joined societies & events\n🔔 Notifications: Event updates\n❓ Help: Support and guidance\n\nThe main flow is Homepage → Get Started → College Selection. That\'s where the magic happens!',
      
      'benefits': 'Soclique brings your campus together:\n\n🎯 Find societies that match your interests\n🔍 Discover events you might have missed\n📱 One platform for all college activities\n🤝 Connect with like-minded peers\n🔔 Never miss important events\n🌟 Grow your campus network\n\nIt\'s like having a campus guide in your pocket. Ready to explore your college\'s opportunities?',
      
      'default': 'I\'m here to help you navigate Soclique! 🤖\n\nI can assist with:\n🏛️ Choosing your college\n👥 Finding societies\n📅 Understanding events\n✅ Registration process\n🎯 For society heads: AI-powered suggestions\n\nTry asking: "How do I get started?" or "Help me choose my college" or "I\'m a society head, how can AI help me?"'
    };

    const lowercaseMessage = message.toLowerCase();
    
    // Enhanced matching for Soclique-specific terms
    for (const [key, response] of Object.entries(responses)) {
      if (key === 'get started' && (lowercaseMessage.includes('get started') || lowercaseMessage.includes('how to start') || lowercaseMessage.includes('begin'))) {
        return response;
      }
      if (key === 'college' && (lowercaseMessage.includes('college') || lowercaseMessage.includes('choose college') || lowercaseMessage.includes('select college'))) {
        return response;
      }
      if (key === 'societies' && (lowercaseMessage.includes('society') || lowercaseMessage.includes('societies') || lowercaseMessage.includes('club'))) {
        return response;
      }
      if (key === 'society head' && (lowercaseMessage.includes('head') || lowercaseMessage.includes('organizer') || lowercaseMessage.includes('admin'))) {
        return response;
      }
      if (key === 'ai help' && (lowercaseMessage.includes('ai help') || lowercaseMessage.includes('ai assist'))) {
        return response;
      }
      if (key === 'how it works' && (lowercaseMessage.includes('how it works') || lowercaseMessage.includes('how does'))) {
        return response;
      }
      if (lowercaseMessage.includes(key)) {
        return response;
      }
    }
    
    return responses.default;
  }, []);

  // Enhanced chat functionality
  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
    if (!chatOpen && chatInputRef.current) {
      setTimeout(() => chatInputRef.current.focus(), 300);
    }
  };

  const handlePromptClick = (prompt) => {
    setCurrentMessage(prompt);
    setShowPrompts(false);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage = currentMessage;
    setCurrentMessage('');
    setShowPrompts(false);
    
    setChatMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage);
      setChatMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  // Click outside to close chat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
        setChatOpen(false);
      }
    };

    if (chatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chatOpen]);

  // Auto-scroll chat messages
  useEffect(() => {
    if (chatMessagesRef.current) {
      const scrollHeight = chatMessagesRef.current.scrollHeight;
      const height = chatMessagesRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chatMessagesRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [chatMessages, isTyping]);

  return (
    <div className="ai-chat-container" ref={chatContainerRef}>
      <button 
        className={`chat-toggle ${chatOpen ? 'active' : ''}`}
        onClick={handleChatToggle}
        title="AI Chat Assistant"
        aria-label="Toggle AI Chat Assistant"
      >
        {chatOpen ? '×' : '🤖'}
      </button>
      
      <div className={`chat-box ${chatOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-ai-icon">🤖</div>
          <div className="chat-header-content">
            <div className="chat-title">Soclique AI Assistant</div>
            <div className="chat-subtitle">Here to help you explore!</div>
          </div>
        </div>
        
        
        <div className="chat-messages" ref={chatMessagesRef}>
          {chatMessages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
            {message.text.split('\n').map((line, lineIndex) => (
                <div key={lineIndex}>
                {line}
                {lineIndex < message.text.split('\n').length - 1 && <br />}
                </div>
            ))}

            {/* If it's the very first AI message, attach prompts here */}
            {index === 0 && message.type === 'ai' && showPrompts && (
                <div className="chat-prompts" style={{ marginTop: "0.75rem" }}>
                <div style={{ marginBottom: "0.4rem", fontWeight: "600", fontSize: "0.85rem", color: "#C2CAD8" }}>
                    Ask me about:
                </div>
                {chatPrompts.map((prompt, i) => (
                    <div
                    key={i}
                    className="prompt-chip"
                    onClick={() => handlePromptClick(prompt)}
                    >
                    {prompt}
                    </div>
                ))}
                </div>
            )}
            </div>
          ))}
          
          {isTyping && (
            <div className="typing-indicator">
              <span className="typing-text">AI is typing</span>
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <textarea
              ref={chatInputRef}
              className="chat-input"
              placeholder="Ask about events, societies, or anything..."
              value={currentMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              rows={1}
              aria-label="Chat message input"
            />
            <button 
              className="chat-send-btn"
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping}
              title="Send message"
              aria-label="Send message"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;