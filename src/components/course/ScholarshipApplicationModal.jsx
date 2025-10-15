import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
  IconButton
} from '@mui/material';
import {
  Close,
  CheckCircle,
  Upload
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

const ScholarshipApplicationModal = ({ open, onClose, scholarship }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',

    // Academic Information
    currentEducation: '',
    institution: '',
    fieldOfStudy: '',
    previousGPA: '',
    languageScore: '',
    languageTest: 'IELTS',

    // Documents & Essay
    personalStatement: '',
    researchProposal: '',
    agreeToTerms: false,
    receiveUpdates: true
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const steps = ['Personal Info', 'Academic Info', 'Documents & Essay', 'Review'];

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'India',
    'China', 'Germany', 'France', 'Japan', 'South Korea', 'Brazil', 'Other'
  ];

  const educationLevels = [
    'High School',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Other'
  ];

  const languageTests = [
    'IELTS',
    'TOEFL',
    'PTE',
    'Duolingo',
    'Cambridge',
    'Other'
  ];

  const fieldsOfStudy = [
    'Computer Science',
    'Engineering',
    'Business Administration',
    'Medicine',
    'Law',
    'Arts & Humanities',
    'Social Sciences',
    'Natural Sciences',
    'Other'
  ];

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Personal Info
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.nationality) newErrors.nationality = 'Nationality is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.country) newErrors.country = 'Country is required';
        break;

      case 1: // Academic Info
        if (!formData.currentEducation) newErrors.currentEducation = 'Current education level is required';
        if (!formData.institution.trim()) newErrors.institution = 'Institution name is required';
        if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Field of study is required';
        if (!formData.previousGPA) newErrors.previousGPA = 'Previous GPA is required';
        if (!formData.languageScore) newErrors.languageScore = 'Language test score is required';
        break;

      case 2: // Documents & Essay
        if (!formData.personalStatement.trim()) newErrors.personalStatement = 'Personal statement is required';
        else if (formData.personalStatement.length < 200) newErrors.personalStatement = 'Personal statement must be at least 200 characters';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateStep(activeStep)) {
      // Simulate API call
      setTimeout(() => {
        toast.success(
          <Box>
            <Typography variant="h6" className="font-semibold mb-2">
              Application Submitted Successfully!
            </Typography>
            <Typography variant="body2">
              Your application for <strong>{scholarship?.title}</strong> has been received.
            </Typography>
            <Link
              to="/your-application"
              style={{ color: "#4f46e5", textDecoration: "underline" }}
            >
              Track Your Application
            </Link>
          </Box>,
          {
            duration: 6000,
          }
        );

        onClose();
        resetForm();
      }, 1500);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      currentEducation: '',
      institution: '',
      fieldOfStudy: '',
      previousGPA: '',
      languageScore: '',
      languageTest: 'IELTS',
      personalStatement: '',
      researchProposal: '',
      agreeToTerms: false,
      receiveUpdates: true
    });
    setErrors({});
    setTouched({});
    setActiveStep(0);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box className="space-y-6">
            <Paper className="p-4 bg-blue-50 border-l-4 border-blue-500">
              <Typography variant="body2" className="text-blue-800">
                Please fill in your personal information accurately. This information will be used for communication and verification purposes.
              </Typography>
            </Paper>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.fullName}
                  onChange={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  error={!!errors.fullName && touched.fullName}
                  helperText={errors.fullName && touched.fullName ? errors.fullName : ''}
                  required
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={!!errors.email && touched.email}
                  helperText={errors.email && touched.email ? errors.email : ''}
                  required
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={!!errors.phone && touched.phone}
                  helperText={errors.phone && touched.phone ? errors.phone : ''}
                  required
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange('dateOfBirth')}
                  onBlur={handleBlur('dateOfBirth')}
                  error={!!errors.dateOfBirth && touched.dateOfBirth}
                  helperText={errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : ''}
                  required
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.nationality && touched.nationality} required size="small">
                  <InputLabel>Nationality</InputLabel>
                  <Select
                    value={formData.nationality}
                    label="Nationality"
                    onChange={handleChange('nationality')}
                    onBlur={handleBlur('nationality')}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.nationality && touched.nationality && (
                    <FormHelperText>{errors.nationality}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.country && touched.country} required size="small">
                  <InputLabel>Country of Residence</InputLabel>
                  <Select
                    value={formData.country}
                    label="Country of Residence"
                    onChange={handleChange('country')}
                    onBlur={handleBlur('country')}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.country && touched.country && (
                    <FormHelperText>{errors.country}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  value={formData.address}
                  onChange={handleChange('address')}
                  onBlur={handleBlur('address')}
                  error={!!errors.address && touched.address}
                  helperText={errors.address && touched.address ? errors.address : ''}
                  required
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={formData.city}
                  onChange={handleChange('city')}
                  onBlur={handleBlur('city')}
                  error={!!errors.city && touched.city}
                  helperText={errors.city && touched.city ? errors.city : ''}
                  required
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange('postalCode')}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box className="space-y-6">
            <Paper className="p-4 bg-green-50 border-l-4 border-green-500">
              <Typography variant="body2" className="text-green-800">
                Provide your academic background and qualifications. This helps us assess your eligibility for the scholarship.
              </Typography>
            </Paper>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.currentEducation && touched.currentEducation} required size="small">
                  <InputLabel>Current Education Level</InputLabel>
                  <Select
                    value={formData.currentEducation}
                    label="Current Education Level"
                    onChange={handleChange('currentEducation')}
                    onBlur={handleBlur('currentEducation')}
                  >
                    {educationLevels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.currentEducation && touched.currentEducation && (
                    <FormHelperText>{errors.currentEducation}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Current Institution"
                  value={formData.institution}
                  onChange={handleChange('institution')}
                  onBlur={handleBlur('institution')}
                  error={!!errors.institution && touched.institution}
                  helperText={errors.institution && touched.institution ? errors.institution : ''}
                  required
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.fieldOfStudy && touched.fieldOfStudy} required size="small">
                  <InputLabel>Field of Study</InputLabel>
                  <Select
                    value={formData.fieldOfStudy}
                    label="Field of Study"
                    onChange={handleChange('fieldOfStudy')}
                    onBlur={handleBlur('fieldOfStudy')}
                  >
                    {fieldsOfStudy.map((field) => (
                      <MenuItem key={field} value={field}>
                        {field}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.fieldOfStudy && touched.fieldOfStudy && (
                    <FormHelperText>{errors.fieldOfStudy}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="GPA/Percentage"
                  value={formData.previousGPA}
                  onChange={handleChange('previousGPA')}
                  onBlur={handleBlur('previousGPA')}
                  error={!!errors.previousGPA && touched.previousGPA}
                  helperText={errors.previousGPA && touched.previousGPA ? errors.previousGPA : 'e.g., 3.8/4.0 or 95%'}
                  required
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Language Test</InputLabel>
                  <Select
                    value={formData.languageTest}
                    label="Language Test"
                    onChange={handleChange('languageTest')}
                  >
                    {languageTests.map((test) => (
                      <MenuItem key={test} value={test}>
                        {test}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Test Score"
                  value={formData.languageScore}
                  onChange={handleChange('languageScore')}
                  onBlur={handleBlur('languageScore')}
                  error={!!errors.languageScore && touched.languageScore}
                  helperText={errors.languageScore && touched.languageScore ? errors.languageScore : 'e.g., 7.5 for IELTS or 105 for TOEFL'}
                  required
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Upload />}
                  fullWidth
                  className="py-3"
                >
                  Upload Academic Transcripts
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={(e) => console.log('Files:', e.target.files)}
                  />
                </Button>
                <FormHelperText className="text-center">
                  Supported formats: PDF, DOC, JPG (Max 10MB per file)
                </FormHelperText>
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box className="space-y-6">
            <Paper className="p-4 bg-purple-50 border-l-4 border-purple-500">
              <Typography variant="body2" className="text-purple-800">
                Your personal statement is crucial for your application. Be authentic and explain why you deserve this scholarship.
              </Typography>
            </Paper>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Personal Statement"
                  value={formData.personalStatement}
                  onChange={handleChange('personalStatement')}
                  onBlur={handleBlur('personalStatement')}
                  error={!!errors.personalStatement && touched.personalStatement}
                  helperText={
                    errors.personalStatement && touched.personalStatement
                      ? errors.personalStatement
                      : `Minimum 200 characters (${formData.personalStatement.length}/200)`
                  }
                  required
                  variant="outlined"
                  placeholder="Describe your academic achievements, career goals, and why you deserve this scholarship..."
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Research Proposal (Optional)"
                  value={formData.researchProposal}
                  onChange={handleChange('researchProposal')}
                  variant="outlined"
                  placeholder="If applicable, briefly describe your research interests or proposal..."
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Upload />}
                  fullWidth
                  className="py-3"
                >
                  Upload Additional Documents
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={(e) => console.log('Files:', e.target.files)}
                  />
                </Button>
                <FormHelperText className="text-center">
                  Passport copy, recommendation letters, certificates, etc.
                </FormHelperText>
              </Grid>

              <Grid item xs={12}>
                <FormControl error={!!errors.agreeToTerms} required>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.agreeToTerms}
                        onChange={handleChange('agreeToTerms')}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I certify that all information provided is accurate and complete. I agree to the
                        <Button color="primary" size="small" className="ml-1">terms and conditions</Button>.
                      </Typography>
                    }
                  />
                  {errors.agreeToTerms && (
                    <FormHelperText>{errors.agreeToTerms}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.receiveUpdates}
                      onChange={handleChange('receiveUpdates')}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I wish to receive updates about my application and other scholarship opportunities
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box className="space-y-6">
            <Paper className="p-4 bg-green-50 border-l-4 border-green-500">
              <Typography variant="body2" className="text-green-800 flex items-center">
                <CheckCircle className="mr-2 text-green-600" />
                Please review your application before submitting. Ensure all information is accurate.
              </Typography>
            </Paper>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" className="font-semibold mb-4 text-gray-700">
                  Application Summary
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" className="text-gray-500">Full Name</Typography>
                <Typography variant="body1" className="font-medium">{formData.fullName}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" className="text-gray-500">Email</Typography>
                <Typography variant="body1" className="font-medium">{formData.email}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" className="text-gray-500">Education Level</Typography>
                <Typography variant="body1" className="font-medium">{formData.currentEducation}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" className="text-gray-500">GPA/Percentage</Typography>
                <Typography variant="body1" className="font-medium">{formData.previousGPA}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider className="my-2" />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" className="text-gray-500 mb-2">Personal Statement Preview</Typography>
                <Paper className="p-3 bg-gray-50 max-h-32 overflow-y-auto">
                  <Typography variant="body2" className="text-gray-700">
                    {formData.personalStatement || 'No personal statement provided'}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative">
        <Box className="flex items-center justify-between">
          <Box>
            <Typography variant="h5" className="font-bold">
              Apply for Scholarship
            </Typography>
            <Typography variant="body2" className="text-blue-100">
              {scholarship?.title}
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            className="text-white hover:bg-white hover:bg-opacity-20"
            size="small"
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Box className="px-6 pt-4">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <form onSubmit={handleSubmit}>
        <DialogContent className="pt-6 pb-4">
          {renderStepContent(activeStep)}
        </DialogContent>

        <DialogActions className="p-4 border-t bg-gray-50">
          <Box className="flex justify-between w-full">
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              className="text-gray-600"
            >
              Back
            </Button>

            <Box className="flex space-x-2">
              <Button
                onClick={handleClose}
                className="text-gray-600"
              >
                Cancel
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6"
                  startIcon={<CheckCircle />}
                >
                  Submit Application
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  className="bg-blue-600 hover:bg-blue-700 px-6"
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ScholarshipApplicationModal;