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
  IconButton,
  InputBase,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Search,
  ExpandMore,
  LocationOn,
  School,
  AttachMoney,
  Event,
  Flag,
  Language,
  Grade,
  Bookmark,
  Share,
  FilterList
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import ScholarshipApplicationModal from "../../components/course/ScholarshipApplicationModal";


// Dummy scholarship data
const scholarshipData = {
  course: [
    {
      id: 1,
      title: "International Excellence Scholarship",
      university: "University of Oxford",
      country: "United Kingdom",
      degree: "Bachelor's",
      field: "Computer Science, Engineering, Business",
      amount: "£10,000",
      deadline: "2024-03-15",
      duration: "1 year",
      eligibility: "International students with 90%+ in previous qualification",
      description: "This scholarship recognizes outstanding academic achievement and potential in international students.",
      tags: ["Full Tuition", "Merit-based", "Renewable"],
      language: "IELTS 7.0+",
      applicationFee: "Free"
    },
    {
      id: 2,
      title: "Global Leaders Scholarship",
      university: "Harvard University",
      country: "USA",
      degree: "Master's",
      field: "All Fields",
      amount: "$25,000",
      deadline: "2024-04-30",
      duration: "2 years",
      eligibility: "Leadership experience + 3.5 GPA",
      description: "For students demonstrating exceptional leadership qualities and academic excellence.",
      tags: ["Partial Funding", "Leadership", "Accommodation"],
      language: "TOEFL 100+",
      applicationFee: "$85"
    },
    {
      id: 3,
      title: "ASEAN Scholarship",
      university: "National University of Singapore",
      country: "Singapore",
      degree: "Bachelor's",
      field: "Engineering, Science, Arts",
      amount: "S$15,000",
      deadline: "2024-02-28",
      duration: "4 years",
      eligibility: "ASEAN nationals with outstanding academic records",
      description: "Comprehensive scholarship covering tuition and living expenses for ASEAN students.",
      tags: ["Full Ride", "ASEAN", "Living Stipend"],
      language: "IELTS 6.5+",
      applicationFee: "Free"
    }
  ],
  visa: [
    {
      id: 4,
      title: "Student Visa Support Grant",
      organization: "Australian Government",
      country: "Australia",
      type: "Visa Fee Waiver",
      amount: "AUD $650",
      deadline: "2024-05-20",
      duration: "Visa period",
      eligibility: "Students from developing countries",
      description: "Covers student visa application fees for eligible international students.",
      tags: ["Visa Fee", "Government", "Need-based"],
      requirements: "Admission letter, Financial proof, Health insurance"
    },
    {
      id: 5,
      title: "International Student Visa Scholarship",
      organization: "Canadian Immigration",
      country: "Canada",
      type: "Visa Processing Support",
      amount: "CAD $500 + Processing",
      deadline: "2024-06-15",
      duration: "One-time",
      eligibility: "All international students",
      description: "Assistance with visa processing fees and documentation support.",
      tags: ["Processing", "Documentation", "Support"],
      requirements: "Valid passport, Admission proof, Financial documents"
    }
  ]
};

const ScholarshipPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const handleApplyClick = (scholarship) => {
    setSelectedScholarship(scholarship);
    setApplyDialogOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleShareClick = (scholarship) => {
    const shareableLink = `${window.location.origin}/scholarships/${scholarship.id}`;
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast.success('Link copied to clipboard!', {
        duration: 2000,
      });
    }).catch(() => {
      toast.error('Failed to copy link to clipboard');
    });
  };

  const filteredScholarships = scholarshipData[activeTab === 0 ? 'course' : 'visa'].filter(scholarship =>
    scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.university?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ScholarshipCard = ({ scholarship, type }) => (
    <Card className="mb-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Typography variant="h6" className="font-bold text-gray-800 mb-2">
              {scholarship.title}
            </Typography>
            <div className="flex items-center text-gray-600 mb-2">
              <School className="mr-2 text-blue-500" fontSize="small" />
              <Typography variant="body2">
                {type === 'course' ? scholarship.university : scholarship.organization}
              </Typography>
            </div>
            <div className="flex items-center text-gray-600 mb-3">
              <LocationOn className="mr-2 text-green-500" fontSize="small" />
              <Typography variant="body2">{scholarship.country}</Typography>
              <Flag className="ml-4 mr-2 text-red-500" fontSize="small" />
              <Typography variant="body2">
                {type === 'course' ? scholarship.degree : scholarship.type}
              </Typography>
            </div>
          </div>
          <div className="flex space-x-2">
            <IconButton size="small" className="text-gray-400">
              <Bookmark />
            </IconButton>
            <IconButton size="small" className="text-gray-400" onClick={() => handleShareClick(scholarship)}>
              <Share />
            </IconButton>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <AttachMoney className="mr-2 text-green-600" fontSize="small" />
            <div>
              <Typography variant="caption" className="text-gray-500">Amount</Typography>
              <Typography variant="body2" className="font-semibold">{scholarship.amount}</Typography>
            </div>
          </div>
          <div className="flex items-center">
            <Event className="mr-2 text-red-500" fontSize="small" />
            <div>
              <Typography variant="caption" className="text-gray-500">Deadline</Typography>
              <Typography variant="body2" className="font-semibold">
                {new Date(scholarship.deadline).toLocaleDateString()}
              </Typography>
            </div>
          </div>
        </div>

        {type === 'course' && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Grade className="mr-2 text-purple-500" fontSize="small" />
              <Typography variant="body2" className="font-medium">Field: {scholarship.field}</Typography>
            </div>
            <div className="flex items-center">
              <Language className="mr-2 text-blue-500" fontSize="small" />
              <Typography variant="body2">{scholarship.language}</Typography>
            </div>
          </div>
        )}

        <Typography variant="body2" className="text-gray-600 mb-4">
          {scholarship.description}
        </Typography>

        <div className="flex flex-wrap gap-2 mb-4">
          {scholarship.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              className="bg-blue-50 text-blue-600 border border-blue-200"
            />
          ))}
        </div>

        <Accordion
          expanded={expanded === scholarship.id}
          onChange={() => setExpanded(expanded === scholarship.id ? false : scholarship.id)}
          className="mb-4"
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className="font-medium">Eligibility & Requirements</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" className="mb-2">
              <strong>Eligibility:</strong> {scholarship.eligibility}
            </Typography>
            {type === 'course' ? (
              <Typography variant="body2">
                <strong>Application Fee:</strong> {scholarship.applicationFee}
              </Typography>
            ) : (
              <Typography variant="body2">
                <strong>Requirements:</strong> {scholarship.requirements}
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>

        <div className="flex justify-between items-center">
          <Typography variant="caption" className="text-gray-500">
            Duration: {scholarship.duration}
          </Typography>
          <Button
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            onClick={() => handleApplyClick(scholarship)}
          >
            Apply Now
          </Button>
        </div>
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
              Study Abroad Scholarships
            </Typography>
            <Typography variant="h6" className="mb-8 opacity-90">
              Discover financial aid opportunities for courses and visa support worldwide
            </Typography>

            {/* Search Bar */}
            <Paper className="max-w-2xl mx-auto p-2 flex items-center">
              <InputBase
                placeholder="Search scholarships, universities, or countries..."
                className="flex-1 ml-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton className="p-2">
                <FilterList />
              </IconButton>
              <Divider orientation="vertical" className="mx-2 h-6" />
              <IconButton className="p-2 text-blue-600">
                <Search />
              </IconButton>
            </Paper>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container maxWidth="lg" className="py-8">
        {/* Tabs */}
        <Paper className="mb-8">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            className="border-b"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label={
                <div className="flex items-center">
                  <School className="mr-2" />
                  Course Scholarships
                </div>
              }
            />
            <Tab
              label={
                <div className="flex items-center">
                  <Flag className="mr-2" />
                  Visa Support Scholarships
                </div>
              }
            />
          </Tabs>
        </Paper>

        {/* Stats */}
        <Grid container spacing={3} className="mb-8">
          {[
            { value: "50+", color: "text-blue-600", label: "Scholarships" },
            { value: "25+", color: "text-green-600", label: "Countries" },
            { value: "50k+", color: "text-red-600", label: "Universities" },
            { value: "$5M+", color: "text-purple-600", label: "Total Funding" },
            { value: "1000+", color: "text-orange-600", label: "Students Helped" },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                className="flex flex-col justify-center items-center p-6 shadow-md h-full w-full"
                sx={{
                  width: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" className={`${item.color} font-bold`}>
                  {item.value}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {item.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Scholarship List */}
        <Typography variant="h5" className="font-bold mb-6 text-gray-800">
          {activeTab === 0 ? 'Course Scholarships' : 'Visa Support Scholarships'}
          <span className="text-blue-600 ml-2">({filteredScholarships.length})</span>
        </Typography>

        {filteredScholarships.length === 0 ? (
          <Paper className="p-8 text-center">
            <Typography variant="h6" className="text-gray-500">
              No scholarships found matching your search criteria.
            </Typography>
          </Paper>
        ) : (
          filteredScholarships.map(scholarship => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              type={activeTab === 0 ? 'course' : 'visa'}
            />
          ))
        )}
      </Container>
      {/* Apply Now Form Dialog */}
      <ScholarshipApplicationModal
        open={applyDialogOpen}
        onClose={() => setApplyDialogOpen(false)}
        scholarship={selectedScholarship}
      />
    </div>
  );
};

export default ScholarshipPage;