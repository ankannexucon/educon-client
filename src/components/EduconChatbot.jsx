import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const EduconChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [activeMode, setActiveMode] = useState('helpdesk'); // 'helpdesk' or 'global'
  const [messages, setMessages] = useState({
    helpdesk: [
      {
        id: 1,
        text: "Hello! I'm your EduTech SaaS Helpdesk Assistant. I'm here to help you with product features, technical issues, billing, and account management! How can I assist you today?",
        sender: 'bot',
        timestamp: new Date(),
        mode: 'helpdesk'
      }
    ],
    global: [
      {
        id: 1,
        text: "Hello! I'm your Global AI Assistant powered by Gemini. I can help you with any questions, creative tasks, research, and much more! What would you like to know?",
        sender: 'bot',
        timestamp: new Date(),
        mode: 'global'
      }
    ]
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageAnimations, setMessageAnimations] = useState({});
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const messagesEndRef = useRef(null);

  // Initialize Google GenAI with your API key
  const ai = new GoogleGenAI({ apiKey: "AIzaSyDXLHQx0mVDaXYVzDF7klzYpF2qdmlOcAE" });

  // Hardcoded FAQ database for EduTech SaaS product
  const faqDatabase = {
    // Product Features
    'features': "Our EduTech SaaS platform includes: • Interactive virtual classrooms • AI-powered assessments • Student progress tracking • Parent-teacher communication portal • Lesson planning tools • Grade management system • Attendance tracking • Resource library",

    'virtual classroom': "Virtual Classroom Features: • Real-time video conferencing • Interactive whiteboard • Screen sharing • Breakout rooms • Polls and quizzes • Chat functionality • Recording capabilities • Up to 100 participants simultaneously",

    'assessments': "Assessment Tools: • Create custom quizzes and tests • AI-powered question generation • Automatic grading • Performance analytics • Rubric-based scoring • Peer assessment • Timed exams • Plagiarism detection",

    'progress tracking': "Student Progress Tracking: • Real-time performance dashboards • Skill mastery indicators • Learning gap analysis • Customizable reports • Progress comparisons • Goal setting • Intervention recommendations",

    // Technical Issues
    'login issues': "Login Troubleshooting: 1. Clear browser cache and cookies 2. Try incognito/private mode 3. Reset password using 'Forgot Password' 4. Check internet connection 5. Update browser to latest version 6. Contact support if issue persists",

    'video not working': "Video Issues: • Check camera permissions in browser • Ensure no other app is using camera • Test camera on other websites • Update browser • Try different browser (Chrome recommended) • Check internet speed (min 5 Mbps required)",

    'audio problems': "Audio Troubleshooting: • Check microphone permissions • Ensure correct input device is selected • Test microphone on other apps • Update audio drivers • Use headphones to reduce echo • Check volume levels",

    'performance slow': "Performance Issues: • Close unnecessary browser tabs • Clear browser cache • Use wired internet connection • Update browser • Disable browser extensions • Check system requirements (4GB RAM minimum)",

    // Billing & Account
    'pricing': "Pricing Plans: • Basic: $29/month - Up to 50 students • Pro: $79/month - Up to 200 students • Enterprise: $199/month - Unlimited students + premium features • Annual plans save 20%. All plans include basic support.",

    'billing': "Billing Information: • Monthly/Annual billing options • Credit card and PayPal accepted • Invoice available upon request • Billing cycle starts on signup date • Cancel anytime with 30-day money back guarantee",

    'account upgrade': "Account Upgrade: • Login to your dashboard • Go to Billing section • Select desired plan • Complete payment • Changes take effect immediately • Prorated charges may apply",

    'cancel subscription': "Cancellation Process: • Login to your account • Navigate to Billing settings • Click 'Cancel Subscription' • Confirm cancellation • Service continues until end of billing period • Data exported upon request",

    // Setup & Configuration
    'setup': "Quick Setup Guide: 1. Create your institution profile 2. Add teachers and staff 3. Set up classes and subjects 4. Import student data 5. Configure assessment settings 6. Customize communication templates 7. Train team on platform features",

    'integration': "Available Integrations: • Google Classroom • Microsoft Teams • LMS (Canvas, Moodle, Blackboard) • Student Information Systems • Single Sign-On (SSO) • Zoom • Learning Tools Interoperability (LTI)",

    'data import': "Data Import Options: • CSV/Excel file upload • API integration • Manual entry • Bulk import tools • Student photo upload • Curriculum data import • Previous performance data",

    // Support & Training
    'training': "Training Resources: • Weekly live webinars • Video tutorials library • Documentation portal • Certified trainer program • Onboarding sessions • Best practices guides • Community forums",

    'support': "Support Channels: • Email: support@edutech.com • Phone: 1-800-EDUTECH (Mon-Fri 9AM-6PM EST) • Live Chat: Available in dashboard • Help Center: 24/7 knowledge base • Emergency: Critical issue hotline",

    'mobile app': "Mobile App Features: • iOS and Android available • Real-time notifications • Offline access to materials • Mobile assessments • Parent communication • Grade viewing • Attendance marking",

    // Default fallback
    'default': "I understand you're asking about our EduTech platform. For specific technical issues, please contact our support team at support@edutech.com or call 1-800-EDUTECH. For product features, check our documentation at docs.edutech.com."
  };

  // Suggested questions for helpdesk mode (EdTech SaaS focused)
  const helpdeskQuickQuestions = [
    "What features are included?",
    "How to setup virtual classroom?",
    "Pricing plans information",
    "Login issues troubleshooting",
    "Mobile app features",
    "Integration options"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages[activeMode]]);

  useEffect(() => {
    if (isOpen && isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
        // Only set suggestions for helpdesk mode
        if (activeMode === 'helpdesk') {
          setSuggestedQuestions(helpdeskQuickQuestions);
        } else {
          setSuggestedQuestions([]); // No suggestions for global mode
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isInitialLoad, activeMode]);

  useEffect(() => {
    // Update suggested questions when mode changes
    if (activeMode === 'helpdesk') {
      setSuggestedQuestions(helpdeskQuickQuestions);
    } else {
      setSuggestedQuestions([]); // No suggestions for global mode
    }
  }, [activeMode]);

  // Helpdesk mode response handler - only uses hardcoded answers
  const getHelpdeskResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Exact matches first
    for (const [key, answer] of Object.entries(faqDatabase)) {
      if (key !== 'default' && input.includes(key)) {
        return answer;
      }
    }
    
    // Keyword matching with scoring
    const keywordMatches = [];
    for (const [key, answer] of Object.entries(faqDatabase)) {
      if (key === 'default') continue;
      
      const keywords = key.split(' ');
      let score = 0;
      
      keywords.forEach(keyword => {
        if (input.includes(keyword)) {
          score += 1;
        }
      });
      
      if (score > 0) {
        keywordMatches.push({ key, answer, score });
      }
    }
    
    // Return best match
    if (keywordMatches.length > 0) {
      keywordMatches.sort((a, b) => b.score - a.score);
      return keywordMatches[0].answer;
    }
    
    // Fallback to default
    return faqDatabase.default;
  };

  // Global mode response handler (Gemini API)
  const getGeminiResponse = async (userMessage) => {
    try {
      const modelsToTry = [
        "gemini-2.0-flash",
        "gemini-1.5-flash", 
        "gemini-1.5-pro",
        "gemini-1.0-pro"
      ];

      let lastError = null;

      for (const model of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model: model,
            contents: userMessage,
          });
          
          if (response.text) {
            return response.text;
          }
        } catch (error) {
          console.log(`Model ${model} failed:`, error.message);
          lastError = error;
          continue;
        }
      }

      throw lastError || new Error('All models failed');
      
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    // Add user message with animation
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      mode: activeMode
    };

    setMessages(prev => ({
      ...prev,
      [activeMode]: [...prev[activeMode], userMessage]
    }));
    setInputMessage('');
    setIsLoading(true);

    // Add typing animation
    setMessageAnimations(prev => ({
      ...prev,
      [userMessage.id]: 'slideInRight'
    }));

    try {
      let response;
      
      if (activeMode === 'helpdesk') {
        // Helpdesk mode - use hardcoded responses only
        setTimeout(() => {
          response = getHelpdeskResponse(inputMessage);
          
          const botMessage = {
            id: Date.now() + 1,
            text: response,
            sender: 'bot',
            timestamp: new Date(),
            mode: activeMode
          };

          setMessages(prev => ({
            ...prev,
            [activeMode]: [...prev[activeMode], botMessage]
          }));
          
          // Add bot message animation
          setTimeout(() => {
            setMessageAnimations(prev => ({
              ...prev,
              [botMessage.id]: 'slideInLeft'
            }));
          }, 100);
          
          setIsLoading(false);
        }, 800 + Math.random() * 400); // Reduced delay for better UX
        
      } else {
        // Global mode - use Gemini API
        response = await getGeminiResponse(inputMessage);
        
        const botMessage = {
          id: Date.now() + 1,
          text: response,
          sender: 'bot',
          timestamp: new Date(),
          mode: activeMode
        };

        setMessages(prev => ({
          ...prev,
          [activeMode]: [...prev[activeMode], botMessage]
        }));
        
        // Add bot message animation
        setTimeout(() => {
          setMessageAnimations(prev => ({
            ...prev,
            [botMessage.id]: 'slideInLeft'
          }));
        }, 100);
        
        setIsLoading(false);
      }
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        sender: 'bot',
        timestamp: new Date(),
        mode: activeMode
      };
      setMessages(prev => ({
        ...prev,
        [activeMode]: [...prev[activeMode], errorMessage]
      }));
      
      setTimeout(() => {
        setMessageAnimations(prev => ({
          ...prev,
          [errorMessage.id]: 'slideInLeft'
        }));
      }, 100);
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    // Auto-send after a brief delay
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      handleSendMessage(fakeEvent);
    }, 100);
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    if (mode === 'helpdesk') {
      setSuggestedQuestions(helpdeskQuickQuestions);
    } else {
      setSuggestedQuestions([]); // No suggestions for global mode
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages(prev => ({
      ...prev,
      [activeMode]: [{
        id: 1,
        text: activeMode === 'helpdesk' 
          ? "Hello! I'm your EduTech SaaS Helpdesk Assistant. I'm here to help you with product features, technical issues, billing, and account management! How can I assist you today?"
          : "Hello! I'm your Global AI Assistant powered by Gemini. I can help you with any questions, creative tasks, research, and much more! What would you like to know?",
        sender: 'bot',
        timestamp: new Date(),
        mode: activeMode
      }]
    }));
    setMessageAnimations({});
    if (activeMode === 'helpdesk') {
      setSuggestedQuestions(helpdeskQuickQuestions);
    } else {
      setSuggestedQuestions([]);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setIsInitialLoad(true);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const getMessageAnimation = (messageId) => {
    return messageAnimations[messageId] || 'messageAppear';
  };

  // Inline Styles
  const styles = {
    floatingButton: {
      position: 'fixed',
      bottom: '25px',
      right: '25px',
      width: '70px',
      height: '70px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      zIndex: 1000,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      animation: 'pulse 2s infinite, float 6s ease-in-out infinite',
    },

    chatWindow: {
      position: 'fixed',
      bottom: '25px',
      right: '25px',
      width: '420px',
      height: isMinimized ? '70px' : '600px',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 1001,
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      transform: isInitialLoad ? 'scale(0.8) translateY(20px)' : 'scale(1) translateY(0)',
      opacity: isInitialLoad ? 0 : 1,
    },

    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      cursor: isMinimized ? 'pointer' : 'default',
      transition: 'all 0.3s ease',
    },

    title: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flex: 1,
    },

    botAvatar: {
      width: '40px',
      height: '40px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      animation: 'bounce 2s infinite',
    },

    titleText: {
      display: 'flex',
      flexDirection: 'column',
    },

    titleH3: {
      margin: 0,
      fontSize: '15px',
      fontWeight: '600',
      background: 'linear-gradient(45deg, #fff, #e0e7ff)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },

    status: {
      fontSize: '11px',
      opacity: 0.9,
      color: isLoading ? '#fbbf24' : '#4ade80',
      animation: isLoading ? 'pulse 1.5s infinite' : 'none',
    },

    modeSelector: {
      display: 'flex',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '4px',
      marginTop: '8px',
    },

    modeButton: {
      flex: 1,
      padding: '6px 12px',
      border: 'none',
      background: 'transparent',
      color: 'white',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '11px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
    },

    activeMode: {
      background: 'rgba(255, 255, 255, 0.3)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    },

    headerActions: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
    },

    actionBtn: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      color: 'white',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      transition: 'all 0.3s ease',
    },

    messagesContainer: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      display: isMinimized ? 'none' : 'block',
    },

    message: {
      marginBottom: '16px',
      display: 'flex',
    },

    userMessage: {
      justifyContent: 'flex-end',
    },

    botMessage: {
      justifyContent: 'flex-start',
    },

    messageBubble: {
      maxWidth: '300px',
      padding: '12px 16px',
      borderRadius: '18px',
      position: 'relative',
      animation: 'messageAppear 0.4s ease-out',
    },

    userBubble: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderBottomRightRadius: '6px',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    },

    botBubble: {
      background: 'white',
      color: '#374151',
      border: '1px solid rgba(229, 231, 235, 0.8)',
      borderBottomLeftRadius: '6px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    },

    messageText: {
      fontSize: '14px',
      lineHeight: 1.5,
      marginBottom: '4px',
      whiteSpace: 'pre-wrap',
    },

    messageTime: {
      fontSize: '10px',
      opacity: 0.7,
      textAlign: 'right',
    },

    quickQuestions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '15px',
      marginBottom: '10px',
    },

    quickQuestion: {
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(102, 126, 234, 0.3)',
      borderRadius: '12px',
      padding: '10px 15px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'left',
      color: '#374151',
    },

    typingIndicator: {
      display: 'flex',
      gap: '4px',
      padding: '12px 0',
      alignItems: 'center',
    },

    typingDot: {
      width: '8px',
      height: '8px',
      background: '#9ca3af',
      borderRadius: '50%',
      animation: 'typing 1.4s infinite ease-in-out',
    },

    typingText: {
      fontSize: '12px',
      color: '#6b7280',
      marginLeft: '8px',
    },

    inputArea: {
      padding: '20px',
      background: 'white',
      borderTop: '1px solid rgba(229, 231, 235, 0.8)',
      display: isMinimized ? 'none' : 'block',
    },

    inputContainer: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      position: 'relative',
    },

    input: {
      flex: 1,
      padding: '14px 18px',
      border: '2px solid #e5e7eb',
      borderRadius: '25px',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.3s ease',
      background: 'white',
    },

    sendBtn: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    },

    keyframes: `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(2deg); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4); }
        50% { transform: scale(1.05); box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6); }
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-5px); }
        60% { transform: translateY(-3px); }
      }
      
      @keyframes typing {
        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
      }
      
      @keyframes messageAppear {
        0% { transform: translateY(20px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes slideInRight {
        0% { transform: translateX(50px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes slideInLeft {
        0% { transform: translateX(-50px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
    `,
  };

  return (
    <>
      <style>{styles.keyframes}</style>

      {!isOpen && (
        <button 
          style={styles.floatingButton}
          onClick={handleOpen}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.15) rotate(5deg)';
            e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) rotate(0deg)';
            e.target.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.4)';
          }}
          title="Dual Mode AI Assistant"
        >
          {activeMode === 'helpdesk' ? '📚' : '🌍'}
        </button>
      )}

      {isOpen && (
        <div style={styles.chatWindow}>
          <div 
            style={styles.header}
            onClick={isMinimized ? toggleMinimize : undefined}
          >
            <div style={styles.title}>
              <div style={styles.botAvatar}>
                {activeMode === 'helpdesk' ? '📚' : '🌍'}
              </div>
              <div style={styles.titleText}>
                <h3 style={styles.titleH3}>
                  {activeMode === 'helpdesk' ? 'EduTech SaaS Helpdesk' : 'Global AI Assistant'}
                </h3>
                <span style={styles.status}>
                  {isLoading 
                    ? activeMode === 'helpdesk' 
                      ? '● Searching knowledge base...' 
                      : '● Thinking...'
                    : '● Online'
                  }
                </span>
                <div style={styles.modeSelector}>
                  <button
                    style={{
                      ...styles.modeButton,
                      ...(activeMode === 'helpdesk' ? styles.activeMode : {})
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModeChange('helpdesk');
                    }}
                  >
                    📚 Helpdesk
                  </button>
                  <button
                    style={{
                      ...styles.modeButton,
                      ...(activeMode === 'global' ? styles.activeMode : {})
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModeChange('global');
                    }}
                  >
                    🌍 Global AI
                  </button>
                </div>
              </div>
            </div>
            <div style={styles.headerActions}>
              {!isMinimized && (
                <button 
                  style={styles.actionBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    clearChat();
                  }}
                  title="Clear conversation"
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  🗑️
                </button>
              )}
              <button 
                style={styles.actionBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMinimize();
                }}
                title={isMinimized ? 'Expand chat' : 'Minimize chat'}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {isMinimized ? '＋' : '−'}
              </button>
              <button 
                style={styles.actionBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                title="Close assistant"
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                ×
              </button>
            </div>
          </div>

          <div style={styles.messagesContainer}>
            {messages[activeMode].map((message) => (
              <div
                key={message.id}
                style={{
                  ...styles.message,
                  ...(message.sender === 'user' ? styles.userMessage : styles.botMessage),
                  animation: `${getMessageAnimation(message.id)} 0.4s ease-out`
                }}
              >
                <div style={{
                  ...styles.messageBubble,
                  ...(message.sender === 'user' ? styles.userBubble : styles.botBubble)
                }}>
                  <div style={styles.messageText}>{message.text}</div>
                  <div style={styles.messageTime}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Quick Questions - Only show in helpdesk mode */}
            {activeMode === 'helpdesk' && suggestedQuestions.length > 0 && !isLoading && (
              <div style={styles.quickQuestions}>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                  Common questions:
                </div>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    style={styles.quickQuestion}
                    onClick={() => handleQuickQuestion(question)}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                      e.target.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            
            {isLoading && (
              <div style={{...styles.message, ...styles.botMessage}}>
                <div style={{...styles.messageBubble, ...styles.botBubble}}>
                  <div style={styles.typingIndicator}>
                    <span style={{...styles.typingDot, animationDelay: '-0.32s'}}></span>
                    <span style={{...styles.typingDot, animationDelay: '-0.16s'}}></span>
                    <span style={styles.typingDot}></span>
                    <span style={styles.typingText}>
                      {activeMode === 'helpdesk' ? 'Searching knowledge base...' : 'Gemini AI is thinking...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form style={styles.inputArea} onSubmit={handleSendMessage}>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  activeMode === 'helpdesk' 
                    ? "Ask about features, pricing, technical issues..."
                    : "Ask me anything about any topic..."
                }
                style={{
                  ...styles.input,
                  borderColor: inputMessage ? '#667eea' : '#e5e7eb',
                  boxShadow: inputMessage ? '0 0 0 3px rgba(102, 126, 234, 0.1)' : 'none'
                }}
                disabled={isLoading}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.2)';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'scale(1)';
                }}
              />
              <button 
                type="submit" 
                style={{
                  ...styles.sendBtn,
                  opacity: (!inputMessage.trim() || isLoading) ? 0.6 : 1,
                  transform: (!inputMessage.trim() || isLoading) ? 'scale(1)' : 'scale(1)',
                  animation: inputMessage.trim() && !isLoading ? 'pulse 2s infinite' : 'none'
                }}
                disabled={!inputMessage.trim() || isLoading}
                onMouseEnter={(e) => {
                  if (inputMessage.trim() && !isLoading) {
                    e.target.style.transform = 'scale(1.1) rotate(5deg)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (inputMessage.trim() && !isLoading) {
                    e.target.style.transform = 'scale(1) rotate(0deg)';
                  }
                }}
              >
                {isLoading ? '⏳' : '📨'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EduconChatbot;