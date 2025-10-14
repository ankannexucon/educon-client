import React, { useState, useRef, useEffect } from 'react';

const DocumentVerification = () => {
  const [selectedDocument, setSelectedDocument] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [verificationResults, setVerificationResults] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [selectedFileForPreview, setSelectedFileForPreview] = useState(null);
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

  const verificationSteps = [
    { id: 'upload', name: 'Document Analysis', icon: '📥', duration: 1000 },
    { id: 'pattern', name: 'Pattern Recognition', icon: '🔍', duration: 1500 },
    { id: 'ai', name: 'AI Verification', icon: '🤖', duration: 2000 },
    { id: 'results', name: 'Result Compilation', icon: '📊', duration: 1000 }
  ];

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      uploadedFiles.forEach(file => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, [uploadedFiles]);

  const handleDocumentSelect = (docType) => {
    setSelectedDocument(docType);
    setUploadedFiles([]);
    setVerificationResults([]);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      
      if (file.size > maxSize) {
        alert(`File ${file.name} exceeds 10MB limit`);
        return false;
      }
      
      if (!allowedTypes.includes(file.type)) {
        alert(`File ${file.name} is not a supported format (PDF, JPG, PNG only)`);
        return false;
      }
      
      return true;
    });

    const newFiles = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file,
      status: 'pending',
      uploadedAt: new Date(),
      previewUrl: URL.createObjectURL(file)
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const simulateVerification = async () => {
    if (uploadedFiles.length === 0 || !selectedDocument) return;

    setIsVerifying(true);
    setVerificationProgress(0);
    setVerificationResults([]);
    setCurrentStep('');

    // Simulate verification steps with animations
    for (let step of verificationSteps) {
      setCurrentStep(step.id);
      
      // Animate progress for this step
      const stepProgress = 100 / verificationSteps.length;
      const startProgress = verificationProgress;
      const endProgress = startProgress + stepProgress;
      
      await new Promise(resolve => {
        const interval = setInterval(() => {
          setVerificationProgress(prev => {
            if (prev >= endProgress) {
              clearInterval(interval);
              resolve();
              return endProgress;
            }
            return prev + 1;
          });
        }, step.duration / stepProgress);
      });
    }

    // Generate final results
    const results = uploadedFiles.map(file => {
      const isFraudulent = Math.random() > 0.7;
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
    setCurrentStep('complete');
  };

  const removeFile = (fileId) => {
    const fileToRemove = uploadedFiles.find(file => file.id === fileId);
    if (fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    setVerificationResults(prev => prev.filter(result => result.fileId !== fileId));
    if (selectedFileForPreview?.id === fileId) {
      setSelectedFileForPreview(null);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('pdf')) return '📄';
    return '📁';
  };

  const FilePreview = ({ file, onClose }) => {
    const [pdfPages, setPdfPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pdfError, setPdfError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if (file && file.type.includes('pdf')) {
        loadPdfPreview();
      }
    }, [file]);

    const loadPdfPreview = async () => {
      try {
        setIsLoading(true);
        setPdfError(false);
        
        // Simulate PDF loading with multiple pages
        setTimeout(() => {
          const simulatedPages = [
            { pageNum: 1, text: 'Certificate of Achievement - Page 1' },
            { pageNum: 2, text: 'Academic Transcript - Page 2' },
            { pageNum: 3, text: 'Verification Details - Page 3' }
          ];
          setPdfPages(simulatedPages);
          setIsLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error loading PDF:', error);
        setPdfError(true);
        setIsLoading(false);
      }
    };

    const nextPage = () => {
      if (currentPage < pdfPages.length) {
        setCurrentPage(currentPage + 1);
      }
    };

    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = file.previewUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    if (!file) return null;

    return (
      <div style={styles.previewOverlay}>
        <div style={styles.previewModal}>
          <div style={styles.previewHeader}>
            <h3 style={styles.previewTitle}>File Preview</h3>
            <button onClick={onClose} style={styles.closeButton}>✕</button>
          </div>
          <div style={styles.previewContent}>
            {file.type.includes('image') ? (
              <img 
                src={file.previewUrl} 
                alt={file.name}
                style={styles.previewImage}
              />
            ) : file.type.includes('pdf') ? (
              <div style={styles.pdfPreview}>
                {isLoading ? (
                  <div style={styles.pdfLoading}>
                    <div style={styles.loadingSpinner}></div>
                    <div style={styles.loadingText}>Loading PDF preview...</div>
                  </div>
                ) : pdfError ? (
                  <div style={styles.pdfError}>
                    <div style={styles.pdfErrorIcon}>📄</div>
                    <div style={styles.pdfErrorText}>
                      Unable to load PDF preview
                    </div>
                    <div style={styles.pdfErrorSubtext}>
                      Please download the file to view it properly
                    </div>
                  </div>
                ) : pdfPages.length > 0 ? (
                  <div style={styles.pdfViewer}>
                    <div style={styles.pdfPages}>
                      {pdfPages.map((page) => (
                        <div
                          key={page.pageNum}
                          style={{
                            ...styles.pdfPage,
                            display: currentPage === page.pageNum ? 'block' : 'none'
                          }}
                        >
                          <div style={styles.pdfPageContent}>
                            <div style={styles.pdfPageHeader}>
                              <span style={styles.pdfPageNumber}>
                                Page {page.pageNum} of {pdfPages.length}
                              </span>
                              <span style={styles.pdfFileName}>
                                {file.name}
                              </span>
                            </div>
                            <div style={styles.pdfPageBody}>
                              <div style={styles.pdfDocument}>
                                <div style={styles.pdfPlaceholder}>
                                  <div style={styles.pdfIcon}>📄</div>
                                  <div style={styles.pdfText}>
                                    {page.text}
                                  </div>
                                  <div style={styles.pdfWatermark}>
                                    PDF Document Preview
                                  </div>
                                  <div style={styles.pdfDemoNote}>
                                    In a real application, this would show the actual PDF content
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* PDF Controls */}
                    {pdfPages.length > 1 && (
                      <div style={styles.pdfControls}>
                        <button
                          onClick={prevPage}
                          disabled={currentPage === 1}
                          style={{
                            ...styles.pdfControlButton,
                            ...(currentPage === 1 ? styles.pdfControlButtonDisabled : {})
                          }}
                        >
                          ← Previous
                        </button>
                        
                        <div style={styles.pdfPageInfo}>
                          Page {currentPage} of {pdfPages.length}
                        </div>
                        
                        <button
                          onClick={nextPage}
                          disabled={currentPage === pdfPages.length}
                          style={{
                            ...styles.pdfControlButton,
                            ...(currentPage === pdfPages.length ? styles.pdfControlButtonDisabled : {})
                          }}
                        >
                          Next →
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={styles.pdfLoading}>
                    <div style={styles.loadingSpinner}></div>
                    <div style={styles.loadingText}>Preparing PDF preview...</div>
                  </div>
                )}
              </div>
            ) : (
              <div style={styles.documentPreview}>
                <div style={styles.documentIconLarge}>{getFileIcon(file.type)}</div>
                <div style={styles.documentName}>{file.name}</div>
                <div style={styles.documentType}>{file.type}</div>
                <div style={styles.downloadHint}>
                  This file type cannot be previewed. Please download to view.
                </div>
              </div>
            )}
          </div>
          <div style={styles.previewFooter}>
            <div style={styles.fileInfo}>
              <div style={styles.fileNameSection}>
                <strong style={styles.fileNameText}>{file.name}</strong>
                <span style={styles.fileTypeBadge}>
                  {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                </span>
              </div>
              <div style={styles.fileActions}>
                <span style={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                <button
                  onClick={handleDownload}
                  style={styles.downloadButton}
                >
                  ⬇️ Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const VerificationAnimation = () => (
    <div style={styles.verificationAnimation}>
      <div style={styles.animationContainer}>
        <div 
          style={{
            ...styles.scanningLine,
            animation: 'scan 2s ease-in-out infinite'
          }}
        ></div>
        <div style={styles.documentOutline}>
          <div 
            style={{
              ...styles.documentContent,
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          >
            {currentStep === 'upload' && <div style={styles.animText}>Analyzing Document...</div>}
            {currentStep === 'pattern' && <div style={styles.animText}>Checking Patterns...</div>}
            {currentStep === 'ai' && <div style={styles.animText}>AI Processing...</div>}
            {currentStep === 'results' && <div style={styles.animText}>Compiling Results...</div>}
          </div>
        </div>
      </div>
      <div style={styles.stepIndicators}>
        {verificationSteps.map((step, index) => (
          <div
            key={step.id}
            style={{
              ...styles.stepIndicator,
              ...(currentStep === step.id ? styles.stepActive : {}),
              ...(verificationProgress >= (index + 1) * (100 / verificationSteps.length) 
                ? styles.stepCompleted : {})
            }}
          >
            <span style={styles.stepIcon}>{step.icon}</span>
            <span style={styles.stepName}>{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Add CSS styles for animations */}
      <style>
        {`
          @keyframes scan {
            0% { transform: translateY(0); }
            50% { transform: translateY(148px); }
            100% { transform: translateY(0); }
          }

          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            .mobile-stack {
              flex-direction: column !important;
            }
            .mobile-full {
              width: 100% !important;
            }
            .mobile-text-center {
              text-align: center !important;
            }
            .mobile-padding {
              padding: 15px !important;
            }
          }
        `}
      </style>

      {/* Header */}
      <div style={{...styles.header, ...styles.mobileStack}}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Document Verification</h1>
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

      <div style={{...styles.content, ...styles.mobileStack}}>
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
                <h4 style={styles.uploadedFilesTitle}>Uploaded Files ({uploadedFiles.length})</h4>
                {uploadedFiles.map(file => (
                  <div key={file.id} style={styles.fileItem}>
                    <div 
                      style={styles.fileInfo}
                      onClick={() => setSelectedFileForPreview(file)}
                    >
                      <span style={styles.fileIcon}>
                        {getFileIcon(file.type)}
                      </span>
                      <div>
                        <div style={styles.fileName}>{file.name}</div>
                        <div style={styles.fileDetails}>
                          {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type.split('/')[1]?.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div style={styles.fileActions}>
                      <button
                        onClick={() => setSelectedFileForPreview(file)}
                        style={styles.previewButton}
                        title="Preview"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => removeFile(file.id)}
                        style={styles.removeButton}
                        title="Remove"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Verify Button */}
          {uploadedFiles.length > 0 && selectedDocument && !isVerifying && (
            <button
              onClick={simulateVerification}
              disabled={isVerifying}
              style={styles.verifyButton}
            >
              🔍 Start Fraud Detection
            </button>
          )}
        </div>

        {/* Right Panel - Results & Animations */}
        <div style={styles.rightPanel}>
          {/* Verification Animation */}
          {isVerifying && (
            <div style={styles.progressSection}>
              <h3 style={styles.sectionTitle}>Verification in Progress</h3>
              <VerificationAnimation />
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
                  {Math.round(verificationProgress)}% Complete
                </div>
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
                      borderColor: result.isVerified ? '#10b981' : '#ef4444',
                      background: result.isVerified ? '#f0fdf4' : '#fef2f2'
                    }}
                  >
                    <div style={{...styles.resultHeader, ...styles.mobileStack}}>
                      <div style={styles.resultFileInfo}>
                        <span style={styles.resultIcon}>
                          {result.isVerified ? '✅' : '❌'}
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

      {/* File Preview Modal */}
      {selectedFileForPreview && (
        <FilePreview 
          file={selectedFileForPreview} 
          onClose={() => setSelectedFileForPreview(null)} 
        />
      )}

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
  mobileStack: {
    '@media (max-width: 768px)': {
      flexDirection: 'column'
    }
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
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  fileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
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
  fileActions: {
    display: 'flex',
    gap: '8px'
  },
  previewButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '4px',
    transition: 'background 0.2s ease'
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
  
  // Verification Animation Styles
  verificationAnimation: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  animationContainer: {
    position: 'relative',
    width: '200px',
    height: '150px',
    margin: '0 auto 30px',
    background: '#f8fafc',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    overflow: 'hidden'
  },
  scanningLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #667eea, transparent)'
  },
  documentOutline: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  documentContent: {
    textAlign: 'center'
  },
  animText: {
    fontSize: '0.9rem',
    color: '#667eea',
    fontWeight: '500'
  },
  stepIndicators: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px'
  },
  stepIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px',
    background: '#f8fafc',
    borderRadius: '8px',
    transition: 'all 0.3s ease'
  },
  stepActive: {
    background: '#667eea15',
    border: '1px solid #667eea',
    transform: 'scale(1.05)'
  },
  stepCompleted: {
    background: '#10b98115',
    border: '1px solid #10b981'
  },
  stepIcon: {
    fontSize: '1.2rem'
  },
  stepName: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#374151'
  },

  // File Preview Styles
  previewOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  previewModal: {
    background: 'white',
    borderRadius: '15px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    width: '800px',
    display: 'flex',
    flexDirection: 'column'
  },
  previewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  previewTitle: {
    margin: 0,
    fontSize: '1.3rem',
    color: '#1f2937'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '4px',
    transition: 'background 0.2s ease'
  },
  previewContent: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '500px',
    overflow: 'auto'
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '70vh',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  
  // PDF Preview Styles
  pdfPreview: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  pdfViewer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#f8f9fa'
  },
  pdfPages: {
    flex: 1,
    position: 'relative'
  },
  pdfPage: {
    width: '100%',
    height: '100%',
    padding: '20px'
  },
  pdfPageContent: {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  pdfPageHeader: {
    padding: '15px 20px',
    borderBottom: '1px solid #e9ecef',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f8f9fa',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px'
  },
  pdfPageNumber: {
    fontWeight: '600',
    color: '#495057'
  },
  pdfFileName: {
    color: '#6c757d',
    fontSize: '0.9rem'
  },
  pdfPageBody: {
    flex: 1,
    padding: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pdfDocument: {
    width: '100%',
    maxWidth: '600px',
    aspectRatio: '1.414 / 1',
    background: 'white',
    border: '1px solid #dee2e6',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    position: 'relative'
  },
  pdfPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(45deg, #f8f9fa 25%, transparent 25%), linear-gradient(-45deg, #f8f9fa 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8f9fa 75%), linear-gradient(-45deg, transparent 75%, #f8f9fa 75%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  },
  pdfIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
    opacity: 0.7
  },
  pdfText: {
    fontSize: '1.2rem',
    fontWeight: '500',
    color: '#495057',
    marginBottom: '10px'
  },
  pdfWatermark: {
    fontSize: '0.9rem',
    color: '#6c757d',
    opacity: 0.6,
    marginBottom: '5px'
  },
  pdfDemoNote: {
    fontSize: '0.8rem',
    color: '#6c757d',
    fontStyle: 'italic',
    textAlign: 'center',
    maxWidth: '80%'
  },
  pdfControls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    background: 'white',
    borderTop: '1px solid #dee2e6',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px'
  },
  pdfControlButton: {
    padding: '8px 16px',
    border: '1px solid #007bff',
    background: '#007bff',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease'
  },
  pdfControlButtonDisabled: {
    background: '#6c757d',
    borderColor: '#6c757d',
    cursor: 'not-allowed',
    opacity: 0.6
  },
  pdfPageInfo: {
    fontWeight: '600',
    color: '#495057'
  },
  pdfLoading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '15px'
  },
  loadingText: {
    color: '#6c757d',
    fontSize: '1rem'
  },
  pdfError: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    textAlign: 'center'
  },
  pdfErrorIcon: {
    fontSize: '3rem',
    marginBottom: '15px',
    opacity: 0.5
  },
  pdfErrorText: {
    fontSize: '1.1rem',
    color: '#495057',
    marginBottom: '8px'
  },
  pdfErrorSubtext: {
    fontSize: '0.9rem',
    color: '#6c757d'
  },
  documentPreview: {
    textAlign: 'center',
    padding: '40px'
  },
  documentIconLarge: {
    fontSize: '4rem',
    marginBottom: '20px',
    opacity: 0.7
  },
  documentType: {
    color: '#6c757d',
    fontSize: '0.9rem'
  },
  previewFooter: {
    padding: '15px 20px',
    borderTop: '1px solid #e5e7eb',
    background: '#f9fafc',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px'
  },
  fileInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  fileNameSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  fileNameText: {
    fontSize: '1rem'
  },
  fileTypeBadge: {
    background: '#e9ecef',
    color: '#495057',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: '500'
  },
  fileActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  fileSize: {
    color: '#6c757d',
    fontSize: '0.9rem'
  },
  downloadButton: {
    background: '#28a745',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    transition: 'background 0.2s ease'
  },
  downloadHint: {
    marginTop: '15px',
    padding: '10px',
    background: '#fff3cd',
    color: '#856404',
    borderRadius: '4px',
    fontSize: '0.9rem',
    textAlign: 'center'
  },

  // Progress Bar Styles
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

  // Results Styles
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
    fontWeight: '600',
    whiteSpace: 'nowrap'
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