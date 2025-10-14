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
} from "lucide-react";

const AdmissionPage = () => {
  const [activeTab, setActiveTab] = useState("programs");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    documents: [],
  });

  const programs = [
    {
      id: 1,
      title: "Bachelor of Technology",
      duration: "4 Years",
      fees: "₹80,000/year",
      seats: 120,
      eligibility: "10+2 with 60% marks",
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      id: 2,
      title: "Bachelor of Business Administration",
      duration: "3 Years",
      fees: "₹60,000/year",
      seats: 80,
      eligibility: "10+2 with 55% marks",
      icon: "📊",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      id: 3,
      title: "Bachelor of Computer Applications",
      duration: "3 Years",
      fees: "₹50,000/year",
      seats: 100,
      eligibility: "10+2 with 50% marks",
      icon: "🔧",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
    },
    {
      id: 4,
      title: "Master of Technology",
      duration: "2 Years",
      fees: "₹1,00,000/year",
      seats: 60,
      eligibility: "B.Tech with 60% marks",
      icon: "🎓",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Modern Header with Gradient */}
      <header className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">
                Admissions Open for 2024-25
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Shape Your Future with{" "}
              <span className="text-yellow-300">Educon</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who started their journey
              with us. World-class education awaits you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveTab("application")}
                className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Apply Now
              </button>
              <button
                onClick={() => setActiveTab("programs")}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                Explore Programs
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </header>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-20 mb-16">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                360+
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Total Seats
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                4
              </div>
              <div className="text-sm md:text-base text-gray-600">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
                95%
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Placement Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                50+
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Industry Partners
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Programs Grid/List */}
          <aside className="lg:w-1/3">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-6 h-6" />
                    Available Programs
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {programs.map((program) => (
                    <div
                      key={program.id}
                      className={`group relative rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                        selectedProgram?.id === program.id
                          ? "bg-gradient-to-r " +
                            program.color +
                            " text-white shadow-lg scale-105"
                          : "bg-gray-50 hover:bg-gray-100 hover:shadow-md"
                      }`}
                      onClick={() => setSelectedProgram(program)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{program.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-bold mb-2 text-base ${
                              selectedProgram?.id === program.id
                                ? "text-white"
                                : "text-gray-800"
                            }`}
                          >
                            {program.title}
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              <span
                                className={
                                  selectedProgram?.id === program.id
                                    ? "text-white"
                                    : "text-gray-600"
                                }
                              >
                                {program.duration}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-3 h-3" />
                              <span
                                className={`font-semibold ${
                                  selectedProgram?.id === program.id
                                    ? "text-white"
                                    : "text-green-600"
                                }`}
                              >
                                {program.fees}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span
                              className={`text-xs px-3 py-1 rounded-full font-medium ${
                                selectedProgram?.id === program.id
                                  ? "bg-white bg-opacity-30 text-white"
                                  : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              <Users className="w-3 h-3 inline mr-1" />
                              {program.seats} seats
                            </span>
                            <ChevronRight
                              className={`w-4 h-4 ${
                                selectedProgram?.id === program.id
                                  ? "text-white"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Modern Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex-1 py-5 px-6 font-semibold text-center transition-all duration-300 relative ${
                    activeTab === "programs"
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-indigo-500 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("programs")}
                >
                  Program Details
                  {activeTab === "programs" && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                  )}
                </button>
                <button
                  className={`flex-1 py-5 px-6 font-semibold text-center transition-all duration-300 relative ${
                    activeTab === "application"
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-indigo-500 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("application")}
                >
                  Application Form
                  {activeTab === "application" && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6 md:p-8">
                {activeTab === "programs" && (
                  <div className="program-details">
                    {selectedProgram ? (
                      <div className="space-y-8 animate-fadeIn">
                        {/* Program Header */}
                        <div
                          className={`rounded-2xl p-6 bg-gradient-to-r ${selectedProgram.color}`}
                        >
                          <div className="flex items-center gap-4 text-white">
                            <span className="text-5xl md:text-6xl">
                              {selectedProgram.icon}
                            </span>
                            <div>
                              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                {selectedProgram.title}
                              </h2>
                              <p className="text-white text-opacity-90">
                                Transform your career with industry-leading
                                education
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Program Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                            <h4 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                              <Clock className="w-5 h-5" />
                              Program Overview
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                <span className="text-gray-600">Duration</span>
                                <span className="font-semibold text-gray-900">
                                  {selectedProgram.duration}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                <span className="text-gray-600">
                                  Annual Fees
                                </span>
                                <span className="font-bold text-green-600">
                                  {selectedProgram.fees}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600">
                                  Available Seats
                                </span>
                                <span className="font-semibold text-indigo-600">
                                  {selectedProgram.seats}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                            <h4 className="font-bold text-orange-900 mb-4 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5" />
                              Eligibility Criteria
                            </h4>
                            <p className="text-gray-700 text-lg font-medium">
                              {selectedProgram.eligibility}
                            </p>
                            <div className="mt-4 pt-4 border-t border-orange-100">
                              <p className="text-sm text-gray-600">
                                Additional entrance test may be required based
                                on program
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Admission Process */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                          <h4 className="font-bold text-purple-900 mb-4 text-xl">
                            5-Step Admission Process
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {[
                              { step: 1, text: "Fill Application" },
                              { step: 2, text: "Submit Documents" },
                              { step: 3, text: "Entrance Test" },
                              { step: 4, text: "Interview" },
                              { step: 5, text: "Get Admission" },
                            ].map((item) => (
                              <div key={item.step} className="text-center">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2">
                                  {item.step}
                                </div>
                                <p className="text-sm text-gray-700 font-medium">
                                  {item.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                          onClick={() => setActiveTab("application")}
                        >
                          Apply for This Program
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <div className="text-8xl mb-6">🎓</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                          Choose Your Path
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                          Select a program from the sidebar to explore details
                          and begin your application journey
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "application" && (
                  <div className="application-form">
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Application Form
                      </h2>
                      {selectedProgram && (
                        <div
                          className={`${selectedProgram.bgColor} border-2 border-current rounded-xl p-4 ${selectedProgram.textColor}`}
                        >
                          <p className="font-semibold flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Applying for:{" "}
                            <span className="font-bold">
                              {selectedProgram.title}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            required
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            required
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            required
                            placeholder="+91 98765 43210"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Educational Qualification *
                          </label>
                          <input
                            type="text"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                            required
                            placeholder="12th Science / B.Tech"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Address
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
                          placeholder="Enter your complete address"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Upload Documents
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-all bg-gray-50 hover:bg-indigo-50">
                          <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer"
                          >
                            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                            <p className="text-gray-700 font-medium mb-2">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-gray-500">
                              PDF, JPG, PNG (Max: 5MB each)
                            </p>
                          </label>
                        </div>
                        {formData.documents.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {formData.documents.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-indigo-50 p-3 rounded-lg"
                              >
                                <span className="text-sm text-gray-700 truncate flex-1">
                                  {file.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeDocument(index)}
                                  className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-5">
                        <p className="text-yellow-900 text-sm flex items-start gap-3">
                          <span className="text-2xl">📝</span>
                          <span>
                            <strong className="block mb-1">
                              Important Note:
                            </strong>
                            Ensure all information is accurate. You'll receive a
                            confirmation email upon successful submission.
                          </span>
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Submit Application
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPage;
