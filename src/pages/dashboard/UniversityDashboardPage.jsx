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
  MessageCircle,
} from "lucide-react";
import UniversityCard from "../../components/card/UniversityCard";

const mockUniversities = [
  {
    id: 1,
    name: "Stanford University",
    location: "Stanford, CA",
    rating: 4.8,
    reviews: 12450,
    students: 17000,
    courses: 200,
    image:
      "https://media.cnn.com/api/v1/images/stellar/prod/220504131533-stanford-campus-2020-file.jpg?c=original",
    description:
      "A private research university known for entrepreneurship and innovation in Silicon Valley.",
    category: "Technology & Engineering",
    price: 199,
    discountPrice: 89,
    level: "All Levels",
    duration: "12 weeks",
    featured: true,
    trending: true,
  },
  {
    id: 2,
    name: "MIT - Massachusetts Institute of Technology",
    location: "Cambridge, MA",
    rating: 4.9,
    reviews: 8950,
    students: 12000,
    courses: 150,
    image:
      "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/201704/mit-supply-chain-management-00_0.jpg?itok=8RWKirTY",
    description:
      "World-renowned for STEM education, research, and technological innovation.",
    category: "Science & Technology",
    price: 249,
    discountPrice: 99,
    level: "Intermediate",
    duration: "10 weeks",
    featured: true,
    top: true,
  },
  {
    id: 3,
    name: "Harvard University",
    location: "Cambridge, MA",
    rating: 4.7,
    reviews: 15600,
    students: 21000,
    courses: 180,
    image:
      "https://www.currentaffairs.org/hubfs/Imported_Blog_Media/umass-1024x646-1.jpg",
    description:
      "Ivy League university with comprehensive programs in business, law, and arts.",
    category: "Business & Arts",
    price: 179,
    discountPrice: 79,
    level: "Beginner",
    duration: "15 weeks",
    top: true,
  },
  {
    id: 4,
    name: "Berkeley University",
    location: "Berkeley, CA",
    rating: 4.6,
    reviews: 7800,
    students: 14000,
    courses: 120,
    image:
      "https://www.tclf.org/sites/default/files/thumbnails/image/CA_Berkeley_UniversityOfCaliforniaAtBerkeley_byCharlieNguyen-Flickr_2008_001_Sig.jpg",
    description:
      "Public research university known for entrepreneurship and social impact.",
    category: "Social Sciences",
    price: 169,
    discountPrice: 69,
    level: "All Levels",
    duration: "8 weeks",
    trending: true,
  },
  {
    id: 5,
    name: "Yale University",
    location: "New Haven, CT",
    rating: 4.8,
    reviews: 11200,
    students: 13500,
    courses: 165,
    image:
      "https://www.currentaffairs.org/hubfs/Imported_Blog_Media/umass-1024x646-1.jpg",
    description:
      "Historic Ivy League institution with strong liberal arts and professional programs.",
    category: "Business & Arts",
    price: 189,
    discountPrice: 85,
    level: "All Levels",
    duration: "14 weeks",
    featured: true,
  },
  {
    id: 6,
    name: "Princeton University",
    location: "Princeton, NJ",
    rating: 4.9,
    reviews: 9800,
    students: 8500,
    courses: 140,
    image:
      "https://media.cnn.com/api/v1/images/stellar/prod/220504131533-stanford-campus-2020-file.jpg?c=original",
    description:
      "Elite research university with exceptional undergraduate education.",
    category: "Science & Technology",
    price: 209,
    discountPrice: 95,
    level: "Advanced",
    duration: "11 weeks",
    top: true,
  },
  {
    id: 7,
    name: "Columbia University",
    location: "New York, NY",
    rating: 4.7,
    reviews: 13400,
    students: 31000,
    courses: 195,
    image:
      "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/201704/mit-supply-chain-management-00_0.jpg?itok=8RWKirTY",
    description:
      "Ivy League university in the heart of Manhattan with diverse academic offerings.",
    category: "Business & Arts",
    price: 199,
    discountPrice: 89,
    level: "Intermediate",
    duration: "13 weeks",
    trending: true,
  },
  {
    id: 8,
    name: "Caltech",
    location: "Pasadena, CA",
    rating: 4.9,
    reviews: 5600,
    students: 2400,
    courses: 85,
    image:
      "https://www.tclf.org/sites/default/files/thumbnails/image/CA_Berkeley_UniversityOfCaliforniaAtBerkeley_byCharlieNguyen-Flickr_2008_001_Sig.jpg",
    description:
      "Small but mighty institution focused on science and engineering excellence.",
    category: "Technology & Engineering",
    price: 229,
    discountPrice: 99,
    level: "Advanced",
    duration: "9 weeks",
    featured: true,
  },
];

