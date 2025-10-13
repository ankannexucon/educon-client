import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
  LinearProgress,
} from "@mui/material";

const courses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    instructor: "Dr. Sarah Johnson",
    duration: "12 weeks",
    progress: 80,
  },
  {
    id: 2,
    title: "Advanced Database Systems",
    instructor: "Prof. Alan Walker",
    duration: "10 weeks",
    progress: 45,
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Priya Mehta",
    duration: "14 weeks",
    progress: 65,
  },
  {
    id: 4,
    title: "Web Development with React",
    instructor: "Mr. David Kim",
    duration: "8 weeks",
    progress: 100,
  },
];

export default function UserCourses() {
  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid key={course.id}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: 4,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: 8,
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1e293b", mb: 1 }}
              >
                {course.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Instructor: {course.instructor}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Duration: {course.duration}
              </Typography>

              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "#475569", mb: 1 }}
              >
                Progress: {course.progress}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={course.progress}
                sx={{
                  height: 8,
                  borderRadius: 2,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      course.progress === 100 ? "#22c55e" : "#3b82f6",
                  },
                }}
              />
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  backgroundColor: "#2563eb",
                  "&:hover": { backgroundColor: "#1d4ed8" },
                }}
              >
                {course.progress === 100 ? "Completed" : "Continue"}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
