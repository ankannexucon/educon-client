import React, { useState, useMemo, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  Search,
  Filter,
  Sparkles,
  Brain,
  Lightbulb,
  TrendingUp,
  Award,
} from "lucide-react";
import CourseCardComponent from "../../components/course/CourseCardComponent";

// Dummy Course Data
const mockCourseData = [
  {
    id: 1,
    title: "B.Sc. in Computer Science",
    institute: "University of NY (European Campus)",
    duration: "3 Years",
    enrolled: "320 Students",
    price: "€9,000 / year",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
    category: "Technology",
    level: "Beginner",
    description:
      "Learn the fundamentals of computer science, programming, and problem-solving skills.",
    rating: 4.8,
    reviews: 1245,
    featured: true,
    trending: true,
  },
  {
    id: 2,
    title: "M.Sc. in Data Science",
    institute: "Tech University",
    duration: "2 Years",
    enrolled: "150 Students",
    price: "€12,000 / year",
    image: "https://picsum.photos/id/1012/400/250",
    category: "Technology",
    level: "Intermediate",
    description:
      "Gain expertise in data analysis, machine learning, and predictive modeling techniques.",
    rating: 4.7,
    reviews: 890,
    featured: true,
  },
  {
    id: 3,
    title: "MBA in Marketing",
    institute: "Global Business School",
    duration: "2 Years",
    enrolled: "200 Students",
    price: "€14,500 / year",
    image: "https://picsum.photos/id/1013/400/250",
    category: "Business",
    level: "Intermediate",
    description:
      "Develop strategic marketing skills and learn how to grow businesses effectively.",
    rating: 4.6,
    reviews: 1120,
    top: true,
  },
  {
    id: 4,
    title: "BBA in Management",
    institute: "City College Europe",
    duration: "3 Years",
    enrolled: "180 Students",
    price: "€7,500 / year",
    image: "https://picsum.photos/id/1014/400/250",
    category: "Business",
    level: "Beginner",
    description:
      "Understand the basics of business management, leadership, and organizational skills.",
    rating: 4.5,
    reviews: 760,
  },
  {
    id: 5,
    title: "React Advanced",
    institute: "Code Academy Europe",
    duration: "8 Weeks",
    enrolled: "120 Students",
    price: "€450",
    image: "https://picsum.photos/id/1015/400/250",
    category: "Technology",
    level: "Advanced",
    description:
      "Master advanced React concepts, state management, hooks, and component optimization.",
    rating: 4.9,
    reviews: 340,
    trending: true,
  },
  {
    id: 6,
    title: "Tailwind CSS Mastery",
    institute: "Design School EU",
    duration: "6 Weeks",
    enrolled: "95 Students",
    price: "€350",
    image: "https://picsum.photos/id/1016/400/250",
    category: "Design",
    level: "Intermediate",
    description:
      "Learn how to build responsive, modern, and visually stunning UIs using Tailwind CSS.",
    rating: 4.7,
    reviews: 210,
  },
  {
    id: 7,
    title: "Python for Data Analysis",
    institute: "Data School Europe",
    duration: "12 Weeks",
    enrolled: "140 Students",
    price: "€600",
    image: "https://picsum.photos/id/1018/400/250",
    category: "Technology",
    level: "Intermediate",
    description:
      "Analyze data efficiently with Python using libraries like Pandas, NumPy, and Matplotlib.",
    rating: 4.8,
    reviews: 430,
  },
  {
    id: 8,
    title: "Fullstack Web Development",
    institute: "Tech Hub EU",
    duration: "16 Weeks",
    enrolled: "250 Students",
    price: "€1,000",
    image: "https://picsum.photos/id/1019/400/250",
    category: "Technology",
    level: "Advanced",
    description:
      "Learn front-end and back-end development with React, Node.js, and databases to build full web applications.",
    rating: 4.9,
    reviews: 560,
    top: true,
  },
  {
    id: 9,
    title: "Digital Marketing Essentials",
    institute: "Marketing Academy Europe",
    duration: "8 Weeks",
    enrolled: "130 Students",
    price: "€400",
    image: "https://picsum.photos/id/1020/400/250",
    category: "Business",
    level: "Beginner",
    description:
      "Understand SEO, social media marketing, content strategies, and analytics to grow a brand online.",
    rating: 4.6,
    reviews: 290,
  },
  {
    id: 10,
    title: "UI/UX Design Fundamentals",
    institute: "Creative Institute EU",
    duration: "10 Weeks",
    enrolled: "100 Students",
    price: "€500",
    image: "https://picsum.photos/id/1021/400/250",
    category: "Design",
    level: "Beginner",
    description:
      "Master the principles of user interface and user experience design to create intuitive digital products.",
    rating: 4.7,
    reviews: 180,
    trending: true,
  },
  {
    id: 11,
    title: "Python for Machine Learning",
    institute: "AI Academy Europe",
    duration: "12 Weeks",
    enrolled: "90 Students",
    price: "€700",
    image: "https://picsum.photos/id/1022/400/250",
    category: "Technology",
    level: "Intermediate",
    description:
      "Apply Python programming to implement machine learning algorithms, models, and data pipelines.",
    rating: 4.8,
    reviews: 320,
  },
  {
    id: 12,
    title: "Financial Analysis & Modeling",
    institute: "Finance School EU",
    duration: "6 Weeks",
    enrolled: "75 Students",
    price: "€450",
    image: "https://picsum.photos/id/1023/400/250",
    category: "Business",
    level: "Intermediate",
    description:
      "Learn to analyze financial statements, build models, and make data-driven investment decisions.",
    rating: 4.5,
    reviews: 150,
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
      "Budget-friendly courses under $500",
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
    <div className="mb-6">
      <div className="relative">
        <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Ask AI: 'Find beginner programming courses under $500...'"
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
      const coursePrice = parseInt(course.price.replace(/[$,]/g, ""));
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
    if (score >= 80) return "Perfect Match";
    if (score >= 60) return "Great Match";
    if (score >= 40) return "Good Match";
    return "Fair Match";
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-600">AI Match</span>
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
    <Box sx={{ mb: 6 }}>
      <Box
        sx={{
          display: "flex",
          width: 1250,
          mx: "auto",
          alignItems: "center",
          gap: 2,
          mb: 4,
        }}
      >
        <Brain style={{ width: 28, height: 28, color: "#2563eb" }} />
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#1e1b4b" }}>
          Recommended For You
        </Typography>
      </Box>
      <CourseCardComponent
        courses={generateRecommendations}
        showAIFeatures={true}
        userProfile={userProfile}
      />
    </Box>
  );
};

