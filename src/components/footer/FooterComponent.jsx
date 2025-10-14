import { Box, Typography } from "@mui/material";
import React from "react";

export default function FooterComponent() {
  return (
    <Box
      sx={{
        py: 5,
        textAlign: "center",
        backgroundColor: "#1e293b",
        color: "white",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} EduCon — Empowering Learning with
        Universities.
      </Typography>
    </Box>
  );
}