const categories = [
  "All Categories",
  "Technology & Engineering",
  "Science & Technology",
  "Business & Arts",
  "Social Sciences",
];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

// AI Search Knowledge Base
const aiSearchKnowledge = {
  engineering: {
    suggestions: [
      "Universities with strong engineering programs in California",
      "Top technology institutes with research facilities",
      "Engineering schools with high placement rates",
      "Universities with mechanical engineering programs",
    ],
    keywords: [
      "engineering",
      "technology",
      "computer science",
      "mechanical",
      "electrical",
      "software",
    ],
  },
  business: {
    suggestions: [
      "Top-rated business schools with high placement rates",
      "Universities with strong entrepreneurship programs",
      "MBA programs with internship opportunities",
      "Business schools with international partnerships",
    ],
    keywords: [
      "business",
      "mba",
      "management",
      "entrepreneurship",
      "marketing",
      "finance",
    ],
  },
  affordable: {
    suggestions: [
      "Most affordable universities with quality education",
      "Universities offering scholarships and financial aid",
      "Budget-friendly institutions with good ratings",
      "Universities with payment plan options",
    ],
    keywords: [
      "affordable",
      "cheap",
      "budget",
      "low cost",
      "scholarship",
      "financial aid",
    ],
  },
  research: {
    suggestions: [
      "Research-focused universities with strong science programs",
      "Institutions with high research output and funding",
      "Universities with PhD programs and research opportunities",
      "Research institutions with laboratory facilities",
    ],
    keywords: [
      "research",
      "science",
      "phd",
      "laboratory",
      "innovation",
      "development",
    ],
  },
  california: {
    suggestions: [
      "Top universities in California with engineering programs",
      "California institutions with technology focus",
      "Universities in Silicon Valley area",
      "California schools with strong computer science",
    ],
    keywords: [
      "california",
      "stanford",
      "berkeley",
      "pasadena",
      "silicon valley",
      "san francisco",
    ],
  },
  newYork: {
    suggestions: [
      "Universities in New York with business programs",
      "New York institutions with arts and culture",
      "Universities in Manhattan area",
      "New York schools with international programs",
    ],
    keywords: ["new york", "ny", "manhattan", "columbia", "nyc"],
  },
  beginner: {
    suggestions: [
      "Universities with beginner-friendly programs",
      "Institutions with introductory level courses",
      "Schools with foundation year programs",
      "Universities with flexible learning paths",
    ],
    keywords: [
      "beginner",
      "introductory",
      "foundation",
      "basic",
      "entry level",
    ],
  },
  advanced: {
    suggestions: [
      "Universities with advanced degree programs",
      "Institutions with master's and PhD programs",
      "Research universities with specialized courses",
      "Schools with professional certification programs",
    ],
    keywords: [
      "advanced",
      "master",
      "phd",
      "professional",
      "specialized",
      "graduate",
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
        "Find universities with strong engineering programs",
        "Top business schools with high placement rates",
        "Affordable universities with quality education",
        "Research-focused institutions with science programs",
        "Universities in California with technology focus",
        "Beginner-friendly programs with flexible learning",
      ];
    }

    // Add some intelligent cross-category suggestions
    if (
      matchedCategories.includes("engineering") &&
      matchedCategories.includes("california")
    ) {
      allSuggestions.add(
        "Top engineering universities in California like Stanford and Caltech"
      );
    }

    if (
      matchedCategories.includes("business") &&
      matchedCategories.includes("newYork")
    ) {
      allSuggestions.add(
        "Leading business schools in New York like Columbia University"
      );
    }

    if (
      matchedCategories.includes("affordable") &&
      matchedCategories.includes("engineering")
    ) {
      allSuggestions.add(
        "Affordable engineering programs with good career outcomes"
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
          placeholder="Ask AI: 'Find universities with strong engineering programs in California...'"
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
const AIMatchScore = ({ university, userProfile }) => {
  const calculateMatchScore = (uni, profile) => {
    let score = 0;

    // Location preference match (30 points max)
    if (profile.preferredLocation) {
      const locationMatch =
        uni.location
          .toLowerCase()
          .includes(profile.preferredLocation.toLowerCase()) ||
        profile.preferredLocation
          .toLowerCase()
          .includes(uni.location.split(",")[0].toLowerCase());
      if (locationMatch) score += 30;
    }

    // Field of study match (35 points max)
    if (profile.fieldOfInterest) {
      const fieldMatch =
        uni.category
          .toLowerCase()
          .includes(profile.fieldOfInterest.toLowerCase()) ||
        uni.description
          .toLowerCase()
          .includes(profile.fieldOfInterest.toLowerCase());
      if (fieldMatch) score += 35;
    }

    // Budget match (20 points max)
    if (profile.maxBudget && uni.discountPrice <= profile.maxBudget) {
      const budgetRatio = uni.discountPrice / profile.maxBudget;
      score += 20 * (1 - budgetRatio); // Higher score for lower price relative to budget
    }

    // Level match (15 points max)
    if (profile.experienceLevel && profile.experienceLevel !== "All Levels") {
      if (uni.level === profile.experienceLevel) score += 15;
    }

    // Rating boost (adjust based on rating)
    score += (uni.rating - 4) * 8; // 0-8 points based on rating above 4.0

    return Math.min(100, Math.max(0, Math.round(score)));
  };

  const matchScore = calculateMatchScore(university, userProfile);

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
const AIRecommendations = ({ universities, userBehavior, userProfile }) => {
  const generateRecommendations = useMemo(() => {
    return universities
      .map((uni) => {
        let relevanceScore = 0;

        // Based on user search history (40 points max)
        if (
          userBehavior.searches &&
          userBehavior.searches.some(
            (search) =>
              uni.name.toLowerCase().includes(search.toLowerCase()) ||
              uni.description.toLowerCase().includes(search.toLowerCase()) ||
              uni.category.toLowerCase().includes(search.toLowerCase())
          )
        ) {
          relevanceScore += 40;
        }

        // Based on viewed universities (30 points max)
        if (
          userBehavior.viewedUniversities &&
          userBehavior.viewedUniversities.includes(uni.id)
        ) {
          relevanceScore += 30;
        }

        // Based on user profile preferences (20 points)
        if (
          userProfile.fieldOfInterest &&
          (uni.category
            .toLowerCase()
            .includes(userProfile.fieldOfInterest.toLowerCase()) ||
            uni.description
              .toLowerCase()
              .includes(userProfile.fieldOfInterest.toLowerCase()))
        ) {
          relevanceScore += 20;
        }

        // Based on budget compatibility (10 points)
        if (
          userProfile.maxBudget &&
          uni.discountPrice <= userProfile.maxBudget
        ) {
          relevanceScore += 10;
        }

        // Rating boost
        relevanceScore += (uni.rating - 4) * 5;

        return { ...uni, relevanceScore };
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 4);
  }, [universities, userBehavior, userProfile]);

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
        {generateRecommendations.map((uni) => (
          <EnhancedUniversityCard
            key={uni.id}
            uni={uni}
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

// Enhanced University Card with AI Features
const EnhancedUniversityCard = ({ uni, userProfile, badge }) => {
  const getAITags = (university) => {
    const tags = [];

    if (university.rating >= 4.8) tags.push("🏆 Top Tier");
    if (university.students > 20000) tags.push("👥 Large Community");
    if (university.discountPrice < 100) tags.push("💰 Great Value");
    if (university.courses > 180) tags.push("📚 Extensive Courses");
    if (university.trending) tags.push("🚀 Growing Popularity");
    if (university.featured) tags.push("⭐ Featured");

    return tags.slice(0, 3); // Limit to 3 tags
  };

  const aiTags = getAITags(uni);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
      <div className="relative">
        <img
          src={uni.image}
          alt={uni.name}
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
        <h3 className="font-bold text-lg mb-2 text-slate-900">{uni.name}</h3>
        <p className="text-slate-600 text-sm mb-3 flex items-center gap-1">
          📍 {uni.location}
        </p>

        <p className="text-slate-700 text-sm mb-3 line-clamp-2">
          {uni.description}
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
        <AIMatchScore university={uni} userProfile={userProfile} />

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-semibold text-slate-900">{uni.rating}</span>
            <span className="text-slate-500 text-sm">
              ({uni.reviews.toLocaleString()})
            </span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-green-600">
              ${uni.discountPrice}
            </span>
            <span className="text-slate-500 line-through text-sm ml-2">
              ${uni.price}
            </span>
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center text-sm text-slate-600">
          <span>👥 {uni.students.toLocaleString()} students</span>
          <span>📚 {uni.courses} courses</span>
        </div>

        <div className="mt-3 flex justify-between items-center text-sm">
          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full">
            {uni.level}
          </span>
          <span className="text-slate-600">{uni.duration}</span>
        </div>
        <button
          className={`mt-2 w-full font-medium py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white`}
        >
          View Courses
        </button>
      </div>
    </div>
  );
};

// AI Smart Filters with Insights
const AISmartFilters = ({ universities, filters, setFilters }) => {
  const [aiInsights, setAiInsights] = useState([]);

  const generateInsights = (unis) => {
    const insights = [];

    if (unis.length === 0) return insights;

    // Price insights
    const prices = unis.map((uni) => uni.discountPrice);
    const avgPrice =
      prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    insights.push(
      `💰 Average price: $${avgPrice.toFixed(
        0
      )} (range: $${minPrice}-$${maxPrice})`
    );

    // Rating insights
    const highRated = unis.filter((uni) => uni.rating >= 4.7).length;
    const total = unis.length;
    insights.push(`⭐ ${highRated} of ${total} universities rated 4.7+ stars`);

    // Category distribution
    const categories = {};
    unis.forEach((uni) => {
      categories[uni.category] = (categories[uni.category] || 0) + 1;
    });

    const topCategory = Object.keys(categories).reduce((a, b) =>
      categories[a] > categories[b] ? a : b
    );
    insights.push(
      `🎯 Most common: ${topCategory} (${categories[topCategory]} options)`
    );

    // Level distribution
    const levels = {};
    unis.forEach((uni) => {
      levels[uni.level] = (levels[uni.level] || 0) + 1;
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
    setAiInsights(generateInsights(universities));
  }, [universities]);

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

export default function EnhancedUniversityDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All Categories",
    level: "All Levels",
    minRating: 0,
  });

  const [userProfile, setUserProfile] = useState({
    preferredLocation: "California",
    fieldOfInterest: "Technology",
    maxBudget: 150,
    experienceLevel: "All Levels",
  });

  const [userBehavior, setUserBehavior] = useState({
    searches: ["engineering", "technology", "stanford"],
    viewedUniversities: [1, 2, 3],
    savedUniversities: [1],
  });

  const filteredUniversities = useMemo(() => {
    if (
      !searchQuery &&
      filters.category === "All Categories" &&
      filters.level === "All Levels" &&
      filters.minRating === 0
    ) {
      return [];
    }

    return mockUniversities.filter((uni) => {
      const matchesSearch =
        searchQuery === "" ||
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filters.category === "All Categories" ||
        uni.category === filters.category;
      const matchesLevel =
        filters.level === "All Levels" || uni.level === filters.level;
      const matchesRating = uni.rating >= filters.minRating;

      return matchesSearch && matchesCategory && matchesLevel && matchesRating;
    });
  }, [searchQuery, filters]);

  const featuredUniversities = mockUniversities.filter((uni) => uni.featured);
  const topUniversities = mockUniversities.filter((uni) => uni.top);
  const trendingUniversities = mockUniversities.filter((uni) => uni.trending);

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
        searches: [...prev.searches, searchQuery.toLowerCase()].slice(-10), // Keep last 10 searches
      }));
    }
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    console.log("AI Suggestion selected:", suggestion);
    // You can add additional logic here for tracking or special handling
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="sm:w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            AI-Powered University Discovery
          </h1>
          <p className="text-slate-600 text-lg">
            Smart recommendations and insights powered by artificial
            intelligence
          </p>
        </div>

        {/* AI Search */}
        <AISearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSuggestionClick={handleSuggestionClick}
        />

        {/* AI Recommendations - Show when no active search */}
        {!showSearchResults && (
          <AIRecommendations
            universities={mockUniversities}
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
              universities={filteredUniversities}
              filters={filters}
              setFilters={setFilters}
            />

            <div className="mt-6">
              <p className="text-slate-600">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {filteredUniversities.length}
                </span>{" "}
                {filteredUniversities.length === 1 ? "result" : "results"}
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
            {filteredUniversities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUniversities.map((uni) => (
                  <EnhancedUniversityCard
                    key={uni.id}
                    uni={uni}
                    userProfile={userProfile}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No universities found
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
                  Featured Universities
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredUniversities.map((uni) => (
                  <EnhancedUniversityCard
                    key={uni.id}
                    uni={uni}
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
                  Top Rated Universities
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topUniversities.map((uni) => (
                  <EnhancedUniversityCard
                    key={uni.id}
                    uni={uni}
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
                {trendingUniversities.map((uni) => (
                  <EnhancedUniversityCard
                    key={uni.id}
                    uni={uni}
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
