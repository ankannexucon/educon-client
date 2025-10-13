import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
} from "lucide-react";
import { Box, Typography, Avatar, Grid, Paper } from "@mui/material";

export default function StudentInfoComponent() {
  const student = {
    name: "Alex Johnson",
    email: "alex.johnson@student.edu",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    enrollmentDate: "September 2023",
    studentId: "STU-2023-4521",
    program: "Computer Science",
    year: "2nd Year",
    gpa: "3.85",
  };

  const infoItems = [
    {
      icon: <GraduationCap color="#2563eb" />,
      label: "Program",
      value: student.program,
      bg: "#dbeafe",
    },
    {
      icon: <Calendar color="#9333ea" />,
      label: "Year",
      value: student.year,
      bg: "#e9d5ff",
    },
    {
      icon: <Award color="#059669" />,
      label: "GPA",
      value: student.gpa,
      bg: "#d1fae5",
    },
    {
      icon: <Calendar color="#ea580c" />,
      label: "Enrolled",
      value: student.enrollmentDate,
      bg: "#fed7aa",
    },
  ];

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(to right, #2563eb, #4f46e5)",
            p: 4,
            color: "white",
          }}
        >
          <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
            <Avatar
              src={student.avatar}
              alt={student.name}
              sx={{
                width: 96,
                height: 96,
                border: "4px solid white",
                boxShadow: 3,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight="bold">
                {student.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                {student.studentId}
              </Typography>

              <Box
                sx={{ display: "flex", flexWrap: "wrap", gap: 2, fontSize: 14 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Mail size={16} />
                  <Typography variant="body2">{student.email}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone size={16} />
                  <Typography variant="body2">{student.phone}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MapPin size={16} />
                  <Typography variant="body2">{student.location}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Academic Details */}
        <Box sx={{ p: 4, backgroundColor: "#f9fafb" }}>
          <Grid container spacing={3}>
            {infoItems.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.label}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 48,
                      height: 48,
                      borderRadius: 1,
                      backgroundColor: item.bg,
                      mb: 1,
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
                      mb: 0.5,
                      display: "block",
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
