import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Chip,
  Paper,
  Typography,
  Stack,
  alpha,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Calendar, FileText, Check, X } from "lucide-react";

import studentApplicationData from "../../json/studentApplicationData.json";

export default function UniversityApplicationView() {
  const universityName = "MIT";
  const [data, setData] = useState(
    studentApplicationData.filter(
      (app) =>
        app.university === universityName &&
        (app.status === "accepted" || app.status === "rejected")
    )
  );

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
          <Typography variant="body2" fontSize="0.8rem" color="text.secondary">
            {cell.getValue()}
          </Typography>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 150,
        Cell: ({ cell }) => (
          <Typography variant="body2" fontSize="0.8rem" color="text.secondary">
            {cell.getValue()}
          </Typography>
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
            <Typography variant="body2" fontSize="0.75rem" color="text.secondary">
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
            <Typography variant="body2" fontSize="0.8rem" color="text.secondary">
              {cell.getValue().length} files
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 120,
        Cell: ({ cell }) => {
          const status = cell.getValue();
          const colors = {
            accepted: { bg: alpha("#10b981", 0.1), color: "#059669", border: alpha("#10b981", 0.3) },
            rejected: { bg: alpha("#ef4444", 0.1), color: "#dc2626", border: alpha("#ef4444", 0.3) },
          };
          const config = colors[status] || colors.rejected;
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
        accessorKey: "notes",
        header: "Notes",
        size: 200,
        Cell: ({ cell }) => (
          <Typography variant="body2" color="text.secondary">
            {cell.getValue() || "-"}
          </Typography>
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        size: 200,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          const app = row.original;
          return (
            <Stack direction="row" spacing={1}>
              {app.status !== "accepted" && (
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  startIcon={<Check size={16} />}
                  onClick={() => handleAction(app, "accepted")}
                  sx={{ textTransform: "none", borderRadius: 2, px: 2, fontSize: "0.75rem" }}
                >
                  Accept
                </Button>
              )}
              {app.status !== "rejected" && (
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  startIcon={<X size={16} />}
                  onClick={() => handleAction(app, "rejected")}
                  sx={{ textTransform: "none", borderRadius: 2, px: 2, fontSize: "0.75rem" }}
                >
                  Reject
                </Button>
              )}
            </Stack>
          );
        },
      },
    ],
    []
  );

  const statusCounts = useMemo(() => ({
    accepted: data.filter((a) => a.status === "accepted").length,
    rejected: data.filter((a) => a.status === "rejected").length,
    total: data.length,
  }), [data]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", p: 3, background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" }}>
      {/* Header */}
      <Paper elevation={0} sx={{ mb: 3, p: 4, borderRadius: 3, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Student Applications for {universityName}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                View and manage student applications
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Paper sx={{ p: 2, minWidth: 120, bgcolor: alpha("#f0f0f0", 0.5), backdropFilter: "blur(10px)", borderRadius: 2, border: `1px solid ${alpha("#ffffff", 0.2)}` }}>
                <Typography variant="body2" fontWeight={600}>Accepted</Typography>
                <Typography variant="h5" fontWeight={700}>{statusCounts.accepted}</Typography>
              </Paper>
              <Paper sx={{ p: 2, minWidth: 120, bgcolor: alpha("#f0f0f0", 0.5), backdropFilter: "blur(10px)", borderRadius: 2, border: `1px solid ${alpha("#ffffff", 0.2)}` }}>
                <Typography variant="body2" fontWeight={600}>Rejected</Typography>
                <Typography variant="h5" fontWeight={700}>{statusCounts.rejected}</Typography>
              </Paper>
              <Paper sx={{ p: 2, minWidth: 120, bgcolor: alpha("#f0f0f0", 0.5), backdropFilter: "blur(10px)", borderRadius: 2, border: `1px solid ${alpha("#ffffff", 0.2)}` }}>
                <Typography variant="body2" fontWeight={600}>Total</Typography>
                <Typography variant="h5" fontWeight={700}>{statusCounts.total}</Typography>
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Paper>

      {/* Table */}
      <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid", borderColor: "grey.200", background: "white" }}>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableRowSelection={false}
          enableDensityToggle
          initialState={{ density: "comfortable", pagination: { pageSize: 10, pageIndex: 0 } }}
          muiTablePaperProps={{ elevation: 0, sx: { borderRadius: 0, boxShadow: "none" } }}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 280px)" } }}
          muiTableHeadCellProps={{ sx: { bgcolor: "grey.50", fontWeight: 600, fontSize: "0.875rem", borderBottom: "2px solid", borderColor: "grey.200" } }}
          muiTableBodyCellProps={{ sx: { borderBottom: "1px solid", borderColor: "grey.100" } }}
        />
      </Paper>

      {/* Action Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 600 }}>
          {dialogAction === "accepted" ? "🎉 Accept Application" : "❌ Reject Application"}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <DialogContentText sx={{ mb: 3 }}>
            {dialogAction === "accepted"
              ? `You are about to accept ${selectedApp?.studentName}'s application.`
              : `You are about to reject ${selectedApp?.studentName}'s application.`}
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
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => { setShowDialog(false); setFeedback(""); }} color="inherit">Cancel</Button>
          <Button onClick={confirmAction} variant="contained" color={dialogAction === "accepted" ? "success" : "error"}>
            Confirm {dialogAction === "accepted" ? "Accept" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
