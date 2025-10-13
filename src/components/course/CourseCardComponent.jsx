import React from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { BookOpen, Calendar, User } from "lucide-react";

const courses = [
    {
      title: "B.Sc. in Computer Science",
      institute: "University of NY",
      duration: "3 Years",
      enrolled: "320 Students",
      price: "$12,000",
      image: "https://picsum.photos/400/250?random=1",
    },
    {
      title: "M.Sc. in Data Science",
      institute: "Tech University",
      duration: "2 Years",
      enrolled: "150 Students",
      price: "$15,000",
      image: "https://picsum.photos/400/250?random=2",
    },
    {
      title: "MBA in Marketing",
      institute: "Global Business School",
      duration: "2 Years",
      enrolled: "200 Students",
      price: "$18,000",
      image: "https://picsum.photos/400/250?random=3",
    },
    {
      title: "BBA in Management",
      institute: "City College",
      duration: "3 Years",
      enrolled: "180 Students",
      price: "$10,500",
      image: "https://picsum.photos/400/250?random=4",
    },
    {
      title: "React Advanced",
      institute: "Code Academy",
      duration: "8 Weeks",
      enrolled: "120 Students",
      price: "$500",
      image: "https://picsum.photos/400/250?random=5",
    },
    {
      title: "Tailwind CSS Mastery",
      institute: "Design School",
      duration: "6 Weeks",
      enrolled: "95 Students",
      price: "$400",
      image: "https://picsum.photos/400/250?random=6",
    },
    {
      title: "Basics of Node.js",
      institute: "Code Academy",
      duration: "4 Weeks",
      enrolled: "80 Students",
      price: "$350",
      image: "https://picsum.photos/400/250?random=7",
    },
    {
      title: "Python for Data Analysis",
      institute: "Data School",
      duration: "12 Weeks",
      enrolled: "140 Students",
      price: "$700",
      image: "https://picsum.photos/400/250?random=8",
    },
    {
      title: "UI/UX Design Fundamentals",
      institute: "Creative Institute",
      duration: "10 Weeks",
      enrolled: "100 Students",
      price: "$600",
      image: "https://picsum.photos/400/250?random=9",
    },
    {
      title: "Fullstack Web Development",
      institute: "Tech Hub",
      duration: "16 Weeks",
      enrolled: "250 Students",
      price: "$1,200",
      image: "https://picsum.photos/400/250?random=10",
    },
    {
        title: "Digital Marketing Essentials",
        institute: "Marketing Academy",
        duration: "8 Weeks",
        enrolled: "130 Students",
        price: "$450",
        image: "https://picsum.photos/400/250?random=11",
      },
      {
        title: "Cybersecurity Basics",
        institute: "Security Institute",
        duration: "10 Weeks",
        enrolled: "90 Students",
        price: "$500",
        image: "https://picsum.photos/400/250?random=12",
      },
  ];
  

export default function CourseCardComponent() {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={course.title}
            sx={{ display: "flex" }}
          >
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "100%", // ensures all cards stretch to fill the grid item
              }}
            >
              {/* Course Image */}
              <Box
                component="img"
                src={course.image}
                alt={course.title}
                sx={{ width: "100%", height: 180, objectFit: "cover" }}
              />

              {/* Course Info */}
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "#f9fafb",
                  flex: 1, // allows info section to stretch
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {course.title}
                  </Typography>

                  <Grid container spacing={1}>
                    {[
                      {
                        icon: <BookOpen color="#2563eb" />,
                        label: "Duration",
                        value: course.duration,
                        bg: "#dbeafe",
                      },
                      {
                        icon: <User color="#059669" />,
                        label: "Enrolled",
                        value: course.enrolled,
                        bg: "#d1fae5",
                      },
                      {
                        icon: <Calendar color="#9333ea" />,
                        label: "Institute",
                        value: course.institute,
                        bg: "#e9d5ff",
                      },
                    ].map((item) => (
                      <Grid item xs={4} key={item.label}>
                        <Box sx={{ textAlign: "center" }}>
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 36,
                              height: 36,
                              borderRadius: 1,
                              backgroundColor: item.bg,
                              mb: 0.5,
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#6b7280",
                              textTransform: "uppercase",
                              letterSpacing: 0.5,
                              display: "block",
                            }}
                          >
                            {item.label}
                          </Typography>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {item.value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Price & Button */}
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mb: 1, color: "#4f46e5" }}
                  >
                    {course.price}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(to right, #2563eb, #4f46e5)",
                      color: "white",
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Enroll Now
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
