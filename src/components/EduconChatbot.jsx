import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const EduconChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [activeMode, setActiveMode] = useState('helpdesk');
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
        text: "Hello! I'm your Global AI Assistant powered by Educon. I can help you with any questions, creative tasks, research, and much more! What would you like to know?",
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
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const messagesEndRef = useRef(null);

  const ai = new GoogleGenAI({ apiKey: "AIzaSyDXLHQx0mVDaXYVzDF7klzYpF2qdmlOcAE" });

  // Enhanced FAQ database with categories and subcategories
  const faqDatabase = {
    // Product Features Category
    'features': {
      type: 'category',
      title: 'Product Features',
      description: 'Explore all the amazing features our platform offers',
      subtypes: {
        'virtual classroom': {
          title: 'Virtual Classroom',
          questions: {
            'basic features': "Virtual Classroom Basic Features: • Real-time video conferencing • Interactive whiteboard • Screen sharing • Breakout rooms • Polls and quizzes • Chat functionality • Recording capabilities • Up to 100 participants simultaneously",
            'advanced tools': "Advanced Virtual Classroom Tools: • Collaborative document editing • Hand raising feature • Attendance tracking • Session analytics • Custom backgrounds • Multi-language support • Accessibility features • Mobile app integration",
            'setup guide': "Virtual Classroom Setup: 1. Schedule class from dashboard 2. Configure session settings 3. Invite participants via email/link 4. Test audio/video equipment 5. Prepare teaching materials 6. Start session 5 mins early for testing",
            'troubleshooting': "Virtual Classroom Issues: • Check internet speed (min 5Mbps) • Update browser to latest version • Grant camera/microphone permissions • Use Chrome/Firefox for best performance • Test equipment before session • Clear browser cache regularly"
          }
        },
        'assessments': {
          title: 'Assessments & Grading',
          questions: {
            'create assessment': "Creating Assessments: • Multiple choice questions • Essay type questions • File upload submissions • Coding exercises • Audio/video responses • Peer review assignments • Timed exams • Randomized questions",
            'grading system': "Grading System: • Automatic scoring for MCQs • Rubric-based grading • Weighted assignments • Curve grading options • Bulk grading tools • Feedback comments • Grade override capability • Export grades to CSV",
            'analytics': "Assessment Analytics: • Class performance overview • Question-wise analysis • Learning gap identification • Progress tracking • Comparative reports • Skill mastery indicators • Custom report generation",
            'ai features': "AI-Powered Features: • Smart question generation • Plagiarism detection • Automated feedback suggestions • Adaptive testing • Learning path recommendations • Performance predictions • Personalized question banks"
          }
        },
        'progress tracking': {
          title: 'Progress Tracking',
          questions: {
            'student dashboard': "Student Progress Dashboard: • Overall performance score • Subject-wise breakdown • Assignment completion rate • Skill mastery levels • Attendance percentage • Peer comparison • Goal tracking • Improvement trends",
            'teacher analytics': "Teacher Analytics: • Class performance overview • Individual student insights • Assignment completion rates • Learning gap analysis • Intervention recommendations • Parent communication history • Custom report builder",
            'reports': "Reporting Features: • Weekly progress reports • Custom date range reports • Export to PDF/Excel • Share with parents/students • Automated report scheduling • Comparative analysis • Standards alignment tracking",
            'parent portal': "Parent Portal Features: • Real-time grade updates • Attendance monitoring • Teacher communication • Assignment deadlines • Performance alerts • Progress trends • School announcements • Meeting scheduling"
          }
        },
        'collaboration': {
          title: 'Collaboration Tools',
          questions: {
            'discussion forums': "Discussion Forums: • Class-specific forums • Topic-based threads • File sharing capability • Moderation tools • Announcement pins • Private messaging • Email notifications • Mobile access",
            'group projects': "Group Project Tools: • Team workspace creation • Shared document editing • Task assignment • Progress tracking • Peer evaluation • File sharing • Deadline management • Teacher oversight",
            'parent teacher': "Parent-Teacher Communication: • Direct messaging • Scheduled meetings • Progress updates • Behavior notes • Announcement broadcast • Language translation • Read receipts • Emergency alerts"
          }
        }
      }
    },

    // Technical Issues Category
    'technical': {
      type: 'category',
      title: 'Technical Support',
      description: 'Get help with technical problems and troubleshooting',
      subtypes: {
        'login issues': {
          title: 'Login & Access',
          questions: {
            'forgot password': "Password Recovery: 1. Click 'Forgot Password' on login page 2. Enter registered email 3. Check email for reset link 4. Create new password (min 8 characters) 5. Login with new credentials 6. Contact support if email not received",
            'account locked': "Account Locked: • Too many failed login attempts • Wait 15 minutes or contact support • Verify email address • Check spam folder for verification emails • Ensure correct username/email format",
            'two factor': "Two-Factor Authentication: • Setup via security settings • Use authenticator app or SMS • Backup codes provided • Recovery email required • Can disable if needed • Enhanced security recommended",
            'browser issues': "Browser Compatibility: • Chrome 90+ (recommended) • Firefox 85+ • Safari 14+ • Edge 90+ • Enable JavaScript • Allow cookies • Clear cache regularly • Disable conflicting extensions"
          }
        },
        'audio video': {
          title: 'Audio & Video',
          questions: {
            'camera not working': "Camera Issues: • Check browser permissions • Ensure no other app using camera • Test on other websites • Update camera drivers • Try different browser • Check hardware connections • Restart device • Contact IT support",
            'microphone problems': "Microphone Problems: • Grant microphone permissions • Test microphone in system settings • Check input device selection • Update audio drivers • Use external microphone • Check volume levels • Disable echo cancellation if needed",
            'screen sharing': "Screen Sharing: • Click share screen button • Choose entire screen/window/tab • Grant permissions when prompted • Optimize for video if sharing video • Stop sharing when done • Participants see shared content in main window",
            'quality issues': "Quality Optimization: • Use wired internet connection • Close unnecessary applications • Reduce video resolution if needed • Use headset for better audio • Ensure good lighting for video • Test speed at speedtest.net"
          }
        },
        'performance': {
          title: 'Performance Issues',
          questions: {
            'slow loading': "Performance Optimization: • Clear browser cache and cookies • Close unused browser tabs • Use incognito/private mode • Update browser to latest version • Disable browser extensions • Check internet connection speed • Restart router if needed",
            'mobile app': "Mobile App Performance: • Update to latest app version • Clear app cache and data • Ensure sufficient storage space • Restart mobile device • Use stable WiFi connection • Enable app notifications • Check device compatibility",
            'offline access': "Offline Features: • Download materials for offline use • Sync when back online • Limited functionality offline • Available on mobile app • Maximum 7 days offline • Automatic background sync"
          }
        },
        'integration': {
          title: 'Integrations',
          questions: {
            'google classroom': "Google Classroom Integration: • Connect via Google Workspace • Sync classes and assignments • Import student roster • Share grades automatically • Single sign-on capability • Real-time data sync • Setup takes 5-10 minutes",
            'microsoft teams': "Microsoft Teams Integration: • Install Educon app in Teams • Schedule and join meetings • Share files and assignments • Grade synchronization • Calendar integration • Co-teaching support",
            'sis integration': "SIS Integration: • Compatible with major SIS platforms • Automated student data sync • Grade passback • Attendance synchronization • Custom field mapping • API documentation available • Technical support provided"
          }
        }
      }
    },

    // Billing & Account Category
    'billing': {
      type: 'category',
      title: 'Billing & Account',
      description: 'Manage your subscription, payments, and account settings',
      subtypes: {
        'pricing plans': {
          title: 'Pricing & Plans',
          questions: {
            'current plans': "Current Pricing Plans: • BASIC: $29/month - 50 students, core features • PRO: $79/month - 200 students, advanced analytics • ENTERPRISE: $199/month - Unlimited students, all features + premium support • Annual billing saves 20% • Custom enterprise quotes available",
            'feature comparison': "Plan Comparison: • BASIC: Virtual classes, assessments, basic reports • PRO: All Basic + Advanced analytics, custom branding, API access • ENTERPRISE: All Pro + SSO, custom development, dedicated support • 30-day free trial on all plans",
            'educational discount': "Educational Discounts: • K-12 Schools: 40% discount • Higher Education: 30% discount • Non-profits: 25% discount • Volume discounts available • Government rates • Contact sales for custom pricing",
            'free trial': "Free Trial: • 30-day full feature access • No credit card required • Setup assistance available • Convert to paid anytime • Data preserved after conversion • Cancel anytime during trial"
          }
        },
        'payment': {
          title: 'Payment & Invoicing',
          questions: {
            'payment methods': "Accepted Payment Methods: • Credit Cards (Visa, MasterCard, Amex) • PayPal • Bank transfers (Enterprise) • Purchase orders • Digital wallets • Recurring billing available • Secure payment processing",
            'invoice access': "Invoice Management: • Download invoices from billing section • Automatic email delivery • Multiple currency support • Tax receipt generation • Payment history • Export financial reports • Custom billing dates available",
            'billing cycle': "Billing Cycle: • Monthly or annual billing • Prorated charges for upgrades • Immediate downgrade effect • Automatic renewal • Email reminders before charges • Grace period for failed payments",
            'tax information': "Tax Documentation: • VAT/GST included where applicable • Tax-exempt organizations can submit forms • Invoice includes tax breakdown • Annual tax statements available • Multiple tax jurisdictions supported"
          }
        },
        'account management': {
          title: 'Account Management',
          questions: {
            'upgrade downgrade': "Plan Changes: • Upgrade: Immediate access, prorated charge • Downgrade: Effective next billing cycle • Compare plans before changing • Data preservation guaranteed • No downtime during changes • Confirmation email sent",
            'user management': "User Management: • Add/remove teachers and students • Bulk import users • Role-based permissions • Department organization • Access control settings • Activity monitoring • Custom user fields",
            'data export': "Data Export: • Export student records • Download assignment submissions • Backup grade books • Extract usage analytics • Custom report generation • GDPR compliance tools • Scheduled automated exports",
            'account closure': "Account Closure: • Contact support to initiate closure • 30-day data retention after closure • Export all data before closure • Final invoice provided • Can reopen within 30 days • Complete data deletion after retention period"
          }
        },
        'support': {
          title: 'Support & Training',
          questions: {
            'training resources': "Training Resources: • Weekly live webinars • Video tutorial library • Interactive product tours • Certification programs • Documentation portal • Community forums • Onboarding specialists",
            'support channels': "Support Channels: • Email: support@edutech.com • Phone: 1-800-EDUTECH • Live Chat: In-app support • Help Center: 24/7 knowledge base • Emergency Hotline: Critical issues • Social Media support",
            'service status': "Service Status: • Real-time status page • Scheduled maintenance notices • Performance metrics • Incident reports • System health monitoring • Uptime history • SMS/email alerts"
          }
        }
      }
    },

    // Setup & Configuration Category
    'setup': {
      type: 'category',
      title: 'Setup & Configuration',
      description: 'Get started and customize your platform experience',
      subtypes: {
        'initial setup': {
          title: 'Initial Setup',
          questions: {
            'getting started': "Getting Started Guide: 1. Verify email address 2. Complete institution profile 3. Set up classes and subjects 4. Import student data 5. Configure assessment settings 6. Invite teachers and staff 7. Customize communication templates 8. Schedule training session",
            'data migration': "Data Migration: • CSV template provided • Bulk import tools available • Previous system export guidance • Data validation checks • Migration specialist support • Test import capability • Rollback option available",
            'customization': "Platform Customization: • School branding and colors • Custom domain setup • Communication templates • Assessment rubrics • Grade scales • Attendance codes • Notification preferences",
            'best practices': "Best Practices: • Start with pilot group • Train super users first • Establish clear usage guidelines • Set up regular check-ins • Use analytics to track adoption • Gather user feedback • Schedule quarterly reviews"
          }
        },
        'administrative': {
          title: 'Administrative Settings',
          questions: {
            'permissions': "Permission Levels: • Super Admin: Full system access • Admin: Limited administrative rights • Teacher: Classroom management • Teaching Assistant: Grading assistance • Student: Learning access • Parent: Monitoring access • Custom roles available",
            'security settings': "Security Configuration: • Password complexity requirements • Session timeout settings • IP restriction options • Two-factor authentication • Login attempt limits • Data encryption • Compliance certifications",
            'notification setup': "Notification Management: • Email notification preferences • Push notification settings • SMS alerts for emergencies • Digest frequency options • Custom alert rules • Parent communication settings • Calendar sync options"
          }
        },
        'class management': {
          title: 'Class Management',
          questions: {
            'create class': "Creating Classes: • Basic class information • Subject and grade level • Enrollment capacity • Co-teacher assignment • Schedule setup • Resource folder creation • Parent access configuration • Custom fields available",
            'student enrollment': "Student Enrollment: • Manual student addition • Bulk CSV import • Self-registration links • Parent invitation emails • Enrollment codes • Waitlist management • Automatic roster sync",
            'academic calendar': "Academic Calendar: • Term and semester setup • Holiday configuration • Assignment due dates • Exam schedules • Parent-teacher conferences • Progress report periods • Custom calendar events"
          }
        }
      }
    },

    // Default fallback
    'default': "I understand you're asking about our EduTech platform. For specific technical issues, please contact our support team at support@edutech.com or call 1-800-EDUTECH. For product features, check our documentation at docs.edutech.com."
  };

  // Main categories for initial selection
  const mainCategories = [
    { key: 'features', title: '📊 Product Features', description: 'Explore platform capabilities' },
    { key: 'technical', title: '🔧 Technical Support', description: 'Troubleshoot issues' },
    { key: 'billing', title: '💳 Billing & Account', description: 'Manage subscription & payments' },
    { key: 'setup', title: '⚙️ Setup & Configuration', description: 'Get started & customize' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages[activeMode], currentCategory, currentSubcategory]);

  useEffect(() => {
    if (isOpen && isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
        if (activeMode === 'helpdesk') {
          setSuggestedQuestions(mainCategories);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isInitialLoad, activeMode]);

  useEffect(() => {
    if (activeMode === 'helpdesk') {
      if (!currentCategory && !currentSubcategory) {
        setSuggestedQuestions(mainCategories);
      }
    } else {
      setSuggestedQuestions([]);
    }
  }, [activeMode, currentCategory, currentSubcategory]);

  const getHelpdeskResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Check for exact category matches
    if (faqDatabase[input] && faqDatabase[input].type === 'category') {
      return `I can help you with ${faqDatabase[input].title}. What specific area are you interested in?`;
    }
    
    // Deep search in questions
    for (const [categoryKey, category] of Object.entries(faqDatabase)) {
      if (category.type === 'category') {
        for (const [subtypeKey, subtype] of Object.entries(category.subtypes)) {
          for (const [questionKey, answer] of Object.entries(subtype.questions)) {
            if (input.includes(questionKey) || input.includes(subtypeKey) || input.includes(categoryKey)) {
              return answer;
            }
          }
        }
      }
    }
    
    return faqDatabase.default;
  };

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

  const handleCategorySelect = (categoryKey) => {
    const category = faqDatabase[categoryKey];
    if (category && category.type === 'category') {
      setCurrentCategory(categoryKey);
      setCurrentSubcategory(null);
      
      // Convert subtypes to suggested questions format
      const subtypeQuestions = Object.entries(category.subtypes).map(([key, subtype]) => ({
        key: key,
        title: `📋 ${subtype.title}`,
        description: `Explore ${subtype.title.toLowerCase()} questions`
      }));
      
      setSuggestedQuestions(subtypeQuestions);
      
      // Add bot message about category selection
      const botMessage = {
        id: Date.now(),
        text: `Great! You've selected **${category.title}**. ${category.description}. What specific area would you like help with?`,
        sender: 'bot',
        timestamp: new Date(),
        mode: 'helpdesk'
      };
      
      setMessages(prev => ({
        ...prev,
        helpdesk: [...prev.helpdesk, botMessage]
      }));
    }
  };

  const handleSubcategorySelect = (subcategoryKey) => {
    if (!currentCategory) return;
    
    const category = faqDatabase[currentCategory];
    const subcategory = category.subtypes[subcategoryKey];
    
    if (subcategory) {
      setCurrentSubcategory(subcategoryKey);
      
      // Convert questions to suggested questions format
      const questionList = Object.entries(subcategory.questions).map(([key, answer]) => ({
        key: key,
        title: `❓ ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`,
        description: `Get details about ${key}`
      }));
      
      setSuggestedQuestions(questionList);
      
      // Add bot message about subcategory selection
      const botMessage = {
        id: Date.now(),
        text: `You've selected **${subcategory.title}**. Here are the common questions I can help with:`,
        sender: 'bot',
        timestamp: new Date(),
        mode: 'helpdesk'
      };
      
      setMessages(prev => ({
        ...prev,
        helpdesk: [...prev.helpdesk, botMessage]
      }));
    }
  };

  const handleQuestionSelect = (questionKey) => {
    if (!currentCategory || !currentSubcategory) return;
    
    const answer = faqDatabase[currentCategory].subtypes[currentSubcategory].questions[questionKey];
    
    if (answer) {
      // Add user message (simulated question)
      const userMessage = {
        id: Date.now(),
        text: `Tell me about ${questionKey}`,
        sender: 'user',
        timestamp: new Date(),
        mode: 'helpdesk'
      };
      
      // Add bot answer
      const botMessage = {
        id: Date.now() + 1,
        text: answer,
        sender: 'bot',
        timestamp: new Date(),
        mode: 'helpdesk'
      };
      
      setMessages(prev => ({
        ...prev,
        helpdesk: [...prev.helpdesk, userMessage, botMessage]
      }));
      
      // Reset to main categories after answering
      setTimeout(() => {
        setCurrentCategory(null);
        setCurrentSubcategory(null);
        setSuggestedQuestions(mainCategories);
        
        const followUpMessage = {
          id: Date.now() + 2,
          text: "Is there anything else I can help you with today?",
          sender: 'bot',
          timestamp: new Date(),
          mode: 'helpdesk'
        };
        
        setMessages(prev => ({
          ...prev,
          helpdesk: [...prev.helpdesk, followUpMessage]
        }));
      }, 2000);
    }
  };

  const handleQuickQuestion = (item) => {
    if (currentCategory && currentSubcategory) {
      // It's a specific question
      handleQuestionSelect(item.key);
    } else if (currentCategory) {
      // It's a subcategory
      handleSubcategorySelect(item.key);
    } else {
      // It's a main category
      handleCategorySelect(item.key);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

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

    setMessageAnimations(prev => ({
      ...prev,
      [userMessage.id]: 'slideInRight'
    }));

    try {
      let response;
      
      if (activeMode === 'helpdesk') {
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
          
          setTimeout(() => {
            setMessageAnimations(prev => ({
              ...prev,
              [botMessage.id]: 'slideInLeft'
            }));
          }, 100);
          
          setIsLoading(false);
          
          // Reset navigation after direct question
          if (!inputMessage.toLowerCase().includes('category') && !inputMessage.toLowerCase().includes('type')) {
            setCurrentCategory(null);
            setCurrentSubcategory(null);
            setSuggestedQuestions(mainCategories);
          }
        }, 800 + Math.random() * 400);
        
      } else {
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

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    setCurrentCategory(null);
    setCurrentSubcategory(null);
    if (mode === 'helpdesk') {
      setSuggestedQuestions(mainCategories);
    } else {
      setSuggestedQuestions([]);
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
          : "Hello! I'm your Global AI Assistant. I can help you with any questions, creative tasks, research, and much more! What would you like to know?",
        sender: 'bot',
        timestamp: new Date(),
        mode: activeMode
      }]
    }));
    setMessageAnimations({});
    setCurrentCategory(null);
    setCurrentSubcategory(null);
    if (activeMode === 'helpdesk') {
      setSuggestedQuestions(mainCategories);
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
    setCurrentCategory(null);
    setCurrentSubcategory(null);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const getMessageAnimation = (messageId) => {
    return messageAnimations[messageId] || 'messageAppear';
  };

  // Quick Questions Section Component
  const QuickQuestionsSection = () => {
    if (activeMode !== 'helpdesk' || suggestedQuestions.length === 0 || isLoading) {
      return null;
    }

    return (
      <div style={styles.quickQuestions}>
        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
          {!currentCategory ? 'Choose a category:' : 
           !currentSubcategory ? 'Choose a subcategory:' : 
           'Select a question:'}
        </div>
        {suggestedQuestions.map((item, index) => (
          <button
            key={index}
            style={styles.quickQuestion}
            onClick={() => handleQuickQuestion(item)}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(102, 126, 234, 0.1)';
              e.target.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.8)';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            <div style={{ fontWeight: '600', fontSize: '13px', marginBottom: '2px' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '11px', opacity: 0.7 }}>
              {item.description}
            </div>
          </button>
        ))}
        
        {/* Back button when in subcategory or question view */}
        {(currentCategory || currentSubcategory) && (
          <button
            style={{
              ...styles.quickQuestion,
              background: 'rgba(156, 163, 175, 0.1)',
              border: '1px solid rgba(156, 163, 175, 0.3)'
            }}
            onClick={() => {
              if (currentSubcategory) {
                setCurrentSubcategory(null);
                handleCategorySelect(currentCategory);
              } else {
                setCurrentCategory(null);
                setSuggestedQuestions(mainCategories);
                
                const botMessage = {
                  id: Date.now(),
                  text: "What would you like help with today?",
                  sender: 'bot',
                  timestamp: new Date(),
                  mode: 'helpdesk'
                };
                
                setMessages(prev => ({
                  ...prev,
                  helpdesk: [...prev.helpdesk, botMessage]
                }));
              }
            }}
          >
            ← Back to {currentSubcategory ? 'Categories' : 'Main Menu'}
          </button>
        )}
      </div>
    );
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
            
            <QuickQuestionsSection />
            
            {isLoading && (
              <div style={{...styles.message, ...styles.botMessage}}>
                <div style={{...styles.messageBubble, ...styles.botBubble}}>
                  <div style={styles.typingIndicator}>
                    <span style={{...styles.typingDot, animationDelay: '-0.32s'}}></span>
                    <span style={{...styles.typingDot, animationDelay: '-0.16s'}}></span>
                    <span style={styles.typingDot}></span>
                    <span style={styles.typingText}>
                      {activeMode === 'helpdesk' ? 'Searching knowledge base...' : 'Educon AI is thinking...'}
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