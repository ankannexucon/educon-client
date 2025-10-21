import styles from "../../styles/animations.module.css";
import {
  Star,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Play,
  ArrowRight,
  Flame,
  Sparkles,
  ArrowUpRight,
  FileText,
  CheckCircle,
  Clock,
  BarChart3,
  Download,
  Eye,
  Calendar,
  School,
  UserCheck,
  ShieldCheck,
  Bell,
  Mail,
  Target,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AgencyDashboard() {
  const stats = [
    {
      value: "2,843",
      label: "Total Applications",
      change: "+18%",
      trend: "up",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-indigo-500",
    },
    {
      value: "1,927",
      label: "Verified Documents",
      change: "+15%",
      trend: "up",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      value: "634",
      label: "Pending Verification",
      change: "-8%",
      trend: "down",
      icon: <Clock className="w-6 h-6" />,
      color: "bg-orange-500",
    },
    {
      value: "92%",
      label: "Success Rate",
      change: "+5%",
      trend: "up",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-purple-500",
    },
  ];

  const quickActions = [
    {
      name: "Student Application",
      path: "/university-application-view",
      icon: <School size={18} />,
      description: "Manage university partnerships and applications",
      count: "48",
    },
  ];

  const verificationQueue = [
    {
      id: 1,
      student: "Emma Wilson",
      university: "Harvard University",
      documents: 3,
      status: "pending",
      days: 2,
    },
    {
      id: 2,
      student: "James Brown",
      university: "MIT",
      documents: 4,
      status: "in-review",
      days: 1,
    },
    {
      id: 3,
      student: "Lisa Taylor",
      university: "Stanford University",
      documents: 2,
      status: "pending",
      days: 3,
    },
  ];

  const performanceMetrics = [
    {
      metric: "Average Processing Time",
      value: "2.3 days",
      target: "2.0 days",
      status: "slightly_above",
    },
    {
      metric: "Document Accuracy",
      value: "98.2%",
      target: "95%",
      status: "excellent",
    },
    {
      metric: "Client Satisfaction",
      value: "4.8/5",
      target: "4.5/5",
      status: "excellent",
    },
    {
      metric: "Application Success",
      value: "89%",
      target: "85%",
      status: "good",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-800 to-indigo-900 text-white border-b border-gray-200 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-32 w-12 h-12 bg-white rounded-full"></div>
        </div>

        {/* Animated background elements */}
        <div
          className={`absolute top-0 left-0 w-full h-full ${styles.animatePulse}`}
        >
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-300 rounded-full opacity-20"></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-cyan-300 rounded-full opacity-20"></div>
          <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-green-300 rounded-full opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pt-8 lg:pt-12">
            <div className="flex-1 mb-6 lg:mb-0">
              {/* Breadcrumb */}
              {/* <nav className="flex items-center space-x-2 text-sm text-white/80 mb-4">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-white">Agency</span>
              </nav> */}

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
                University Dashboard
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-6 max-w-2xl leading-relaxed">
                Manage applications, track performance, and view comprehensive
                insights
              </p>

              {/* Quick stats row */}
              {/* <div className="flex flex-wrap gap-6 mt-6">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">2,843</div>
                    <div className="text-white/70 text-sm">
                      Total Applications
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">92%</div>
                    <div className="text-white/70 text-sm">Success Rate</div>
                  </div>
                </div>
              </div> */}
            </div>

            {/* User profile section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    GE
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-2 border-indigo-900 rounded-full"></div>
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-white/70 mb-1">
                    Welcome back,
                  </div>
                  <div className="font-bold text-xl truncate">
                    Stanford University
                  </div>
                  <div className="text-white/80 text-sm mt-1">Agency Admin</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-white/70">Online</span>
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/20">
                <button className="flex-1 bg-white/20 hover:bg-white/30 text-white text-sm py-2 px-3 rounded-lg transition-colors duration-200">
                  Profile
                </button>
                <button className="flex-1 bg-white/20 hover:bg-white/30 text-white text-sm py-2 px-3 rounded-lg transition-colors duration-200">
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Date and notifications */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-8 pt-6 border-t border-white/20">
            <div className="flex items-center gap-4 text-white/80 mb-4 sm:mb-0">
              <Calendar className="w-5 h-5" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2">
                <Bell className="w-5 h-5" />
                <span className="text-sm">2 New Notifications</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2">
                <Mail className="w-5 h-5" />
                <span className="text-sm">15 Unread Messages</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl text-white ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendingUp
                    className={`w-4 h-4 ${
                      stat.trend === "down" ? "transform rotate-180" : ""
                    }`}
                  />
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Quick Actions
                </h2>
                <div className="text-gray-500 text-sm">
                  Manage all processes
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.path}
                    className="group p-4 border border-gray-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                        {action.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {action.count}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {action.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {action.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Queue */}
          {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Verification Queue
              </h2>
              <div className="text-indigo-600 text-sm font-medium">
                Priority Tasks
              </div>
            </div>
            <div className="space-y-4">
              {verificationQueue.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full group-hover:scale-110 transition-transform ${
                        item.status === "pending"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-indigo-700">
                        {item.student}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.university}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {item.documents} docs
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.days} day{item.days > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/document-verification"
              className="w-full mt-4 py-2 text-center text-indigo-600 hover:text-indigo-700 text-sm font-medium border border-indigo-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              View All Verifications
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div> */}
        </div>

        {/* Performance Metrics */}
        {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mt-8 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Performance Metrics
            </h2>
            <div className="text-gray-500 text-sm">
              Real-time performance tracking
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-700">
                    {metric.metric}
                  </h3>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      metric.status === "excellent"
                        ? "bg-green-500"
                        : metric.status === "good"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600">
                  Target: {metric.target}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
