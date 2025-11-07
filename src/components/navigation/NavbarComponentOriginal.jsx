import React, { useState } from "react";
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
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { ArrowUpRight } from "lucide-react";
import { Crown } from "lucide-react";

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

export default function NavbarComponent() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState({ more: false, notification: false });
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
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          backgroundColor: "rgba(255,255,255,0.6)",
          backdropFilter:
            "blur(30px) saturate(180%) contrast(115%) brightness(110%)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: `
    0 8px 32px rgba(0,0,0,0.1),
    inset 0 1px 0 rgba(255,255,255,0.6)
  `,
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
            {/* Logo */}
            <Box
              component="img"
              src="/Logo.png"
              alt="Educon Logo"
              sx={{
                width: 60,
                height: 60,
                objectFit: "cover",
              }}
            />
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                color: "#111827",
                textDecoration: "none",
              }}
            >
              {APP_NAME}
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
                  color: "#374151",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  textTransform: "none",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "0",
                    height: "2px",
                    backgroundColor: "#432dd7",
                    transition: "width 0.3s",
                  },
                  "&:hover": {
                    color: "#432dd7",
                    backgroundColor: "transparent",
                  },
                  "&:hover::after": { width: "100%" },
                  "&.active::after": { width: "100%" },
                  "&.active": { color: "#432dd7" },
                }}
              >
                {item.name}
              </Button>
            ))}

            {/* “More” dropdown */}

            <Box sx={{ position: "relative" }}>
              <Button
                onClick={() => toggleDropdown("more")}
                endIcon={<ChevronDown size={18} />}
                sx={{
                  textTransform: "none",
                  fontSize: "0.95rem",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  backgroundColor: open.more ? "#f3f4f6" : "transparent",
                  "&:hover": { backgroundColor: "#f3f4f6" },
                  color: "#374151",
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
                    border: "1px solid #e5e7eb",
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
                    }}
                  >
                    <Typography fontWeight={700} fontSize="1rem">
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
                          fontWeight: 500,
                          "&:hover": { backgroundColor: "#f9fafb" },
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
                          <Typography fontWeight={600} fontSize="0.9rem">
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
                        border: "1px solid #e5e7eb",
                        overflow: "hidden",
                        zIndex: 20,
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography fontWeight={700} fontSize="1rem">
                          Notifications
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
                                ? "#faf5ff"
                                : "transparent",
                              transition: "0.2s",
                              "&:hover": { backgroundColor: "#f9fafb" },
                            }}
                          >
                            <Box sx={{ display: "flex", gap: 1.5 }}>
                              {n.unread && (
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    backgroundColor: "#7e22ce",
                                    borderRadius: "50%",
                                    mt: 0.5,
                                  }}
                                />
                              )}
                              <Box>
                                <Typography fontWeight={600} fontSize="0.9rem">
                                  {n.title}
                                </Typography>
                                <Typography
                                  color="text.secondary"
                                  fontSize="0.8rem"
                                >
                                  {n.message}
                                </Typography>
                                <Typography
                                  color="text.disabled"
                                  fontSize="0.7rem"
                                >
                                  {n.time}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>

                      <Box
                        sx={{ textAlign: "center", p: 1.5, bgcolor: "#f9fafb" }}
                      >
                        <Button
                          size="small"
                          sx={{ color: "#6b21a8", fontWeight: 600 }}
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
                {/* Supcriptions */}
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
                    color: "#6b21a8",
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#faf5ff" },
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
                    fontWeight: 600,
                    textTransform: "none",
                    background: "linear-gradient(to right, #6b21a8, #312e81)",
                    "&:hover": {
                      boxShadow: "0 4px 14px rgba(107,33,168,0.3)",
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
            backgroundColor: "white",
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
                color: "#374151",
                "&:hover": {
                  bgcolor: "#faf5ff",
                  color: "#6b21a8",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30, color: "inherit" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
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
                  color: "#374151",
                  "&:hover": {
                    bgcolor: "#faf5ff",
                    color: "#6b21a8",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 30, color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}

          <Divider sx={{ my: 2 }} />

          {isAuthenticated ? (
            <>
              <ListItemButton component={Link} to="/profile">
                <ListItemIcon>
                  <User size={18} />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
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
                <ListItemText primary="Subscriptions" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Bell size={18} />
                </ListItemIcon>
                <ListItemText
                  primary="Notifications"
                  secondary={`${unreadCount} unread`}
                />
              </ListItemButton>
              <IconButton
                onClick={handleLogout}
                sx={{
                  p: 1,
                  borderRadius: 2,
                  "&:hover": { backgroundColor: "#f3f4f6" },
                }}
              >
                <LogIn size={20} />
              </IconButton>
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
                  color: "#6b21a8",
                  borderColor: "#6b21a8",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#faf5ff",
                  },
                }}
              >
                Login
              </Button>
              <Button
                startIcon={<UserPlus size={18} />}
                variant="contained"
                // sx={{
                //   textTransform: "none",
                //   fontWeight: 600,
                //   background: showDiwaliTheme
                //     ? "linear-gradient(to right, #FF6B35, #FFD166)"
                //     : "linear-gradient(to right, #6b21a8, #312e81)",
                //   "&:hover": {
                //     boxShadow: showDiwaliTheme
                //       ? "0 4px 14px rgba(255,107,53,0.4)"
                //       : "0 4px 14px rgba(107,33,168,0.3)",
                //   },
                // }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
}
