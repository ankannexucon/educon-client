import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Paper,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import {
  Bell,
  User,
  BookOpen,
  GraduationCap,
  Building2,
  FileText,
  Info,
  LogIn,
  UserPlus,
  X,
  ChevronDown,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { ArrowUpRight } from "lucide-react";
import { Crown } from "lucide-react";
import { LogOut } from "lucide-react";

const APP_NAME = "Educon";

const dummyNotifications = [
  {
    id: 1,
    title: "Assignment Deadline",
    message: "Math assignment is due tomorrow.",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    title: "New Grade Posted",
    message: "Your grade for Physics 101 is released.",
    time: "5h ago",
    unread: true,
  },
  {
    id: 3,
    title: "Course Announcement",
    message: "New Web Development module added.",
    time: "1d ago",
    unread: false,
  },
];

// Diwali Fireworks Component
const DiwaliFireworks = () => {
  const [fireworks, setFireworks] = useState([]);

  useEffect(() => {
    const createFirework = () => {
      const colors = [
        "#FFD700",
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7",
      ];
      const newFirework = {
        id: Date.now(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 2,
      };
      setFireworks((prev) => [...prev, newFirework]);

      setTimeout(() => {
        setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
      }, 2000);
    };

    const interval = setInterval(createFirework, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {fireworks.map((firework) => (
        <Box
          key={firework.id}
          sx={{
            position: "absolute",
            left: `${firework.left}%`,
            top: `${firework.top}%`,
            width: firework.size,
            height: firework.size,
            backgroundColor: firework.color,
            borderRadius: "50%",
            animation: "fireworkExplosion 2s ease-out forwards",
            boxShadow: `0 0 10px ${firework.color}, 0 0 20px ${firework.color}`,
          }}
        />
      ))}
    </Box>
  );
};

// Diwali Crackers Animation
const DiwaliCrackers = () => {
  const [crackers, setCrackers] = useState([]);

  useEffect(() => {
    const createCracker = () => {
      const crackerTypes = ["🎇", "✨", "🎆", "💥", "🔥", "⭐"];
      const newCracker = {
        id: Date.now(),
        emoji: crackerTypes[Math.floor(Math.random() * crackerTypes.length)],
        left: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        size: Math.random() * 20 + 15,
      };
      setCrackers((prev) => [...prev, newCracker]);

      setTimeout(() => {
        setCrackers((prev) => prev.filter((c) => c.id !== newCracker.id));
      }, newCracker.duration * 1000);
    };

    const interval = setInterval(createCracker, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9998,
        overflow: "hidden",
      }}
    >
      {crackers.map((cracker) => (
        <Box
          key={cracker.id}
          sx={{
            position: "absolute",
            left: `${cracker.left}%`,
            top: "-50px",
            fontSize: cracker.size,
            animation: `fallDown ${cracker.duration}s linear forwards`,
            textShadow: "0 0 10px rgba(255,215,0,0.8)",
          }}
        >
          {cracker.emoji}
        </Box>
      ))}
    </Box>
  );
};

// Festive Header Banner
const DiwaliBanner = () => {
  const [visible, setVisible] = useState(false);

  if (!visible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor:
          "linear-gradient(45deg, #FF6B35, #FFD166, #06D6A0, #118AB2)",
        background:
          "linear-gradient(45deg, #FF6B35, #FFD166, #06D6A0, #118AB2)",
        color: "white",
        textAlign: "center",
        padding: "8px",
        fontSize: "14px",
        fontWeight: "bold",
        zIndex: 10000,
        animation: "colorChange 3s infinite alternate",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        marginBottom: "14px",
      }}
    >
      🪔 Happy Diwali! May this festival of lights bring joy and prosperity to
      your life! 🪔
      <IconButton
        size="small"
        onClick={() => setVisible(false)}
        sx={{
          color: "white",
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default function NavbarComponent() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState({ more: false, notification: false });
  const [showDiwaliTheme, setShowDiwaliTheme] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/", icon: <BookOpen size={18} /> },
    { name: "Courses", path: "/courses", icon: <GraduationCap size={18} /> },
    { name: "University", path: "/university", icon: <Building2 size={18} /> },
    { name: "Admissions", path: "/admissions", icon: <FileText size={18} /> },
    { name: "About Us", path: "/about", icon: <Info size={18} /> },
  ];

  const unreadCount = dummyNotifications.filter((n) => n.unread).length;
  const moreOptions = {
    agency: [
      {
        name: "University Application",
        path: "/university-application",
        icon: <ArrowUpRight size={18} />,
      },
      {
        name: "Student Application",
        path: "/student-application",
        icon: <ArrowUpRight size={18} />,
      },
      {
        name: "Document Verification",
        path: "/document-verification",
        icon: <ArrowUpRight size={18} />,
      },
    ],
    university: [
      {
        name: "Student Application Overview",
        path: "/university-application-view",
        icon: <ArrowUpRight size={18} />,
      },
    ],
    student: [
      {
        name: "Your Applications",
        path: "/your-application",
        icon: <ArrowUpRight size={18} />,
      },
      {
        name: "Your Scholarships",
        path: "/track-scholarship",
        icon: <ArrowUpRight size={18} />,
      },
      {
        name: "Scholarships",
        path: "/scholarships",
        icon: <ArrowUpRight size={18} />,
      },
    ],
  };

  const toggleDropdown = (key) =>
    setOpen((prev) => ({
      more: false,
      notification: false,
      [key]: !prev[key],
    }));

  return (
    <>
      <Box height={80} /> {/* Spacer */}
      {/* Diwali Animations */}
      {showDiwaliTheme && (
        <>
          <DiwaliBanner />
          <DiwaliFireworks />
          <DiwaliCrackers />
        </>
      )}
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          backgroundColor: showDiwaliTheme
            ? "rgba(255, 215, 0, 0.1)"
            : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: showDiwaliTheme
            ? "2px solid #FFD700"
            : "1px solid #e5e7eb",
          boxShadow: showDiwaliTheme
            ? "0 4px 20px rgba(255, 215, 0, 0.3)"
            : "0 1px 2px rgba(0,0,0,0.04)",
          color: "#111827",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar
          sx={{
            mx: "auto",
            width: "100%",
            px: { xs: 2, sm: 4 },
            height: 80,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            {/* Logo with Diwali theme */}
            <Box
              component="img"
              src="/Logo.png"
              alt="Educon Logo"
              sx={{
                width: 60,
                height: 60,
                objectFit: "cover",
                filter: showDiwaliTheme
                  ? "drop-shadow(0 0 8px #FFD700)"
                  : "none",
                transition: "all 0.3s ease",
              }}
            />
            <Typography
              variant="h5"
              fontWeight={800} // Increased from 700 to 800
              sx={{
                color: showDiwaliTheme ? "#B8860B" : "#111827",
                textDecoration: "none",
<<<<<<< HEAD
                textShadow: showDiwaliTheme ? '0 0 10px rgba(255,215,0,0.3)' : 'none',
                fontSize: { xs: '1.4rem', md: '1.6rem' }, // Slightly larger
=======
                textShadow: showDiwaliTheme
                  ? "0 0 10px rgba(255,215,0,0.3)"
                  : "none",
>>>>>>> 4c5d6065acdbb26de4550210f7f71e01bac31259
              }}
            >
              {APP_NAME}
              {showDiwaliTheme && (
                <Box component="span" sx={{ ml: 1, fontSize: "1.2rem" }}>
                  🪔
                </Box>
              )}
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={NavLink}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  position: "relative",
                  px: 2,
                  py: 1,
<<<<<<< HEAD
                  color: showDiwaliTheme ? '#B8860B' : '#374151',
                  fontWeight: 700, // Increased from 500 to 700
                  fontSize: "1rem", // Slightly larger
=======
                  color: showDiwaliTheme ? "#B8860B" : "#374151",
                  fontWeight: 500,
                  fontSize: "0.95rem",
>>>>>>> 4c5d6065acdbb26de4550210f7f71e01bac31259
                  textTransform: "none",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "0",
                    height: "2px",
                    backgroundColor: showDiwaliTheme ? "#FF6B35" : "#432dd7",
                    transition: "width 0.3s",
                  },
                  "&:hover": {
                    color: showDiwaliTheme ? "#FF6B35" : "#432dd7",
                    backgroundColor: "transparent",
                  },
                  "&:hover::after": { width: "100%" },
                  "&.active::after": { width: "100%" },
                  "&.active": {
                    color: showDiwaliTheme ? "#FF6B35" : "#432dd7",
                    fontWeight: 800, // Even bolder when active
                  },
                }}
              >
                {item.name}
              </Button>
            ))}

            {/* "More" dropdown */}
            <Box sx={{ position: "relative" }}>
              <Button
                onClick={() => toggleDropdown("more")}
                endIcon={<ChevronDown size={18} />}
                sx={{
                  textTransform: "none",
                  fontSize: "1rem", // Slightly larger
                  fontWeight: 700, // Increased from default to 700
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  backgroundColor: open.more ? "#f3f4f6" : "transparent",
                  "&:hover": { backgroundColor: "#f3f4f6" },
                  color: showDiwaliTheme ? "#B8860B" : "#374151",
                  transition: "0.2s",
                }}
              >
                More
              </Button>

              {open.more && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "110%",
                    right: 0,
                    mt: 1,
                    borderRadius: 3,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    border: showDiwaliTheme
                      ? "1px solid #FFD700"
                      : "1px solid #e5e7eb",
                    overflow: "hidden",
                    zIndex: 20,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 2,
                      borderBottom: "1px solid #f3f4f6",
                      backgroundColor: showDiwaliTheme
                        ? "#FFF9C4"
                        : "transparent",
                    }}
                  >
                    <Typography fontWeight={800} fontSize="1.1rem"> {/* Increased from 700 to 800 */}
                      Select Option
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => setOpen({ ...open, more: false })}
                    >
                      <X size={18} />
                    </IconButton>
                  </Box>

                  {moreOptions[user?.role] &&
                    moreOptions[user?.role].map((option, i) => (
                      <MenuItem
                        key={i}
                        onClick={() => setOpen({ ...open, more: false })}
                        sx={{
                          py: 1.2,
                          px: 2,
<<<<<<< HEAD
                          fontWeight: 600, // Increased from 500 to 600
                          "&:hover": { 
                            backgroundColor: showDiwaliTheme ? '#FFE082' : '#f9fafb' 
=======
                          fontWeight: 500,
                          "&:hover": {
                            backgroundColor: showDiwaliTheme
                              ? "#FFE082"
                              : "#f9fafb",
>>>>>>> 4c5d6065acdbb26de4550210f7f71e01bac31259
                          },
                        }}
                      >
                        <Button
                          component={Link}
                          to={option.path}
                          startIcon={option.icon}
                          style={{
                            justifyContent: "flex-start",
                            textAlign: "left",
                            color: "inherit",
                            width: "100%",
                          }}
                        >
                          <Typography fontWeight={700} fontSize="0.95rem"> {/* Increased from 600 to 700 */}
                            {option.name}
                          </Typography>
                        </Button>
                      </MenuItem>
                    ))}
                </Paper>
              )}
            </Box>
          </Box>

          {/* Right Side */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1.5,
            }}
          >
            {/* Diwali Toggle Button */}
            <IconButton
              onClick={() => setShowDiwaliTheme(!showDiwaliTheme)}
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: showDiwaliTheme ? "#FFD700" : "transparent",
                "&:hover": {
                  backgroundColor: showDiwaliTheme ? "#FFC400" : "#f3f4f6",
                },
                transition: "all 0.3s ease",
              }}
            >
              🪔
            </IconButton>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Box sx={{ position: "relative" }}>
                  <IconButton
                    onClick={() => toggleDropdown("notification")}
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      "&:hover": { backgroundColor: "#f3f4f6" },
                    }}
                  >
                    <Badge badgeContent={unreadCount} color="error">
                      <Bell size={20} />
                    </Badge>
                  </IconButton>

                  {open.notification && (
                    <Paper
                      sx={{
                        position: "absolute",
                        top: "110%",
                        right: 0,
                        width: 320,
                        borderRadius: 3,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                        border: showDiwaliTheme
                          ? "1px solid #FFD700"
                          : "1px solid #e5e7eb",
                        overflow: "hidden",
                        zIndex: 20,
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          backgroundColor: showDiwaliTheme
                            ? "#FFF9C4"
                            : "transparent",
                        }}
                      >
<<<<<<< HEAD
                        <Typography fontWeight={800} fontSize="1.1rem"> {/* Increased from 700 to 800 */}
                          Notifications
=======
                        <Typography fontWeight={700} fontSize="1rem">
                          AI Notifications
>>>>>>> 4c5d6065acdbb26de4550210f7f71e01bac31259
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            setOpen({ ...open, notification: false })
                          }
                        >
                          <X size={18} />
                        </IconButton>
                      </Box>

                      <Box sx={{ maxHeight: 380, overflowY: "auto" }}>
                        {dummyNotifications.map((n) => (
                          <Box
                            key={n.id}
                            sx={{
                              p: 2,
                              borderBottom: "1px solid #f3f4f6",
                              backgroundColor: n.unread
                                ? showDiwaliTheme
                                  ? "#FFE082"
                                  : "#faf5ff"
                                : "transparent",
                              transition: "0.2s",
                              "&:hover": {
                                backgroundColor: showDiwaliTheme
                                  ? "#FFE082"
                                  : "#f9fafb",
                              },
                            }}
                          >
                            <Box sx={{ display: "flex", gap: 1.5 }}>
                              {n.unread && (
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    backgroundColor: showDiwaliTheme
                                      ? "#FF6B35"
                                      : "#7e22ce",
                                    borderRadius: "50%",
                                    mt: 0.5,
                                  }}
                                />
                              )}
                              <Box>
                                <Typography fontWeight={700} fontSize="0.95rem"> {/* Increased from 600 to 700 */}
                                  {n.title}
                                </Typography>
                                <Typography
                                  color="text.secondary"
                                  fontSize="0.85rem"
                                  fontWeight={500} // Added medium weight for better readability
                                >
                                  {n.message}
                                </Typography>
                                <Typography
                                  color="text.disabled"
                                  fontSize="0.75rem"
                                  fontWeight={600} // Added semi-bold for better visibility
                                >
                                  {n.time}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>

                      <Box
                        sx={{
                          textAlign: "center",
                          p: 1.5,
                          bgcolor: showDiwaliTheme ? "#FFE082" : "#f9fafb",
                        }}
                      >
                        <Button
                          size="small"
<<<<<<< HEAD
                          sx={{ 
                            color: showDiwaliTheme ? '#B8860B' : '#6b21a8', 
                            fontWeight: 700, // Increased from 600 to 700
                            fontSize: '0.9rem'
=======
                          sx={{
                            color: showDiwaliTheme ? "#B8860B" : "#6b21a8",
                            fontWeight: 600,
>>>>>>> 4c5d6065acdbb26de4550210f7f71e01bac31259
                          }}
                        >
                          View All Notifications
                        </Button>
                      </Box>
                    </Paper>
                  )}
                </Box>

                {/* User Icon */}
                <IconButton
                  component={Link}
                  to="/profile"
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#f3f4f6" },
                  }}
                >
                  <User size={20} />
                </IconButton>
                {/* Subscriptions */}
                <IconButton
                  component={Link}
                  to="/subscriptions"
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#f3f4f6" },
                  }}
                >
                  <Crown size={20} />
                </IconButton>
                {/* Logout */}
                <IconButton
                  onClick={handleLogout}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#f3f4f6" },
                  }}
                >
                  <LogOut size={20} />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  component={Link}
                  to="/auth"
                  sx={{
                    px: 3,
                    py: 1.2,
<<<<<<< HEAD
                    color: showDiwaliTheme ? '#B8860B' : '#6b21a8',
                    fontWeight: 700, // Increased from 600 to 700
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: '0.95rem',
                    "&:hover": { 
                      backgroundColor: showDiwaliTheme ? '#FFF9C4' : '#faf5ff' 
=======
                    color: showDiwaliTheme ? "#B8860B" : "#6b21a8",
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: showDiwaliTheme ? "#FFF9C4" : "#faf5ff",
>>>>>>> 4c5d6065acdbb26de4550210f7f71e01bac31259
                    },
                  }}
                  startIcon={<LogIn size={18} />}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    px: 3,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: 700, // Increased from 600 to 700
                    textTransform: "none",
