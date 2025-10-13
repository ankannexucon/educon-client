import { AccessTime, Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  Box,
  IconButton,
  Chip,
  CardContent,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import { ClosedCaption } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { calculateDiscount } from "../../utils/mathUtil";

export default function UniversityCardComponent({ course, wishlist }) {
  return (
    <Card
      sx={{
        height: "100%",
        minWidth: "300px",
        maxWidth: "400px",
        borderRadius: 2,
        overflow: "visible",
        transition: "all 0.3s ease",
        border: "1px solid",
        borderColor: "divider",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Course Image */}
      <Box
        sx={{
          position: "relative",
          height: 160,
          borderRadius: 2,
          overflow: "hidden",
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
        }}
      >
        {/* Course Image */}
        {course.image && (
          <Box
            component="img"
            src={course.image}
            alt={course.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}

        {/* Wishlist Button */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "white",
            "&:hover": { backgroundColor: "grey.50" },
          }}
        >
          {wishlist.includes(course.id) ? (
            <Favorite sx={{ color: "red" }} />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>

        {/* Featured Chip */}
        {course.featured && (
          <Chip
            label="Featured"
            color="primary"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "#5624d0",
              color: "white",
            }}
          />
        )}
      </Box>

      <CardContent sx={{ p: 2.5 }}>
        {/* Course Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1,
            lineHeight: 1.3,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {course.name}
        </Typography>

        {/* Instructor */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {course.instructor}
        </Typography>

        {/* Rating */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            gap: 0.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "#b4690e" }}
          >
            {course.rating}
          </Typography>
          <Rating value={course.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            ({course.reviews.toLocaleString()})
          </Typography>
        </Box>

        {/* Course Features */}
        {/* <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          <Chip
            icon={<AccessTime />}
            label={course.duration}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<PlayCircle />}
            label={course.level}
            size="small"
            variant="outlined"
          />
          {course.subtitles && (
            <Chip
              icon={<ClosedCaption />}
              label="Subtitles"
              size="small"
              variant="outlined"
            />
          )}
        </Box> */}

        {/* What You'll Learn */}
        {/* <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            What you'll learn:
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {course.whatYouLearn.slice(0, 2).map((item, index) => (
              <Typography
                key={index}
                component="li"
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.75rem", mb: 0.5 }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box> */}

        {/* Price */}
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        > */}
        {/* Price Info */}
        {/* <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#5624d0" }}>
              ${course.discountPrice}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textDecoration: "line-through",
                color: "text.secondary",
              }}
            >
              ${course.price}
            </Typography>
            <Chip
              label={`${calculateDiscount(
                course.price,
                course.discountPrice
              )}% off`}
              color="success"
              size="small"
              sx={{ mt: 0.5 }}
            />
          </Box> */}

        {/* Add to Cart Button */}
        {/* <Button
            variant="contained"
            sx={{
              backgroundColor: "#5624d0",
              borderRadius: 0,
              py: 1.25,
              px: 3,
              fontWeight: 600,
              whiteSpace: "nowrap",
              "&:hover": { backgroundColor: "#4a1fb8" },
            }}
          >
            Add to Cart
          </Button> */}
        {/* </Box> */}
      </CardContent>
    </Card>
  );
}
