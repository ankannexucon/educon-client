import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Stack,
  Paper,
  alpha,
} from "@mui/material";
import {
  Check,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  GraduationCap,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";

import studentApplicationData from "../../json/studentApplicationData.json";

export default function StudentApplicationDashboard() {
  const [data, setData] = useState(studentApplicationData);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [dialogAction, setDialogAction] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleAction = (app, action) => {
    setSelectedApp(app);
    setDialogAction(action);
    setShowDialog(true);
  };

  const confirmAction = () => {
    setData((prev) =>
      prev.map((app) =>
        app.id === selectedApp.id
          ? { ...app, status: dialogAction, notes: feedback }
          : app
      )
    );
    setShowDialog(false);
    setFeedback("");
    setSelectedApp(null);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "studentName",
        header: "Student Name",
        size: 180,
        Cell: ({ cell }) => (
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {cell.getValue()}
          </Typography>
        ),
      },
      {
        accessorKey: "university",
        header: "University",
        size: 200,
        Cell: ({ cell }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <GraduationCap size={16} style={{ color: "#6366f1" }} />
            <Typography variant="body2" color="text.primary">
              {cell.getValue()}
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: "program",
        header: "Program",
        size: 180,
        Cell: ({ cell }) => (
          <Typography variant="body2" color="text.primary">
            {cell.getValue()}
          </Typography>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
        Cell: ({ cell }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Mail size={14} style={{ color: "#8b5cf6" }} />
            <Typography
              variant="body2"
              fontSize="0.8rem"
              color="text.secondary"
            >
              {cell.getValue()}
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 150,
        Cell: ({ cell }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Phone size={14} style={{ color: "#8b5cf6" }} />
            <Typography
              variant="body2"
              fontSize="0.8rem"
              color="text.secondary"
            >
              {cell.getValue()}
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: "gpa",
        header: "GPA",
        size: 100,
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue()}
            size="small"
            sx={{
              bgcolor: alpha("#6366f1", 0.1),
              color: "#6366f1",
              fontWeight: 700,
              border: "1px solid",
              borderColor: alpha("#6366f1", 0.3),
              borderRadius: "6px",
            }}
          />
        ),
      },
      {
        accessorKey: "submittedDate",
        header: "Submitted",
        size: 120,
        Cell: ({ cell }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Calendar size={14} style={{ color: "#8b5cf6" }} />
            <Typography
              variant="body2"
              fontSize="0.75rem"
              color="text.secondary"
            >
              {cell.getValue()}
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: "documents",
        header: "Documents",
        size: 120,
        Cell: ({ cell }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <FileText size={14} style={{ color: "#8b5cf6" }} />
            <Typography
              variant="body2"
              fontSize="0.8rem"
              color="text.secondary"
            >
              {cell.getValue().length} files
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 120,
        filterVariant: "select",
        filterSelectOptions: ["pending", "accepted", "rejected"],
        Cell: ({ cell }) => {
          const status = cell.getValue();
          const colors = {
            pending: {
              bg: alpha("#f59e0b", 0.1),
              color: "#d97706",
              border: alpha("#f59e0b", 0.3),
            },
            accepted: {
              bg: alpha("#10b981", 0.1),
              color: "#059669",
              border: alpha("#10b981", 0.3),
            },
            rejected: {
              bg: alpha("#ef4444", 0.1),
              color: "#dc2626",
              border: alpha("#ef4444", 0.3),
            },
          };
          const config = colors[status] || colors.pending;
          return (
            <Chip
              label={status}
              size="small"
              sx={{
                bgcolor: config.bg,
                color: config.color,
                border: `1px solid ${config.border}`,
                fontWeight: 600,
                textTransform: "capitalize",
                borderRadius: "6px",
              }}
            />
          );
        },
      },
      {
        accessorKey: "actions",
        header: "Actions",
        size: 200,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          const app = row.original;
          if (app.status === "pending") {
            return (
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  startIcon={<Check size={16} />}
                  onClick={() => handleAction(app, "accepted")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    bgcolor: "#10b981",
                    "&:hover": {
                      bgcolor: "#059669",
                    },
                    px: 2,
                    fontSize: "0.75rem",
                  }}
                >
                  Accept
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  startIcon={<X size={16} />}
                  onClick={() => handleAction(app, "rejected")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    bgcolor: "#ef4444",
                    "&:hover": {
                      bgcolor: "#dc2626",
                    },
                    px: 2,
                    fontSize: "0.75rem",
                  }}
                >
                  Reject
                </Button>
              </Stack>
            );
          }
          return (
            <Typography variant="caption" color="text.secondary">
              {app.notes ? `Note: ${app.notes}` : "Processed"}
            </Typography>
          );
        },
      },
    ],
    []
  );

  const statusCounts = useMemo(() => {
    return {
      pending: data.filter((a) => a.status === "pending").length,
      accepted: data.filter((a) => a.status === "accepted").length,
      rejected: data.filter((a) => a.status === "rejected").length,
    };
  }, [data]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.50",
        p: 3,
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      }}
    >
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Student Application Review
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Review and manage university applications in real-time
              </Typography>
            </Box>

            {/* Stats Cards */}
            <Stack direction="row" spacing={2}>
              <Paper
                sx={{
                  p: 2,
                  minWidth: 120,
                  bgcolor: alpha("#f0f0f0", 0.5),
                  backdropFilter: "blur(10px)",
                  borderRadius: 2,
                  border: `1px solid ${alpha("#ffffff", 0.2)}`,
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Clock size={16} />
                  <Typography variant="body2" fontWeight={600}>
                    Pending
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  {statusCounts.pending}
                </Typography>
              </Paper>

              <Paper
                sx={{
                  p: 2,
                  minWidth: 120,
                  bgcolor: alpha("#f0f0f0", 0.5),
                  backdropFilter: "blur(10px)",
                  borderRadius: 2,
                  border: `1px solid ${alpha("#ffffff", 0.2)}`,
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <TrendingUp size={16} />
                  <Typography variant="body2" fontWeight={600}>
                    Accepted
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  {statusCounts.accepted}
                </Typography>
              </Paper>

              <Paper
                sx={{
                  p: 2,
                  minWidth: 120,
                  bgcolor: alpha("#f0f0f0", 0.5),
                  backdropFilter: "blur(10px)",
                  borderRadius: 2,
                  border: `1px solid ${alpha("#ffffff", 0.2)}`,
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Users size={16} />
                  <Typography variant="body2" fontWeight={600}>
                    Total
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  {data.length}
                </Typography>
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Paper>

      {/* Table Section */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "grey.200",
          background: "white",
        }}
      >
        <MaterialReactTable
          columns={columns}
          data={data}
          enableRowSelection={false}
          enableDensityToggle
          initialState={{
            density: "comfortable",
            pagination: { pageSize: 10, pageIndex: 0 },
          }}
          muiTablePaperProps={{
            elevation: 0,
            sx: {
              borderRadius: 0,
              boxShadow: "none",
            },
          }}
          muiTableContainerProps={{
            sx: {
              maxHeight: "calc(100vh - 280px)",
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              bgcolor: "grey.50",
              fontWeight: 600,
              fontSize: "0.875rem",
              borderBottom: "2px solid",
              borderColor: "grey.200",
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              borderBottom: "1px solid",
              borderColor: "grey.100",
            },
          }}
        />
      </Paper>

      {/* Action Dialog */}
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "grey.50",
            borderBottom: "1px solid",
            borderColor: "grey.200",
            fontWeight: 600,
          }}
        >
          {dialogAction === "accepted"
            ? "🎉 Accept Application"
            : "❌ Reject Application"}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <DialogContentText sx={{ mb: 3, color: "text.primary" }}>
            {dialogAction === "accepted"
              ? `You are about to accept ${selectedApp?.studentName}'s application to ${selectedApp?.university}.`
              : `You are about to reject ${selectedApp?.studentName}'s application to ${selectedApp?.university}.`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Feedback / Notes (Optional)"
            fullWidth
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Add any feedback or notes for the student..."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "#6366f1",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={() => {
              setShowDialog(false);
              setFeedback("");
            }}
            color="inherit"
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              border: "1px solid",
              borderColor: "grey.300",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmAction}
            variant="contained"
            color={dialogAction === "accepted" ? "success" : "error"}
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              bgcolor: dialogAction === "accepted" ? "#10b981" : "#ef4444",
              "&:hover": {
                bgcolor: dialogAction === "accepted" ? "#059669" : "#dc2626",
              },
            }}
          >
            Confirm {dialogAction === "accepted" ? "Accept" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
