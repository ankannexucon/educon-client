import React, { useState } from "react";
import {
  GraduationCap,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  Upload,
  X,
  ChevronRight,
  MapPin,
  Award,
  Building2,
  Search,
  Star,
  BookOpen,
  Globe,
  Calendar,
  UserCheck,
  FileText,
  Shield,
  Heart,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

const AdmissionPage = () => {
  const [activeTab, setActiveTab] = useState("universities");
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    documents: [],
  });

  const universities = [
    {
      id: 1,
      name: "Imperial College London",
      location: "South Kensington, London",
      established: "1907",
      ranking: "#6 QS World Ranking",
      logo: "🎓",
      color: "from-blue-600 to-indigo-700",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      description:
        "A world-leading university focused on science, engineering, medicine and business",
      rating: 4.8,
      students: "18,000+",
      featured: true,
    },
    {
      id: 2,
      name: "University College London (UCL)",
      location: "Bloomsbury, London",
      established: "1826",
      ranking: "#9 QS World Ranking",
      logo: "🏛️",
      color: "from-purple-600 to-pink-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
      description:
        "London's leading multidisciplinary university with global reach",
      rating: 4.7,
      students: "45,000+",
      featured: true,
    },
    {
      id: 3,
      name: "King's College London",
      location: "Strand, London",
      established: "1829",
      ranking: "#37 QS World Ranking",
      logo: "👑",
      color: "from-red-600 to-orange-600",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
      description: "One of England's oldest and most prestigious universities",
      rating: 4.6,
      students: "33,000+",
    },
    {
      id: 4,
      name: "London School of Economics (LSE)",
      location: "Holborn, London",
      established: "1895",
      ranking: "#45 QS World Ranking",
      logo: "📊",
      color: "from-emerald-600 to-teal-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200",
      description:
        "Specializing in social sciences, economics, and business studies",
      rating: 4.7,
      students: "11,000+",
    },
    {
      id: 5,
      name: "Queen Mary University of London",
      location: "Mile End, London",
      established: "1887",
      ranking: "#117 QS World Ranking",
      logo: "⭐",
      color: "from-orange-600 to-amber-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200",
      description: "A Russell Group university with a global reputation",
      rating: 4.4,
      students: "25,000+",
    },
  ];

  const programsByUniversity = {
    1: [
      {
        id: 1,
        title: "Bachelor of Technology (B.Tech)",
        duration: "4 Years",
        fees: "£35,000/year",
        seats: 120,
        eligibility: "A-levels AAA or equivalent with Mathematics and Physics",
        icon: "💻",
        color: "from-blue-500 to-cyan-500",
        deadline: "2024-01-15",
        popular: true,
      },
      {
        id: 2,
        title: "Master of Science in Computer Science",
        duration: "2 Years",
        fees: "£38,000/year",
        seats: 80,
        eligibility:
          "Bachelor's degree (2:1) in Computer Science or related field",
        icon: "🖥️",
        color: "from-indigo-500 to-blue-500",
        deadline: "2024-03-01",
        popular: true,
      },
      {
        id: 3,
        title: "Master of Business Administration (MBA)",
        duration: "2 Years",
        fees: "£57,000/year",
        seats: 60,
        eligibility: "Bachelor's degree and 3+ years work experience",
        icon: "💼",
        color: "from-purple-500 to-pink-500",
        deadline: "2024-04-15",
      },
    ],
    2: [
      {
        id: 1,
        title: "Bachelor of Computer Applications (BCA)",
        duration: "3 Years",
        fees: "£28,000/year",
        seats: 100,
        eligibility: "A-levels ABB or equivalent",
        icon: "🔧",
        color: "from-emerald-500 to-teal-500",
        deadline: "2024-01-31",
      },
      {
        id: 2,
        title: "Bachelor of Business Administration (BBA)",
        duration: "3 Years",
        fees: "£32,000/year",
        seats: 90,
        eligibility: "A-levels AAB or equivalent",
        icon: "📊",
        color: "from-purple-500 to-pink-500",
        deadline: "2024-02-15",
        popular: true,
      },
    ],
    3: [
      {
        id: 1,
        title: "Bachelor of Technology (B.Tech)",
        duration: "4 Years",
        fees: "£33,000/year",
        seats: 110,
        eligibility: "A-levels AAB with Mathematics",
        icon: "💻",
        color: "from-blue-500 to-cyan-500",
        deadline: "2024-02-28",
      },
      {
        id: 2,
        title: "Bachelor of Business Administration (BBA)",
        duration: "3 Years",
        fees: "£30,000/year",
        seats: 85,
        eligibility: "A-levels ABB or equivalent",
        icon: "📊",
        color: "from-purple-500 to-pink-500",
        deadline: "2024-03-15",
      },
    ],
    4: [
      {
        id: 1,
        title: "Bachelor of Business Administration (BBA)",
        duration: "3 Years",
        fees: "£34,000/year",
        seats: 100,
        eligibility: "A-levels A*AA or equivalent",
        icon: "📊",
        color: "from-purple-500 to-pink-500",
        deadline: "2024-01-20",
        popular: true,
      },
      {
        id: 2,
        title: "Master of Business Administration (MBA)",
        duration: "2 Years",
        fees: "£62,000/year",
        seats: 50,
        eligibility: "Bachelor's degree and 3+ years work experience",
        icon: "💼",
        color: "from-orange-500 to-red-500",
        deadline: "2024-04-30",
      },
    ],
    5: [
      {
        id: 1,
        title: "Bachelor of Computer Applications (BCA)",
        duration: "3 Years",
        fees: "£25,000/year",
        seats: 95,
        eligibility: "A-levels BBB or equivalent",
        icon: "🔧",
        color: "from-emerald-500 to-teal-500",
        deadline: "2024-03-10",
      },
      {
        id: 2,
        title: "Bachelor of Technology (B.Tech)",
        duration: "4 Years",
        fees: "£30,000/year",
        seats: 105,
        eligibility: "A-levels ABB with Mathematics and Science",
        icon: "💻",
        color: "from-blue-500 to-cyan-500",
        deadline: "2024-02-20",
      },
    ],
  };

  const filteredUniversities = universities.filter((uni) =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const programs = selectedUniversity
    ? programsByUniversity[selectedUniversity.id] || []
    : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...files],
    }));
  };

  const removeDocument = (index) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert("Application submitted successfully! We will contact you soon.");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      education: "",
      documents: [],
    });
    setSelectedProgram(null);
  };

  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university);
    setSelectedProgram(null);
    setActiveTab("programs");
  };

  const handleBackToUniversities = () => {
    setSelectedUniversity(null);
    setSelectedProgram(null);
    setActiveTab("universities");
  };

  const stats = [
    { value: "95%", label: "Admission Success", icon: UserCheck },
    { value: "24h", label: "Application Review", icon: Clock },
    { value: "500+", label: "University Partners", icon: Building2 },
    { value: "50K+", label: "Students Helped", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/30 via-white to-indigo-50/20">
      {/* Enhanced Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-indigo-800 to-indigo-900">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/10 rounded-full blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                University Match
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with top universities worldwide. Streamlined applications,
              expert guidance, and your future starts here.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("universities-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Explore Universities
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-2xl p-2 shadow-sm border">
          {["universities", "programs", "apply"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab === "universities" && "Browse Universities"}
              {tab === "programs" && "View Programs"}
              {tab === "apply" && "Apply Now"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <section className="lg:col-span-3">
            {/* Universities Section */}
            {activeTab === "universities" && (
              <div id="universities-section">
                {/* Search Bar */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search universities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Universities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredUniversities.map((uni) => (
                    <div
                      key={uni.id}
                      onClick={() => handleUniversitySelect(uni)}
                      className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      <div
                        className={`h-2 bg-gradient-to-r ${uni.color}`}
                      ></div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-14 h-14 rounded-xl ${uni.bgColor} ${uni.borderColor} border-2 flex items-center justify-center text-2xl`}
                            >
                              {uni.logo}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {uni.name}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                  {uni.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          {uni.featured && (
                            <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              Featured
                            </div>
                          )}
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {uni.description}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="font-medium text-gray-900">
                                {uni.rating}
                              </span>
                            </div>
                            <div className="text-gray-500">•</div>
                            <div className="text-gray-600">
                              {uni.students} students
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              {uni.ranking}
                            </div>
                            <div className="text-gray-500 text-xs">
                              Est. {uni.established}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Programs Section */}
            {activeTab === "programs" && selectedUniversity && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Programs at {selectedUniversity.name}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Browse available courses and start your application
                      </p>
                    </div>
                    <button
                      onClick={handleBackToUniversities}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <ChevronRight className="h-5 w-5 rotate-180" />
                      <span>Back to Universities</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {programs.map((program) => (
                      <div
                        key={program.id}
                        className="group border-2 border-gray-100 hover:border-blue-200 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg bg-white"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex space-x-4">
                            <div
                              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${program.color} flex items-center justify-center text-xl`}
                            >
                              {program.icon}
                            </div>
                            <div>
                              <div className="flex items-center space-x-3">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                                  {program.title}
                                </h3>
                                {program.popular && (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm mt-1 max-w-2xl">
                                {program.eligibility}
                              </p>
                              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{program.duration}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{program.seats} seats</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>Apply by {program.deadline}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 mb-2">
                              {program.fees}
                            </div>
                            <button
                              onClick={() => {
                                setSelectedProgram(program);
                                setActiveTab("apply");
                              }}
                              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 group-hover:shadow-lg"
                            >
                              <span>Apply Now</span>
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Application Form */}
            {activeTab === "apply" && (
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <h2 className="text-2xl font-bold">
                    Complete Your Application
                  </h2>
                  <p className="text-blue-100 mt-1">
                    {selectedUniversity?.name} - {selectedProgram?.title}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Highest Qualification *
                      </label>
                      <input
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="e.g., Bachelor's Degree"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your complete address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Documents
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-2">
                        Upload your documents
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium cursor-pointer transition-colors duration-200"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Choose Files</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Supported formats: PDF, DOC, JPG, PNG (Max 10MB each)
                      </p>
                    </div>

                    {/* Uploaded Files */}
                    {formData.documents.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.documents.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                          >
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">
                                {doc.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeDocument(index)}
                              className="text-red-500 hover:text-red-700 transition-colors duration-200"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 pt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Submit Application
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          fullName: "",
                          email: "",
                          phone: "",
                          address: "",
                          education: "",
                          documents: [],
                        });
                      }}
                      className="px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                    >
                      Reset Form
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Selected Items Card */}
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="font-bold text-gray-900 mb-4">Your Selection</h3>

                {selectedUniversity ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-900">
                          University
                        </span>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="font-semibold text-gray-900 text-sm">
                          {selectedUniversity.name}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {selectedUniversity.location}
                        </div>
                      </div>
                    </div>

                    {selectedProgram && (
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <BookOpen className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-gray-900">
                            Program
                          </span>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className="font-semibold text-gray-900 text-sm">
                            {selectedProgram.title}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {selectedProgram.duration} • {selectedProgram.fees}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">
                      Select a university to see details here
                    </p>
                  </div>
                )}
              </div>

              {/* Support Card */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">Need Help?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Our admission experts are here to guide you through every step
                </p>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-xl p-3 transition-all duration-200">
                    <Phone className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      Call +1 (555) 123-4567
                    </span>
                  </button>
                  <button className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-xl p-3 transition-all duration-200">
                    <Mail className="h-5 w-5" />
                    <span className="text-sm font-medium">Email Support</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-xl p-3 transition-all duration-200">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Live Chat</span>
                  </button>
                </div>
              </div>

              {/* Features Card */}
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: "Verified University Partners" },
                    { icon: CheckCircle, text: "95% Admission Success Rate" },
                    { icon: Clock, text: "Fast Application Processing" },
                    { icon: Award, text: "Expert Visa Guidance" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <feature.icon className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Enhanced Footer */}
      {/* <footer className="bg-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">AdmissionsHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner in global education. Connecting students with top universities worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Universities</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Programs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Scholarships</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Test Preparation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Visa Guidance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                  <div
                    key={social}
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors"
                  >
                    <span className="text-xs font-medium">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} AdmissionsHub. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default AdmissionPage;
