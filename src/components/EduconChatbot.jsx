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
        text: "Hello! I'm your Educon Helpdesk Assistant. I'm here to help you with product features, technical issues, billing, and account management! How can I assist you today?",
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

  // Complete FAQ database with all categories and subcategories
  const faqDatabase = {
    // Admissions & Enrollment Category
    'admissions': {
      type: 'category',
      title: 'Admissions & Enrollment',
      description: 'Streamline your student recruitment and admission process',
      subtypes: {
        'enquiry_management': {
          title: 'Enquiry Management',
          questions: {
            'lead_capture': `**Lead Capture Features:**
• Multi-channel enquiry forms (website, social media, email)
• Automatic lead scoring and prioritization
• CRM integration with Salesforce and HubSpot
• Follow-up automation with email sequences
• Source tracking for marketing campaigns
• Duplicate detection and merging
• Bulk import from Excel/CSV files
• Real-time notification system for new leads
• Mobile app for field admissions teams
• Custom form builder with conditional logic`,

            'enquiry_tracking': `**Enquiry Tracking System:**
• Complete enquiry lifecycle tracking from first contact to enrollment
• Communication history log with timestamps
• Task and reminder system for follow-ups
• Performance analytics dashboard
• Conversion rate tracking by source
• Staff assignment and workload management
• Automated response templates
• Lead nurturing workflows
• Lost lead analysis and reporting
• Integration with call center systems`,

            'communication_tools': `**Communication Tools:**
• Bulk SMS and email campaigns
• Personalized email templates with merge tags
• WhatsApp Business integration
• Automated follow-up sequences
• Meeting scheduler integration (Calendly, Google Calendar)
• Voice broadcast capabilities
• Document attachment tracking
• Read receipt monitoring
• Multi-language support
• A/B testing for communication templates`
          }
        },
        'application_process': {
          title: 'Application Process',
          questions: {
            'online_application': `**Online Application System:**
• Customizable application forms with drag-and-drop builder
• Progress saving functionality for multi-page forms
• Document upload portal with file type validation
• Application fee payment integration
• Multi-language support (10+ languages)
• Mobile-responsive design for all devices
• Auto-save feature every 30 seconds
• Application status tracking portal
• Conditional logic for form fields
• Integration with payment gateways`,

            'document_management': `**Document Management:**
• Digital document submission portal
• File type validation (PDF, DOC, JPG, PNG)
• Automatic document categorization
• Missing document alerts and reminders
• Bulk document processing for multiple applications
• OCR text extraction for uploaded documents
• Secure document storage with encryption
• Version control and audit trails
• Document expiry tracking
• Integration with verification services`,

            'application_tracking': `**Application Tracking:**
• Real-time application status updates
• Stage-wise progression tracking
• Automated status update emails to applicants
• Waitlist management with priority ranking
• Application analytics dashboard
• Deadline management with automated reminders
• Priority application handling
• Transfer application support
• Bulk status update capabilities
• Custom workflow configuration`
          }
        },
        'admission_workflow': {
          title: 'Admission Workflow',
          questions: {
            'approval_process': `**Approval Workflow:**
• Multi-level approval system with configurable chains
• Role-based permissions for different approvers
• Electronic signatures with legal compliance
• Approval chain customization
• SLA monitoring for approval timelines
• Escalation procedures for delayed approvals
• Conditional approval paths based on criteria
• Audit trail for all decisions and comments
• Mobile approval capabilities
• Integration with document management`,

            'interview_scheduling': `**Interview Management:**
• Automated interview scheduling with calendar integration
• Panel management for multiple interviewers
• Video interview integration (Zoom, Teams, Google Meet)
• Interview feedback forms with scoring rubrics
• Scoring rubrics for standardized evaluation
• Calendar synchronization across platforms
• Reminder notifications for candidates and interviewers
• Interview analytics and reports
• Group interview scheduling
• Candidate self-scheduling options`,

            'decision_management': `**Decision Management:**
• Batch decision processing for multiple applications
• Acceptance/waitlist/rejection letter templates
• Conditional offer management
• Scholarship award integration
• Decision appeal process workflow
• Enrollment deadline tracking
• Deposit payment processing
• Welcome package automation
• Multi-level decision approval
• Integration with financial aid systems`
          }
        },
        'student_onboarding': {
          title: 'Student Onboarding',
          questions: {
            'enrollment_process': `**Enrollment Process:**
• Online enrollment forms with pre-filled data
• Course selection wizard with prerequisites checking
• Fee structure display with installment options
• Payment plan setup and management
• Document verification portal
• Medical form submission and tracking
• Emergency contact collection
• Orientation scheduling and confirmation
• Housing preference selection
• Transportation arrangement requests`,

            'welcome_portal': `**Welcome Portal Features:**
• Personalized student dashboard
• Orientation materials and schedules
• Campus virtual tour with 360° views
• Faculty introductions and profiles
• Academic calendar integration
• Resource library and handbooks
• Student handbook digital access
• FAQ section for new students
• Peer mentor matching
• Campus map with interactive features`,

            'parent_integration': `**Parent Onboarding:**
• Separate parent portal access with limited permissions
• Fee payment dashboard with transaction history
• Communication channel with administration
• Event calendar for parents
• Progress monitoring and report cards
• Document submission for verification
• Emergency contact updates
• Transportation preferences and tracking
• Parent-teacher meeting scheduling
• Newsletter subscription management`
          }
        },
        'analytics_reporting': {
          title: 'Analytics & Reporting',
          questions: {
            'admission_analytics': `**Admission Analytics:**
• Enquiry-to-application conversion rates
• Application source analysis and ROI tracking
• Demographic reporting and diversity metrics
• Time-to-decision metrics by department
• Staff performance tracking and productivity
• Seasonal trend analysis for admissions
• Competitive intelligence reporting
• ROI on marketing campaigns
• Yield rate analysis
• Geographic distribution reports`,

            'forecasting_tools': `**Forecasting Tools:**
• Enrollment prediction models with 95% accuracy
• Capacity planning and resource allocation
• Waitlist probability analysis
• Scholarship budget forecasting
• Staff requirement planning
• Resource allocation optimization
• Trend analysis reports with historical data
• Custom KPI dashboard creation
• Real-time enrollment projections
• Scenario planning and what-if analysis`,

            'compliance_reports': `**Compliance Reporting:**
• Regulatory compliance tracking for education boards
• Accreditation documentation management
• Diversity and inclusion reports
• Financial aid reporting and auditing
• Government submission ready reports
• Audit trail documentation for 7+ years
• Data privacy compliance (GDPR, FERPA)
• Export functionality for regulatory authorities
• Automated compliance checklist
• Custom report builder for specific requirements`
          }
        },
        'integration_capabilities': {
          title: 'Integration & API',
          questions: {
            'crm_integration': `**CRM Integration:**
• Salesforce integration with bidirectional sync
• HubSpot connectivity for marketing automation
• Microsoft Dynamics sync for enterprise CRM
• Custom API endpoints for proprietary systems
• Real-time data synchronization
• Bidirectional communication between systems
• Lead scoring synchronization
• Campaign performance tracking
• Custom field mapping
• Webhook support for real-time updates`,

            'student_information': `**SIS Integration:**
• Seamless student data transfer upon enrollment
• Automatic class roster creation
• Grade book integration and sync
• Attendance system synchronization
• Timetable management integration
• Student record updating in real-time
• Parent portal activation and management
• Billing system connection
• Transcript generation
• Graduation tracking`,

            'payment_gateways': `**Payment Integration:**
• Multiple payment gateway support (Stripe, PayPal, Square)
• International payment processing in 50+ currencies
• Refund management and processing
• Installment plan tracking and reminders
• Receipt generation and delivery
• Tax calculation and compliance
• Scholarship deduction handling
• Financial aid integration
• Payment plan customization
• Failed payment recovery system`
          }
        }
      }
    },

    // Courses & Programs Category
    'courses': {
      type: 'category',
      title: 'Courses & Programs',
      description: 'Explore and manage academic programs, courses, and curriculum',
      subtypes: {
        'course_catalogue': {
          title: 'Course Catalogue',
          questions: {
            'browse_courses': `**Available Courses in Our Catalogue:**

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

**Total: 12 courses across 3 categories (Technology, Business, Design)**`,

            'course_details': `**Detailed Course Information:**
• Comprehensive course descriptions and learning outcomes
• Syllabus and curriculum overview with weekly breakdown
• Required textbooks and materials list
• Assessment methods and grading criteria
• Class schedule and meeting times
• Campus location or online access details
• Faculty credentials and teaching style
• Career outcomes and skill development
• Prerequisites and eligibility requirements
• Student support services available`,

            'program_pathways': `**Program Pathways:**
• Degree and certificate program overviews
• Major and minor combinations available
• Credit requirements and course sequences
• Transfer credit evaluation process
• Academic planning tools and advisors
• Graduation requirement tracking
• Specialization options and tracks
• Co-op and internship integration
• Accelerated program options
• Dual degree opportunities`
          }
        },
        'course_enquiry': {
          title: 'Course Enquiry',
          questions: {
            'enquiry_submission': `**Course Enquiry System:**

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

**To enquire about a specific course, please provide:**
• Course name you're interested in
• Your educational background
• Preferred start date
• Any specific questions about the curriculum
• Current experience level
• Career goals and objectives`,

            'enquiry_tracking': `**Enquiry Management:**
• Automated enquiry acknowledgment within 15 minutes
• Priority-based routing to specialized advisors
• Response time tracking and SLA monitoring
• Follow-up reminder system
• Conversion rate monitoring by course
• Enquiry source tracking and attribution
• Performance analytics dashboard
• Integration with CRM systems
• Multi-channel enquiry consolidation
• Lead scoring and prioritization`,

            'advisor_connect': `**Advisor Connection:**
• Direct messaging with course advisors
• Video consultation scheduling
• Department-specific expert routing
• Multi-language support for international students
• Document sharing for eligibility checks
• Personalized recommendation engine
• Group information sessions
• Campus tour scheduling
• Career counseling sessions
• Alumni mentorship connections`
          }
        },
        'technology_courses': {
          title: 'Technology Courses',
          questions: {
            'all_tech_courses': `**Technology Courses Available (6 courses):**

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

            'computer_science': `**B.Sc. in Computer Science Details:**
• Institute: University of NY
• Duration: 3 Years
• Level: Beginner
• Price: $12,000
• Currently Enrolled: 320 Students
• Format: On-campus with online options
• Accreditation: ABET Accredited

**Course Description:**
Learn the fundamentals of computer science, programming, and problem-solving skills in this comprehensive degree program.

**Curriculum Includes:**
• Programming Fundamentals (Python, Java)
• Data Structures & Algorithms
• Computer Systems and Architecture
• Software Engineering Principles
• Database Management Systems
• Web Development Technologies
• Artificial Intelligence Basics
• Operating Systems
• Computer Networks
• Cybersecurity Fundamentals

**Career Outcomes:**
• Software Developer
• Systems Analyst
• Database Administrator
• Web Developer
• IT Consultant`,

            'data_science': `**Data Science Programs:**

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
Apply Python programming to implement machine learning algorithms, models, and data pipelines.

**Common Data Science Topics:**
• Statistical Analysis and Probability
• Machine Learning Algorithms
• Data Visualization Techniques
• Big Data Technologies
• Database Management
• Cloud Computing Platforms
• Business Intelligence Tools
• Data Ethics and Privacy`
          }
        },
        'business_courses': {
          title: 'Business Courses',
          questions: {
            'all_business_courses': `**Business & Management Courses (4 courses):**

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

            'mba_programs': `**MBA in Marketing Details:**
• Institute: Global Business School
• Duration: 2 Years
• Level: Intermediate
• Price: $18,000
• Currently Enrolled: 200 Students
• Format: Hybrid (Online + On-campus)
• Accreditation: AACSB Accredited

**Course Description:**
Develop strategic marketing skills and learn how to grow businesses effectively in competitive markets.

**Curriculum Includes:**
• Strategic Marketing Management
• Consumer Behavior Analysis
• Digital Marketing Strategies
• Brand Management and Development
• Market Research & Analytics
• Sales & Distribution Management
• International Marketing
• Marketing Metrics and ROI
• Product Management
• Customer Relationship Management

**Career Outcomes:**
• Marketing Manager
• Brand Strategist
• Digital Marketing Specialist
• Market Research Analyst
• Product Manager`,

            'bba_programs': `**BBA in Management Details:**
• Institute: City College
• Duration: 3 Years
• Level: Beginner
• Price: $10,500
• Currently Enrolled: 180 Students
• Format: Full-time On-campus
• Accreditation: Regional Accreditation

**Course Description:**
Understand the basics of business management, leadership, and organizational skills for successful career development.

**Curriculum Includes:**
• Principles of Management
• Organizational Behavior
• Business Communication
• Financial Accounting
• Marketing Principles
• Human Resource Management
• Operations Management
• Business Ethics
• Strategic Planning
• Entrepreneurship Fundamentals

**Career Outcomes:**
• Business Manager
• Operations Supervisor
• Team Leader
• Project Coordinator
• Small Business Owner`
          }
        },
        'design_courses': {
          title: 'Design Courses',
          questions: {
            'all_design_courses': `**Design & Creative Courses (2 courses):**

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

            'ui_ux_design': `**UI/UX Design Fundamentals Details:**
• Institute: Creative Institute
• Duration: 10 Weeks
• Level: Beginner
• Price: $600
• Currently Enrolled: 100 Students
• Format: Online with live sessions
• Certificate: Industry-recognized

**Course Description:**
Master the principles of user interface and user experience design to create intuitive digital products that users love.

**Curriculum Includes:**
• Design Thinking Process
• User Research Methods and Personas
• Wireframing & Prototyping Techniques
• Visual Design Principles and Color Theory
• Interaction Design Patterns
• Usability Testing Methods
• Design Tools (Figma, Adobe XD, Sketch)
• Mobile-First Design Approach
• Accessibility Guidelines
• Portfolio Development

**Career Outcomes:**
• UI/UX Designer
• Product Designer
• Interaction Designer
• UX Researcher
• Design Consultant`,

            'tailwind_css': `**Tailwind CSS Mastery Details:**
• Institute: Design School
• Duration: 6 Weeks
• Level: Intermediate
• Price: $400
• Currently Enrolled: 95 Students
• Format: Self-paced with mentor support
• Prerequisites: Basic HTML/CSS knowledge

**Course Description:**
Learn how to build responsive, modern, and visually stunning UIs using Tailwind CSS utility-first framework.

**Curriculum Includes:**
• Tailwind CSS Fundamentals
• Responsive Design with Breakpoints
• Component Styling and Customization
• Dark Mode Implementation
• Animation and Transition Effects
• Plugin Development
• Performance Optimization
• Integration with React/Vue
• Best Practices and Workflows
• Real-world Project Building

**Career Outcomes:**
• Frontend Developer
• Web Designer
• UI Developer
• CSS Specialist
• Fullstack Developer`
          }
        },
        'enrollment_management': {
          title: 'Enrollment & Registration',
          questions: {
            'registration_process': `**Registration Process for Courses:**

**Step-by-Step Enrollment:**
1. Browse available courses from our catalogue of 12 courses
2. Select your preferred course and check prerequisites
3. Submit application with required documents
4. Complete payment process securely
5. Receive confirmation and access course materials
6. Attend orientation session
7. Access learning platform and resources

**Popular Courses by Enrollment:**
• Fullstack Web Development: 250 enrolled
• B.Sc. in Computer Science: 320 enrolled
• MBA in Marketing: 200 enrolled
• Python for Data Analysis: 140 enrolled
• UI/UX Design Fundamentals: 100 enrolled

**Registration Requirements:**
• Valid identification document
• Educational transcripts
• Prerequisite verification
• Payment method setup
• Agreement to terms and conditions`,

            'pricing_information': `**Course Pricing Information:**

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
• Installment payment plans (3-12 months)
• Corporate sponsorship options
• Early bird discounts (up to 15%)
• Group enrollment discounts
• Alumni referral discounts
• Military and veteran benefits`,

            'duration_options': `**Course Duration Options:**

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

**Flexible Learning Options:**
• Full-time intensive programs
• Part-time evening classes
• Online self-paced learning
• Hybrid blended formats
• Weekend-only schedules
• Accelerated completion options
• Extended duration for working professionals`
          }
        }
      }
    },

    // Universities & Institutions Category
    'universities': {
      type: 'category',
      title: 'Universities & Institutions',
      description: 'Explore top universities and educational institutions',
      subtypes: {
        'university_catalogue': {
          title: 'University Catalogue',
          questions: {
            'browse_universities': `**Available Universities in Our Network:**

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

**Total: 8 universities across 4 categories**`,

            'university_details': `**University Details Include:**
• Comprehensive institution profiles and history
• Campus facilities and infrastructure details
• Faculty qualifications and research achievements
• Student life and campus culture descriptions
• Admission requirements and deadlines
• Scholarship and financial aid options
• Career services and placement statistics
• Alumni network and success stories
• Research centers and laboratories
• International student support services
• Housing and accommodation options
• Sports and recreational facilities`,

            'location_info': `**Location Information:**
• Campus locations and satellite campuses
• Transportation and accessibility options
• Local community and amenities
• Housing and accommodation options
• Climate and living conditions
• Safety and security measures
• Cultural and recreational opportunities
• International student support
• Cost of living estimates
• Healthcare facilities access
• Public transportation networks
• Nearby attractions and landmarks`
          }
        },
        'university_enquiry': {
          title: 'University Enquiry',
          questions: {
            'enquiry_submission': `**University Enquiry System:**

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

**To enquire about a specific university, please provide:**
• University name you're interested in
• Your academic background and interests
• Preferred study level (Beginner/Intermediate/Advanced)
• Any specific programs or departments
• Desired intake period
• Budget considerations
• Career goals and objectives
• Previous educational qualifications`,

            'admission_process': `**Admission Process:**
• Application requirements and deadlines
• Document submission guidelines and formats
• Entrance exam requirements (SAT, ACT, GRE, GMAT)
• Interview process details and preparation
• Portfolio or work sample requirements
• Recommendation letter guidelines
• Visa and immigration support services
• Conditional offer information
• English language proficiency requirements
• Academic transcript evaluation
• Application fee payment methods
• Status tracking and updates`,

            'campus_tours': `**Campus Tours & Visits:**
• Virtual campus tour availability 24/7
• On-campus visit scheduling system
• Open house events calendar
• Department-specific information sessions
• Student ambassador meetings and Q&A
• Faculty interaction opportunities
• Accommodation viewing and options
• Local area exploration guides
• Transportation arrangements
• International student orientation
• Family and guest accommodations
• Accessibility services information`
          }
        },
        'technology_engineering': {
          title: 'Technology & Engineering',
          questions: {
            'tech_universities': `**Technology & Engineering Universities:**

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
• Strong alumni network in Silicon Valley
• Internship opportunities with top firms
• Research funding and grants
• Technology transfer offices
• Startup incubation centers
• Industry mentorship programs`,

            'stanford_details': `**Stanford University Details:**
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
• $1.6 billion annual research budget
• 2,240 faculty members
• 20 Nobel laureates affiliated
• 125+ research centers

**Popular Programs:**
• Computer Science
• Electrical Engineering
• Mechanical Engineering
• Bioengineering
• Management Science & Engineering
• Artificial Intelligence
• Robotics
• Cybersecurity
• Data Science
• Environmental Engineering`,

            'caltech_details': `**Caltech Details:**
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
• Nobel Prize-winning faculty (39 laureates)
• Highly selective admission process
• Strong focus on pure and applied sciences
• $357 million research funding
• 300+ professorial faculty
• 50+ research centers
• 124:1 endowment per student ratio

**Popular Programs:**
• Physics
• Chemical Engineering
• Computer Science
• Aerospace Engineering
• Biological Sciences
• Mathematics
• Astronomy
• Electrical Engineering
• Environmental Science
• Materials Science`
          }
        },
        'science_technology': {
          title: 'Science & Technology',
          questions: {
            'science_universities': `**Science & Technology Universities:**

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
• Global research partnerships
• State-of-the-art laboratories
• Cross-disciplinary research centers
• Industry-sponsored projects
• International research collaborations
• Technology commercialization support`,

            'mit_details': `**MIT Details:**
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
• $3.7 billion annual research budget
• 1,000+ faculty members
• 97 Nobel laureates affiliated
• 500+ research groups

**Popular Programs:**
• Computer Science and Engineering
• Physics
• Mathematics
• Mechanical Engineering
• Biological Engineering
• Aerospace Engineering
• Electrical Engineering
• Chemistry
• Economics
• Brain and Cognitive Sciences`,

            'princeton_details': `**Princeton University Details:**
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
• $26 billion endowment
• 1,290 faculty members
• 69 Nobel laureates
• 200+ research centers

**Popular Programs:**
• Physics
• Mathematics
• Computer Science
• Molecular Biology
• Operations Research and Financial Engineering
• Chemistry
• Economics
• Public and International Affairs
• Psychology
• Mechanical and Aerospace Engineering`
          }
        },
        'business_arts': {
          title: 'Business & Arts',
          questions: {
            'business_universities': `**Business & Arts Universities:**

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
• Leadership and management development
• Executive education programs
• Alumni networking events
• Industry speaker series
• Career development workshops
• Professional certification programs`,

            'harvard_details': `**Harvard University Details:**
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
• $53.2 billion endowment
• 2,400 faculty members
• 161 Nobel laureates
• 400,000+ alumni worldwide

**Popular Programs:**
• Business Administration
• Law
• Government
• Economics
• Fine Arts
• Public Health
• Education
• Design
• Divinity
• Extension Studies`,

            'yale_details': `**Yale University Details:**
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
• $42.3 billion endowment
• 4,410 faculty members
• 65 Nobel laureates
• 140+ countries represented

**Popular Programs:**
• Business Administration
• Drama and Theater Arts
• Political Science
• History
• Psychology
• Economics
• English
• Biology
• Architecture
• Music`
          }
        },
        'admission_requirements': {
          title: 'Admission Requirements',
          questions: {
            'general_requirements': `**General Admission Requirements:**

**Academic Requirements:**
• Completed application form with personal statement
• Academic transcripts and records (official)
• Standardized test scores (SAT, ACT, GRE, GMAT as required)
• Proof of English language proficiency (TOEFL, IELTS)
• Letters of recommendation (2-3 required)
• Personal statement or essay (500-1000 words)
• Resume/CV for graduate programs
• Portfolio for creative programs

**Documentation Needed:**
• Passport-sized photographs
• Identification documents (passport copy)
• Financial capability proof
• Health insurance documentation
• Visa and immigration documents
• Previous qualification certificates
• Criminal background check (if required)
• Medical examination reports

**Application Timeline:**
• Early decision deadlines (November 1)
• Regular decision deadlines (January 1)
• Rolling admissions information
• Scholarship application deadlines
• Visa processing timelines (3-6 months)
• Orientation and enrollment dates
• Housing application deadlines
• Financial aid submission dates`,

            'financial_info': `**Financial Information:**

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
• Merit-based scholarships (academic excellence)
• Need-based financial aid packages
• Work-study programs on campus
• Research assistantships for graduates
• Teaching assistantships with stipends
• External scholarship opportunities
• Payment plan options (monthly installments)
• Corporate sponsorship programs
• Military and veteran benefits
• Alumni sponsorship opportunities`,

            'scholarship_opportunities': `**Scholarship Opportunities:**

**Available Scholarships:**
• Academic Excellence Scholarships (up to full tuition)
• Leadership and Community Service Awards
• Diversity and Inclusion Scholarships
• International Student Scholarships
• Research and Innovation Grants
• Athletic Scholarships for varsity sports
• Arts and Talent Scholarships
• Need-Based Financial Aid packages
• Department-specific scholarships
• Alumni-funded scholarships

**Application Process:**
• Separate scholarship application forms
• Essay or personal statement requirements
• Interview process for major awards
• Documentation of achievements and awards
• Recommendation letters for scholarships
• Deadline adherence importance
• Renewal criteria and requirements
• Academic performance maintenance
• Community service commitments
• Leadership role expectations`
          }
        }
      }
    },

    // Technical Support Category
    'technical': {
      type: 'category',
      title: 'Technical Support',
      description: 'Get help with technical problems and troubleshooting',
      subtypes: {
        'login_issues': {
          title: 'Login & Access',
          questions: {
            'forgot_password': `**Password Recovery Process:**
1. Click 'Forgot Password' on login page
2. Enter registered email address
3. Check email for reset link (check spam folder)
4. Create new password (minimum 8 characters, including uppercase, lowercase, number, special character)
5. Login with new credentials
6. Contact support if email not received within 15 minutes
7. Security questions verification option available
8. Two-factor authentication reset if needed`,

            'account_locked': `**Account Locked Solutions:**
• Too many failed login attempts (5 attempts limit)
• Wait 15 minutes for automatic unlock or contact support
• Verify email address through confirmation link
• Check spam folder for verification emails
• Ensure correct username/email format
• Clear browser cache and cookies
• Try different browser or incognito mode
• Contact support for immediate unlock
• Security verification may be required
• Check if account is suspended for policy violations`,

            'two_factor': `**Two-Factor Authentication:**
• Setup via security settings in account dashboard
• Use authenticator app (Google Authenticator, Authy) or SMS
• Backup codes provided during setup (save securely)
• Recovery email required for account recovery
• Can disable if needed (not recommended)
• Enhanced security strongly recommended
• Multiple device support available
• Time-based one-time passwords (TOTP)
• Biometric authentication options
• Emergency access procedures`,

            'browser_issues': `**Browser Compatibility:**
• Chrome 90+ (recommended for best performance)
• Firefox 85+ (fully supported)
• Safari 14+ (macOS and iOS)
• Edge 90+ (Windows recommended)
• Enable JavaScript (required for all features)
• Allow cookies for session management
• Clear cache regularly for optimal performance
• Disable conflicting extensions
• Update browser to latest version
• Enable pop-ups for certain features
• Check internet connection stability`
          }
        },
        'audio_video': {
          title: 'Audio & Video',
          questions: {
            'camera_not_working': `**Camera Issues Troubleshooting:**
• Check browser permissions for camera access
• Ensure no other app is using camera simultaneously
• Test camera on other websites to verify functionality
• Update camera drivers to latest version
• Try different browser (Chrome recommended)
• Check hardware connections for external cameras
• Restart device and try again
• Contact IT support for hardware issues
• Check operating system camera permissions
• Verify camera is not physically blocked
• Test in incognito/private browsing mode`,

            'microphone_problems': `**Microphone Problems Solutions:**
• Grant microphone permissions in browser settings
• Test microphone in system settings/control panel
• Check input device selection in audio settings
• Update audio drivers to latest version
• Use external microphone for better quality
• Check volume levels and mute status
• Disable echo cancellation if causing issues
• Test with different applications
• Restart audio services
• Check physical connections for external mics
• Verify microphone is set as default device`,

            'screen_sharing': `**Screen Sharing Guide:**
• Click share screen button in meeting interface
• Choose entire screen/window/tab option
• Grant permissions when prompted by browser
• Optimize for video if sharing video content
• Stop sharing when presentation complete
• Participants see shared content in main window
• Annotation tools available during sharing
• Pause sharing temporarily if needed
• Share specific applications only
• Optimize bandwidth for smooth sharing
• Test sharing before important meetings`,

            'quality_issues': `**Quality Optimization:**
• Use wired internet connection instead of WiFi
• Close unnecessary applications and browser tabs
• Reduce video resolution if experiencing lag
• Use headset for better audio quality
• Ensure good lighting for video clarity
• Test speed at speedtest.net (min 5 Mbps upload)
• Update graphics drivers for better performance
• Use Ethernet connection for stability
• Limit background processes
• Adjust bandwidth settings in preferences
• Contact ISP if consistent speed issues`
          }
        },
        'performance': {
          title: 'Performance Issues',
          questions: {
            'slow_loading': `**Performance Optimization:**
• Clear browser cache and cookies regularly
• Close unused browser tabs to free memory
• Use incognito/private mode for testing
• Update browser to latest version
• Disable browser extensions one by one to identify conflicts
• Check internet connection speed and stability
• Restart router if connection issues persist
• Use wired connection instead of wireless
• Check system resources (CPU, RAM usage)
• Scan for malware or viruses
• Contact support if issues continue`,

            'mobile_app': `**Mobile App Performance:**
• Update to latest app version from app store
• Clear app cache and data in settings
• Ensure sufficient storage space (min 500MB free)
• Restart mobile device regularly
• Use stable WiFi connection instead of cellular data
• Enable app notifications for important updates
• Check device compatibility requirements
• Reinstall app if persistent issues
• Update device operating system
• Check battery optimization settings
• Contact app support for specific issues`,

            'offline_access': `**Offline Features:**
• Download course materials for offline use
• Automatic sync when back online
• Limited functionality available offline
• Available on mobile app primarily
• Maximum 7 days offline access
• Automatic background sync when online
• Download specific courses or sections
• Offline quiz and assignment completion
• Sync progress when reconnected
• Storage management for offline content
• Manual sync trigger available`
          }
        },
        'integration': {
          title: 'Integrations',
          questions: {
            'google_classroom': `**Google Classroom Integration:**
• Connect via Google Workspace for Education
• Automatic sync of classes and assignments
• Import student roster from Google Classroom
• Share grades automatically back to Classroom
• Single sign-on capability with Google accounts
• Real-time data sync between platforms
• Setup takes 5-10 minutes for administrators
• Support for multiple Google Workspace domains
• Assignment submission tracking
• Grade passback functionality
• Calendar integration for due dates`,

            'microsoft_teams': `**Microsoft Teams Integration:**
• Install Educon app in Teams app store
• Schedule and join meetings directly from Teams
• Share files and assignments within Teams
• Grade synchronization with Teams assignments
• Calendar integration for class schedules
• Co-teaching support with multiple educators
• Student roster sync from Teams
• Assignment distribution through Teams
• Real-time notifications in Teams
• Single sign-on with Microsoft accounts
• Teams tab embedding for quick access`,

            'sis_integration': `**SIS Integration:**
• Compatible with major SIS platforms (PowerSchool, Infinite Campus, etc.)
• Automated student data sync (enrollment, demographics)
• Grade passback to SIS gradebooks
• Attendance synchronization
• Custom field mapping for specific data
• API documentation available for developers
• Technical support provided for setup
• Real-time or scheduled sync options
• Data validation and error reporting
• Historical data migration support
• Custom integration development available`
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
        'pricing_plans': {
          title: 'Pricing & Plans',
          questions: {
            'current_plans': `**Current Pricing Plans:**
• BASIC: $29/month - 50 students, core features, basic support
• PRO: $79/month - 200 students, advanced analytics, custom branding, priority support
• ENTERPRISE: $199/month - Unlimited students, all features + premium support, SSO, custom development
• Annual billing saves 20% on all plans
• Custom enterprise quotes available for large institutions
• 30-day free trial on all plans
• Education discounts available for verified institutions
• Non-profit organization discounts
• Government and public institution pricing`,

            'feature_comparison': `**Plan Comparison:**
• BASIC: Virtual classes, basic assessments, standard reports, email support
• PRO: All Basic features + Advanced analytics, custom branding, API access, priority support, mobile app
• ENTERPRISE: All Pro features + Single Sign-On (SSO), custom development, dedicated support manager, advanced security, compliance features
• Additional storage available on all plans
• Custom domain support on Pro and Enterprise
• White-label options on Enterprise
• Advanced reporting on Pro and Enterprise
• Integration capabilities vary by plan`,

            'educational_discount': `**Educational Discounts:**
• K-12 Schools: 40% discount on all plans
• Higher Education Institutions: 30% discount
• Non-profit Organizations: 25% discount
• Volume discounts available for multiple campuses
• Government rates for public institutions
• Contact sales for custom pricing quotes
• Discount verification required
• Annual commitment required for maximum discounts
• Bundle discounts with other Educon products
• Early renewal incentives available`,

            'free_trial': `**Free Trial Information:**
• 30-day full feature access on selected plan
• No credit card required for sign-up
• Setup assistance available during trial
• Convert to paid plan anytime during trial
• All data preserved after trial conversion
• Cancel anytime during trial period
• Extended trials available for institutions
• Multiple plan trials possible sequentially
• Trial includes all features except custom development
• Support included during trial period`
          }
        },
        'payment': {
          title: 'Payment & Invoicing',
          questions: {
            'payment_methods': `**Accepted Payment Methods:**
• Credit Cards (Visa, MasterCard, American Express, Discover)
• PayPal for individual and small business accounts
• Bank transfers (Enterprise plans only)
• Purchase orders (approved institutions)
• Digital wallets (Apple Pay, Google Pay)
• Recurring billing available for all methods
• Secure payment processing with PCI compliance
• International payments accepted
• Multiple currency support
• Automatic receipt generation
• Payment security guarantees`,

            'invoice_access': `**Invoice Management:**
• Download invoices from billing section of dashboard
• Automatic email delivery for all invoices
• Multiple currency support for international clients
• Tax receipt generation compliant with local regulations
• Payment history with search and filter capabilities
• Export financial reports for accounting purposes
• Custom billing dates available for Enterprise
• Proforma invoices for upcoming charges
• Credit note issuance for adjustments
• Bulk invoice download for multiple periods
• Integration with accounting software`,

            'billing_cycle': `**Billing Cycle Information:**
• Monthly or annual billing options available
• Prorated charges for plan upgrades during cycle
• Immediate downgrade effect on features (next billing cycle for charges)
• Automatic renewal with email reminders
• Email reminders sent 7 days before charges
• Grace period of 14 days for failed payments
• Suspension after grace period for non-payment
• Reactivation process after suspension
• Billing date customization for Enterprise
• Multiple payment method management
• Automatic retry for failed payments`,

            'tax_information': `**Tax Documentation:**
• VAT/GST included where applicable based on customer location
• Tax-exempt organizations can submit tax exemption forms
• Invoice includes detailed tax breakdown by jurisdiction
• Annual tax statements available for accounting purposes
• Multiple tax jurisdictions supported for global operations
• Tax calculation based on customer billing address
• Digital tax compliance for various regions
• Tax certificate storage for business customers
• Automatic tax rate updates
• Tax reporting assistance for Enterprise customers`
          }
        },
        'account_management': {
          title: 'Account Management',
          questions: {
            'upgrade_downgrade': `**Plan Changes:**
• Upgrade: Immediate access to new features, prorated charge for remaining period
• Downgrade: Effective at next billing cycle, no refunds for unused time
• Compare plans before changing to understand feature differences
• Data preservation guaranteed during plan changes
• No downtime during plan transitions
• Confirmation email sent for all plan changes
• 24-hour cancellation window for upgrades
• Historical data retention regardless of plan
• Feature access adjusted immediately for downgrades
• Support available for plan transition questions`,

            'user_management': `**User Management:**
• Add/remove teachers and students individually or in bulk
• Bulk import users via CSV template with validation
• Role-based permissions (Admin, Teacher, Student, Parent, etc.)
• Department organization and management
• Access control settings by role and department
• Activity monitoring and reporting
• Custom user fields for additional information
• User group management for batch operations
• Permission templates for quick setup
• User lifecycle management (onboarding/offboarding)
• Integration with directory services`,

            'data_export': `**Data Export Capabilities:**
• Export student records in multiple formats (CSV, Excel, PDF)
• Download assignment submissions with metadata
• Backup grade books with historical data
• Extract usage analytics and reports
• Custom report generation with drag-and-drop builder
• GDPR compliance tools for data portability
• Scheduled automated exports to cloud storage
• API access for custom export requirements
• Data validation during export process
• Bulk export for entire institution
• Historical data archive creation`,

            'account_closure': `**Account Closure Process:**
• Contact support to initiate account closure process
• 30-day data retention period after closure request
• Export all data before closure completion
• Final invoice provided upon closure
• Can reopen account within 30 days of closure
• Complete data deletion after retention period
• Closure confirmation email sent
• Data destruction certificate available for compliance
• Bulk closure for multiple users
• Archive option instead of complete deletion
• Reactivation fees may apply after closure`
          }
        },
        'support': {
          title: 'Support & Training',
          questions: {
            'training_resources': `**Training Resources:**
• Weekly live webinars with product experts
• Video tutorial library with 200+ videos
• Interactive product tours for new features
• Certification programs for power users
• Documentation portal with search functionality
• Community forums for peer support
• Onboarding specialists for new customers
• Custom training sessions for teams
• Training materials download center
• Best practices guides and checklists
• Monthly feature update webinars
• Advanced training for administrators`,

            'support_channels': `**Support Channels:**
• Email: support@educon.com (response within 4 hours)
• Phone: 1-800-EDUCON (9 AM - 9 PM EST, Monday-Friday)
• Live Chat: In-app support (24/7 for urgent issues)
• Help Center: 24/7 knowledge base with AI search
• Emergency Hotline: Critical system issues only
• Social Media support (Twitter, Facebook)
• Community forums for peer assistance
• Dedicated account managers for Enterprise
• On-site training and support available
• Video call support for complex issues
• Screen sharing support sessions`,

            'service_status': `**Service Status Information:**
• Real-time status page at status.educon.com
• Scheduled maintenance notices 72 hours in advance
• Performance metrics and uptime statistics
• Incident reports with root cause analysis
• System health monitoring 24/7
• Uptime history with 99.9% SLA
• SMS/email alerts for service disruptions
• Maintenance window preferences
• Historical performance data
• API status monitoring
• Third-party integration status`
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
        'initial_setup': {
          title: 'Initial Setup',
          questions: {
            'getting_started': `**Getting Started Guide:**
1. Verify email address through confirmation link
2. Complete institution profile with basic information
3. Set up classes and subjects using templates
4. Import student data via CSV or manual entry
5. Configure assessment settings and grading scales
6. Invite teachers and staff to their accounts
7. Customize communication templates
8. Schedule training session with onboarding specialist
9. Set up parent/guardian access if needed
10. Configure integration with existing systems
11. Test system with sample data
12. Go live with actual student data`,

            'data_migration': `**Data Migration Support:**
• CSV template provided for easy data import
• Bulk import tools available for large datasets
• Previous system export guidance and support
• Data validation checks during import process
• Migration specialist support for complex transfers
• Test import capability to verify data integrity
• Rollback option available if issues arise
• Data mapping assistance for different systems
• Historical data transfer options
• Student photo and document migration
• Grade history transfer capabilities
• Custom migration scripts for unique requirements`,

            'customization': `**Platform Customization:**
• School branding and colors throughout platform
• Custom domain setup (yourname.educon.com)
• Communication templates for emails and notifications
• Assessment rubrics and grading criteria
• Grade scales and calculation methods
• Attendance codes and tracking parameters
• Notification preferences and schedules
• Dashboard layout and widget customization
• Report templates and formats
• User interface theme options
• Language and localization settings
• Accessibility features configuration`,

            'best_practices': `**Best Practices:**
• Start with pilot group of 5-10 users for testing
• Train super users first to become internal experts
• Establish clear usage guidelines and policies
• Set up regular check-ins during first 90 days
• Use analytics to track adoption and engagement
• Gather user feedback continuously for improvements
• Schedule quarterly reviews with Educon success team
• Create internal support champions program
• Document processes and procedures
• Monitor key performance indicators
• Plan for seasonal usage patterns
• Establish escalation procedures for issues`
          }
        },
        'administrative': {
          title: 'Administrative Settings',
          questions: {
            'permissions': `**Permission Levels:**
• Super Admin: Full system access and configuration
• Admin: Limited administrative rights for daily operations
• Teacher: Classroom management and student progress tracking
• Teaching Assistant: Grading assistance with limited access
• Student: Learning access to assigned courses and materials
• Parent: Monitoring access to child's progress and communication
• Custom roles available for specific needs
• Department-specific permissions
• Time-based access restrictions
• Feature-level permission controls
• Bulk permission management
• Permission audit trails`,

            'security_settings': `**Security Configuration:**
• Password complexity requirements (configurable)
• Session timeout settings for inactivity
• IP restriction options for specific locations
• Two-factor authentication enforcement
• Login attempt limits and lockout periods
• Data encryption at rest and in transit
• Compliance certifications (SOC 2, GDPR, FERPA)
• Audit logging for all system activities
• Single Sign-On (SSO) configuration
• Data backup and recovery procedures
• Security incident response protocols
• Regular security assessments and updates`,

            'notification_setup': `**Notification Management:**
• Email notification preferences by user role
• Push notification settings for mobile app
• SMS alerts for emergency communications
• Digest frequency options (immediate, daily, weekly)
• Custom alert rules for specific events
• Parent communication settings and restrictions
• Calendar sync options with external calendars
• Notification templates customization
• Do-not-disturb scheduling
• Escalation rules for urgent matters
• Multi-language notification support
• Notification analytics and reporting`
          }
        },
        'class_management': {
          title: 'Class Management',
          questions: {
            'create_class': `**Creating Classes:**
• Basic class information (name, subject, grade level)
• Enrollment capacity settings and waitlist options
• Co-teacher assignment and collaboration settings
• Schedule setup with recurring patterns
• Resource folder creation and organization
• Parent access configuration and communication settings
• Custom fields for additional class information
• Prerequisite requirements and restrictions
• Classroom location and meeting details
• Academic term and session association
• Grading period alignment
• Student grouping and section management`,

            'student_enrollment': `**Student Enrollment:**
• Manual student addition with individual profiles
• Bulk CSV import with validation and error reporting
• Self-registration links for student sign-up
• Parent invitation emails with access instructions
• Enrollment codes for specific classes or programs
• Waitlist management with automatic promotion
• Automatic roster sync from SIS systems
• Enrollment period restrictions
• Prerequisite verification during enrollment
• Capacity monitoring and alerts
• Transfer student handling
• Enrollment approval workflows`,

            'academic_calendar': `**Academic Calendar:**
• Term and semester setup with date ranges
• Holiday configuration with regional variations
• Assignment due dates and extension policies
• Exam schedules and room assignments
• Parent-teacher conferences scheduling
• Progress report periods and distribution
• Custom calendar events for school activities
• Import/export capabilities with external calendars
• Recurring event patterns
• Calendar sharing with students and parents
• Mobile calendar sync
• Academic year transition planning`
          }
        }
      }
    },

    // Default fallback
    'default': "I understand you're asking about our Educon platform. For specific technical issues, please contact our support team at support@educon.com or call 1-800-EDUCON. For product features, check our documentation at docs.educon.com. You can also browse our help categories above for more specific information."
  };

  // Main categories for initial selection
  const mainCategories = [
    { key: 'admissions', title: 'Admissions & Enrollment', description: 'Student recruitment and admission process' },
    { key: 'courses', title: 'Courses & Programs', description: 'Explore courses and academic programs' },
    { key: 'universities', title: 'Universities', description: 'Partner institutions and universities' },
    { key: 'technical', title: 'Technical Support', description: 'Troubleshoot technical issues' },
    { key: 'billing', title: 'Billing & Account', description: 'Manage subscription & payments' },
    { key: 'setup', title: 'Setup & Configuration', description: 'Get started & customize platform' }
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
        title: `❓ ${key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`,
        description: `Get details about ${key.replace(/_/g, ' ')}`
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
        text: `Tell me about ${questionKey.replace(/_/g, ' ')}`,
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
          ? "Hello! I'm your Educon Helpdesk Assistant. I'm here to help you with product features, technical issues, billing, and account management! How can I assist you today?"
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
      <div className="flex flex-col gap-2 mt-4 mb-3">
        <div className="text-xs text-gray-500 mb-2">
          {!currentCategory ? 'Choose a category:' : 
           !currentSubcategory ? 'Choose a subcategory:' : 
           'Select a question:'}
        </div>
        {suggestedQuestions.map((item, index) => (
          <button
            key={index}
            className="bg-white/80 border border-indigo-300 rounded-xl p-3 text-sm cursor-pointer transition-all duration-300 text-left text-gray-700 hover:bg-indigo-50 hover:translate-x-1"
            onClick={() => handleQuickQuestion(item)}
          >
            <div className="font-semibold text-xs mb-1">
              {item.title}
            </div>
            <div className="text-xs opacity-70">
              {item.description}
            </div>
          </button>
        ))}
        
        {/* Back button when in subcategory or question view */}
        {(currentCategory || currentSubcategory) && (
          <button
            className="bg-gray-100 border border-gray-300 rounded-xl p-3 text-sm cursor-pointer transition-all duration-300 text-left text-gray-700 hover:bg-gray-200"
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

  return (
    <>
      {!isOpen && (
        <button 
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none rounded-full cursor-pointer shadow-2xl flex items-center justify-center text-2xl z-50 transition-all duration-400 animate-float animate-pulse hover:scale-110 hover:rotate-3 hover:shadow-3xl"
          onClick={handleOpen}
          title="Dual Mode AI Assistant"
        >
          {activeMode === 'helpdesk' ? '📚' : '🌍'}
        </button>
      )}

      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-96 ${isMinimized ? 'h-16' : 'h-[500px]'} bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-500 z-50 overflow-hidden border border-white/20 backdrop-blur-sm ${
          isInitialLoad ? 'scale-90 translate-y-5 opacity-0' : 'scale-100 translate-y-0 opacity-100'
        }`}>
          <div 
            className={`flex justify-between items-center px-5 py-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white cursor-${isMinimized ? 'pointer' : 'default'} transition-all duration-300`}
            onClick={isMinimized ? toggleMinimize : undefined}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg animate-bounce">
                {activeMode === 'helpdesk' ? '📚' : '🌍'}
              </div>
              <div className="flex flex-col">
                <h3 className="m-0 text-sm font-semibold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {activeMode === 'helpdesk' ? 'Educon Helpdesk' : 'Global AI Assistant'}
                </h3>
                <span className={`text-xs ${isLoading ? 'text-yellow-300 animate-pulse' : 'text-green-300'}`}>
                  {isLoading 
                    ? activeMode === 'helpdesk' 
                      ? '● Searching knowledge base...' 
                      : '● Thinking...'
                    : '● Online'
                  }
                </span>
                <div className="flex bg-white/10 rounded-xl p-1 mt-2">
                  <button
                    className={`flex-1 px-3 py-1.5 border-none bg-transparent text-white rounded-lg cursor-pointer text-xs font-medium transition-all duration-300 ${
                      activeMode === 'helpdesk' ? 'bg-white/30 shadow-lg' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModeChange('helpdesk');
                    }}
                  >
                    📚 Helpdesk
                  </button>
                  <button
                    className={`flex-1 px-3 py-1.5 border-none bg-transparent text-white rounded-lg cursor-pointer text-xs font-medium transition-all duration-300 ${
                      activeMode === 'global' ? 'bg-white/30 shadow-lg' : ''
                    }`}
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
            <div className="flex gap-2 items-center">
              {!isMinimized && (
                <button 
                  className="bg-white/20 border-none text-white w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-sm transition-all duration-300 hover:bg-white/30 hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearChat();
                  }}
                  title="Clear conversation"
                >
                  🗑️
                </button>
              )}
              <button 
                className="bg-white/20 border-none text-white w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-sm transition-all duration-300 hover:bg-white/30 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMinimize();
                }}
                title={isMinimized ? 'Expand chat' : 'Minimize chat'}
              >
                {isMinimized ? '＋' : '−'}
              </button>
              <button 
                className="bg-white/20 border-none text-white w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-sm transition-all duration-300 hover:bg-white/30 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                title="Close assistant"
              >
                ×
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="flex-1 p-5 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-200">
              {messages[activeMode].map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-${getMessageAnimation(message.id)}`}
                >
                  <div className={`max-w-[280px] px-4 py-3 rounded-2xl relative ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-md shadow-lg shadow-indigo-300/30' 
                      : 'bg-white text-gray-700 border border-gray-200/80 rounded-bl-md shadow-lg shadow-gray-200/50'
                  }`}>
                    <div className="text-sm leading-relaxed mb-1 whitespace-pre-wrap">
                      {message.text}
                    </div>
                    <div className="text-xs opacity-70 text-right">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              
              <QuickQuestionsSection />
              
              {isLoading && (
                <div className="mb-4 flex justify-start">
                  <div className="max-w-[280px] px-4 py-3 rounded-2xl bg-white text-gray-700 border border-gray-200/80 rounded-bl-md shadow-lg shadow-gray-200/50">
                    <div className="flex gap-1 py-1 items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing -delay-300"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing -delay-150"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing"></span>
                      <span className="text-xs text-gray-500 ml-2">
                        {activeMode === 'helpdesk' ? 'Searching knowledge base...' : 'Educon AI is thinking...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {!isMinimized && (
            <form className="p-5 bg-white border-t border-gray-200/80" onSubmit={handleSendMessage}>
              <div className="flex gap-3 items-center relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={
                    activeMode === 'helpdesk' 
                      ? "Ask about features, pricing, technical issues..."
                      : "Ask me anything about any topic..."
                  }
                  className={`flex-1 px-4 py-3 border-2 rounded-full text-sm outline-none transition-all duration-300 bg-white ${
                    inputMessage 
                      ? 'border-indigo-500 shadow-lg shadow-indigo-100' 
                      : 'border-gray-200'
                  } focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-100 focus:scale-102`}
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className={`w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none rounded-full cursor-pointer flex items-center justify-center text-base transition-all duration-300 shadow-lg shadow-indigo-300/30 ${
                    (!inputMessage.trim() || isLoading) 
                      ? 'opacity-60 scale-100' 
                      : 'opacity-100 animate-pulse hover:scale-110 hover:rotate-3'
                  }`}
                  disabled={!inputMessage.trim() || isLoading}
                >
                  {isLoading ? '⏳' : '📨'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default EduconChatbot;