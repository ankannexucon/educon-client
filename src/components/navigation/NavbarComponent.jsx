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
} from "@mui/material";
import { Menu, NotificationsNone, School } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";

const APP_NAME = import.meta.env.VITE_APP_NAME || "Educon";

export default function NavbarComponent() {
  // Example user state (replace with real auth state)
  const [user, setUser] = useState({ name: "Ankan" });
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Admissions", path: "/admissions" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
      <Box sx={{ mt: 2 }}>
        {user ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar alt="User" src="/default-avatar.png" />
            <Typography variant="body2" fontWeight={500}>
              My Profile
            </Typography>
          </Box>
        ) : (
          <>
            <Button
              variant="outlined"
              sx={{
                color: "#2563eb",
                borderColor: "#2563eb",
                mr: 1,
                "&:hover": { backgroundColor: "#eff6ff" },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2563eb",
                color: "#fff",
                "&:hover": { backgroundColor: "#1e40af" },
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <div className="h-[60px]"></div>
      <div className="fixed top-0 left-0 w-screen">
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: "#fff",
            color: "#1e293b",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Left side: logo + name */}
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

            {/* Middle: nav links (desktop only) */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={NavLink}
                  to={item.path}
                  disableRipple
                  sx={{
                    position: "relative",
                    color: "#1e293b",
                    fontWeight: 500,
                    textTransform: "none",
                    px: 0,
                    mx: 1,
                    minWidth: "auto",
                    "&:hover": { color: "#2563eb", background: "transparent" },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      width: 0,
                      height: "2px",
                      backgroundColor: "#2563eb",
                      transition: "width 0.3s ease-in-out",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                    "&.active": {
                      color: "#2563eb",
                      "&::after": { width: "100%" },
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            {/* Right side: user or auth buttons */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              {user ? (
                <>
                  <IconButton>
                    <Badge color="error" variant="dot">
                      <NotificationsNone sx={{ color: "#1e293b" }} />
                    </Badge>
                  </IconButton>
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

            {/* Mobile Menu Button */}
            <IconButton
              sx={{ display: { md: "none" }, color: "#2563eb" }}
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Drawer (mobile menu) */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>
      </div>
    </>
  );
}
