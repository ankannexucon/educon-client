import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  Heart,
} from "lucide-react";
import React, { useState } from "react";

export default function FooterComponent() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  const quickLinks = [
    { name: "Browse Universities", href: "/universities" },
    { name: "Programs", href: "/programs" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Test Preparation", href: "/test-prep" },
    { name: "Student Reviews", href: "/reviews" },
    { name: "Success Stories", href: "/success-stories" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Visa Guidance", href: "/visa" },
    { name: "Documentation", href: "/documents" },
    { name: "Application Process", href: "/process" },
    { name: "Cost Calculator", href: "/calculator" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "#1877F2", name: "Facebook" },
    { icon: Twitter, href: "#", color: "#1DA1F2", name: "Twitter" },
    { icon: Instagram, href: "#", color: "#E4405F", name: "Instagram" },
    { icon: Linkedin, href: "#", color: "#0A66C2", name: "LinkedIn" },
    { icon: Youtube, href: "#", color: "#FF0000", name: "YouTube" },
  ];

  const contactInfo = [
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    {
      icon: Mail,
      text: "support@Educon.com",
      href: "mailto:support@Educon.com",
    },
    { icon: MapPin, text: "123 Education Lane, London, UK", href: "#" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "rgb(15, 23, 42)",
        color: "white",
        mt: "auto",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)",
        },
      }}
    >
      {/* Main Footer Content */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GraduationCap size={32} color="#3B82F6" />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    background: "linear-gradient(135deg, #60A5FA, #A78BFA)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Educon
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "rgb(148, 163, 184)", lineHeight: 1.7 }}
              >
                Your trusted partner in global education. We connect ambitious
                students with top universities worldwide, providing end-to-end
                support from application to enrollment.
              </Typography>

              {/* Contact Info */}
              <Stack spacing={2}>
                {contactInfo.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      color: "rgb(148, 163, 184)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                  >
                    <item.icon size={18} />
                    <Typography variant="body2">{item.text}</Typography>
                  </Link>
                ))}
              </Stack>

              {/* Social Links */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontSize: "1rem", fontWeight: "600" }}
                >
                  Follow Us
                </Typography>
                <Stack direction="row" spacing={1}>
                  {socialLinks.map((social, index) => (
                    <IconButton
                      key={index}
                      href={social.href}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: social.color,
                          transform: "translateY(-2px)",
                        },
                      }}
                      aria-label={social.name}
                    >
                      <social.icon size={20} />
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{ mb: 3, fontSize: "1.1rem", fontWeight: "600" }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  sx={{
                    color: "rgb(148, 163, 184)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#60A5FA",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{ mb: 3, fontSize: "1.1rem", fontWeight: "600" }}
            >
              Support
            </Typography>
            <Stack spacing={1.5}>
              {supportLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  sx={{
                    color: "rgb(148, 163, 184)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#60A5FA",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Newsletter */}
        </Grid>

        {/* Bottom Bar */}
        <Divider sx={{ my: 6, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgb(148, 163, 184)",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            © {new Date().getFullYear()} Educon. All rights reserved.
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ color: "rgb(148, 163, 184)" }}>
              Made with
            </Typography>
            <Heart size={16} color="#EF4444" fill="#EF4444" />
            <Typography variant="body2" sx={{ color: "rgb(148, 163, 184)" }}>
              for students worldwide
            </Typography>
          </Box>

          <Stack direction="row" spacing={3}>
            <Link
              href="/privacy"
              sx={{
                color: "rgb(148, 163, 184)",
                textDecoration: "none",
                fontSize: "0.8rem",
                "&:hover": { color: "white" },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              sx={{
                color: "rgb(148, 163, 184)",
                textDecoration: "none",
                fontSize: "0.8rem",
                "&:hover": { color: "white" },
              }}
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              sx={{
                color: "rgb(148, 163, 184)",
                textDecoration: "none",
                fontSize: "0.8rem",
                "&:hover": { color: "white" },
              }}
            >
              Cookie Policy
            </Link>
          </Stack>
        </Box>
      </Container>

      {/* Floating Support Button */}
      {/* <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "#3B82F6",
            color: "white",
            width: 60,
            height: 60,
            borderRadius: "50%",
            boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#2563EB",
              transform: "scale(1.1)",
              boxShadow: "0 15px 30px rgba(59, 130, 246, 0.6)",
            },
          }}
          aria-label="Get help"
        >
          <MessageCircle size={24} />
        </IconButton>
      </Box> */}
    </Box>
  );
}
