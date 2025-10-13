import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Container,
  Paper,
  Typography,
  Chip,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Slider,
  Rating,
} from "@mui/material";
import { School, TrendingUp, NewReleases, Whatshot } from "@mui/icons-material";
import UniversityCardComponent from "../../components/card/UniversityCardComponent";

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
    featured: true,
    popular: true,
    category: "Technology & Engineering",
    price: 199,
    discountPrice: 89,
    instructor: "Dr. Sarah Johnson",
    language: "English",
    subtitles: true,
    level: "All Levels",
    duration: "12 weeks",
    whatYouLearn: [
      "Advanced programming concepts",
      "Machine learning fundamentals",
      "Software architecture",
      "Project management",
    ],
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
    featured: true,
    popular: true,
    category: "Science & Technology",
    price: 249,
    discountPrice: 99,
    instructor: "Prof. Michael Chen",
    language: "English",
    subtitles: true,
    level: "Intermediate",
    duration: "10 weeks",
    whatYouLearn: [
      "Data science methodologies",
      "Statistical analysis",
      "Research techniques",
      "Scientific computing",
    ],
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
    featured: false,
    popular: true,
    category: "Business & Arts",
    price: 179,
    discountPrice: 79,
    instructor: "Dr. Emily Rodriguez",
    language: "English",
    subtitles: true,
    level: "Beginner",
    duration: "15 weeks",
    whatYouLearn: [
      "Business fundamentals",
      "Leadership skills",
      "Economic principles",
      "Communication strategies",
    ],
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
    featured: true,
    popular: false,
    category: "Social Sciences",
    price: 169,
    discountPrice: 69,
    instructor: "Prof. David Kim",
    language: "English",
    subtitles: true,
    level: "All Levels",
    duration: "8 weeks",
    whatYouLearn: [
      "Social research methods",
      "Data analysis",
      "Policy development",
      "Community engagement",
    ],
  },
];

const categories = [
  "All Categories",
  "Technology & Engineering",
  "Science & Technology",
  "Business & Arts",
  "Social Sciences",
  "Health & Medicine",
  "Arts & Humanities",
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const durations = ["Any", "0-4 weeks", "4-8 weeks", "8-12 weeks", "12+ weeks"];
const features = ["Subtitles", "Certificates", "Exercises", "Downloadable"];

export default function UniversityDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUniversities, setFilteredUniversities] =
    useState(mockUniversities);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedDuration, setSelectedDuration] = useState("Any");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [rating, setRating] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    filterResults();
  }, [
    searchQuery,
    selectedCategory,
    selectedLevel,
    selectedDuration,
    priceRange,
    rating,
  ]);

  const filterResults = () => {
    let filtered = mockUniversities.filter((uni) => {
      const matchesSearch =
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        uni.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All Levels" || uni.level === selectedLevel;
      const matchesPrice =
        uni.discountPrice >= priceRange[0] &&
        uni.discountPrice <= priceRange[1];
      const matchesRating = uni.rating >= rating;

      let matchesDuration = true;
      if (selectedDuration !== "Any") {
        const durationWeeks = parseInt(uni.duration);
        if (selectedDuration === "0-4 weeks")
          matchesDuration = durationWeeks <= 4;
        else if (selectedDuration === "4-8 weeks")
          matchesDuration = durationWeeks > 4 && durationWeeks <= 8;
        else if (selectedDuration === "8-12 weeks")
          matchesDuration = durationWeeks > 8 && durationWeeks <= 12;
        else if (selectedDuration === "12+ weeks")
          matchesDuration = durationWeeks > 12;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesPrice &&
        matchesRating &&
        matchesDuration
      );
    });

    setFilteredUniversities(filtered);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(168, 85, 247, 0.02) 100%),
          radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.03) 0%, transparent 50%),
          #ffffff
        `,
        position: "relative",
      }}
    >
      {/* Header */}

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ py: 4 }}>
          {/* Hero Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              background: "linear-gradient(135deg, #5624d0 0%, #2d3b8f 100%)",
              color: "white",
              borderRadius: 2,
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                  Learning that gets you
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ opacity: 0.9, mb: 3, fontWeight: 300 }}
                >
                  Skills for your present and your future. Get started with us.
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Chip
                    icon={<Whatshot color="white" />}
                    label="Trending Courses"
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  />
                  <Chip
                    icon={<NewReleases color="white" />}
                    label="New Programs"
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  />
                  <Chip
                    icon={<TrendingUp color="white" />}
                    label="Career Paths"
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Results Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#1e3a8a",
                mb: 2,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                position: "relative",
                "&::after": {
                  content: '""',
                  display: "block",
                  width: 60,
                  height: 3,
                  background:
                    "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: 2,
                  mt: 0.5,
                },
              }}
            >
              {selectedCategory === "All Categories"
                ? "Featured Universities"
                : selectedCategory}
            </Typography>
            {/* <Typography variant="body1" color="text.secondary">
              {filteredUniversities.length} results
            </Typography> */}
          </Box>

          {/* Courses Grid */}
          <Grid container spacing={3}>
            {filteredUniversities.map((course) => (
              <Grid ey={course.id}>
                <UniversityCardComponent course={course} wishlist={[]} />
              </Grid>
            ))}
          </Grid>

          {/* No Results */}
          {filteredUniversities.length === 0 && (
            <Paper
              sx={{
                p: 8,
                textAlign: "center",
                borderRadius: 2,
                background: "rgba(86, 36, 208, 0.02)",
              }}
            >
              <School
                sx={{
                  fontSize: 64,
                  color: "text.secondary",
                  mb: 2,
                  opacity: 0.5,
                }}
              />
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No courses found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search filters or browse our categories
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#5624d0" }}
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                  setSelectedLevel("All Levels");
                  setSelectedDuration("Any");
                  setPriceRange([0, 300]);
                  setRating(0);
                }}
              >
                Clear all filters
              </Button>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: 300, sm: 350 },
            p: 3,
          },
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
          Filters
        </Typography>

        {/* Category Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Category
          </Typography>
          <List dense>
            {categories.map((category) => (
              <ListItem
                key={category}
                button
                selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Level Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Level
          </Typography>
          <List dense>
            {levels.map((level) => (
              <ListItem
                key={level}
                button
                selected={selectedLevel === level}
                onClick={() => setSelectedLevel(level)}
              >
                <ListItemText primary={level} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Duration Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Duration
          </Typography>
          <List dense>
            {durations.map((duration) => (
              <ListItem
                key={duration}
                button
                selected={selectedDuration === duration}
                onClick={() => setSelectedDuration(duration)}
              >
                <ListItemText primary={duration} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Price Range */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </Typography>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={300}
            sx={{ color: "#5624d0" }}
          />
        </Box>

        {/* Rating Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Minimum Rating
          </Typography>
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue || 0)}
            precision={0.5}
            size="large"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {rating > 0 ? `${rating}+ stars` : "Any rating"}
          </Typography>
        </Box>

        {/* Clear Filters */}
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            setSelectedCategory("All Categories");
            setSelectedLevel("All Levels");
            setSelectedDuration("Any");
            setPriceRange([0, 300]);
            setRating(0);
          }}
          sx={{ mt: 2 }}
        >
          Clear All Filters
        </Button>
      </Drawer>
    </Box>
  );
}
