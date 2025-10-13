import { Box, Typography } from "@mui/material";
import React from "react";
import CourseCardComponent from "../../components/course/CourseCardComponent";

export default function CoursesPage() {
  return (
    <Box sx={{ py: 6, px: 3, textAlign: "center", backgroundColor: "#f9fafb" }}>
      {/* Heading Section */}
      <Box sx={{ mb: 6 }}>
        {/* Main Title */}
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            color: "#1e1b4b",
            mb: 1.5,
            letterSpacing: "0.5px",
          }}
        >
          Explore Our Courses
        </Typography>

        {/* Gradient Accent Line (below heading) */}
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

        {/* Subheading */}
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
            industry-aligned
          </Box>{" "}
          courses designed to help you master in-demand skills — from{" "}
          <Box
            component="span"
            sx={{ fontWeight: 600, color: "#111827" }}
          >
            technology
          </Box>{" "}
          to{" "}
          <Box
            component="span"
            sx={{ fontWeight: 600, color: "#111827" }}
          >
            business
          </Box>{" "}
          and beyond.
        </Typography>
      </Box>

      {/* Courses Grid */}
      <CourseCardComponent />
    </Box>
  );
}
