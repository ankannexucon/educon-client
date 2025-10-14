import React, { useState } from "react";
import {
  User,
  Mail,
  BookOpen,
  Calendar,
  Award,
  TrendingUp,
  Edit2,
  Camera,
  MapPin,
  Phone,
  Globe,
  Linkedin,
  Github,
  Clock,
  Target,
  CheckCircle2,
  Activity,
} from "lucide-react";

const student = {
  name: "Alex Johnson",
  email: "alex.johnson@student.edu",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
  program: "Computer Science",
  year: "2nd Year",
  gpa: "3.85",
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
    value: student.gpa,
    icon: TrendingUp,
    color: "text-green-600",
  },
  { label: "Credit Hours", value: "54", icon: Clock, color: "text-orange-600" },
  { label: "Achievements", value: "12", icon: Award, color: "text-purple-600" },
];

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);

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
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-lg"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            {/* Bio */}
            <div className="mb-6 p-4 bg-slate-50 rounded-xl">
              <p className="text-slate-700 leading-relaxed">{student.bio}</p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-sm font-medium transition-all flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {student.website}
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
                <stat.icon className={`w-8 h-8 `} />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">
                {stat.value}
              </p>
              <p className="text-slate-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

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
                    {student.gpa} / 4.0
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
    </div>
  );
}
