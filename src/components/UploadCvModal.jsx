import React, { useState } from "react";
import { 
  Upload, 
  X, 
  FileText, 
  BookOpen, 
  GraduationCap, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Star,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Award,
  TrendingUp,
  Download,
  Share2,
  Bookmark,
  Filter,
  Search,
  Eye,
  Calendar
} from "lucide-react";

// Mock AI service with enhanced analysis
const analyzeCV = async (file) => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // Enhanced mock data with more realistic information
  const analysisData = {
    skills: {
      technical: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'TypeScript', 'MongoDB'],
      soft: ['Project Management', 'Team Leadership', 'Problem Solving', 'Communication'],
      tools: ['VS Code', 'Docker', 'Jira', 'Figma', 'Postman']
    },
    experience: {
      level: 'Intermediate',
      years: '2-4 years',
      domains: ['Web Development', 'Backend Systems', 'Database Management']
    },
    education: {
      degree: "Bachelor's in Computer Science",
      specialization: 'Software Engineering',
      projects: ['E-commerce Platform', 'Machine Learning Model', 'Mobile App Development']
    },
    interests: ['Artificial Intelligence', 'Cloud Computing', 'Startup Culture', 'Open Source'],
    careerGoals: ['Senior Developer', 'Tech Lead', 'Full Stack Architect'],
    strengths: ['Quick Learner', 'Adaptable', 'Strong Problem Solver', 'Team Player']
  };

  // Enhanced recommendations
  const recommendations = {
    courses: [
      {
        id: 1,
        name: "Advanced Machine Learning & AI",
        university: "Stanford University",
        level: "Graduate",
        match: 95,
        skills: ["Machine Learning", "Python", "Data Analysis", "Statistics"],
        duration: "12 months",
        fees: "$15,000",
        format: "Online",
        deadline: "2024-08-15",
        rating: 4.8,
        reviews: 1247,
        scholarship: true,
        popularity: "High",
        careerOutcomes: ["AI Engineer", "Data Scientist", "ML Researcher"]
      },
      {
        id: 2,
        name: "Full Stack Web Development Mastery",
        university: "MIT",
        level: "Professional Certificate",
        match: 88,
        skills: ["JavaScript", "React", "Node.js", "SQL", "AWS"],
        duration: "6 months",
        fees: "$12,000",
        format: "Hybrid",
        deadline: "2024-07-20",
        rating: 4.7,
        reviews: 892,
        scholarship: true,
        popularity: "Very High",
        careerOutcomes: ["Full Stack Developer", "Web Architect", "Tech Lead"]
      },
      {
        id: 3,
        name: "Cloud Computing & DevOps Engineering",
        university: "University of Washington",
        level: "Graduate",
        match: 85,
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Infrastructure"],
        duration: "10 months",
        fees: "$13,500",
        format: "Online",
        deadline: "2024-09-10",
        rating: 4.6,
        reviews: 567,
        scholarship: false,
        popularity: "High",
        careerOutcomes: ["DevOps Engineer", "Cloud Architect", "SRE"]
      },
      {
        id: 4,
        name: "Data Science and Business Analytics",
        university: "Harvard University",
        level: "Professional Certificate",
        match: 82,
        skills: ["Python", "R", "Statistics", "Data Visualization", "SQL"],
        duration: "8 months",
        fees: "$11,000",
        format: "On-Campus",
        deadline: "2024-08-30",
        rating: 4.9,
        reviews: 1345,
        scholarship: true,
        popularity: "Very High",
        careerOutcomes: ["Data Analyst", "Business Analyst", "Data Scientist"]
      }
    ],
    universities: [
      {
        id: 1,
        name: "Stanford University",
        location: "Stanford, CA",
        ranking: "#2 in Computer Science",
        programs: ["Computer Science", "AI", "Data Science", "Human-Computer Interaction"],
        acceptanceRate: "4%",
        match: 96,
        tuition: "$55,000",
        scholarships: "Available",
        campusLife: "Excellent",
        researchOpportunities: "Extensive",
        notableAlumni: ["Google Founders", "Instagram Founder"],
        applicationDeadline: "2024-12-01",
        avgSAT: "1500",
        internationalStudents: "24%"
      },
      {
        id: 2,
        name: "MIT",
        location: "Cambridge, MA",
        ranking: "#1 in Engineering & Technology",
        programs: ["Computer Science", "Electrical Engineering", "Mathematics", "Robotics"],
        acceptanceRate: "7%",
        match: 93,
        tuition: "$53,000",
        scholarships: "Limited",
        campusLife: "Outstanding",
        researchOpportunities: "World-class",
        notableAlumni: ["Buzz Aldrin", "Kofi Annan"],
        applicationDeadline: "2024-11-15",
        avgSAT: "1530",
        internationalStudents: "29%"
      },
      {
        id: 3,
        name: "Carnegie Mellon University",
        location: "Pittsburgh, PA",
        ranking: "#1 in AI & Programming",
        programs: ["AI", "Robotics", "Software Engineering", "Human-Computer Interaction"],
        acceptanceRate: "15%",
        match: 91,
        tuition: "$58,000",
        scholarships: "Available",
        campusLife: "Very Good",
        researchOpportunities: "Excellent",
        notableAlumni: ["Andy Warhol", "John Nash"],
        applicationDeadline: "2025-01-05",
        avgSAT: "1510",
        internationalStudents: "22%"
      },
      {
        id: 4,
        name: "University of California, Berkeley",
        location: "Berkeley, CA",
        ranking: "#3 in Computer Science",
        programs: ["Computer Science", "Statistics", "Business Analytics", "Information Systems"],
        acceptanceRate: "17%",
        match: 89,
        tuition: "$44,000",
        scholarships: "Available",
        campusLife: "Excellent",
        researchOpportunities: "Extensive",
        notableAlumni: ["Steve Wozniak", "Gordon Moore"],
        applicationDeadline: "2024-11-30",
        avgSAT: "1460",
        internationalStudents: "17%"
      }
    ],
    careerPaths: [
      {
        id: 1,
        title: "Full Stack Developer",
        growth: "25% (Much faster than average)",
        salary: "$85,000 - $130,000",
        demand: "Very High",
        skills: ["JavaScript", "React", "Node.js", "Database Management"],
        companies: ["Google", "Microsoft", "Amazon", "Startups"],
        description: "Develop both front-end and back-end components of web applications"
      },
      {
        id: 2,
        title: "Machine Learning Engineer",
        growth: "22% (Much faster than average)",
        salary: "$110,000 - $160,000",
        demand: "High",
        skills: ["Python", "TensorFlow", "Data Analysis", "Statistics"],
        companies: ["OpenAI", "Tesla", "NVIDIA", "Research Labs"],
        description: "Design and implement machine learning systems and algorithms"
      },
      {
        id: 3,
        title: "Cloud Solutions Architect",
        growth: "20% (Faster than average)",
        salary: "$120,000 - $170,000",
        demand: "High",
        skills: ["AWS/Azure", "System Design", "Security", "Networking"],
        companies: ["Amazon", "Microsoft", "IBM", "Consulting Firms"],
        description: "Design cloud infrastructure and migration strategies for organizations"
      }
    ]
  };

  return {
    ...analysisData,
    recommendations: recommendations,
    summary: {
      overallMatch: 89,
      potentialGrowth: "High",
      recommendedLevel: "Graduate Studies",
      timeToComplete: "6-12 months"
    }
  };
};

