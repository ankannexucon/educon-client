import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Chip,
  Button,
  Typography,
  Grid,
  Container,
  Tabs,
  Tab,
  Paper,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Badge,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Search,
  FilterList,
  Download,
  Visibility,
  Cancel,
  Edit,
  CheckCircle,
  Pending,
  Schedule,
  Warning,
  Error as ErrorIcon,
  TaskAlt,
  Assignment,
  School,
  LocationOn,
  AttachMoney,
  Event,
  ExpandMore,
  ExpandLess,
  Chat,
  Email,
  Phone,
  Share,
  Bookmark
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';

// Dummy application data
const applicationData = [
  {
    id: 1,
    scholarshipId: 1,
    title: "International Excellence Scholarship",
    university: "University of Oxford",
    country: "United Kingdom",
    amount: "£10,000",
    appliedDate: "2024-01-15",
    deadline: "2024-03-15",
    status: "under_review", // submitted, under_review, shortlisted, accepted, rejected
    progress: 75,
    currentStep: 3,
    steps: [
      {
        label: "Application Submitted",
        description: "Your application has been successfully submitted",
        date: "2024-01-15",
        completed: true
      },
      {
        label: "Document Verification",
        description: "Documents are being verified by the admissions team",
        date: "2024-01-20",
        completed: true
      },
      {
        label: "Under Review",
        description: "Application is being reviewed by the scholarship committee",
        date: "2024-01-25",
        completed: true
      },
      {
        label: "Final Decision",
        description: "Awaiting final decision from the committee",
        date: "Expected by 2024-02-28",
        completed: false
      }
    ],
    documents: [
      { name: "Academic Transcripts.pdf", uploaded: true, verified: true },
      { name: "Language Test Results.pdf", uploaded: true, verified: true },
      { name: "Personal Statement.pdf", uploaded: true, verified: false },
      { name: "Recommendation Letters.pdf", uploaded: false, verified: false }
    ],
    notes: [
      {
        date: "2024-01-20",
        message: "Documents received and under verification",
        type: "info"
      },
      {
        date: "2024-01-25",
        message: "Application moved to review phase",
        type: "info"
      }
    ],
    contactPerson: {
      name: "Dr. Sarah Johnson",
      email: "s.johnson@oxford.ac.uk",
      phone: "+44 1865 270000",
      department: "International Scholarships Office"
    }
  },
  {
    id: 2,
    scholarshipId: 2,
    title: "Global Leaders Scholarship",
    university: "Harvard University",
    country: "USA",
    amount: "$25,000",
    appliedDate: "2024-01-10",
    deadline: "2024-04-30",
    status: "shortlisted",
    progress: 90,
    currentStep: 4,
    steps: [
      {
        label: "Application Submitted",
        description: "Your application has been successfully submitted",
        date: "2024-01-10",
        completed: true
      },
      {
        label: "Document Verification",
        description: "All documents verified successfully",
        date: "2024-01-18",
        completed: true
      },
      {
        label: "Initial Screening",
        description: "Passed initial screening round",
        date: "2024-01-25",
        completed: true
      },
      {
        label: "Shortlisted",
        description: "Congratulations! You have been shortlisted for the final round",
        date: "2024-02-01",
        completed: true
      },
      {
        label: "Final Interview",
        description: "Scheduled for February 15, 2024",
        date: "2024-02-15",
        completed: false
      }
    ],
    documents: [
      { name: "Academic Transcripts.pdf", uploaded: true, verified: true },
      { name: "TOEFL Results.pdf", uploaded: true, verified: true },
      { name: "Leadership Certificates.pdf", uploaded: true, verified: true },
      { name: "Personal Statement.pdf", uploaded: true, verified: true }
    ],
    notes: [
      {
        date: "2024-01-18",
        message: "All documents verified successfully",
        type: "success"
      },
      {
        date: "2024-02-01",
        message: "Application shortlisted for final interview round",
        type: "success"
      }
    ],
    contactPerson: {
      name: "Prof. Michael Chen",
      email: "mchen@fas.harvard.edu",
      phone: "+1 617-495-1000",
      department: "Graduate Admissions"
    }
  },
  {
    id: 3,
    scholarshipId: 3,
    title: "ASEAN Scholarship",
    university: "National University of Singapore",
    country: "Singapore",
    amount: "S$15,000",
    appliedDate: "2024-01-05",
    deadline: "2024-02-28",
    status: "submitted",
    progress: 40,
    currentStep: 2,
    steps: [
      {
        label: "Application Submitted",
        description: "Your application has been successfully submitted",
        date: "2024-01-05",
        completed: true
      },
      {
        label: "Document Verification",
        description: "Awaiting document verification",
        date: "In progress",
        completed: true
      },
      {
        label: "Committee Review",
        description: "Pending committee review",
        date: "Expected by 2024-02-10",
        completed: false
      },
      {
        label: "Final Decision",
        description: "Awaiting final decision",
        date: "Expected by 2024-02-25",
        completed: false
      }
    ],
    documents: [
      { name: "Academic Transcripts.pdf", uploaded: true, verified: false },
      { name: "IELTS Results.pdf", uploaded: true, verified: false },
      { name: "Passport Copy.pdf", uploaded: true, verified: false },
      { name: "Financial Documents.pdf", uploaded: false, verified: false }
    ],
    notes: [
      {
        date: "2024-01-05",
        message: "Application submitted successfully",
        type: "info"
      },
      {
        date: "2024-01-08",
        message: "Reminder: Financial documents pending",
        type: "warning"
      }
    ],
    contactPerson: {
      name: "Ms. Li Wei",
      email: "liwei@nus.edu.sg",
      phone: "+65 6516 6666",
      department: "International Student Services"
    }
  }
];

