import React, { useState, useRef } from 'react';

const DocumentVerification = () => {
  const [selectedDocument, setSelectedDocument] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [verificationResults, setVerificationResults] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const fileInputRef = useRef(null);

  const documentTypes = [
    { id: 'education', name: 'Education Certificate', icon: '🎓' },
    { id: 'financial', name: 'Financial Document', icon: '💰' },
    { id: 'identity', name: 'Identity Proof', icon: '🆔' },
    { id: 'tax', name: 'Tax Document', icon: '📊' },
    { id: 'bank', name: 'Bank Statement', icon: '🏦' },
    { id: 'legal', name: 'Legal Document', icon: '⚖️' }
  ];

  const fraudIndicators = [
    'Inconsistent Fonts',
    'Mismatched Logos',
    'Invalid Signatures',
    'Tampered Dates',
    'Format Anomalies',
    'Metadata Issues',
    'Pixelation',
    'Watermark Issues'
  ];

  const handleDocumentSelect = (docType) => {
    setSelectedDocument(docType);
    setUploadedFiles([]);
    setVerificationResults([]);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file,
      status: 'pending',
      uploadedAt: new Date()
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const simulateVerification = () => {
    if (uploadedFiles.length === 0 || !selectedDocument) return;

    setIsVerifying(true);
    setVerificationProgress(0);
    setVerificationResults([]);

    const progressInterval = setInterval(() => {
      setVerificationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(progressInterval);
      const results = uploadedFiles.map(file => {
        const isFraudulent = Math.random() > 0.7; // 30% chance of fraud for demo
        const fraudScore = Math.random() * 100;
        const detectedIssues = isFraudulent 
          ? fraudIndicators.slice(0, Math.floor(Math.random() * 3) + 1)
          : [];

        return {
          fileId: file.id,
          fileName: file.name,
          isVerified: !isFraudulent,
          fraudScore: Math.round(fraudScore),
          detectedIssues,
          verificationDate: new Date(),
          confidence: Math.round(100 - fraudScore)
        };
      });

      setVerificationResults(results);
      setIsVerifying(false);
      setVerificationProgress(100);
    }, 2000);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    setVerificationResults(prev => prev.filter(result => result.fileId !== fileId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return '#10b981';
      case 'fraudulent': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return '✅';
      case 'fraudulent': return '❌';
      case 'pending': return '⏳';
      default: return '📄';
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Document Fraud Detection System</h1>
          <p style={styles.subtitle}>
            Advanced AI-powered verification for educational and financial documents
          </p>
        </div>
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>99.8%</div>
            <div style={styles.statLabel}>Accuracy</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>50K+</div>
            <div style={styles.statLabel}>Documents Verified</div>
          </div>
        </div>
      </div>

      <div style={styles.content}>
        {/* Left Panel - Document Selection & Upload */}
        <div style={styles.leftPanel}>
          {/* Document Type Selection */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Select Document Type</h3>
            <div style={styles.documentGrid}>
              {documentTypes.map(doc => (
                <div
                  key={doc.id}
                  style={{
                    ...styles.documentCard,
                    ...(selectedDocument === doc.id ? styles.documentCardSelected : {})
                  }}
                  onClick={() => handleDocumentSelect(doc.id)}
                >
                  <div style={styles.documentIcon}>{doc.icon}</div>
                  <div style={styles.documentName}>{doc.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Upload Documents</h3>
            <div
              style={styles.uploadArea}
              onClick={() => fileInputRef.current?.click()}
            >
              <div style={styles.uploadIcon}>📁</div>
              <div style={styles.uploadText}>
                Click to upload or drag and drop
              </div>
              <div style={styles.uploadSubtext}>
                Supports PDF, JPG, PNG (Max 10MB each)
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                style={styles.fileInput}
              />
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div style={styles.uploadedFiles}>
                <h4 style={styles.uploadedFilesTitle}>Uploaded Files</h4>
                {uploadedFiles.map(file => (
                  <div key={file.id} style={styles.fileItem}>
                    <div style={styles.fileInfo}>
                      <span style={styles.fileIcon}>📄</span>
                      <div>
                        <div style={styles.fileName}>{file.name}</div>
                        <div style={styles.fileDetails}>
                          {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      style={styles.removeButton}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Verify Button */}
          {uploadedFiles.length > 0 && selectedDocument && (
            <button
              onClick={simulateVerification}
              disabled={isVerifying}
              style={{
                ...styles.verifyButton,
                ...(isVerifying ? styles.verifyButtonDisabled : {})
              }}
            >
              {isVerifying ? 'Verifying...' : 'Start Fraud Detection'}
            </button>
          )}
        </div>

        {/* Right Panel - Results */}
        <div style={styles.rightPanel}>
          {/* Verification Progress */}
          {isVerifying && (
            <div style={styles.progressSection}>
              <h3 style={styles.sectionTitle}>Verification Progress</h3>
              <div style={styles.progressContainer}>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${verificationProgress}%`
                    }}
                  ></div>
                </div>
                <div style={styles.progressText}>
                  {verificationProgress}% Complete
                </div>
              </div>
              <div style={styles.verificationSteps}>
                <div style={styles.step}>📥 Document Analysis</div>
                <div style={styles.step}>🔍 Pattern Recognition</div>
                <div style={styles.step}>🤖 AI Verification</div>
                <div style={styles.step}>📊 Result Compilation</div>
              </div>
            </div>
          )}

          {/* Verification Results */}
          {verificationResults.length > 0 && (
            <div style={styles.resultsSection}>
              <h3 style={styles.sectionTitle}>Verification Results</h3>
              <div style={styles.resultsGrid}>
                {verificationResults.map(result => (
                  <div
                    key={result.fileId}
                    style={{
                      ...styles.resultCard,
                      borderColor: result.isVerified ? '#10b981' : '#ef4444'
                    }}
                  >
                    <div style={styles.resultHeader}>
                      <div style={styles.resultFileInfo}>
                        <span style={styles.resultIcon}>
                          {getStatusIcon(result.isVerified ? 'verified' : 'fraudulent')}
                        </span>
                        <div>
                          <div style={styles.resultFileName}>{result.fileName}</div>
                          <div style={styles.resultDate}>
                            Verified: {result.verificationDate.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          ...styles.statusBadge,
                          background: result.isVerified ? '#10b981' : '#ef4444'
                        }}
                      >
                        {result.isVerified ? 'VERIFIED' : 'FRAUDULENT'}
                      </div>
                    </div>

                    <div style={styles.resultMetrics}>
                      <div style={styles.metric}>
                        <div style={styles.metricLabel}>Fraud Score</div>
                        <div
                          style={{
                            ...styles.metricValue,
                            color: result.fraudScore > 50 ? '#ef4444' : '#10b981'
                          }}
                        >
                          {result.fraudScore}%
                        </div>
                      </div>
                      <div style={styles.metric}>
                        <div style={styles.metricLabel}>Confidence</div>
                        <div style={styles.metricValue}>{result.confidence}%</div>
                      </div>
                    </div>

                    {result.detectedIssues.length > 0 && (
                      <div style={styles.issuesSection}>
                        <div style={styles.issuesTitle}>Detected Issues:</div>
                        <div style={styles.issuesList}>
                          {result.detectedIssues.map((issue, index) => (
                            <div key={index} style={styles.issueItem}>
                              ⚠️ {issue}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.isVerified && (
                      <div style={styles.successMessage}>
                        ✅ Document passed all security checks
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isVerifying && verificationResults.length === 0 && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🔍</div>
              <h3 style={styles.emptyTitle}>No Verification Results</h3>
              <p style={styles.emptyText}>
                Upload documents and start verification to see results here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fraud Detection Features */}
      <div style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Advanced Fraud Detection Features</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔎</div>
            <h4 style={styles.featureTitle}>Pattern Analysis</h4>
            <p style={styles.featureDesc}>
              Advanced algorithms detect inconsistencies in document patterns and layouts
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📊</div>
            <h4 style={styles.featureTitle}>Metadata Verification</h4>
            <p style={styles.featureDesc}>
              Cross-reference document metadata with trusted sources
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🤖</div>
            <h4 style={styles.featureTitle}>AI-Powered Detection</h4>
            <p style={styles.featureDesc}>
              Machine learning models trained on thousands of fraudulent documents
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⚡</div>
            <h4 style={styles.featureTitle}>Real-time Processing</h4>
            <p style={styles.featureDesc}>
              Instant verification results with detailed fraud analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerContent: {
    flex: 1
  },
  title: {
    margin: 0,
    fontSize: '2.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #fff, #e0e7ff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    margin: '10px 0 0 0',
    fontSize: '1.1rem',
    opacity: 0.9
  },
  stats: {
    display: 'flex',
    gap: '30px'
  },
  statItem: {
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold'
  },
  statLabel: {
    fontSize: '0.9rem',
    opacity: 0.8
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '30px',
    padding: '30px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  section: {
    background: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1f2937'
  },
  documentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px'
  },
  documentCard: {
    padding: '20px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: 'white'
  },
  documentCardSelected: {
    borderColor: '#667eea',
    background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)'
  },
  documentIcon: {
    fontSize: '2rem',
    marginBottom: '10px'
  },
  documentName: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#374151'
  },
  uploadArea: {
    border: '2px dashed #d1d5db',
    borderRadius: '12px',
    padding: '40px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: '#f9fafb'
  },
  uploadIcon: {
    fontSize: '3rem',
    marginBottom: '15px',
    opacity: 0.7
  },
  uploadText: {
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px'
  },
  uploadSubtext: {
    fontSize: '0.9rem',
    color: '#6b7280'
  },
  fileInput: {
    display: 'none'
  },
  uploadedFiles: {
    marginTop: '20px'
  },
  uploadedFilesTitle: {
    margin: '0 0 15px 0',
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#374151'
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '10px',
    background: 'white'
  },
  fileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  fileIcon: {
    fontSize: '1.2rem'
  },
  fileName: {
    fontWeight: '500',
    color: '#374151'
  },
  fileDetails: {
    fontSize: '0.8rem',
    color: '#6b7280'
  },
  removeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '4px',
    transition: 'background 0.2s ease'
  },
  verifyButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
  },
  verifyButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  progressSection: {
    background: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
  },
  progressContainer: {
    marginBottom: '20px'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '10px'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    transition: 'width 0.3s ease',
    borderRadius: '4px'
  },
  progressText: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#374151'
  },
  verificationSteps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginTop: '20px'
  },
  step: {
    padding: '12px',
    background: '#f8fafc',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#374151'
  },
  resultsSection: {
    background: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
  },
  resultsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  resultCard: {
    border: '2px solid',
    borderRadius: '12px',
    padding: '20px',
    background: 'white'
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px'
  },
  resultFileInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  resultIcon: {
    fontSize: '1.5rem'
  },
  resultFileName: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '4px'
  },
  resultDate: {
    fontSize: '0.8rem',
    color: '#6b7280'
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  resultMetrics: {
    display: 'flex',
    gap: '30px',
    marginBottom: '15px'
  },
  metric: {
    textAlign: 'center'
  },
  metricLabel: {
    fontSize: '0.8rem',
    color: '#6b7280',
    marginBottom: '4px'
  },
  metricValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  issuesSection: {
    marginTop: '15px'
  },
  issuesTitle: {
    fontWeight: '600',
    color: '#ef4444',
    marginBottom: '8px'
  },
  issuesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  issueItem: {
    fontSize: '0.9rem',
    color: '#374151',
    padding: '8px',
    background: '#fef2f2',
    borderRadius: '6px'
  },
  successMessage: {
    marginTop: '15px',
    padding: '12px',
    background: '#f0fdf4',
    borderRadius: '8px',
    color: '#065f46',
    fontWeight: '500',
    textAlign: 'center'
  },
  emptyState: {
    background: 'white',
    padding: '60px 40px',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
    opacity: 0.5
  },
  emptyTitle: {
    margin: '0 0 10px 0',
    fontSize: '1.5rem',
    color: '#374151'
  },
  emptyText: {
    color: '#6b7280',
    fontSize: '1rem'
  },
  featuresSection: {
    background: 'white',
    padding: '60px 30px',
    marginTop: '40px'
  },
  featuresTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    margin: '0 0 40px 0',
    color: '#1f2937'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  featureCard: {
    padding: '30px',
    background: '#f8fafc',
    borderRadius: '12px',
    textAlign: 'center',
    transition: 'transform 0.3s ease'
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '20px'
  },
  featureTitle: {
    margin: '0 0 15px 0',
    fontSize: '1.2rem',
    color: '#1f2937'
  },
  featureDesc: {
    color: '#6b7280',
    lineHeight: '1.6'
  }
};

export default DocumentVerification;