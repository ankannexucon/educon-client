import React from "react";
import { Modal, Box, Typography, Button, Card, Divider } from "@mui/material";
import { AccountBalanceWallet, Security, CheckCircle } from "@mui/icons-material";

export default function PaymentModal({ open, handleClose, course }) {
  const handleContinuePay = () => {
    // Dummy redirect to Razorpay
    window.open("https://razorpay.com/", "_blank");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 440 },
          maxWidth: 440,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Header with Razorpay Branding */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #2d5bff 0%, #5a67d8 100%)",
            color: "white",
            py: 2,
            px: 3,
            textAlign: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <AccountBalanceWallet sx={{ fontSize: 28 }} />
            <Typography variant="h6" fontWeight="bold" fontSize="1.4rem">
              Razorpay Payments
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Secure Payment Gateway
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={3} textAlign="center">
            Complete Your Purchase
          </Typography>

          {/* Course Details Card */}
          <Card
            variant="outlined"
            sx={{
              p: 2.5,
              mb: 3,
              border: "1px solid #e5e7eb",
              borderRadius: 2,
              background: "#f8fafc",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Order Summary
            </Typography>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Course:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {course?.title}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Amount:
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight="bold"
                sx={{ color: "#059669" }}
              >
                {course?.price}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Total Amount:
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight="bold"
                sx={{ color: "#059669" }}
              >
                {course?.price}
              </Typography>
            </Box>
          </Card>

          {/* Security Features */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 3,
              p: 2,
              background: "#f0f9ff",
              borderRadius: 2,
              border: "1px solid #e0f2fe",
            }}
          >
            <Security sx={{ color: "#0369a1", fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: "#0369a1", fontWeight: 500 }}>
              🔒 Secure & Encrypted Payment
            </Typography>
          </Box>

          {/* Benefits */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" fontWeight="medium" mb={1}>
              What you'll get:
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircle sx={{ color: "#059669", fontSize: 18 }} />
                <Typography variant="body2" color="text.secondary">
                  Lifetime access to course content
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircle sx={{ color: "#059669", fontSize: 18 }} />
                <Typography variant="body2" color="text.secondary">
                  Certificate of completion
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircle sx={{ color: "#059669", fontSize: 18 }} />
                <Typography variant="body2" color="text.secondary">
                  24/7 Support access
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Payment Button */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
              color: "white",
              fontWeight: "bold",
              py: 1.5,
              borderRadius: 2,
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: "0 4px 14px 0 rgba(5, 150, 105, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #047857 0%, #065f46 100%)",
                boxShadow: "0 6px 20px 0 rgba(5, 150, 105, 0.4)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.3s ease",
            }}
            onClick={handleContinuePay}
          >
            Proceed to Payment
          </Button>

          {/* Cancel Button */}
          <Button
            variant="text"
            fullWidth
            sx={{
              mt: 2,
              color: "#6b7280",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": {
                background: "rgba(107, 114, 128, 0.1)",
              },
            }}
            onClick={handleClose}
          >
            Cancel Payment
          </Button>

          {/* Trust Badges */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mt: 3,
              pt: 2,
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Powered by
            </Typography>
            <Box
              component="span"
              sx={{
                fontWeight: "bold",
                color: "#2d5bff",
                fontSize: "0.9rem",
              }}
            >
              Razorpay
            </Box>
            <Security sx={{ color: "#059669", fontSize: 16 }} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}