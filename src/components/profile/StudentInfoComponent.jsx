import React from "react";
import { Avatar, Box, Card, Typography, Chip } from "@mui/material";
import { Email as MailIcon, Person as UserIcon } from "@mui/icons-material";

export default function StudentInfoComponent() {
  const student = {
    name: "Alex Johnson",
    email: "alex.johnson@student.edu",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
  };

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: 4,
        boxShadow: 6,
        overflow: "hidden",
        p: { xs: 3, md: 4 },
        display: "flex",
        gap: 3,
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Avatar
          src={student.avatar}
          alt={student.name}
          sx={{
            width: 100,
            height: 100,
            border: "3px solid white",
            boxShadow: 4,
            borderRadius: 3,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            bgcolor: "success.main",
            p: 0.5,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserIcon sx={{ color: "#fff", fontSize: 18 }} />
        </Box>
      </Box>

      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "white", mb: 1 }}
        >
          {student.name}
        </Typography>

        <Chip
          icon={<MailIcon fontSize="small" />}
          label={student.email}
          sx={{
            bgcolor: "rgba(255,255,255,0.1)",
            color: "white",
            "& .MuiChip-icon": { color: "#cbd5e1" },
            fontSize: "0.9rem",
          }}
        />
      </Box>
    </Card>
  );
}
