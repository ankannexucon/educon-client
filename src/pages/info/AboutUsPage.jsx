import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Avatar,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
  alpha,
} from "@mui/material";
import {
  School,
  Groups,
  TrendingUp,
  Public,
  Diversity3,
  EmojiEvents,
  Star,
  LocationOn,
  CalendarToday,
  Computer,
  ArrowRightAlt,
  PlayCircle,
} from "@mui/icons-material";

export default function AboutUsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const teamMembers = [
    {
      name: "Dr. Nilesh Roy",
      role: "Founder & CEO",
      bio: "Former Oxford University Professor with 15+ years in education technology",
      avatar: "SC",
      expertise: ["EdTech", "Curriculum Design", "Leadership"]
    },
    {
      name: "Ankan Biswas",
      role: "Chief Learning Officer",
      bio: "Education specialist with expertise in curriculum development",
      avatar: "JW",
      expertise: ["Learning Science", "Assessment", "Pedagogy"]
    },
    {
      name: "Subhodeep Polley",
      role: "Head of Product",
      bio: "Product management expert passionate about learning experiences",
      avatar: "PP",
      expertise: ["UX Design", "Product Strategy", "Innovation"]
    },
    {
      name: "Dipanjan Saha",
      role: "Technical Director",
      bio: "Software engineer dedicated to building scalable platforms",
      avatar: "MB",
      expertise: ["Cloud Architecture", "AI/ML", "Scalability"]
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Students", icon: <Groups />, trend: "+25% this year" },
    { number: "500+", label: "Expert Tutors", icon: <School />, trend: "Global network" },
    { number: "95%", label: "Success Rate", icon: <TrendingUp />, trend: "Student satisfaction" },
    { number: "25+", label: "Countries", icon: <Public />, trend: "Worldwide reach" },
  ];

  const values = [
    {
      icon: <Diversity3 />,
      title: "Inclusive Learning",
      description: "Education accessible to everyone, everywhere regardless of background",
      features: ["Scholarship Programs", "Multi-language Support", "Accessibility First"]
    },
    {
      icon: <Star />,
      title: "Quality First",
      description: "Rigorous standards for all courses and instructors",
      features: ["Expert Vetting", "Quality Assurance", "Continuous Improvement"]
    },
    {
      icon: <EmojiEvents />,
      title: "Student Success",
      description: "Your achievements drive us forward every day",
      features: ["Personalized Learning", "Career Support", "Lifetime Access"]
    },
  ];

  const companyInfo = [
    {
      icon: <LocationOn />,
      title: "Headquarters",
      description: "London, UK",
      detail: "Serving students worldwide",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      icon: <CalendarToday />,
      title: "Founded",
      description: "2018",
      detail: "5+ years of excellence",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      icon: <Computer />,
      title: "Platform",
      description: "Online Learning",
      detail: "Cutting-edge technology",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  const milestones = [
    { year: "2018", event: "EduCon Founded", description: "Launched with 10 courses" },
    { year: "2019", event: "10K Students", description: "Reached first major milestone" },
    { year: "2020", event: "Global Expansion", description: "Expanded to 15 countries" },
    { year: "2022", event: "AI Integration", description: "Launched smart learning features" },
    { year: "2023", event: "50K Students", description: "Current active user base" },
  ];

  const SectionHeader = ({ title, subtitle, center = true }) => (
    <Box sx={{ 
      textAlign: center ? "center" : "left", 
      mb: 8,
      position: "relative"
    }}>
      <Typography
        variant="h2"
        fontWeight="bold"
        gutterBottom
        sx={{
          fontSize: { xs: "2.5rem", md: "3.5rem" },
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          position: "relative",
          display: "inline-block",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: center ? "50%" : 0,
            transform: center ? "translateX(-50%)" : "none",
            width: 80,
            height: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: 2,
          }
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ 
            maxWidth: 600, 
            mx: center ? "auto" : 0,
            mt: 3,
            fontSize: "1.2rem",
            fontWeight: 300
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box sx={{ 
      bgcolor: "background.default", 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      backgroundAttachment: "fixed",
    }}>
      {/* Hero Section */}
      <Box sx={{ 
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
        }
      }}>
        <Container maxWidth="lg" sx={{ position: "relative", py: { xs: 8, md: 12 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              {/* <Chip
                icon={<PlayCircle />}
                label="Welcome to EduCon"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                  mb: 4,
                  px: 3,
                  py: 1,
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  backdropFilter: "blur(10px)",
                }}
              /> */}
              <Typography
                variant="h1"
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: { xs: "3rem", md: "4.5rem" },
                  lineHeight: 1.1,
                  mb: 3,
                  background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                About EduCon
              </Typography>
              <Typography
                variant="h4"
                color="text.primary"
                fontWeight="600"
                gutterBottom
                sx={{ 
                  mb: 3,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                UK's Premier Online Learning Platform
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7, fontSize: "1.1rem" }}>
                Transforming education through innovation, technology, and unwavering 
                commitment to student success since 2018.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper
                elevation={8}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)",
                  color: "white",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                  }
                }}
              >
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box sx={{ 
                      width: 4, 
                      height: 40, 
                      background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
                      borderRadius: 2,
                      mr: 2
                    }} />
                    <Typography variant="h4" fontWeight="bold">
                      Our Mission
                    </Typography>
                  </Box>
                  <Typography sx={{ mb: 5, fontSize: "1.1rem", lineHeight: 1.7, opacity: 0.95 }}>
                    To democratize education by breaking down geographical and financial barriers, 
                    providing world-class learning experiences to students across the globe through innovative technology.
                  </Typography>
                  
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box sx={{ 
                      width: 4, 
                      height: 40, 
                      background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
                      borderRadius: 2,
                      mr: 2
                    }} />
                    <Typography variant="h4" fontWeight="bold">
                      Our Vision
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.7, opacity: 0.95 }}>
                    A world where anyone, anywhere can access the education they need to 
                    achieve their dreams, transform their lives, and contribute positively to society.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Company Info Section */}
      <Container maxWidth="lg" sx={{ mb: 12, mt: 4 }}>
        <SectionHeader
          title="Company Information"
          subtitle="Key facts about our organization and global operations"
        />
        <Grid container spacing={4}>
          {companyInfo.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={8}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: info.gradient,
                  },
                  "&:hover": {
                    transform: "translateY(-12px) scale(1.02)",
                    boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 3,
                    "& .MuiSvgIcon-root": { 
                      fontSize: "4rem",
                      background: info.gradient,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                    },
                  }}
                >
                  {info.icon}
                </Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "text.primary" }}>
                  {info.title}
                </Typography>
                <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ 
                  background: info.gradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1
                }}>
                  {info.description}
                </Typography>
                <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ fontWeight: 500 }}>
                  {info.detail}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ 
        py: 8, 
        mb: 12,
        background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
      }}>
        <Container maxWidth="lg">
          <SectionHeader
            title="Our Impact"
            subtitle="The numbers that showcase our global reach and educational effectiveness"
          />
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      background: "rgba(255, 255, 255, 0.9)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: "primary.main",
                      mb: 2,
                      "& .MuiSvgIcon-root": { 
                        fontSize: "3.5rem",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                      },
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h2" fontWeight="bold" gutterBottom sx={{
                    background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" fontWeight="600" gutterBottom sx={{ color: "text.primary" }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="body2" color="primary.main" sx={{ fontWeight: "bold" }}>
                    {stat.trend}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Story & Timeline Section */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <SectionHeader
              title="Our Journey"
              subtitle="The evolution of EduCon from a visionary idea to a global learning platform"
              center={false}
            />
            <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 3 }}>
              Founded in 2018 in the heart of London, EduCon emerged from Dr. Nilesh Roy's vision to 
              revolutionize online education. We recognized the untapped potential of digital learning 
              to bridge educational gaps worldwide.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 3 }}>
              From our humble beginnings with just 10 meticulously crafted courses, we've grown into 
              a comprehensive learning ecosystem that serves passionate learners across 25+ countries, 
              constantly pushing the boundaries of what's possible in online education.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
              Today, EduCon stands as a testament to innovation in education, blending cutting-edge 
              technology with pedagogical excellence to create transformative learning experiences 
              that empower students to achieve their fullest potential.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={8}
              sx={{
                p: 4,
                borderRadius: 4,
                background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.4)",
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                Our Milestones
              </Typography>
              <Box sx={{ position: "relative" }}>
                {milestones.map((milestone, index) => (
                  <Box key={index} sx={{ 
                    display: "flex", 
                    alignItems: "flex-start", 
                    mb: 3,
                    position: "relative",
                    "&::before": index < milestones.length - 1 ? {
                      content: '""',
                      position: "absolute",
                      left: 20,
                      top: 40,
                      bottom: -20,
                      width: 2,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      opacity: 0.3,
                    } : {}
                  }}>
                    <Box sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      flexShrink: 0,
                      mr: 3,
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                    }}>
                      {milestone.year}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {milestone.event}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {milestone.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <SectionHeader
          title="Our Values"
          subtitle="The core principles that shape every decision and innovation at EduCon"
        />
        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={8}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-12px)",
                    boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 3,
                    "& .MuiSvgIcon-root": { 
                      fontSize: "4rem",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                    },
                  }}
                >
                  {value.icon}
                </Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "text.primary" }}>
                  {value.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {value.description}
                </Typography>
                <Box sx={{ width: "100%" }}>
                  {value.features.map((feature, featureIndex) => (
                    <Chip
                      key={featureIndex}
                      label={feature}
                      size="small"
                      sx={{
                        m: 0.5,
                        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                        color: "primary.main",
                        fontWeight: "500",
                        border: "1px solid rgba(102, 126, 234, 0.2)",
                      }}
                    />
                  ))}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ 
        py: 8, 
        mb: 12,
        background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
      }}>
        <Container maxWidth="lg">
          <SectionHeader
            title="Leadership Team"
            subtitle="Meet the visionary professionals driving EduCon's mission to transform education globally"
          />
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={8}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      mb: 3,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontSize: "2rem",
                      fontWeight: "bold",
                      boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                    }}
                  >
                    {member.avatar}
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "text.primary" }}>
                    {member.name}
                  </Typography>
                  <Chip
                    label={member.role}
                    size="small"
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      mb: 2,
                      fontWeight: "bold",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {member.bio}
                  </Typography>
                  <Box sx={{ width: "100%" }}>
                    {member.expertise.map((skill, skillIndex) => (
                      <Chip
                        key={skillIndex}
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={{
                          m: 0.5,
                          fontSize: "0.7rem",
                          borderColor: "primary.main",
                          color: "primary.main",
                        }}
                      />
                    ))}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Commitment Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Paper
          elevation={16}
          sx={{
            p: 6,
            borderRadius: 4,
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)",
            color: "white",
            textAlign: "center",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -100,
              right: -100,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -50,
              left: -50,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
            }
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ 
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              textShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}>
              Our Commitment
            </Typography>
            <Typography variant="h5" sx={{ mb: 6, opacity: 0.95, fontWeight: 300 }}>
              To Students, Education, and Building a Better Future Through Learning
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  p: 3, 
                  borderRadius: 3, 
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Educational Excellence
                  </Typography>
                  <Typography sx={{ opacity: 0.95, lineHeight: 1.7 }}>
                    We maintain the highest standards of educational quality, ensuring 
                    every course and resource meets rigorous academic criteria and 
                    delivers tangible value to our students worldwide.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  p: 3, 
                  borderRadius: 3, 
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Innovation & Technology
                  </Typography>
                  <Typography sx={{ opacity: 0.95, lineHeight: 1.7 }}>
                    We continuously invest in cutting-edge technology and innovative 
                    teaching methodologies to create engaging, effective, and accessible 
                    learning experiences that prepare students for the future.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}