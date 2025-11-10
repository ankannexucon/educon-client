import React, { useState } from "react";
import {
  Mail,
  BookOpen,
  Calendar,
  Award,
  TrendingUp,
  Edit2,
  Camera,
  MapPin,
  Globe,
  Clock,
  Target,
  CheckCircle2,
  Activity,
  Sparkles,
  X,
  Save,
  User,
  Phone,
  Link,
  GraduationCap,
  Upload,
} from "lucide-react";
import CvBuilderModal from "../../components/CvBuilderModal";
import UploadCvModal from "../../components/UploadCvModal"; // Import the Upload CV Modal

// Initial student data
const initialStudent = {
  name: "Alex Johnson",
  email: "alex.johnson@student.edu",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
  program: "Computer Science",
  year: "2nd Year",
  gpa: "9.5",
  enrollmentDate: "September 2023",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Passionate computer science student with a focus on artificial intelligence and machine learning. Love building innovative solutions and contributing to open-source projects.",
  website: "alexjohnson.dev",
  linkedin: "alex-johnson",
  github: "alexj-dev",
};

const courses = [
  {
    id: 1,
    name: "Data Structures & Algorithms",
    progress: 85,
    grade: "A",
    credits: 4,
  },
  { id: 2, name: "Web Development", progress: 92, grade: "A+", credits: 3 },
  { id: 3, name: "Database Systems", progress: 78, grade: "B+", credits: 3 },
  { id: 4, name: "Operating Systems", progress: 88, grade: "A", credits: 4 },
];

const achievements = [
  {
    id: 1,
    title: "Dean's List",
    description: "Spring 2024",
    icon: Award,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 2,
    title: "Hackathon Winner",
    description: "1st Place",
    icon: Target,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 3,
    title: "Perfect Attendance",
    description: "Fall 2023",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    title: "Research Assistant",
    description: "AI Lab",
    icon: Activity,
    color: "bg-blue-100 text-blue-600",
  },
];

const stats = [
  {
    label: "Completed Courses",
    value: "18",
    icon: BookOpen,
    color: "text-indigo-600",
  },
  {
    label: "Current GPA",
    value: initialStudent.gpa,
    icon: TrendingUp,
    color: "text-green-600",
  },
  { label: "Credit Hours", value: "54", icon: Clock, color: "text-orange-600" },
  { label: "Achievements", value: "12", icon: Award, color: "text-purple-600" },
];

// Edit Profile Modal Component (keep the existing EditProfileModal code)
const EditProfileModal = ({ isOpen, onClose, student, onSave }) => {
  const [formData, setFormData] = useState(student);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/30 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-2000 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Edit2 className="w-6 h-6" />
              <h2 className="text-xl font-bold">Edit Profile</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={formData.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover mx-auto"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-lg text-white hover:bg-indigo-700 transition-all shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">Click camera to change photo</p>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Enter your location"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <GraduationCap className="w-4 h-4 inline mr-2" />
                  Program
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => handleChange('program', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Computer Engineering">Computer Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Year
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                  GPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10.0"
                  value={formData.gpa}
                  onChange={(e) => handleChange('gpa', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Enter your GPA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Enrollment Date
                </label>
                <input
                  type="text"
                  value={formData.enrollmentDate}
                  onChange={(e) => handleChange('enrollmentDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="e.g., September 2023"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Website
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="yourwebsite.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Link className="w-4 h-4 inline mr-2" />
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={formData.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Link className="w-4 h-4 inline mr-2" />
                  GitHub
                </label>
                <input
                  type="text"
                  value={formData.github}
                  onChange={(e) => handleChange('github', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="github.com/username"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function UserProfile() {
  const [student, setStudent] = useState(initialStudent);
  const [isEditing, setIsEditing] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isUploadCvModalOpen, setIsUploadCvModalOpen] = useState(false); // New state for Upload CV Modal

  const handleSaveProfile = (updatedData) => {
    setStudent(updatedData);
    // In a real app, you would make an API call here
    console.log("Profile updated:", updatedData);
  };

  const handleUploadCv = (file) => {
    // Handle the uploaded CV file
    console.log("CV uploaded:", file);
    // In a real app, you would upload the file to your server here
    alert(`CV "${file.name}" uploaded successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-6">
          <div className="h-20"></div>

          <div className="px-8 pb-8">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <div className="relative">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl object-cover"
                  />
                  <button className="absolute bottom-2 right-2 bg-indigo-600 p-2 rounded-lg text-white hover:bg-indigo-700 transition-all shadow-lg">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-slate-900 mb-1">
                    {student.name}
                  </h1>
                  <p className="text-slate-600 mb-2">
                    {student.program} • {student.year}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span>{student.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{student.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span>{student.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-lg"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>

                <button
                  onClick={() => setIsUploadCvModalOpen(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-lg"
                >
                  <Upload className="w-4 h-4" />
                  Upload CV
                </button>

                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  AI CV Builder
                </button>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6 p-4 bg-slate-50 rounded-xl">
              <p className="text-slate-700 leading-relaxed">{student.bio}</p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-sm font-medium transition-all flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {student.website}
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 text-sm font-medium transition-all flex items-center gap-2"
              >
                <Link className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-medium transition-all flex items-center gap-2"
              >
                <Link className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">
                {stat.value}
              </p>
              <p className="text-slate-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Academic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Academic Info
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Program</span>
                  </div>
                  <p className="font-semibold text-slate-900">
                    {student.program}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Year</span>
                  </div>
                  <p className="font-semibold text-slate-900">{student.year}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>GPA</span>
                  </div>
                  <p className="font-semibold text-slate-900">
                    {student.gpa} / 10.0
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Enrolled Since</span>
                  </div>
                  <p className="font-semibold text-slate-900">
                    {student.enrollmentDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-all"
                  >
                    <achievement.icon
                      className={`w-5 h-5 ${achievement.color.split(" ")[1]}`}
                    />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {achievement.title}
                      </p>
                      <p className="text-slate-600 text-xs">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Current Courses
                </h2>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                  {courses.length} Courses
                </span>
              </div>

              <div className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 border border-slate-200 rounded-xl hover:border-indigo-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {course.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {course.credits} Credits
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full font-medium ${
                              course.grade.startsWith("A")
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {course.grade}
                          </span>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-indigo-600">
                        {course.progress}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 px-6 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 font-medium hover:border-indigo-400 hover:text-indigo-600 transition-all">
                View All Courses
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        student={student}
        onSave={handleSaveProfile}
      />

      {/* Upload CV Modal */}
      <UploadCvModal
        isOpen={isUploadCvModalOpen}
        onClose={() => setIsUploadCvModalOpen(false)}
        onUpload={handleUploadCv}
      />

      {/* AI CV Builder Modal */}
      <CvBuilderModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />
    </div>
  );
}