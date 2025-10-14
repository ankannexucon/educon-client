import React, { useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { Search, Filter } from "lucide-react";
import CourseCardComponent from "../../components/course/CourseCardComponent";

// Dummy Course Data
const courseData = [
  {
    title: "B.Sc. in Computer Science",
    institute: "University of NY",
    duration: "3 Years",
    enrolled: "320 Students",
    price: "$12,000",
    image: "https://picsum.photos/400/250?random=1",
    category: "Technology",
    level: "Beginner",
    description:
      "Learn the fundamentals of computer science, programming, and problem-solving skills.",
  },
  {
    title: "M.Sc. in Data Science",
    institute: "Tech University",
    duration: "2 Years",
    enrolled: "150 Students",
    price: "$15,000",
    image: "https://picsum.photos/400/250?random=2",
    category: "Technology",
    level: "Intermediate",
    description:
      "Gain expertise in data analysis, machine learning, and predictive modeling techniques.",
  },
  {
    title: "MBA in Marketing",
    institute: "Global Business School",
    duration: "2 Years",
    enrolled: "200 Students",
    price: "$18,000",
    image: "https://picsum.photos/400/250?random=3",
    category: "Business",
    level: "Intermediate",
    description:
      "Develop strategic marketing skills and learn how to grow businesses effectively.",
  },
  {
    title: "BBA in Management",
    institute: "City College",
    duration: "3 Years",
    enrolled: "180 Students",
    price: "$10,500",
    image: "https://picsum.photos/400/250?random=4",
    category: "Business",
    level: "Beginner",
    description:
      "Understand the basics of business management, leadership, and organizational skills.",
  },
  {
    title: "React Advanced",
    institute: "Code Academy",
    duration: "8 Weeks",
    enrolled: "120 Students",
    price: "$500",
    image: "https://picsum.photos/400/250?random=5",
    category: "Technology",
    level: "Advanced",
    description:
      "Master advanced React concepts, state management, hooks, and component optimization.",
  },
  {
    title: "Tailwind CSS Mastery",
    institute: "Design School",
    duration: "6 Weeks",
    enrolled: "95 Students",
    price: "$400",
    image: "https://picsum.photos/400/250?random=6",
    category: "Design",
    level: "Intermediate",
    description:
      "Learn how to build responsive, modern, and visually stunning UIs using Tailwind CSS.",
  },
  {
    title: "Python for Data Analysis",
    institute: "Data School",
    duration: "12 Weeks",
    enrolled: "140 Students",
    price: "$700",
    image: "https://picsum.photos/400/250?random=8",
    category: "Technology",
    level: "Intermediate",
    description:
      "Analyze data efficiently with Python using libraries like Pandas, NumPy, and Matplotlib.",
  },
  {
    title: "Fullstack Web Development",
    institute: "Tech Hub",
    duration: "16 Weeks",
    enrolled: "250 Students",
    price: "$1,200",
    image: "https://picsum.photos/400/250?random=9",
    category: "Technology",
    level: "Advanced",
    description:
      "Learn front-end and back-end development with React, Node.js, and databases to build full web applications.",
  },
  {
    title: "Digital Marketing Essentials",
    institute: "Marketing Academy",
    duration: "8 Weeks",
    enrolled: "130 Students",
    price: "$450",
    image: "https://picsum.photos/400/250?random=10",
    category: "Business",
    level: "Beginner",
    description:
      "Understand SEO, social media marketing, content strategies, and analytics to grow a brand online.",
  },
  {
    title: "UI/UX Design Fundamentals",
    institute: "Creative Institute",
    duration: "10 Weeks",
    enrolled: "100 Students",
    price: "$600",
    image: "https://picsum.photos/400/250?random=11",
    category: "Design",
    level: "Beginner",
    description:
      "Master the principles of user interface and user experience design to create intuitive digital products.",
  },
  {
    title: "Python for Machine Learning",
    institute: "AI Academy",
    duration: "12 Weeks",
    enrolled: "90 Students",
    price: "$800",
    image: "https://picsum.photos/400/250?random=12",
    category: "Technology",
    level: "Intermediate",
    description:
      "Apply Python programming to implement machine learning algorithms, models, and data pipelines.",
  },
  {
    title: "Financial Analysis & Modeling",
    institute: "Finance School",
    duration: "6 Weeks",
    enrolled: "75 Students",
    price: "$500",
    image: "https://picsum.photos/400/250?random=13",
    category: "Business",
    level: "Intermediate",
    description:
      "Learn to analyze financial statements, build models, and make data-driven investment decisions.",
  },
];

const categories = ["All Categories", "Technology", "Business", "Design"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ category: "All Categories", level: "All Levels" });

  const filteredCourses = useMemo(() => {
    return courseData.filter((course) => {
      const matchesSearch =
        searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.institute.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filters.category === "All Categories" || course.category === filters.category;

      const matchesLevel =
        filters.level === "All Levels" || course.level === filters.level;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, filters]);

  const showSearchResults = searchQuery || filters.category !== "All Categories" || filters.level !== "All Levels";

  return (
    <Box sx={{ py: 6, px: 3, background: "linear-gradient(to bottom right, #f9fafb, #f3f4f6)" }}>
      {/* Heading Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" fontWeight="bold" sx={{ color: "#1e1b4b", mb: 1.5, letterSpacing: "0.5px" }}>
          Explore Our Courses
        </Typography>
        <Box sx={{ width: 100, height: 5, borderRadius: 3, mx: "auto", mb: 3, background: "linear-gradient(90deg, #4f46e5, #2563eb)" }} />
        <Typography variant="h6" sx={{ color: "#4b5563", maxWidth: 700, mx: "auto", lineHeight: 1.7, fontWeight: 400 }}>
          Unlock your potential with our{" "}
          <Box component="span" sx={{ background: "linear-gradient(90deg, #6366f1, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 600 }}>
            industry-aligned
          </Box>{" "}
          courses designed to help you master in-demand skills — from{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "#111827" }}>technology</Box> to{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "#111827" }}>business</Box> and beyond.
        </Typography>
      </Box>

      {/* Search & Filter */}
      <Box sx={{ mb: 6, maxWidth: 800, mx: "auto" }}>
        <Box sx={{ position: "relative", mb: 4 }}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses or institutes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg"
          />
        </Box>

        {showSearchResults && (
          <Box className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <Box>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </Box>

            <Box>
              <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
              <select
                value={filters.level}
                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </Box>

            <Box className="flex items-center gap-2 text-slate-600 mt-2 md:mt-0">
              <Filter className="w-5 h-5 text-indigo-600" />
              <span>
                Showing <span className="font-semibold text-slate-900">{filteredCourses.length}</span>{" "}
                {filteredCourses.length === 1 ? "course" : "courses"}
              </span>
            </Box>
          </Box>
        )}
      </Box>

      {/* Courses Grid */}
      {showSearchResults ? (
        filteredCourses.length > 0 ? (
          <CourseCardComponent courses={filteredCourses} />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No courses found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search or filters
            </p>
          </div>
        )
      ) : (
        <CourseCardComponent courses={courseData} />
      )}
    </Box>
  );
}

