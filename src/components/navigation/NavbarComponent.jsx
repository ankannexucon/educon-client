import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Popover,
  Paper,
} from "@mui/material";
import { Menu, NotificationsNone } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";

const APP_NAME = import.meta.env.VITE_APP_NAME || "Educon";

// Dummy notifications
const dummyNotifications = [
  {
    id: 1,
    title: "Assignment Deadline",
    message: "Math assignment is due tomorrow.",
  },
  {
    id: 2,
    title: "New Grade Posted",
    message: "Your grade for Physics 101 is released.",
  },
  {
    id: 3,
    title: "Course Announcement",
    message: "New Web Development module added.",
  },
];

export default function NavbarComponent() {
  const [user] = useState({ name: "Ankan" });
  const [mobileOpen, setMobileOpen] = useState(false);

  // Notifications popover state
  const [anchorEl, setAnchorEl] = useState(null);
  const handleNotificationsClick = (event) => setAnchorEl(event.currentTarget);
  const handleNotificationsClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Admissions", path: "/admissions" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", mt: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        {APP_NAME}
      </Typography>
      {navItems.map((item) => (
        <List key={item.name}>
          <ListItem disablePadding>
            <ListItemText
              primary={item.name}
              sx={{
                textAlign: "center",
                "& span": {
                  fontWeight: 500,
                  color: "#1e293b",
                  fontSize: "1rem",
                },
              }}
            />
          </ListItem>
        </List>
      ))}
      {user && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar alt="User" src="/default-avatar.png" />
          <Typography variant="body2" fontWeight={500}>
            My Profile
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <div className="h-[60px]"></div>
      <div className="fixed top-0 left-0 w-screen">
        <AppBar
          position="static"
          elevation={0}
          sx={{ backgroundColor: "#fff", color: "#1e293b" }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Logo */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  letterSpacing: 0.5,
                }}
              >
                {APP_NAME}
              </Typography>
            </Box>

            {/* Nav Links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={NavLink}
                  to={item.path}
                  disableRipple
                  sx={{
                    color: "#1e293b",
                    fontWeight: 500,
                    textTransform: "none",
                    "&:hover": { color: "#2563eb", background: "transparent" },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            {/* Right Side */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              {user ? (
                <>
                  {/* Notifications Bell */}
                  <IconButton onClick={handleNotificationsClick}>
                    <Badge
                      badgeContent={dummyNotifications.length}
                      color="error"
                    >
                      <NotificationsNone sx={{ color: "#1e293b" }} />
                    </Badge>
                  </IconButton>

                  {/* Notifications Popover */}
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleNotificationsClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Paper
                      sx={{
                        width: 300,
                        maxHeight: 400,
                        overflowY: "auto",
                        p: 1,
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: 600, mb: 1, color: "grey" }}
                      >
                        Notifications
                      </Typography>
                      {dummyNotifications.map((item) => (
                        <Box key={item.id} sx={{ p: 1 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                            {item.title}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: "#64748b" }}>
                            {item.message}
                          </Typography>
                        </Box>
                      ))}
                    </Paper>
                  </Popover>

                  {/* User Avatar */}
                  <Avatar
                    component={Link}
                    to={"/profile"}
                    alt="User"
                    src="/default-avatar.png"
                    sx={{
                      width: 36,
                      height: 36,
                      cursor: "pointer",
                      "&:hover": { boxShadow: 2 },
                    }}
                  />
                </>
              ) : (
                <>
                  <Button
                    variant="text"
                    sx={{
                      color: "#2563eb",
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#2563eb",
                      color: "#fff",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#1e40af" },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>

            {/* Mobile Menu */}
            <IconButton
              sx={{ display: { md: "none" }, color: "#2563eb" }}
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{ "& .MuiDrawer-paper": { width: 240 } }}
        >
          {drawer}
        </Drawer>
      </div>
    </>
  );
}