const statusConfig = {
  submitted: { label: "Submitted", color: "default", icon: <Pending /> },
  under_review: { label: "Under Review", color: "primary", icon: <Schedule /> },
  shortlisted: { label: "Shortlisted", color: "secondary", icon: <TaskAlt /> },
  accepted: { label: "Accepted", color: "success", icon: <CheckCircle /> },
  rejected: { label: "Rejected", color: "error", icon: <ErrorIcon /> }
};

const ScholarshipApplicationPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedApplication, setExpandedApplication] = useState(null);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleExpandApplication = (applicationId) => {
    setExpandedApplication(expandedApplication === applicationId ? null : applicationId);
  };

  const handleWithdrawClick = (application) => {
    setSelectedApplication(application);
    setWithdrawDialogOpen(true);
  };

  const handleWithdrawConfirm = () => {
    toast.success(`Application for ${selectedApplication.title} withdrawn successfully`);
    setWithdrawDialogOpen(false);
    setSelectedApplication(null);
  };

  const filteredApplications = applicationData.filter(application => {
    const matchesSearch = application.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.university.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 0) return matchesSearch; // All
    if (activeTab === 1) return matchesSearch && application.status === 'under_review';
    if (activeTab === 2) return matchesSearch && application.status === 'shortlisted';
    if (activeTab === 3) return matchesSearch && (application.status === 'submitted' || application.status === 'under_review');
    return matchesSearch;
  });

  const getStatusChip = (status) => {
    const config = statusConfig[status];
    return (
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color}
        variant="filled"
        size="small"
      />
    );
  };

  const ApplicationCard = ({ application }) => (
    <Card className="mb-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Typography variant="h6" className="font-bold text-gray-800">
                {application.title}
              </Typography>
              {getStatusChip(application.status)}
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <School className="mr-2 text-blue-500" fontSize="small" />
              <Typography variant="body2">{application.university}</Typography>
            </div>
            <div className="flex items-center text-gray-600">
              <LocationOn className="mr-2 text-green-500" fontSize="small" />
              <Typography variant="body2">{application.country}</Typography>
            </div>
          </div>
          <div className="flex space-x-2">
            <IconButton size="small" className="text-gray-400">
              <Bookmark />
            </IconButton>
            <IconButton size="small" className="text-gray-400">
              <Share />
            </IconButton>
          </div>
        </div>

        {/* Progress Section */}
        <Box className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <Typography variant="body2" className="font-medium text-gray-700">
              Application Progress
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              {application.progress}%
            </Typography>
          </div>
          <LinearProgress 
            variant="determinate" 
            value={application.progress} 
            color={
              application.status === 'shortlisted' ? 'secondary' :
              application.status === 'under_review' ? 'primary' : 'primary'
            }
            className="h-2 rounded-full"
          />
        </Box>

        {/* Key Information */}
        <Grid container spacing={3} className="mb-4">
          <Grid item xs={12} sm={6} md={3}>
            <div className="flex items-center">
              <AttachMoney className="mr-2 text-green-600" fontSize="small" />
              <div>
                <Typography variant="caption" className="text-gray-500">Amount</Typography>
                <Typography variant="body2" className="font-semibold">{application.amount}</Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className="flex items-center">
              <Event className="mr-2 text-blue-600" fontSize="small" />
              <div>
                <Typography variant="caption" className="text-gray-500">Applied</Typography>
                <Typography variant="body2" className="font-semibold">
                  {new Date(application.appliedDate).toLocaleDateString()}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className="flex items-center">
              <Event className="mr-2 text-red-500" fontSize="small" />
              <div>
                <Typography variant="caption" className="text-gray-500">Deadline</Typography>
                <Typography variant="body2" className="font-semibold">
                  {new Date(application.deadline).toLocaleDateString()}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className="flex items-center">
              <Assignment className="mr-2 text-purple-500" fontSize="small" />
              <div>
                <Typography variant="caption" className="text-gray-500">Current Step</Typography>
                <Typography variant="body2" className="font-semibold">
                  {application.steps[application.currentStep - 1]?.label}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>

        {/* Expandable Details */}
        <Box>
          <Button
            fullWidth
            variant="outlined"
            endIcon={expandedApplication === application.id ? <ExpandLess /> : <ExpandMore />}
            onClick={() => handleExpandApplication(application.id)}
            className="mb-4"
          >
            View Application Details
          </Button>

          {expandedApplication === application.id && (
            <Box className="space-y-6">
              <Divider />
              
              {/* Application Timeline */}
              <Box>
                <Typography variant="h6" className="font-semibold mb-3 text-gray-800">
                  Application Timeline
                </Typography>
                <Stepper activeStep={application.currentStep - 1} orientation="vertical">
                  {application.steps.map((step, index) => (
                    <Step key={step.label} completed={step.completed}>
                      <StepLabel 
                        optional={
                          <Typography variant="caption" className="text-gray-500">
                            {step.date}
                          </Typography>
                        }
                      >
                        <Typography variant="body1" className="font-medium">
                          {step.label}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          {step.description}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        {index === application.currentStep - 1 && (
                          <Box className="mt-2">
                            <Chip 
                              label="Current Step" 
                              color="primary" 
                              size="small" 
                              variant="outlined" 
                            />
                          </Box>
                        )}
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              {/* Documents Section */}
              <Box>
                <Typography variant="h6" className="font-semibold mb-3 text-gray-800">
                  Required Documents
                </Typography>
                <List dense>
                  {application.documents.map((doc, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {doc.verified ? (
                          <CheckCircle color="success" />
                        ) : doc.uploaded ? (
                          <Pending color="action" />
                        ) : (
                          <Warning color="warning" />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={doc.name}
                        secondary={
                          doc.verified ? "Verified" : 
                          doc.uploaded ? "Under Review" : "Not Uploaded"
                        }
                      />
                      <ListItemSecondaryAction>
                        {doc.uploaded && (
                          <IconButton size="small">
                            <Download />
                          </IconButton>
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Contact Information */}
              <Box className="bg-blue-50 p-4 rounded-lg">
                <Typography variant="h6" className="font-semibold mb-3 text-gray-800">
                  Contact Person
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="font-medium">{application.contactPerson.name}</Typography>
                    <Typography variant="body2" className="text-gray-600">{application.contactPerson.department}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center">
                        <Email fontSize="small" className="mr-2 text-gray-500" />
                        <Typography variant="body2">{application.contactPerson.email}</Typography>
                      </div>
                      <div className="flex items-center">
                        <Phone fontSize="small" className="mr-2 text-gray-500" />
                        <Typography variant="body2">{application.contactPerson.phone}</Typography>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Box>

              {/* Action Buttons */}
              <Box className="flex flex-wrap gap-2 justify-end">
                <Button 
                  variant="outlined" 
                  startIcon={<Visibility />}
                  onClick={() => toast.success('Opening application details...')}
                >
                  View Application
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<Chat />}
                  onClick={() => toast.success('Opening chat with advisor...')}
                >
                  Contact Advisor
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
                  startIcon={<Cancel />}
                  onClick={() => handleWithdrawClick(application)}
                >
                  Withdraw Application
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <Container maxWidth="lg">
          <div className="text-center">
            <Typography variant="h3" className="font-bold mb-4">
              My Scholarship Applications
            </Typography>
            <Typography variant="h6" className="mb-8 opacity-90">
              Track and manage your scholarship applications in one place
            </Typography>
            
            {/* Search Bar */}
            <Paper className="max-w-2xl mx-auto p-2 flex items-center">
              <Search className="mx-2 text-gray-400" />
              <InputBase
                placeholder="Search applications, universities, or scholarships..."
                className="flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton className="p-2">
                <FilterList />
              </IconButton>
            </Paper>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container maxWidth="lg" className="py-8">
        {/* Stats Cards */}
        <Grid container spacing={3} className="mb-8">
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="p-4 text-center shadow-md bg-white">
              <Typography variant="h4" className="text-blue-600 font-bold">
                {applicationData.length}
              </Typography>
              <Typography variant="body2" className="text-gray-600">Total Applications</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="p-4 text-center shadow-md bg-white">
              <Typography variant="h4" className="text-green-600 font-bold">
                {applicationData.filter(app => app.status === 'shortlisted').length}
              </Typography>
              <Typography variant="body2" className="text-gray-600">Shortlisted</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="p-4 text-center shadow-md bg-white">
              <Typography variant="h4" className="text-orange-600 font-bold">
                {applicationData.filter(app => app.status === 'under_review').length}
              </Typography>
              <Typography variant="body2" className="text-gray-600">Under Review</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="p-4 text-center shadow-md bg-white">
              <Typography variant="h4" className="text-purple-600 font-bold">
                {applicationData.filter(app => app.status === 'submitted').length}
              </Typography>
              <Typography variant="body2" className="text-gray-600">Submitted</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper className="mb-8">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            className="border-b"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label={`All Applications (${applicationData.length})`} />
            <Tab label={`Under Review (${applicationData.filter(app => app.status === 'under_review').length})`} />
            <Tab label={`Shortlisted (${applicationData.filter(app => app.status === 'shortlisted').length})`} />
            <Tab label={`Pending Action (${applicationData.filter(app => app.status === 'submitted' || app.status === 'under_review').length})`} />
          </Tabs>
        </Paper>

        {/* Applications List */}
        <Typography variant="h5" className="font-bold mb-6 text-gray-800">
          {activeTab === 0 && 'All Applications'}
          {activeTab === 1 && 'Applications Under Review'}
          {activeTab === 2 && 'Shortlisted Applications'}
          {activeTab === 3 && 'Applications Pending Action'}
          <span className="text-blue-600 ml-2">({filteredApplications.length})</span>
        </Typography>

        {filteredApplications.length === 0 ? (
          <Paper className="p-8 text-center">
            <Typography variant="h6" className="text-gray-500 mb-4">
              No applications found matching your criteria.
            </Typography>
            <Button variant="contained" className="bg-blue-600 hover:bg-blue-700">
              Browse Scholarships
            </Button>
          </Paper>
        ) : (
          filteredApplications.map(application => (
            <ApplicationCard
              key={application.id}
              application={application}
            />
          ))
        )}
      </Container>

      {/* Withdraw Confirmation Dialog */}
      <Dialog
        open={withdrawDialogOpen}
        onClose={() => setWithdrawDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="bg-red-50 text-red-700">
          <Warning className="mr-2" />
          Withdraw Application
        </DialogTitle>
        <DialogContent className="pt-4">
          <Typography variant="body1" className="mb-4">
            Are you sure you want to withdraw your application for:
          </Typography>
          <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
            {selectedApplication?.title}
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            {selectedApplication?.university}
          </Typography>
          <Typography variant="body2" className="text-red-600 mt-4">
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setWithdrawDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleWithdrawConfirm}
            variant="contained" 
            color="error"
          >
            Withdraw Application
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ScholarshipApplicationPage;