import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorOutline } from "@mui/icons-material";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          mb: 3,
          p: 3,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #e0f2fe, #dbeafe)",
          display: "inline-flex",
        }}
      >
        <ErrorOutline sx={{ fontSize: 60, color: "#2563eb" }} />
      </Box>

      {/* Text */}
      <Typography
        variant="h2"
        fontWeight={800}
        sx={{
          color: "#1e293b",
          mb: 2,
          fontSize: { xs: "2.5rem", sm: "3.5rem" },
        }}
      >
        404
      </Typography>

      <Typography variant="h5" sx={{ color: "text.secondary", mb: 3 }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: "text.secondary", mb: 5, maxWidth: 420 }}
      >
        It might have been removed, renamed, or the URL might be incorrect.
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1.2,
            borderRadius: 2,
            background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
            "&:hover": {
              background: "linear-gradient(90deg, #1e40af, #1d4ed8)",
            },
          }}
        >
          Go Home
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1.2,
            borderRadius: 2,
          }}
        >
          Go Back
        </Button>
      </Box>
    </Container>
  );
}
