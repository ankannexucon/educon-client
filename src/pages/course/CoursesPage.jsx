import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Star,
  TrendingUp,
  Award,
  Filter,
  Sparkles,
  Brain,
  Lightbulb,
  Users,
  Clock,
  BookOpen,
  Tag,
  Layers,
  PlayCircle,
  CheckCircle,
  User,
  X,
  CreditCard,
  Shield,
  Calendar,
} from "lucide-react";

// Dummy Course Data
const mockCourseData = [
  {
    id: 1,
    title: "B.Sc. in Computer Science",
    institute: "University of NY (European Campus)",
    duration: "3 Years",
    enrolled: "320 Students",
    price: "£9,000 / year",
    discountPrice: "£8,100 / year",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
    category: "Technology",
    level: "Beginner",
    description:
      "Learn the fundamentals of computer science, programming, and problem-solving skills.",
    rating: 4.8,
    reviews: 1245,
    featured: true,
    trending: true,
    modules: 12,
    language: "English",
    certificate: true,
  },
  {
    id: 2,
    title: "M.Sc. in Data Science",
    institute: "Tech University",
    duration: "2 Years",
    enrolled: "150 Students",
    price: "£12,000 / year",
    discountPrice: "£10,800 / year",
    image: "https://picsum.photos/id/1012/400/250",
    category: "Technology",
    level: "Intermediate",
    description:
      "Gain expertise in data analysis, machine learning, and predictive modeling techniques.",
    rating: 4.7,
    reviews: 890,
    featured: true,
    modules: 8,
    language: "English",
    certificate: true,
  },
  {
    id: 3,
    title: "MBA in Marketing",
    institute: "Global Business School",
    duration: "2 Years",
    enrolled: "200 Students",
    price: "£14,500 / year",
    discountPrice: "£13,050 / year",
    image: "https://picsum.photos/id/1013/400/250",
    category: "Business",
    level: "Intermediate",
    description:
      "Develop strategic marketing skills and learn how to grow businesses effectively.",
    rating: 4.6,
    reviews: 1120,
    top: true,
    modules: 10,
    language: "English",
    certificate: true,
  },
  {
    id: 4,
    title: "BBA in Management",
    institute: "City College Europe",
    duration: "3 Years",
    enrolled: "180 Students",
    price: "£7,500 / year",
    discountPrice: "£6,750 / year",
    image: "https://picsum.photos/id/1014/400/250",
    category: "Business",
    level: "Beginner",
    description:
      "Understand the basics of business management, leadership, and organizational skills.",
    rating: 4.5,
    reviews: 760,
    modules: 14,
    language: "English",
    certificate: true,
  },
  {
    id: 5,
    title: "React Advanced",
    institute: "Code Academy Europe",
    duration: "8 Weeks",
    enrolled: "120 Students",
    price: "£450",
    discountPrice: "£405",
    image: "https://picsum.photos/id/1015/400/250",
    category: "Technology",
    level: "Advanced",
    description:
      "Master advanced React concepts, state management, hooks, and component optimization.",
    rating: 4.9,
    reviews: 340,
    trending: true,
    modules: 6,
    language: "English",
    certificate: true,
  },
  {
    id: 6,
    title: "Tailwind CSS Mastery",
    institute: "Design School EU",
    duration: "6 Weeks",
    enrolled: "95 Students",
    price: "£350",
    discountPrice: "£315",
    image: "https://picsum.photos/id/1016/400/250",
    category: "Design",
    level: "Intermediate",
    description:
      "Learn how to build responsive, modern, and visually stunning UIs using Tailwind CSS.",
    rating: 4.7,
    reviews: 210,
    modules: 5,
    language: "English",
    certificate: true,
  },
  {
    id: 7,
    title: "Python for Data Analysis",
    institute: "Data School Europe",
    duration: "12 Weeks",
    enrolled: "140 Students",
    price: "£600",
    discountPrice: "£540",
    image: "https://picsum.photos/id/1018/400/250",
    category: "Technology",
    level: "Intermediate",
    description:
      "Analyze data efficiently with Python using libraries like Pandas, NumPy, and Matplotlib.",
    rating: 4.8,
    reviews: 430,
    modules: 8,
    language: "English",
    certificate: true,
  },
  {
    id: 8,
    title: "Fullstack Web Development",
    institute: "Tech Hub EU",
    duration: "16 Weeks",
    enrolled: "250 Students",
    price: "£1,000",
    discountPrice: "£900",
    image: "https://picsum.photos/id/1019/400/250",
    category: "Technology",
    level: "Advanced",
    description:
      "Learn front-end and back-end development with React, Node.js, and databases to build full web applications.",
    rating: 4.9,
    reviews: 560,
    top: true,
    modules: 12,
    language: "English",
    certificate: true,
  },
];

