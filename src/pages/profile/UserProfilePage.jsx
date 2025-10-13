import React from "react";
import { Box, Grid, Container, Paper, Fade, Typography } from "@mui/material";
import StudentInfoComponent from "../../components/profile/StudentInfoComponent";
import StudentAcademicInfo from "../../components/profile/StudentAcademicInfo";
import UserCourses from "../../components/profile/UserCourses";

export default function UserProfile() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%),
          radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
          #ffffff
        `,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "300px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          opacity: 0.1,
          zIndex: 0,
          borderRadius: "0 0 50% 50% / 0 0 20px 20px",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ py: { xs: 3, md: 6 } }}>
          {/* Profile Header Section */}
          <Fade in timeout={600}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              sx={{
                mb: { xs: 3, md: 4 },
                width: "100%",
                backgroundColor: "white",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              {/* Student Info Card */}
              <Grid sx={{ width: { xs: "100%", lg: "max-content" } }}>
                <Paper
                  elevation={0}
                  sx={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <StudentInfoComponent />
                </Paper>
              </Grid>

              {/* Academic Info Card */}
              <Grid>
                <Paper
                  elevation={0}
                  sx={{
                    width: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <StudentAcademicInfo />
                </Paper>
              </Grid>
            </Grid>
          </Fade>

          {/* Courses Section */}
          <Fade in timeout={800}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                overflow: "hidden",
                background: "rgba(59, 130, 246, 0.1)",
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
                Your Courses
              </Typography>

              <UserCourses />
            </Paper>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
}
