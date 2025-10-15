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
} from "lucide-react";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function LandingPage() {
  const categories = [
    {
      name: "Computer Science",
      icon: "💻",
      color: "bg-purple-100 hover:border-purple-600",
    },
    {
      name: "Business",
      icon: "📊",
      color: "bg-indigo-100 hover:border-indigo-600",
    },
    {
      name: "Data Science",
      icon: "📈",
      color: "bg-violet-100 hover:border-violet-600",
    },
    {
      name: "Design",
      icon: "🎨",
      color: "bg-purple-100 hover:border-purple-600",
    },
    {
      name: "Mathematics",
      icon: "🔢",
      color: "bg-indigo-100 hover:border-indigo-600",
    },
    {
      name: "Personal Development",
      icon: "🌟",
      color: "bg-violet-100 hover:border-violet-600",
    },
  ];

  const stats = [
    {
      value: "50K+",
      label: "Active Students",
      icon: <Users className="w-8 h-8" />,
    },
    {
      value: "200+",
      label: "Expert Courses",
      icon: <BookOpen className="w-8 h-8" />,
    },
    {
      value: "95%",
      label: "Success Rate",
      icon: <Award className="w-8 h-8" />,
    },
    { value: "40+", label: "Universities", icon: <Star className="w-8 h-8" /> },
  ];

  const features = [
    {
      icon: <Award className="w-10 h-10" />,
      title: "Certified Universities",
      description:
        "Earn recognized certificates from top universities worldwide",
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Learn Anywhere",
      description: "Access courses on any device, anytime, from anywhere",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Expert Instructors",
      description: "Learn from industry leaders and university professors",
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Career Growth",
      description: "Advance your career with in-demand skills and credentials",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer, Google",
      avatar: "S",
      text: "The courses are structured and engaging. I could learn at my own pace and earn a certificate from my dream university!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Data Scientist, Meta",
      avatar: "M",
      text: "Exceptional learning experience with real-world projects. The instructors are industry experts who truly care about your success.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager, Amazon",
      avatar: "E",
      text: "Game-changer for my career! The university partnerships give these courses credibility and the content is always up-to-date.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-indigo-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-indigo-800 to-indigo-900">
        {/* Animated Book Elements */}
        <div
          className={`absolute top-20 left-10 opacity-20 ${styles.animateFloat}`}
        >
          <BookOpen className="w-24 h-24 text-white transform rotate-12" />
        </div>
        <div
          className={`absolute top-40 right-20 opacity-15 ${styles.animateFloatDelayed}`}
        >
          <BookOpen className="w-32 h-32 text-white transform -rotate-12" />
        </div>
        <div
          className={`absolute bottom-20 left-1/4 opacity-10 ${styles.animateFloatSlow}`}
        >
          <GraduationCap className="w-28 h-28 text-white transform rotate-6" />
        </div>
        <div
          className={`absolute top-1/3 right-10 opacity-20 ${styles.animateFloat}`}
        >
          <Award className="w-20 h-20 text-yellow-300 transform -rotate-6" />
        </div>
        <div
          className={`absolute bottom-40 right-1/3 opacity-15 ${styles.animateFloatDelayed}`}
        >
          <BookOpen className="w-36 h-36 text-white transform rotate-45" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white mb-6">
              <Flame className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold">
                AI University search and CV Builder
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Learn Anytime, Anywhere with{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                University-Tied Courses
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join top programs powered by leading universities — grow your
              skills and accelerate your career with world-class education
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={"/courses"}
                className="group px-8 py-4 bg-white text-purple-700 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                Explore Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={"/university"}
                className="group px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                Explore Universities
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 rounded-xl bg-indigo-700 text-white mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to accelerate your learning and career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white rounded-3xl border border-gray-200 hover:border-purple-600 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of successful learners worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-purple-600 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-700 to-indigo-900 flex items-center justify-center text-white font-bold text-xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-800 to-indigo-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of students already learning on our platform. Start
            your journey today with courses from top universities.
          </p>
          <Link
            to={"/register"}
            className="group w-max px-10 py-5 bg-white text-purple-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
//