<<<<<<< HEAD
                    fontSize: '0.95rem',
                    background: showDiwaliTheme 
                      ? 'linear-gradient(to right, #FF6B35, #FFD166)'
                      : 'linear-gradient(to right, #6b21a8, #312e81)',
=======
                    background: showDiwaliTheme
                      ? "linear-gradient(to right, #FF6B35, #FFD166)"
                      : "linear-gradient(to right, #6b21a8, #312e81)",
>>>>>>> 4c5d6065acdbb26de4550210f7f71e01bac31259
                    "&:hover": {
                      boxShadow: showDiwaliTheme
                        ? "0 4px 14px rgba(255,107,53,0.4)"
                        : "0 4px 14px rgba(107,33,168,0.3)",
                      transform: "translateY(-2px)",
                    },
                  }}
                  startIcon={<UserPlus size={18} />}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Toggle */}
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" },
              borderRadius: 2,
              "&:hover": { backgroundColor: "#f3f4f6" },
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            borderLeft: "1px solid #e5e7eb",
            backgroundColor: showDiwaliTheme ? "#FFFDE7" : "white",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.name}
              component={NavLink}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                color: showDiwaliTheme ? "#B8860B" : "#374151",
                "&:hover": {
                  bgcolor: showDiwaliTheme ? "#FFE082" : "#faf5ff",
                  color: showDiwaliTheme ? "#FF6B35" : "#6b21a8",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30, color: "inherit" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{ 
                  fontWeight: 600, // Added semi-bold for mobile items
                  fontSize: '0.95rem'
                }}
              />
            </ListItemButton>
          ))}

          <Divider sx={{ my: 2 }} />

          {moreOptions[user?.role] &&
            moreOptions[user?.role].map((item) => (
              <ListItemButton
                key={item.name}
                component={NavLink}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  color: showDiwaliTheme ? "#B8860B" : "#374151",
                  "&:hover": {
                    bgcolor: showDiwaliTheme ? "#FFE082" : "#faf5ff",
                    color: showDiwaliTheme ? "#FF6B35" : "#6b21a8",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 30, color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.name} 
                  primaryTypographyProps={{ 
                    fontWeight: 600, // Added semi-bold for mobile items
                    fontSize: '0.95rem'
                  }}
                />
              </ListItemButton>
            ))}

          <Divider sx={{ my: 2 }} />

          {isAuthenticated ? (
            <>
              <ListItemButton component={Link} to="/profile">
                <ListItemIcon>
                  <User size={18} />
                </ListItemIcon>
                <ListItemText 
                  primary="My Profile" 
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItemButton>
              <ListItemButton component={Link} to="/" onClick={handleLogout}>
                <ListItemIcon>
                  <LogOut size={18} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
              <ListItemButton component={Link} to="/subscriptions">
                <ListItemIcon>
                  <Crown size={18} />
                </ListItemIcon>
                <ListItemText 
                  primary="Subscriptions" 
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Bell size={18} />
                </ListItemIcon>
                <ListItemText
                  primary="Notifications"
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondary={`${unreadCount} unread`}
                  secondaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </>
          ) : (
            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Button
                startIcon={<LogIn size={18} />}
                component={Link}
                to="/auth"
                variant="outlined"
                sx={{
                  textTransform: "none",
<<<<<<< HEAD
                  color: showDiwaliTheme ? '#B8860B' : '#6b21a8',
                  borderColor: showDiwaliTheme ? '#B8860B' : '#6b21a8',
                  fontWeight: 700, // Increased from 600 to 700
                  fontSize: '0.95rem',
                  "&:hover": { 
                    backgroundColor: showDiwaliTheme ? '#FFF9C4' : '#faf5ff' 
=======
                  color: showDiwaliTheme ? "#B8860B" : "#6b21a8",
                  borderColor: showDiwaliTheme ? "#B8860B" : "#6b21a8",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: showDiwaliTheme ? "#FFF9C4" : "#faf5ff",
>>>>>>> 4c5d6065acdbb26de4550210f7f71e01bac31259
                  },
                }}
              >
                Login
              </Button>
              <Button
                startIcon={<UserPlus size={18} />}
                variant="contained"
                sx={{
                  textTransform: "none",
<<<<<<< HEAD
                  fontWeight: 700, // Increased from 600 to 700
                  fontSize: '0.95rem',
                  background: showDiwaliTheme 
                    ? 'linear-gradient(to right, #FF6B35, #FFD166)'
                    : 'linear-gradient(to right, #6b21a8, #312e81)',
=======
                  fontWeight: 600,
                  background: showDiwaliTheme
                    ? "linear-gradient(to right, #FF6B35, #FFD166)"
                    : "linear-gradient(to right, #6b21a8, #312e81)",
>>>>>>> 4c5d6065acdbb26de4550210f7f71e01bac31259
                  "&:hover": {
                    boxShadow: showDiwaliTheme
                      ? "0 4px 14px rgba(255,107,53,0.4)"
                      : "0 4px 14px rgba(107,33,168,0.3)",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
      {/* Add CSS Animations */}
      <style>
        {`
          @keyframes fireworkExplosion {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translate(${Math.random() * 100 - 50}px, ${
          Math.random() * 100 - 50
        }px) scale(0);
              opacity: 0;
            }
          }
          
          @keyframes fallDown {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
          
          @keyframes colorChange {
            0% {
              background: linear-gradient(45deg, #FF6B35, #FFD166);
            }
            25% {
              background: linear-gradient(45deg, #FFD166, #06D6A0);
            }
            50% {
              background: linear-gradient(45deg, #06D6A0, #118AB2);
            }
            75% {
              background: linear-gradient(45deg, #118AB2, #FF6B35);
            }
            100% {
              background: linear-gradient(45deg, #FF6B35, #FFD166);
            }
          }
        `}
      </style>
    </>
  );
}