const categories = ["All Categories", "Technology", "Business", "Design"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

// AI Search Knowledge Base for Courses
const aiSearchKnowledge = {
  programming: {
    suggestions: [
      "Programming courses for beginners",
      "Advanced coding and development programs",
      "Full-stack web development courses",
      "Python programming courses",
    ],
    keywords: [
      "programming",
      "coding",
      "development",
      "python",
      "react",
      "javascript",
      "web development",
    ],
  },
  data: {
    suggestions: [
      "Data science and analytics courses",
      "Machine learning and AI programs",
      "Data analysis with Python courses",
      "Big data and analytics programs",
    ],
    keywords: [
      "data",
      "analytics",
      "machine learning",
      "ai",
      "data science",
      "analysis",
      "python",
    ],
  },
  business: {
    suggestions: [
      "Business management and MBA programs",
      "Digital marketing courses",
      "Finance and investment programs",
      "Entrepreneurship and leadership courses",
    ],
    keywords: [
      "business",
      "management",
      "mba",
      "marketing",
      "finance",
      "entrepreneurship",
      "leadership",
    ],
  },
  design: {
    suggestions: [
      "UI/UX design courses",
      "Web design and development programs",
      "Graphic design courses",
      "Frontend development with design",
    ],
    keywords: [
      "design",
      "ui",
      "ux",
      "frontend",
      "graphic",
      "web design",
      "tailwind",
    ],
  },
  affordable: {
    suggestions: [
      "Budget-friendly courses under £500",
      "Affordable certification programs",
      "Cost-effective learning options",
      "Short courses with great value",
    ],
    keywords: [
      "affordable",
      "cheap",
      "budget",
      "low cost",
      "inexpensive",
      "value",
    ],
  },
  beginner: {
    suggestions: [
      "Beginner-friendly programming courses",
      "Introductory business programs",
      "Foundation courses for beginners",
      "No-experience-required courses",
    ],
    keywords: [
      "beginner",
      "introductory",
      "foundation",
      "basic",
      "entry level",
      "starter",
    ],
  },
  advanced: {
    suggestions: [
      "Advanced technical courses",
      "Professional certification programs",
      "Master-level courses",
      "Specialized advanced programs",
    ],
    keywords: [
      "advanced",
      "professional",
      "expert",
      "master",
      "specialized",
      "complex",
    ],
  },
  short: {
    suggestions: [
      "Short-term certification courses",
      "8-week intensive programs",
      "Quick skill development courses",
      "Short duration learning programs",
    ],
    keywords: ["short", "weeks", "intensive", "quick", "fast", "certification"],
  },
  degree: {
    suggestions: [
      "Bachelor's degree programs",
      "Master's degree courses",
      "Long-term degree programs",
      "University degree courses",
    ],
    keywords: [
      "degree",
      "bachelor",
      "master",
      "years",
      "university",
      "college",
    ],
  },
};

// Enrollment Modal Component
const EnrollmentModal = ({ isOpen, onClose, course, onEnroll }) => {
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onEnroll(course);
      onClose();
    } catch (error) {
      console.error('Enrollment failed:', error);
    } finally {
      setIsEnrolling(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-900">Enroll in Course</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Course Info */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={course.image}
              alt={course.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-semibold text-slate-900">{course.title}</h4>
              <p className="text-sm text-slate-600">{course.institute}</p>
              <p className="text-lg font-bold text-green-600 mt-1">
                {course.discountPrice}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Certificate of Completion</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>Lifetime access</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Shield className="w-4 h-4 text-purple-500" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <h5 className="font-semibold text-slate-900 mb-2">Payment Summary</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Course Price</span>
                <span className="font-medium">{course.discountPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Platform Fee</span>
                <span className="font-medium">£0</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-green-600">{course.discountPrice}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isEnrolling ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing Enrollment...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Complete Enrollment
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="w-full border border-slate-300 text-slate-700 font-semibold py-3 px-4 rounded-lg transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// AI-Powered Smart Search Component
const AISearch = ({ searchQuery, setSearchQuery, onSuggestionClick }) => {
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const generateAISuggestions = (query) => {
    if (!query || query.length < 2) {
      return [];
    }

    const queryLower = query.toLowerCase();
    const matchedCategories = [];
    const allSuggestions = new Set();

    // Find matching categories based on keywords
    Object.entries(aiSearchKnowledge).forEach(([category, data]) => {
      const hasKeyword = data.keywords.some((keyword) =>
        queryLower.includes(keyword.toLowerCase())
      );

      if (hasKeyword) {
        matchedCategories.push(category);
        // Add category-specific suggestions
        data.suggestions.forEach((suggestion) =>
          allSuggestions.add(suggestion)
        );
      }
    });

    // If no specific category matched, provide general suggestions
    if (matchedCategories.length === 0) {
      return [
        "Programming courses for beginners",
        "Data science and analytics programs",
        "Business management courses",
        "UI/UX design fundamentals",
        "Affordable short-term courses",
        "Advanced technical programs",
      ];
    }

    // Add intelligent cross-category suggestions
    if (
      matchedCategories.includes("programming") &&
      matchedCategories.includes("beginner")
    ) {
      allSuggestions.add(
        "Beginner-friendly programming courses like Python and Web Development"
      );
    }

    if (
      matchedCategories.includes("data") &&
      matchedCategories.includes("advanced")
    ) {
      allSuggestions.add("Advanced data science and machine learning programs");
    }

    if (
      matchedCategories.includes("business") &&
      matchedCategories.includes("short")
    ) {
      allSuggestions.add("Short-term business certification courses");
    }

    if (
      matchedCategories.includes("affordable") &&
      matchedCategories.includes("programming")
    ) {
      allSuggestions.add(
        "Budget-friendly programming courses with high ratings"
      );
    }

    return Array.from(allSuggestions).slice(0, 6);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);

    if (value.length >= 2) {
      const suggestions = generateAISuggestions(value);
      setAiSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setAiSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && aiSuggestions.length > 0) {
      handleSuggestionClick(aiSuggestions[0]);
    }
  };

  return (
    <div className="mb-8">
      <div className="relative">
        <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Ask AI: 'Find beginner programming courses under £500...'"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg placeholder-purple-300"
        />

        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setShowSuggestions(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {showSuggestions && aiSuggestions.length > 0 && (
        <div className="mt-2 bg-white rounded-lg border border-purple-100 shadow-lg p-4 z-50">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <p className="text-sm text-purple-600 font-semibold">
              AI Search Suggestions:
            </p>
          </div>
          <div className="space-y-2">
            {aiSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-all duration-200 border border-purple-200 hover:border-purple-300 hover:shadow-sm flex items-start gap-3 group"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Sparkles className="w-3 h-3 text-purple-500" />
                </div>
                <span className="text-sm flex-1">{suggestion}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-purple-100">
            <p className="text-xs text-purple-500 text-center">
              💡 Press Enter to select the first suggestion
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// AI Match Score Component
const AIMatchScore = ({ course, userProfile }) => {
  const calculateMatchScore = (course, profile) => {
    let score = 0;

    // Field of interest match (40 points max)
    if (profile.fieldOfInterest) {
      const fieldMatch =
        course.category
          .toLowerCase()
          .includes(profile.fieldOfInterest.toLowerCase()) ||
        course.description
          .toLowerCase()
          .includes(profile.fieldOfInterest.toLowerCase()) ||
        course.title
          .toLowerCase()
          .includes(profile.fieldOfInterest.toLowerCase());
      if (fieldMatch) score += 40;
    }

    // Experience level match (30 points max)
    if (profile.experienceLevel && profile.experienceLevel !== "All Levels") {
      if (course.level === profile.experienceLevel) score += 30;
    }

    // Budget match (20 points max)
    if (profile.maxBudget) {
      const coursePrice = parseInt(course.discountPrice.replace(/[^\d]/g, "")) || 0;
      if (coursePrice <= profile.maxBudget) {
        const budgetRatio = coursePrice / profile.maxBudget;
        score += 20 * (1 - budgetRatio);
      }
    }

    // Duration preference (10 points max)
    if (profile.preferredDuration) {
      if (
        course.duration.includes("Weeks") &&
        profile.preferredDuration === "short"
      )
        score += 10;
      if (
        course.duration.includes("Years") &&
        profile.preferredDuration === "long"
      )
        score += 10;
    }

    // Rating boost
    if (course.rating) {
      score += (course.rating - 4) * 5;
    }

    return Math.min(100, Math.max(0, Math.round(score)));
  };

  const matchScore = calculateMatchScore(course, userProfile);

  const getMatchColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getMatchText = (score) => {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Good Match";
    if (score >= 40) return "Fair Match";
    return "Low Match";
  };

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-600">
          AI Match Score
        </span>
        <span className="text-xs font-semibold text-gray-700">
          {matchScore}% - {getMatchText(matchScore)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${getMatchColor(
            matchScore
          )}`}
          style={{ width: `${matchScore}%` }}
        ></div>
      </div>
    </div>
  );
};

// AI-Powered Recommendation Engine
const AIRecommendations = ({ courses, userBehavior, userProfile }) => {
  const generateRecommendations = useMemo(() => {
    return courses
      .map((course) => {
        let relevanceScore = 0;

        // Based on user search history (40 points max)
        if (
          userBehavior.searches &&
          userBehavior.searches.some(
            (search) =>
              course.title.toLowerCase().includes(search.toLowerCase()) ||
              course.description.toLowerCase().includes(search.toLowerCase()) ||
              course.category.toLowerCase().includes(search.toLowerCase())
          )
        ) {
          relevanceScore += 40;
        }

        // Based on user profile preferences (35 points)
        if (
          userProfile.fieldOfInterest &&
          (course.category
            .toLowerCase()
            .includes(userProfile.fieldOfInterest.toLowerCase()) ||
            course.description
              .toLowerCase()
              .includes(userProfile.fieldOfInterest.toLowerCase()))
        ) {
          relevanceScore += 35;
        }

        // Based on course popularity and ratings (25 points)
        if (course.rating >= 4.7) relevanceScore += 15;
        if (course.trending || course.featured) relevanceScore += 10;

        return { ...course, relevanceScore };
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 4);
  }, [courses, userBehavior, userProfile]);

  if (
    generateRecommendations.length === 0 ||
    generateRecommendations[0].relevanceScore === 0
  ) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-7 h-7 text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-900">
          Recommended For You
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {generateRecommendations.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            userProfile={userProfile}
            badge={{
              icon: <Brain className="w-3 h-3" />,
              text: "AI Recommended",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Course Card Component with Enrollment Modal
const CourseCard = ({ course, userProfile, badge }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEnroll = (courseData) => {
    setIsEnrolled(true);
    console.log(`Successfully enrolled in: ${courseData.title}`);
    // Here you would typically make an API call to enroll the user
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col w-full min-h-[450px]">
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-sm">
            <span className="text-sm font-semibold text-slate-700">
              {course.price}
            </span>
          </div>
          {badge && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold">
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
            {course.title}
          </h3>
          <p className="text-sm text-slate-600 mb-2">
            {course.institute}
          </p>

          <p className="text-sm text-slate-500 mb-3 line-clamp-3">
            {course.description}
          </p>

          {/* AI Match Score */}
          <AIMatchScore course={course} userProfile={userProfile} />

          <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4 text-emerald-600" />
              <span>{course.enrolled}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4 text-purple-600" />
              <span className="font-medium">{course.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span className="font-medium">{course.level}</span>
            </div>
          </div>

          {/* Rating and Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold text-slate-900">{course.rating}</span>
              <span className="text-slate-500 text-sm">
                ({course.reviews})
              </span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-green-600">
                {course.discountPrice}
              </span>
            </div>
          </div>

          {/* Enroll / Pending Button */}
          <button
            onClick={() => !isEnrolled && handleOpenModal(course)}
            disabled={isEnrolled}
            className={`mt-auto w-full font-medium py-3 rounded-lg transition-colors ${
              isEnrolled
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isEnrolled ? "Pending" : "Enroll Now"}
          </button>
        </div>
      </div>

      {/* Enrollment Modal */}
      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        course={course}
        onEnroll={handleEnroll}
      />
    </>
  );
};

// AI Smart Filters with Insights
const AISmartFilters = ({ courses, filters, setFilters }) => {
  const [aiInsights, setAiInsights] = useState([]);

  const generateInsights = (courses) => {
    const insights = [];

    if (courses.length === 0) return insights;

    // Price insights
    const prices = courses.map((course) =>
      parseInt(course.discountPrice.replace(/[^\d]/g, "")) || 0
    );
    const avgPrice =
      prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    insights.push(
      `💰 Average price: £${avgPrice.toFixed(
        0
      )} (range: £${minPrice}-£${maxPrice})`
    );

    // Rating insights
    const highRated = courses.filter((course) => course.rating >= 4.7).length;
    const total = courses.length;
    insights.push(`⭐ ${highRated} of ${total} courses rated 4.7+ stars`);

    // Category distribution
    const categories = {};
    courses.forEach((course) => {
      categories[course.category] = (categories[course.category] || 0) + 1;
    });

    const topCategory = Object.keys(categories).reduce((a, b) =>
      categories[a] > categories[b] ? a : b
    );
    insights.push(
      `🎯 Most common: ${topCategory} (${categories[topCategory]} options)`
    );

    // Level distribution
    const levels = {};
    courses.forEach((course) => {
      levels[course.level] = (levels[course.level] || 0) + 1;
    });
    const topLevel = Object.keys(levels).reduce((a, b) =>
      levels[a] > levels[b] ? a : b
    );
    insights.push(
      `📊 Mostly ${topLevel.toLowerCase()} level courses available`
    );

    return insights;
  };

  useEffect(() => {
    setAiInsights(generateInsights(courses));
  }, [courses]);

  if (aiInsights.length === 0) return null;

  return (
    <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-blue-600" />
        <h4 className="font-semibold text-blue-900">AI Insights</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {aiInsights.map((insight, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-blue-800"
          >
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            {insight}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function EnhancedCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All Categories",
    level: "All Levels",
    minRating: 0,
  });

  const [userProfile, setUserProfile] = useState({
    fieldOfInterest: "Technology",
    experienceLevel: "Beginner",
    maxBudget: 1000,
    preferredDuration: "short",
  });

  const [userBehavior, setUserBehavior] = useState({
    searches: ["programming", "python", "web development"],
    viewedCourses: [1, 2, 5],
    savedCourses: [1],
  });

  const [enrolledCourses, setEnrolledCourses] = useState(new Set());

  const filteredCourses = useMemo(() => {
    if (
      !searchQuery &&
      filters.category === "All Categories" &&
      filters.level === "All Levels" &&
      filters.minRating === 0
    ) {
      return [];
    }

    return mockCourseData.filter((course) => {
      const matchesSearch =
        searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.institute.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filters.category === "All Categories" ||
        course.category === filters.category;
      const matchesLevel =
        filters.level === "All Levels" || course.level === filters.level;
      const matchesRating = course.rating >= filters.minRating;

      return matchesSearch && matchesCategory && matchesLevel && matchesRating;
    });
  }, [searchQuery, filters]);

  const featuredCourses = mockCourseData.filter((course) => course.featured);
  const topCourses = mockCourseData.filter((course) => course.top);
  const trendingCourses = mockCourseData.filter((course) => course.trending);

  const showSearchResults =
    searchQuery ||
    filters.category !== "All Categories" ||
    filters.level !== "All Levels" ||
    filters.minRating > 0;

  // Update user behavior when search is performed
  useEffect(() => {
    if (
      searchQuery.trim() &&
      !userBehavior.searches.includes(searchQuery.toLowerCase())
    ) {
      setUserBehavior((prev) => ({
        ...prev,
        searches: [...prev.searches, searchQuery.toLowerCase()].slice(-10),
      }));
    }
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    console.log("AI Suggestion selected:", suggestion);
  };

  const handleEnrollCourse = (course) => {
    setEnrolledCourses(prev => new Set([...prev, course.title]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            AI-Powered Course Discovery
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Smart recommendations and insights powered by artificial intelligence
          </p>
        </div>

        {/* AI Search */}
        <div className="max-w-4xl mx-auto">
          <AISearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>

        {/* AI Recommendations - Show when no active search */}
        {!showSearchResults && (
          <AIRecommendations
            courses={mockCourseData}
            userBehavior={userBehavior}
            userProfile={userProfile}
          />
        )}

        {/* Filter Box - Show when searching */}
        {showSearchResults && (
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                Filter Results
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Level
                </label>
                <select
                  value={filters.level}
                  onChange={(e) =>
                    setFilters({ ...filters, level: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minRating: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={0}>Any Rating</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={4.7}>4.7+ Stars</option>
                </select>
              </div>
            </div>

            {/* AI Smart Filters */}
            <AISmartFilters
              courses={filteredCourses}
              filters={filters}
              setFilters={setFilters}
            />

            <div className="mt-6">
              <p className="text-slate-600">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {filteredCourses.length}
                </span>{" "}
                {filteredCourses.length === 1 ? "result" : "results"}
              </p>
            </div>
          </div>
        )}

        {/* Search Results */}
        {showSearchResults && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Search Results
            </h2>
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course) => {
                  const isEnrolled = enrolledCourses.has(course.title);
                  return (
                    <div
                      key={course.id}
                      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col w-full min-h-[450px]"
                    >
                      {/* Image */}
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-sm">
                          <span className="text-sm font-semibold text-slate-700">
                            {course.price}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-2">
                          {course.institute}
                        </p>

                        <p className="text-sm text-slate-500 mb-3 line-clamp-3">
                          {course.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4 text-emerald-600" />
                            <span>{course.enrolled}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4 text-purple-600" />
                            <span className="font-medium">{course.category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Layers className="w-4 h-4 text-indigo-600" />
                            <span className="font-medium">{course.level}</span>
                          </div>
                        </div>

                        {/* Enroll / Pending Button */}
                        <button
                          onClick={() => !isEnrolled && handleEnrollCourse(course)}
                          disabled={isEnrolled}
                          className={`mt-auto w-full font-medium py-3 rounded-lg transition-colors ${
                            isEnrolled
                              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white"
                          }`}
                        >
                          {isEnrolled ? "Pending" : "Enroll Now"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No courses found
                </h3>
                <p className="text-slate-600">
                  Try adjusting your search or using AI suggestions above
                </p>
              </div>
            )}
          </div>
        )}

        {/* Featured Section */}
        {!showSearchResults && (
          <>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-7 h-7 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Featured Courses
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    userProfile={userProfile}
                    badge={{
                      icon: <Award className="w-3 h-3" />,
                      text: "Featured",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Top Rated Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-7 h-7 text-yellow-500" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Top Rated Courses
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    userProfile={userProfile}
                    badge={{
                      icon: <Star className="w-3 h-3" />,
                      text: "Top Rated",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Trending Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-7 h-7 text-emerald-600" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Trending Now
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    userProfile={userProfile}
                    badge={{
                      icon: <TrendingUp className="w-3 h-3" />,
                      text: "Trending",
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}