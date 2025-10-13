import React from "react";
import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import {
  CalendarMonth as CalendarIcon,
  School as GraduationCapIcon,
  EmojiEvents as AwardIcon,
} from "@mui/icons-material";

export default function StudentAcademicInfo() {
  const student = {
    program: "Computer Science",
    year: "2nd Year",
    gpa: "3.85",
    enrollmentDate: "September 2023",
  };

  const infoItems = [
    { icon: <GraduationCapIcon />, label: "Program", value: student.program },
    { icon: <CalendarIcon />, label: "Year", value: student.year },
    { icon: <AwardIcon />, label: "GPA", value: student.gpa },
    {
      icon: <CalendarIcon />,
      label: "Enrolled",
      value: student.enrollmentDate,
    },
  ];

  return (
    <Card sx={{ width: "100%", borderRadius: 4, boxShadow: 4 }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
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
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 2,
              mt: 0.5,
            },
          }}
        >
          Academic Information
        </Typography>

        <Grid container spacing={2}>
          {infoItems.map((item, idx) => (
            <Grid>
              <Paper
                elevation={0}
                sx={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 3,
                  textAlign: "center",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#f1f5f9",
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    mx: "auto",
                    mb: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "primary.main",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#64748b",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    display: "block",
                    mb: 0.5,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: "#1e293b" }}
                >
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