// Upload CV Modal Component
const UploadCvModal = ({ isOpen, onClose, onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [savedItems, setSavedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!validTypes.includes(fileExtension)) {
        alert('Please select a valid file type (PDF, DOC, or DOCX)');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange({ target: { files } });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    
    try {
      const analysis = await analyzeCV(selectedFile);
      setAnalysisResult(analysis);
      onUpload({
        file: selectedFile,
        analysis: analysis
      });
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setAnalysisResult(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const toggleSaveItem = (item, type) => {
    const itemWithType = { ...item, type };
    setSavedItems(prev => {
      const exists = prev.find(i => i.id === item.id && i.type === type);
      if (exists) {
        return prev.filter(i => !(i.id === item.id && i.type === type));
      } else {
        return [...prev, itemWithType];
      }
    });
  };

  const isItemSaved = (id, type) => {
    return savedItems.some(item => item.id === id && item.type === type);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      default:
        return '📎';
    }
  };

  // Filter functions
  const filteredCourses = analysisResult?.recommendations.courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredUniversities = analysisResult?.recommendations.universities.filter(uni =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Render components
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Career Analysis Complete!</h3>
            <p className="text-blue-100">Based on your CV, here's your personalized career roadmap</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{analysisResult.summary.overallMatch}%</div>
            <div className="text-blue-100 text-sm">Overall Match</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{analysisResult.skills.technical.length}+</div>
          <div className="text-gray-600 text-sm">Technical Skills</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{analysisResult.experience.years}</div>
          <div className="text-gray-600 text-sm">Experience</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{analysisResult.recommendations.courses.length}</div>
          <div className="text-gray-600 text-sm">Recommended Courses</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <GraduationCap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{analysisResult.recommendations.universities.length}</div>
          <div className="text-gray-600 text-sm">Universities</div>
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-500" />
            Technical Skills
          </h4>
          <div className="space-y-2">
            {analysisResult.skills.technical.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{skill}</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${70 + Math.random() * 25}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-green-500" />
            Soft Skills
          </h4>
          <div className="space-y-2">
            {analysisResult.skills.soft.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{skill}</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${75 + Math.random() * 20}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            Career Goals
          </h4>
          <div className="space-y-2">
            {analysisResult.careerGoals.map((goal, index) => (
              <div key={index} className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-700">{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Recommendations */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h4 className="font-semibold text-amber-800 mb-2">🎯 Top Recommendations</h4>
        <ul className="text-amber-700 text-sm space-y-1">
          <li>• Consider pursuing graduate studies in Computer Science or related fields</li>
          <li>• Focus on building expertise in cloud technologies and distributed systems</li>
          <li>• Explore internship opportunities at tech companies to gain practical experience</li>
          <li>• Develop leadership skills through project management and team collaboration</li>
        </ul>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses, universities, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {filteredCourses?.map((course) => (
        <div key={course.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h5 className="font-semibold text-gray-900 text-lg">{course.name}</h5>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                  {course.match}% Match
                </span>
              </div>
              <p className="text-gray-600 mb-3">{course.university} • {course.level}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {course.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => toggleSaveItem(course, 'course')}
                className={`p-2 rounded-lg ${
                  isItemSaved(course.id, 'course') 
                    ? 'bg-yellow-100 text-yellow-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Bookmark className="w-4 h-4" fill={isItemSaved(course.id, 'course') ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>{course.fees}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Apply by {course.deadline}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{course.rating} ({course.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {course.scholarship && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                  Scholarships Available
                </span>
              )}
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                {course.popularity} Demand
              </span>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderUniversities = () => (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search universities, locations, or programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {filteredUniversities?.map((uni) => (
        <div key={uni.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-300 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h5 className="font-semibold text-gray-900 text-lg">{uni.name}</h5>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                  {uni.match}% Match
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <MapPin className="w-4 h-4" />
                <span>{uni.location}</span>
                <span>•</span>
                <span>{uni.ranking}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {uni.programs.map((program, index) => (
                  <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                    {program}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => toggleSaveItem(uni, 'university')}
                className={`p-2 rounded-lg ${
                  isItemSaved(uni.id, 'university') 
                    ? 'bg-yellow-100 text-yellow-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Bookmark className="w-4 h-4" fill={isItemSaved(uni.id, 'university') ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
            <div>
              <span className="font-medium">Acceptance Rate: </span>
              <span>{uni.acceptanceRate}</span>
            </div>
            <div>
              <span className="font-medium">Tuition: </span>
              <span>{uni.tuition}/year</span>
            </div>
            <div>
              <span className="font-medium">Scholarships: </span>
              <span>{uni.scholarships}</span>
            </div>
            <div>
              <span className="font-medium">Application Deadline: </span>
              <span>{uni.applicationDeadline}</span>
            </div>
            <div>
              <span className="font-medium">Avg SAT: </span>
              <span>{uni.avgSAT}</span>
            </div>
            <div>
              <span className="font-medium">International Students: </span>
              <span>{uni.internationalStudents}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Research: </span>
              <span>{uni.researchOpportunities}</span>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              View University
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCareerPaths = () => (
    <div className="space-y-6">
      {analysisResult.recommendations.careerPaths.map((path) => (
        <div key={path.id} className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h5 className="font-semibold text-gray-900 text-lg mb-2">{path.title}</h5>
              <p className="text-gray-600 mb-3">{path.description}</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
              {path.growth}
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div>
              <h6 className="font-medium text-gray-900 mb-2">Salary Range</h6>
              <p className="text-lg font-bold text-blue-600">{path.salary}</p>
            </div>
            <div>
              <h6 className="font-medium text-gray-900 mb-2">Market Demand</h6>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                path.demand === 'Very High' ? 'bg-red-100 text-red-700' :
                path.demand === 'High' ? 'bg-orange-100 text-orange-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {path.demand}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h6 className="font-medium text-gray-900">Key Skills Required</h6>
            <div className="flex flex-wrap gap-2">
              {path.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h6 className="font-medium text-gray-900 mb-2">Top Employers</h6>
            <p className="text-gray-600">{path.companies.join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSavedItems = () => (
    <div className="space-y-4">
      {savedItems.length === 0 ? (
        <div className="text-center py-8">
          <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-600 mb-2">No saved items yet</h4>
          <p className="text-gray-500">Start exploring recommendations and save your favorites!</p>
        </div>
      ) : (
        savedItems.map((item) => (
          <div key={`${item.type}-${item.id}`} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-semibold text-gray-900">{item.name}</h5>
                <p className="text-gray-600 text-sm">
                  {item.type === 'course' ? item.university : item.location}
                </p>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.type === 'course' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {item.type}
                </span>
                <button 
                  onClick={() => toggleSaveItem(item, item.type)}
                  className="p-1 text-yellow-600 hover:bg-yellow-50 rounded"
                >
                  <Bookmark className="w-4 h-4" fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/30 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-2000 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">AI Career Path Analyzer</h2>
                <p className="text-blue-100 text-sm">Upload your CV for personalized career recommendations</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              disabled={isUploading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col h-[calc(95vh-80px)]">
          {/* Upload Section */}
          {!analysisResult && (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Discover Your Ideal Career Path</h3>
                  <p className="text-gray-600">Upload your CV and get AI-powered insights into courses, universities, and career opportunities that match your profile.</p>
                </div>

                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
                    dragActive 
                      ? "border-blue-500 bg-blue-50" 
                      : selectedFile
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => !isUploading && document.getElementById('cv-upload').click()}
                >
                  <div className="flex flex-col items-center justify-center gap-4">
                    {selectedFile ? (
                      <>
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                          <FileText className="w-10 h-10 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xl font-semibold text-gray-700 mb-2">
                            Ready to Analyze!
                          </p>
                          <p className="text-gray-500">
                            {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="w-16 h-16 text-gray-400" />
                        <div>
                          <p className="text-xl font-semibold text-gray-700 mb-2">
                            Drop your CV here or click to browse
                          </p>
                          <p className="text-gray-500">
                            Supports PDF, DOC, DOCX (Max 10MB)
                          </p>
                        </div>
                      </>
                    )}
                    <input
                      type="file"
                      id="cv-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                    {!selectedFile && (
                      <button
                        type="button"
                        className="px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all text-lg"
                        disabled={isUploading}
                      >
                        Choose File
                      </button>
                    )}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-4">
                    <Target className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Skill Analysis</h4>
                    <p className="text-gray-600 text-sm">Identify your technical and soft skills with AI</p>
                  </div>
                  <div className="text-center p-4">
                    <GraduationCap className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Course Matching</h4>
                    <p className="text-gray-600 text-sm">Find courses that align with your career goals</p>
                  </div>
                  <div className="text-center p-4">
                    <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Career Paths</h4>
                    <p className="text-gray-600 text-sm">Discover high-growth career opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <>
              {/* Navigation Tabs */}
              <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <nav className="flex overflow-x-auto px-6">
                  {[
                    { id: 'overview', name: 'Overview', icon: Sparkles },
                    { id: 'courses', name: 'Courses', icon: BookOpen },
                    { id: 'universities', name: 'Universities', icon: GraduationCap },
                    { id: 'career', name: 'Career Paths', icon: Target },
                    { id: 'saved', name: `Saved (${savedItems.length})`, icon: Bookmark }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 py-4 px-4 border-b-2 font-medium text-sm flex items-center gap-2 transition-all ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 bg-blue-50'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'courses' && renderCourses()}
                {activeTab === 'universities' && renderUniversities()}
                {activeTab === 'career' && renderCareerPaths()}
                {activeTab === 'saved' && renderSavedItems()}
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {analysisResult ? (
                  <span>Analysis completed • {savedItems.length} items saved</span>
                ) : (
                  <span>Ready to discover your career path</span>
                )}
              </div>
              
              <div className="flex gap-3">
                {analysisResult && (
                  <>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export Report
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-all flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share Results
                    </button>
                  </>
                )}
                
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  {analysisResult ? 'Close' : 'Cancel'}
                </button>
                
                {!analysisResult && selectedFile && (
                  <button
                    onClick={handleSubmit}
                    disabled={isUploading}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-4 h-4" />
                    {isUploading ? "Analyzing..." : "Start Analysis"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upload Progress Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis in Progress</h3>
              <p className="text-gray-600">Extracting skills, analyzing experience, and generating recommendations...</p>
              <div className="mt-4 w-64 bg-gray-200 rounded-full h-2 mx-auto">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadCvModal;