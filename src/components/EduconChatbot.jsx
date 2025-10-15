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
  title: 'Admissions & Enrollment',
  description: 'Streamline your student recruitment and admission process',
  subtypes: {
    'enquiry management': {
      title: 'Enquiry Management',
      questions: {
        'lead capture': "Lead Capture Features: • Multi-channel enquiry forms (website, social media, email) • Automatic lead scoring and prioritization • CRM integration • Follow-up automation • Source tracking (campaigns, referrals) • Duplicate detection • Bulk import from spreadsheets • Real-time notification system",
        'enquiry tracking': "Enquiry Tracking System: • Complete enquiry lifecycle tracking • Communication history log • Task and reminder system • Performance analytics • Conversion rate tracking • Staff assignment and workload management • Automated response templates • Mobile app for on-the-go management",
        'communication tools': "Communication Tools: • Bulk SMS and email campaigns • Personalized email templates • WhatsApp Business integration • Automated follow-up sequences • Meeting scheduler integration • Voice broadcast capabilities • Document attachment tracking • Read receipt monitoring"
      }
    },
    'application process': {
      title: 'Application Process',
      questions: {
        'online application': "Online Application System: • Customizable application forms • Progress saving functionality • Document upload portal • Application fee payment integration • Multi-language support • Mobile-responsive design • Auto-save feature • Application status tracking portal",
        'document management': "Document Management: • Digital document submission • File type validation • Automatic document categorization • Missing document alerts • Bulk document processing • OCR text extraction • Secure document storage • Version control and audit trails",
        'application tracking': "Application Tracking: • Real-time application status • Stage-wise progression tracking • Automated status updates • Waitlist management • Application analytics dashboard • Deadline management • Priority application handling • Transfer application support"
      }
    },
    'admission workflow': {
      title: 'Admission Workflow',
      questions: {
        'approval process': "Approval Workflow: • Multi-level approval system • Role-based permissions • Electronic signatures • Approval chain customization • SLA monitoring • Escalation procedures • Conditional approval paths • Audit trail for all decisions",
        'interview scheduling': "Interview Management: • Automated interview scheduling • Panel management • Video interview integration • Interview feedback forms • Scoring rubrics • Calendar synchronization • Reminder notifications • Interview analytics and reports",
        'decision management': "Decision Management: • Batch decision processing • Acceptance/waitlist/rejection letters • Conditional offer management • Scholarship award integration • Decision appeal process • Enrollment deadline tracking • Deposit payment processing • Welcome package automation"
      }
    },
    'student onboarding': {
      title: 'Student Onboarding',
      questions: {
        'enrollment process': "Enrollment Process: • Online enrollment forms • Course selection wizard • Fee structure display • Payment plan setup • Document verification • Medical form submission • Emergency contact collection • Orientation scheduling",
        'welcome portal': "Welcome Portal Features: • Personalized student dashboard • Orientation materials • Campus virtual tour • Faculty introductions • Academic calendar • Resource library • Student handbook • FAQ section for new students",
        'parent integration': "Parent Onboarding: • Separate parent portal access • Fee payment dashboard • Communication channel with administration • Event calendar • Progress monitoring • Document submission • Emergency contact updates • Transportation preferences"
      }
    },
    'analytics reporting': {
      title: 'Analytics & Reporting',
      questions: {
        'admission analytics': "Admission Analytics: • Enquiry-to-application conversion rates • Application source analysis • Demographic reporting • Time-to-decision metrics • Staff performance tracking • Seasonal trend analysis • Competitive intelligence • ROI on marketing campaigns",
        'forecasting tools': "Forecasting Tools: • Enrollment prediction models • Capacity planning • Waitlist probability analysis • Scholarship budget forecasting • Staff requirement planning • Resource allocation optimization • Trend analysis reports • Custom KPI dashboard",
        'compliance reports': "Compliance Reporting: • Regulatory compliance tracking • Accreditation documentation • Diversity and inclusion reports • Financial aid reporting • Government submission ready reports • Audit trail documentation • Data privacy compliance • Export functionality for authorities"
      }
    },
    'integration capabilities': {
      title: 'Integration & API',
      questions: {
        'crm integration': "CRM Integration: • Salesforce integration • HubSpot connectivity • Microsoft Dynamics sync • Custom API endpoints • Real-time data sync • Bidirectional communication • Lead scoring synchronization • Campaign performance tracking",
        'student information': "SIS Integration: • Seamless student data transfer • Automatic class roster creation • Grade book integration • Attendance system sync • Timetable management • Student record updating • Parent portal activation • Billing system connection",
        'payment gateways': "Payment Integration: • Multiple payment gateway support • International payment processing • Refund management • Installment plan tracking • Receipt generation • Tax calculation • Scholarship deduction handling • Financial aid integration"
      }
    }
  }
},

    'features': {
  type: 'category',
  title: 'Courses & Programs',
  description: 'Explore and manage academic programs, courses, and curriculum',
  subtypes: {
    'course_catalogue': {
      title: 'Course Catalogue & Browse',
      questions: {
        'browse_courses': `Available Courses in Our Catalogue:

🎓 **B.Sc. in Computer Science**
🏫 University of NY
⏱️ 3 Years • 📊 320 Students • 💰 $12,000
📚 Technology • 🎯 Beginner
Learn the fundamentals of computer science, programming, and problem-solving skills.

🎓 **M.Sc. in Data Science**
🏫 Tech University
⏱️ 2 Years • 📊 150 Students • 💰 $15,000
📚 Technology • 🎯 Intermediate
Gain expertise in data analysis, machine learning, and predictive modeling techniques.

🎓 **MBA in Marketing**
🏫 Global Business School
⏱️ 2 Years • 📊 200 Students • 💰 $18,000
📚 Business • 🎯 Intermediate
Develop strategic marketing skills and learn how to grow businesses effectively.

🎓 **BBA in Management**
🏫 City College
⏱️ 3 Years • 📊 180 Students • 💰 $10,500
📚 Business • 🎯 Beginner
Understand the basics of business management, leadership, and organizational skills.

🎓 **React Advanced**
🏫 Code Academy
⏱️ 8 Weeks • 📊 120 Students • 💰 $500
📚 Technology • 🎯 Advanced
Master advanced React concepts, state management, hooks, and component optimization.

🎓 **Tailwind CSS Mastery**
🏫 Design School
⏱️ 6 Weeks • 📊 95 Students • 💰 $400
📚 Design • 🎯 Intermediate
Learn how to build responsive, modern, and visually stunning UIs using Tailwind CSS.

🎓 **Python for Data Analysis**
🏫 Data School
⏱️ 12 Weeks • 📊 140 Students • 💰 $700
📚 Technology • 🎯 Intermediate
Analyze data efficiently with Python using libraries like Pandas, NumPy, and Matplotlib.

🎓 **Fullstack Web Development**
🏫 Tech Hub
⏱️ 16 Weeks • 📊 250 Students • 💰 $1,200
📚 Technology • 🎯 Advanced
Learn front-end and back-end development with React, Node.js, and databases to build full web applications.

🎓 **Digital Marketing Essentials**
🏫 Marketing Academy
⏱️ 8 Weeks • 📊 130 Students • 💰 $450
📚 Business • 🎯 Beginner
Understand SEO, social media marketing, content strategies, and analytics to grow a brand online.

🎓 **UI/UX Design Fundamentals**
🏫 Creative Institute
⏱️ 10 Weeks • 📊 100 Students • 💰 $600
📚 Design • 🎯 Beginner
Master the principles of user interface and user experience design to create intuitive digital products.

🎓 **Python for Machine Learning**
🏫 AI Academy
⏱️ 12 Weeks • 📊 90 Students • 💰 $800
📚 Technology • 🎯 Intermediate
Apply Python programming to implement machine learning algorithms, models, and data pipelines.

🎓 **Financial Analysis & Modeling**
🏫 Finance School
⏱️ 6 Weeks • 📊 75 Students • 💰 $500
📚 Business • 🎯 Intermediate
Learn to analyze financial statements, build models, and make data-driven investment decisions.

Total: 12 courses across 3 categories (Technology, Business, Design)`,

        'course_details': "Detailed Course Information: • Comprehensive course descriptions and learning outcomes • Syllabus and curriculum overview • Required textbooks and materials • Assessment methods and grading criteria • Class schedule and meeting times • Campus location or online access details • Faculty credentials and teaching style • Career outcomes and skill development",

        'program_pathways': "Program Pathways: • Degree and certificate program overviews • Major and minor combinations • Credit requirements and course sequences • Transfer credit evaluation • Academic planning tools • Graduation requirement tracking • Specialization options • Co-op and internship integration"
      }
    },
    'course_enquiry': {
      title: 'Course Enquiry & Information',
      questions: {
        'enquiry_submission': `Course Enquiry System:

You can enquire about any of our 12 courses including:

**Technology Courses (6 courses):**
• B.Sc. in Computer Science - Beginner level
• M.Sc. in Data Science - Intermediate level
• React Advanced - Advanced level
• Python for Data Analysis - Intermediate level
• Fullstack Web Development - Advanced level
• Python for Machine Learning - Intermediate level

**Business Courses (4 courses):**
• MBA in Marketing - Intermediate level
• BBA in Management - Beginner level
• Digital Marketing Essentials - Beginner level
• Financial Analysis & Modeling - Intermediate level

**Design Courses (2 courses):**
• Tailwind CSS Mastery - Intermediate level
• UI/UX Design Fundamentals - Beginner level

To enquire about a specific course, please provide:
• Course name you're interested in
• Your educational background
• Preferred start date
• Any specific questions about the curriculum`,

        'enquiry_tracking': "Enquiry Management: • Automated enquiry acknowledgment • Priority-based routing to advisors • Response time tracking • Follow-up reminder system • Conversion rate monitoring • Enquiry source tracking • Performance analytics dashboard • Integration with CRM systems",

        'advisor_connect': "Advisor Connection: • Direct messaging with course advisors • Video consultation scheduling • Department-specific expert routing • Multi-language support • Document sharing for eligibility checks • Personalized recommendation engine • Group information sessions • Campus tour scheduling"
      }
    },
    'technology_courses': {
      title: 'Technology Courses',
      questions: {
        'all_tech_courses': `Technology Courses Available (6 courses):

💻 **B.Sc. in Computer Science**
🏫 University of NY
⏱️ 3 Years • 👥 320 Students • 💵 $12,000
🎯 Beginner
Learn the fundamentals of computer science, programming, and problem-solving skills.

💻 **M.Sc. in Data Science**
🏫 Tech University
⏱️ 2 Years • 👥 150 Students • 💵 $15,000
🎯 Intermediate
Gain expertise in data analysis, machine learning, and predictive modeling techniques.

💻 **React Advanced**
🏫 Code Academy
⏱️ 8 Weeks • 👥 120 Students • 💵 $500
🎯 Advanced
Master advanced React concepts, state management, hooks, and component optimization.

💻 **Python for Data Analysis**
🏫 Data School
⏱️ 12 Weeks • 👥 140 Students • 💵 $700
🎯 Intermediate
Analyze data efficiently with Python using libraries like Pandas, NumPy, and Matplotlib.

💻 **Fullstack Web Development**
🏫 Tech Hub
⏱️ 16 Weeks • 👥 250 Students • 💵 $1,200
🎯 Advanced
Learn front-end and back-end development with React, Node.js, and databases to build full web applications.

💻 **Python for Machine Learning**
🏫 AI Academy
⏱️ 12 Weeks • 👥 90 Students • 💵 $800
🎯 Intermediate
Apply Python programming to implement machine learning algorithms, models, and data pipelines.`,

        'computer_science': `B.Sc. in Computer Science Details:
• Institute: University of NY
• Duration: 3 Years
• Level: Beginner
• Price: $12,000
• Currently Enrolled: 320 Students

Course Description:
Learn the fundamentals of computer science, programming, and problem-solving skills.

Curriculum Includes:
• Programming Fundamentals
• Data Structures & Algorithms
• Computer Systems
• Software Engineering
• Database Management
• Web Development
• Artificial Intelligence Basics`,

        'data_science': `Data Science Programs:

📊 **M.Sc. in Data Science**
🏫 Tech University
⏱️ 2 Years • 👥 150 Students • 💵 $15,000
🎯 Intermediate
Gain expertise in data analysis, machine learning, and predictive modeling techniques.

📊 **Python for Data Analysis**
🏫 Data School
⏱️ 12 Weeks • 👥 140 Students • 💵 $700
🎯 Intermediate
Analyze data efficiently with Python using libraries like Pandas, NumPy, and Matplotlib.

📊 **Python for Machine Learning**
🏫 AI Academy
⏱️ 12 Weeks • 👥 90 Students • 💵 $800
🎯 Intermediate
Apply Python programming to implement machine learning algorithms, models, and data pipelines.`
      }
    },
    'business_courses': {
      title: 'Business Courses',
      questions: {
        'all_business_courses': `Business & Management Courses (4 courses):

📈 **MBA in Marketing**
🏫 Global Business School
⏱️ 2 Years • 👥 200 Students • 💵 $18,000
🎯 Intermediate
Develop strategic marketing skills and learn how to grow businesses effectively.

📈 **BBA in Management**
🏫 City College
⏱️ 3 Years • 👥 180 Students • 💵 $10,500
🎯 Beginner
Understand the basics of business management, leadership, and organizational skills.

📈 **Digital Marketing Essentials**
🏫 Marketing Academy
⏱️ 8 Weeks • 👥 130 Students • 💵 $450
🎯 Beginner
Understand SEO, social media marketing, content strategies, and analytics to grow a brand online.

📈 **Financial Analysis & Modeling**
🏫 Finance School
⏱️ 6 Weeks • 👥 75 Students • 💵 $500
🎯 Intermediate
Learn to analyze financial statements, build models, and make data-driven investment decisions.`,

        'mba_programs': `MBA in Marketing Details:
• Institute: Global Business School
• Duration: 2 Years
• Level: Intermediate
• Price: $18,000
• Currently Enrolled: 200 Students

Course Description:
Develop strategic marketing skills and learn how to grow businesses effectively.

Curriculum Includes:
• Strategic Marketing Management
• Consumer Behavior Analysis
• Digital Marketing Strategies
• Brand Management
• Market Research & Analytics
• Sales & Distribution Management
• International Marketing`,

        'bba_programs': `BBA in Management Details:
• Institute: City College
• Duration: 3 Years
• Level: Beginner
• Price: $10,500
• Currently Enrolled: 180 Students

Course Description:
Understand the basics of business management, leadership, and organizational skills.`
      }
    },
    'design_courses': {
      title: 'Design Courses',
      questions: {
        'all_design_courses': `Design & Creative Courses (2 courses):

🎨 **Tailwind CSS Mastery**
🏫 Design School
⏱️ 6 Weeks • 👥 95 Students • 💵 $400
🎯 Intermediate
Learn how to build responsive, modern, and visually stunning UIs using Tailwind CSS.

🎨 **UI/UX Design Fundamentals**
🏫 Creative Institute
⏱️ 10 Weeks • 👥 100 Students • 💵 $600
🎯 Beginner
Master the principles of user interface and user experience design to create intuitive digital products.`,

        'ui_ux_design': `UI/UX Design Fundamentals Details:
• Institute: Creative Institute
• Duration: 10 Weeks
• Level: Beginner
• Price: $600
• Currently Enrolled: 100 Students

Course Description:
Master the principles of user interface and user experience design to create intuitive digital products.

Curriculum Includes:
• Design Thinking Process
• User Research Methods
• Wireframing & Prototyping
• Visual Design Principles
• Interaction Design
• Usability Testing
• Design Tools (Figma, Adobe XD)`,

        'tailwind_css': `Tailwind CSS Mastery Details:
• Institute: Design School
• Duration: 6 Weeks
• Level: Intermediate
• Price: $400
• Currently Enrolled: 95 Students

Course Description:
Learn how to build responsive, modern, and visually stunning UIs using Tailwind CSS.`
      }
    },
    'enrollment_management': {
      title: 'Enrollment & Registration',
      questions: {
        'registration_process': `Registration Process for Courses:

**Step-by-Step Enrollment:**
1. Browse available courses from our catalogue of 12 courses
2. Select your preferred course and check prerequisites
3. Submit application with required documents
4. Complete payment process
5. Receive confirmation and access course materials

**Popular Courses by Enrollment:**
• Fullstack Web Development: 250 enrolled
• B.Sc. in Computer Science: 320 enrolled
• MBA in Marketing: 200 enrolled`,

        'pricing_information': `Course Pricing Information:

**Degree Programs (Years):**
• B.Sc. in Computer Science: $12,000
• M.Sc. in Data Science: $15,000
• MBA in Marketing: $18,000
• BBA in Management: $10,500

**Short Courses & Certifications (Weeks):**
• React Advanced: $500
• Tailwind CSS Mastery: $400
• Python for Data Analysis: $700
• Fullstack Web Development: $1,200
• Digital Marketing Essentials: $450
• UI/UX Design Fundamentals: $600
• Python for Machine Learning: $800
• Financial Analysis & Modeling: $500

**Financial Aid Available:**
• Scholarships for eligible students
• Installment payment plans
• Corporate sponsorship options
• Early bird discounts`,

        'duration_options': `Course Duration Options:

**Long-term Programs (1+ Years):**
• B.Sc. in Computer Science: 3 Years
• M.Sc. in Data Science: 2 Years
• MBA in Marketing: 2 Years
• BBA in Management: 3 Years

**Short-term Courses (Weeks):**
• React Advanced: 8 Weeks
• Tailwind CSS Mastery: 6 Weeks
• Python for Data Analysis: 12 Weeks
• Fullstack Web Development: 16 Weeks
• Digital Marketing Essentials: 8 Weeks
• UI/UX Design Fundamentals: 10 Weeks
• Python for Machine Learning: 12 Weeks
• Financial Analysis & Modeling: 6 Weeks

Flexible learning options including full-time, part-time, and online formats available.`
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

    'universities': {
  type: 'category',
  title: 'Universities & Institutions',
  description: 'Explore top universities and educational institutions',
  subtypes: {
    'university_catalogue': {
      title: 'University Catalogue',
      questions: {
        'browse_universities': `Available Universities in Our Network:

🏛️ **Stanford University**
📍 Stanford, CA
⭐ 4.8/5 • 📝 12,450 Reviews • 👥 17,000 Students • 📚 200 Courses
🎓 Technology & Engineering • 🎯 All Levels
A private research university known for entrepreneurship and innovation in Silicon Valley.

🏛️ **MIT - Massachusetts Institute of Technology**
📍 Cambridge, MA
⭐ 4.9/5 • 📝 8,950 Reviews • 👥 12,000 Students • 📚 150 Courses
🎓 Science & Technology • 🎯 Intermediate
World-renowned for STEM education, research, and technological innovation.

🏛️ **Harvard University**
📍 Cambridge, MA
⭐ 4.7/5 • 📝 15,600 Reviews • 👥 21,000 Students • 📚 180 Courses
🎓 Business & Arts • 🎯 Beginner
Ivy League university with comprehensive programs in business, law, and arts.

🏛️ **Berkeley University**
📍 Berkeley, CA
⭐ 4.6/5 • 📝 7,800 Reviews • 👥 14,000 Students • 📚 120 Courses
🎓 Social Sciences • 🎯 All Levels
Public research university known for entrepreneurship and social impact.

🏛️ **Yale University**
📍 New Haven, CT
⭐ 4.8/5 • 📝 11,200 Reviews • 👥 13,500 Students • 📚 165 Courses
🎓 Business & Arts • 🎯 All Levels
Historic Ivy League institution with strong liberal arts and professional programs.

🏛️ **Princeton University**
📍 Princeton, NJ
⭐ 4.9/5 • 📝 9,800 Reviews • 👥 8,500 Students • 📚 140 Courses
🎓 Science & Technology • 🎯 Advanced
Elite research university with exceptional undergraduate education.

🏛️ **Columbia University**
📍 New York, NY
⭐ 4.7/5 • 📝 13,400 Reviews • 👥 31,000 Students • 📚 195 Courses
🎓 Business & Arts • 🎯 Intermediate
Ivy League university in the heart of Manhattan with diverse academic offerings.

🏛️ **Caltech**
📍 Pasadena, CA
⭐ 4.9/5 • 📝 5,600 Reviews • 👥 2,400 Students • 📚 85 Courses
🎓 Technology & Engineering • 🎯 Advanced
Small but mighty institution focused on science and engineering excellence.

Total: 8 universities across 4 categories`,

        'university_details': "University Details Include: • Comprehensive institution profiles • Campus facilities and infrastructure • Faculty qualifications and research • Student life and campus culture • Admission requirements and deadlines • Scholarship and financial aid options • Career services and placement • Alumni network and success stories",

        'location_info': "Location Information: • Campus locations and satellite campuses • Transportation and accessibility • Local community and amenities • Housing and accommodation options • Climate and living conditions • Safety and security measures • Cultural and recreational opportunities • International student support"
      }
    },
    'university_enquiry': {
      title: 'University Enquiry',
      questions: {
        'enquiry_submission': `University Enquiry System:

You can enquire about any of our 8 partner universities including:

**Technology & Engineering Universities:**
• Stanford University - All Levels
• Caltech - Advanced Level

**Science & Technology Universities:**
• MIT - Massachusetts Institute of Technology - Intermediate Level
• Princeton University - Advanced Level

**Business & Arts Universities:**
• Harvard University - Beginner Level
• Yale University - All Levels
• Columbia University - Intermediate Level

**Social Sciences Universities:**
• Berkeley University - All Levels

To enquire about a specific university, please provide:
• University name you're interested in
• Your academic background and interests
• Preferred study level (Beginner/Intermediate/Advanced)
• Any specific programs or departments`,

        'admission_process': "Admission Process: • Application requirements and deadlines • Document submission guidelines • Entrance exam requirements • Interview process details • Portfolio or work sample requirements • Recommendation letter guidelines • Visa and immigration support • Conditional offer information",

        'campus_tours': "Campus Tours & Visits: • Virtual campus tour availability • On-campus visit scheduling • Open house events calendar • Department-specific information sessions • Student ambassador meetings • Faculty interaction opportunities • Accommodation viewing • Local area exploration"
      }
    },
    'technology_engineering': {
      title: 'Technology & Engineering',
      questions: {
        'tech_universities': `Technology & Engineering Universities:

🔧 **Stanford University**
📍 Stanford, CA
⭐ 4.8/5 • 👥 17,000 Students • 📚 200 Courses
💰 $199 ($89 discount)
⏱️ 12 weeks • 🎯 All Levels
A private research university known for entrepreneurship and innovation in Silicon Valley.

🔧 **Caltech**
📍 Pasadena, CA
⭐ 4.9/5 • 👥 2,400 Students • 📚 85 Courses
💰 $229 ($99 discount)
⏱️ 9 weeks • 🎯 Advanced
Small but mighty institution focused on science and engineering excellence.

**Features:**
• State-of-the-art research facilities
• Industry partnerships with tech companies
• Entrepreneurship and innovation programs
• Cutting-edge laboratories and equipment
• Strong alumni network in Silicon Valley`,

        'stanford_details': `Stanford University Details:
• Location: Stanford, California
• Rating: 4.8/5 (12,450 reviews)
• Student Population: 17,000
• Courses Offered: 200
• Category: Technology & Engineering
• Level: All Levels
• Duration: 12 weeks
• Price: $199 (Discounted: $89)

**Key Features:**
• Silicon Valley location with industry connections
• Strong entrepreneurship ecosystem
• World-class engineering programs
• Extensive research opportunities
• Beautiful 8,180-acre campus
• Notable alumni include Google and Yahoo founders

**Popular Programs:**
• Computer Science
• Electrical Engineering
• Mechanical Engineering
• Bioengineering
• Management Science & Engineering`,

        'caltech_details': `Caltech Details:
• Location: Pasadena, California
• Rating: 4.9/5 (5,600 reviews)
• Student Population: 2,400
• Courses Offered: 85
• Category: Technology & Engineering
• Level: Advanced
• Duration: 9 weeks
• Price: $229 (Discounted: $99)

**Key Features:**
• Small student-to-faculty ratio (3:1)
• Intensive research-focused education
• NASA's Jet Propulsion Laboratory partnership
• Nobel Prize-winning faculty
• Highly selective admission process
• Strong focus on pure and applied sciences

**Popular Programs:**
• Physics
• Chemical Engineering
• Computer Science
• Aerospace Engineering
• Biological Sciences`
      }
    },
    'science_technology': {
      title: 'Science & Technology',
      questions: {
        'science_universities': `Science & Technology Universities:

🔬 **MIT - Massachusetts Institute of Technology**
📍 Cambridge, MA
⭐ 4.9/5 • 👥 12,000 Students • 📚 150 Courses
💰 $249 ($99 discount)
⏱️ 10 weeks • 🎯 Intermediate
World-renowned for STEM education, research, and technological innovation.

🔬 **Princeton University**
📍 Princeton, NJ
⭐ 4.9/5 • 👥 8,500 Students • 📚 140 Courses
💰 $209 ($95 discount)
⏱️ 11 weeks • 🎯 Advanced
Elite research university with exceptional undergraduate education.

**Features:**
• Cutting-edge research facilities
• Interdisciplinary science programs
• Strong industry-academia collaboration
• Innovation and technology transfer offices
• Global research partnerships`,

        'mit_details': `MIT Details:
• Location: Cambridge, Massachusetts
• Rating: 4.9/5 (8,950 reviews)
• Student Population: 12,000
• Courses Offered: 150
• Category: Science & Technology
• Level: Intermediate
• Duration: 10 weeks
• Price: $249 (Discounted: $99)

**Key Features:**
• "Mens et Manus" (Mind and Hand) philosophy
• Strong emphasis on practical application
• MIT Media Lab and Lincoln Laboratory
• Extensive undergraduate research opportunities
• Global leadership in technology innovation
• Collaborative and hands-on learning environment

**Popular Programs:**
• Computer Science and Engineering
• Physics
• Mathematics
• Mechanical Engineering
• Biological Engineering`,

        'princeton_details': `Princeton University Details:
• Location: Princeton, New Jersey
• Rating: 4.9/5 (9,800 reviews)
• Student Population: 8,500
• Courses Offered: 140
• Category: Science & Technology
• Level: Advanced
• Duration: 11 weeks
• Price: $209 (Discounted: $95)

**Key Features:**
• Strong emphasis on undergraduate teaching
• Residential college system
• Beautiful Gothic-style campus
• Extensive library collections
• Close faculty-student relationships
• Strong focus on independent research

**Popular Programs:**
• Physics
• Mathematics
• Computer Science
• Molecular Biology
• Operations Research and Financial Engineering`
      }
    },
    'business_arts': {
      title: 'Business & Arts',
      questions: {
        'business_universities': `Business & Arts Universities:

💼 **Harvard University**
📍 Cambridge, MA
⭐ 4.7/5 • 👥 21,000 Students • 📚 180 Courses
💰 $179 ($79 discount)
⏱️ 15 weeks • 🎯 Beginner
Ivy League university with comprehensive programs in business, law, and arts.

💼 **Yale University**
📍 New Haven, CT
⭐ 4.8/5 • 👥 13,500 Students • 📚 165 Courses
💰 $189 ($85 discount)
⏱️ 14 weeks • 🎯 All Levels
Historic Ivy League institution with strong liberal arts and professional programs.

💼 **Columbia University**
📍 New York, NY
⭐ 4.7/5 • 👥 31,000 Students • 📚 195 Courses
💰 $199 ($89 discount)
⏱️ 13 weeks • 🎯 Intermediate
Ivy League university in the heart of Manhattan with diverse academic offerings.

**Features:**
• Professional networking opportunities
• Strong career services and placement
• Diverse cultural and artistic programs
• Global business connections
• Leadership and management development`,

        'harvard_details': `Harvard University Details:
• Location: Cambridge, Massachusetts
• Rating: 4.7/5 (15,600 reviews)
• Student Population: 21,000
• Courses Offered: 180
• Category: Business & Arts
• Level: Beginner
• Duration: 15 weeks
• Price: $179 (Discounted: $79)

**Key Features:**
• Harvard Business School excellence
• Extensive alumni network (Harvard Alumni Association)
• Case method teaching approach
• Global recognition and prestige
• Diverse student body from 150+ countries
• Strong emphasis on leadership development

**Popular Programs:**
• Business Administration
• Law
• Government
• Economics
• Fine Arts`,

        'yale_details': `Yale University Details:
• Location: New Haven, Connecticut
• Rating: 4.8/5 (11,200 reviews)
• Student Population: 13,500
• Courses Offered: 165
• Category: Business & Arts
• Level: All Levels
• Duration: 14 weeks
• Price: $189 (Discounted: $85)

**Key Features:**
• Residential college system fostering community
• Yale School of Management excellence
• World-renowned Yale School of Drama
• Extensive arts and cultural programs
• Strong emphasis on undergraduate education
• Beautiful Gothic architecture campus

**Popular Programs:**
• Business Administration
• Drama and Theater Arts
• Political Science
• History
• Psychology`
      }
    },
    'admission_requirements': {
      title: 'Admission Requirements',
      questions: {
        'general_requirements': `General Admission Requirements:

**Academic Requirements:**
• Completed application form
• Academic transcripts and records
• Standardized test scores (if required)
• Proof of English language proficiency
• Letters of recommendation
• Personal statement or essay

**Documentation Needed:**
• Passport-sized photographs
• Identification documents
• Financial capability proof
• Health insurance documentation
• Visa and immigration documents
• Previous qualification certificates

**Application Timeline:**
• Early decision deadlines
• Regular decision deadlines
• Rolling admissions information
• Scholarship application deadlines
• Visa processing timelines
• Orientation and enrollment dates`,

        'financial_info': `Financial Information:

**Pricing Structure:**
• Stanford University: $199 ($89 discount)
• MIT: $249 ($99 discount)
• Harvard University: $179 ($79 discount)
• Berkeley University: $169 ($69 discount)
• Yale University: $189 ($85 discount)
• Princeton University: $209 ($95 discount)
• Columbia University: $199 ($89 discount)
• Caltech: $229 ($99 discount)

**Financial Aid Options:**
• Merit-based scholarships
• Need-based financial aid
• Work-study programs
• Research assistantships
• Teaching assistantships
• External scholarship opportunities
• Payment plan options
• Corporate sponsorship programs`,

        'scholarship_opportunities': `Scholarship Opportunities:

**Available Scholarships:**
• Academic Excellence Scholarships
• Leadership and Community Service Awards
• Diversity and Inclusion Scholarships
• International Student Scholarships
• Research and Innovation Grants
• Athletic Scholarships
• Arts and Talent Scholarships
• Need-Based Financial Aid

**Application Process:**
• Separate scholarship application forms
• Essay or personal statement requirements
• Interview process for major awards
• Documentation of achievements
• Recommendation letters for scholarships
• Deadline adherence importance
• Renewal criteria and requirements`
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
    { key: 'features', title: 'Admissions & Enrollment', description: 'Explore platform capabilities' },
    { key: 'features', title: 'Courses & Programs', description: 'Explore courses and academic programs' },
    { key: 'universities', title: 'Universities', description: 'Get started & customize' },
    { key: 'technical', title: 'Technical Support', description: 'Troubleshoot issues' },
    { key: 'billing', title: 'Billing & Account', description: 'Manage subscription & payments' },
    { key: 'setup', title: 'Setup & Configuration', description: 'Get started & customize' }
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