// Enhanced Course Card with AI Features
const EnhancedCourseCard = ({ course, userProfile, badge }) => {
  const getAITags = (course) => {
    const tags = [];

    if (course.rating >= 4.8) tags.push("🏆 Top Rated");
    if (parseInt(course.enrolled) > 200) tags.push("👥 Popular");
    if (parseInt(course.price.replace(/[$,]/g, "")) < 1000)
      tags.push("💰 Great Value");
    if (course.featured) tags.push("⭐ Featured");
    if (course.trending) tags.push("🚀 Trending");

    return tags.slice(0, 2);
  };

  const aiTags = getAITags(course);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {badge && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold">
            {badge.icon}
            <span>{badge.text}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-slate-900">
          {course.title}
        </h3>
        <p className="text-slate-600 text-sm mb-2">{course.institute}</p>

        <p className="text-slate-700 text-sm mb-3 line-clamp-2">
          {course.description}
        </p>

        {/* AI Tags */}
        {aiTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {aiTags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* AI Match Score */}
        <AIMatchScore course={course} userProfile={userProfile} />

        <div className="mt-3 flex justify-between items-center text-sm text-slate-600">
          <span>{course.duration}</span>
          <span>{course.enrolled}</span>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
            {course.level}
          </span>
          <span className="text-lg font-bold text-green-600">
            {course.price}
          </span>
        </div>
      </div>
    </div>
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
      parseInt(course.price.replace(/[$,]/g, ""))
    );
    const avgPrice =
      prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    insights.push(
      `💰 Average price: $${avgPrice.toFixed(
        0
      )} (range: $${minPrice}-$${maxPrice})`
    );

    // Category distribution
    const categories = {};
    courses.forEach((course) => {
      categories[course.category] = (categories[course.category] || 0) + 1;
    });

    const topCategory = Object.keys(categories).reduce((a, b) =>
      categories[a] > categories[b] ? a : b
    );
    insights.push(
      `🎯 Most common: ${topCategory} (${categories[topCategory]} courses)`
    );

    // Level distribution
    const levels = {};
    courses.forEach((course) => {
      levels[course.level] = (levels[course.level] || 0) + 1;
    });
    const topLevel = Object.keys(levels).reduce((a, b) =>
      levels[a] > levels[b] ? a : b
    );
    insights.push(`📊 Mostly ${topLevel.toLowerCase()} level courses`);

    // Duration insights
    const shortCourses = courses.filter((course) =>
      course.duration.includes("Weeks")
    ).length;
    const longCourses = courses.filter((course) =>
      course.duration.includes("Years")
    ).length;
    insights.push(
      `⏱️ ${shortCourses} short courses, ${longCourses} degree programs`
    );

    return insights;
  };

  useEffect(() => {
    setAiInsights(generateInsights(courses));
  }, [courses]);

  if (aiInsights.length === 0) return null;

  return (
    <Box
      sx={{
        mb: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 3,
        border: "1px solid",
        borderColor: "primary.light",
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Lightbulb style={{ width: 20, height: 20, color: "#0284c7" }} />
        <Typography variant="h6" sx={{ color: "#075985", fontWeight: 600 }}>
          AI Insights
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 1,
        }}
      >
        {aiInsights.map((insight, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                bgcolor: "#0284c7",
              }}
            />
            <Typography variant="body2" sx={{ color: "#0c4a6e" }}>
              {insight}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default function CoursesPage() {
  const [courseData, setCourseData] = useState(mockCourseData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All Categories",
    level: "All Levels",
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

  const filteredCourses = useMemo(() => {
    return courseData.filter((course) => {
      const matchesSearch =
        searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.institute.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filters.category === "All Categories" ||
        course.category === filters.category;

      const matchesLevel =
        filters.level === "All Levels" || course.level === filters.level;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, filters]);

  const featuredCourses = courseData.filter((course) => course.featured);
  const topCourses = courseData.filter((course) => course.top);
  const trendingCourses = courseData.filter((course) => course.trending);

  const showSearchResults =
    searchQuery ||
    filters.category !== "All Categories" ||
    filters.level !== "All Levels";

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

  return (
    <Box
      sx={{
        py: 6,
        px: 3,
        background: "linear-gradient(to bottom right, #f9fafb, #f3f4f6)",
      }}
    >
      {/* Heading Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ color: "#1e1b4b", mb: 1.5, letterSpacing: "0.5px" }}
        >
          Explore Our Courses
        </Typography>
        <Box
          sx={{
            width: 100,
            height: 5,
            borderRadius: 3,
            mx: "auto",
            mb: 3,
            background: "linear-gradient(90deg, #4f46e5, #2563eb)",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: "#4b5563",
            maxWidth: 700,
            mx: "auto",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          Unlock your potential with our{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(90deg, #6366f1, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 600,
            }}
          >
            AI-powered course discovery
          </Box>{" "}
          — find the perfect learning path with intelligent recommendations and
          smart search.
        </Typography>
      </Box>
      <Box sx={{ width: 1000, mb: 6, mx: "auto" }}>
        <AISearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSuggestionClick={handleSuggestionClick}
        />
      </Box>

      {/* Search & Filter */}
      <Box sx={{ mb: 6, mx: "auto" }}>
        {/* AI Search */}

        {/* AI Recommendations - Show when no active search */}
        {!showSearchResults && (
          <AIRecommendations
            courses={courseData}
            userBehavior={userBehavior}
            userProfile={userProfile}
          />
        )}

        {showSearchResults && (
          <Box className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <Box>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </Box>

            <Box>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Level
              </label>
              <select
                value={filters.level}
                onChange={(e) =>
                  setFilters({ ...filters, level: e.target.value })
                }
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </Box>

            <Box className="flex items-center gap-2 text-slate-600 mt-2 md:mt-0">
              <Filter className="w-5 h-5 text-indigo-600" />
              <span>
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {filteredCourses.length}
                </span>{" "}
                {filteredCourses.length === 1 ? "course" : "courses"}
              </span>
            </Box>
          </Box>
        )}

        {/* AI Smart Filters */}
        {showSearchResults && filteredCourses.length > 0 && (
          <AISmartFilters
            courses={filteredCourses}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </Box>

      {/* Courses Grid */}
      {showSearchResults ? (
        filteredCourses.length > 0 ? (
          <CourseCardComponent
            courses={filteredCourses}
            showAIFeatures={true}
            userProfile={userProfile}
          />
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
        )
      ) : (
        <>
          {/* Featured Courses */}
          <Box sx={{ mb: 6 }}>
            <Box
              sx={{
                display: "flex",
                width: 1250,
                mx: "auto",
                alignItems: "center",
                gap: 2,
                mb: 4,
              }}
            >
              <Award style={{ width: 28, height: 28, color: "#7c3aed" }} />
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: "#1e1b4b" }}
              >
                Featured Courses
              </Typography>
            </Box>
            <CourseCardComponent courses={featuredCourses} />
          </Box>

          {/* Top Courses */}
          <Box sx={{ mb: 6 }}>
            <Box
              sx={{
                display: "flex",
                width: 1250,
                mx: "auto",
                alignItems: "center",
                gap: 2,
                mb: 4,
              }}
            >
              <TrendingUp style={{ width: 28, height: 28, color: "#059669" }} />
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: "#1e1b4b" }}
              >
                Trending Now
              </Typography>
            </Box>
            <CourseCardComponent courses={trendingCourses} />
          </Box>

          {/* All Courses */}
          <Box>
            <Box
              sx={{
                display: "flex",
                width: 1250,
                mx: "auto",
                alignItems: "center",
                gap: 2,
                mb: 4,
              }}
            >
              {" "}
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: "#1e1b4b", mb: 4 }}
              >
                All Courses
              </Typography>
            </Box>

            <CourseCardComponent courses={courseData} />
          </Box>
        </>
      )}
    </Box>
  );
}
