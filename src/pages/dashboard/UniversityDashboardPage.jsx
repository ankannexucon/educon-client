import React, { useState, useMemo } from "react";
import { Search, Star, TrendingUp, Award, Filter } from "lucide-react";
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

export default function UniversityDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All Categories",
    level: "All Levels",
    minRating: 0,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="sm:w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Discover Universities
          </h1>
          <p className="text-slate-600">
            Explore top institutions and find your perfect learning path
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search universities, categories, locations, or programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg"
            />
          </div>
        </div>

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
                  <UniversityCard key={uni.id} uni={uni} />
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
                  Try adjusting your search or filters
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
                  <UniversityCard
                    key={uni.id}
                    uni={uni}
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
                  <UniversityCard
                    key={uni.id}
                    uni={uni}
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
                  <UniversityCard
                    key={uni.id}
                    uni={uni}
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
