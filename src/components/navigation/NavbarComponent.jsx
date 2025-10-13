import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Menu, School } from "@mui/icons-material";

export default function NavbarComponent() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = ["Home", "Courses", "Admissions", "About Us", "Contact"];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{ my: 2, fontWeight: "bold", color: "#2563eb" }}
      >
        EduConnect
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemText
              primary={item}
              sx={{
                textAlign: "center",
                py: 1,
                "& span": {
                  fontWeight: 500,
                  color: "#1e293b",
                  fontSize: "1rem",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #2563eb, #4f46e5)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left side: Logo + Name */}
          <Box display="flex" alignItems="center" gap={1}>
            <School sx={{ fontSize: 30 }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", letterSpacing: 0.5 }}
            >
              EduConnect
            </Typography>
          </Box>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "#fff",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>

          {/* Right Side: Login/Signup */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": { borderColor: "#e0e7ff", background: "#1e3a8a" },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#2563eb",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#e0e7ff" },
              }}
            >
              Sign Up
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { md: "none" } }}
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
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
        }}
      >
        {drawer}
        <Box sx={{ textAlign: "center", mt: 2 }}>
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
        </Box>
      </Drawer>
    </>
  );
}
