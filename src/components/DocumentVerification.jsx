import React, { useState, useRef, useEffect } from "react";

const DocumentVerification = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [verificationResults, setVerificationResults] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [selectedFileForPreview, setSelectedFileForPreview] = useState(null);
  const fileInputRef = useRef(null);

  const fraudIndicators = [
    "Inconsistent Fonts",
    "Mismatched Logos",
    "Invalid Signatures",
    "Tampered Dates",
  ];

  const verificationSteps = [
    { id: "upload", name: "Document Analysis", icon: "📥", duration: 1000 },
    { id: "pattern", name: "Pattern Recognition", icon: "🔍", duration: 1500 },
    { id: "ai", name: "AI Verification", icon: "🤖", duration: 2000 },
    { id: "results", name: "Result Compilation", icon: "📊", duration: 1000 },
  ];

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, [uploadedFiles]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      const maxSize = 10 * 1024 * 1024;
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

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

    const newFiles = validFiles.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file,
      previewUrl: URL.createObjectURL(file),
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const simulateVerification = async () => {
    if (uploadedFiles.length === 0) return;

    setIsVerifying(true);
    setVerificationProgress(0);
    setVerificationResults([]);
    setCurrentStep("");

    for (let step of verificationSteps) {
      setCurrentStep(step.id);
      const stepProgress = 100 / verificationSteps.length;
      const startProgress = verificationProgress;
      const endProgress = startProgress + stepProgress;

      await new Promise((resolve) => {
        const interval = setInterval(() => {
          setVerificationProgress((prev) => {
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

    const results = uploadedFiles.map((file) => {
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
        confidence: Math.round(100 - fraudScore),
      };
    });

    setVerificationResults(results);
    setIsVerifying(false);
    setVerificationProgress(100);
    setCurrentStep("complete");
  };

  const removeFile = (fileId) => {
    const fileToRemove = uploadedFiles.find((file) => file.id === fileId);
    if (fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
    setVerificationResults((prev) => prev.filter((result) => result.fileId !== fileId));
    if (selectedFileForPreview?.id === fileId) {
      setSelectedFileForPreview(null);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes("image")) return "🖼️";
    if (fileType.includes("pdf")) return "📄";
    return "📁";
  };

  const FilePreview = ({ file, onClose }) => {
    if (!file) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-800">File Preview</h3>
            <button onClick={onClose} className="text-2xl hover:text-gray-600">✕</button>
          </div>
          
          <div className="flex-1 p-6 flex items-center justify-center">
            {file.type.includes("image") ? (
              <img src={file.previewUrl} alt={file.name} className="max-w-full max-h-[60vh] rounded-lg shadow-lg" />
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">{getFileIcon(file.type)}</div>
                <div className="text-lg font-medium text-gray-700">{file.name}</div>
                <div className="text-gray-500 mt-2">Preview not available for this file type</div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-gray-50 rounded-b-xl">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-gray-800">{file.name}</div>
                <div className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>
              <a href={file.previewUrl} download={file.name} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                ⬇️ Download
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const VerificationAnimation = () => (
    <div className="text-center">
      <div className="relative w-48 h-32 bg-gray-50 border-2 border-gray-200 rounded-xl mx-auto mb-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-blue-600 font-medium animate-pulse">
            {currentStep === "upload" && "Analyzing Document..."}
            {currentStep === "pattern" && "Checking Patterns..."}
            {currentStep === "ai" && "AI Processing..."}
            {currentStep === "results" && "Compiling Results..."}
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scan"></div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {verificationSteps.map((step, index) => (
          <div key={step.id} className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
            currentStep === step.id ? 'bg-blue-100 border border-blue-300 scale-105' : 
            verificationProgress >= (index + 1) * (100 / verificationSteps.length) ? 'bg-green-100 border border-green-300' : 'bg-gray-100'
          }`}>
            <span className="text-lg">{step.icon}</span>
            <span className="text-sm font-medium text-gray-700">{step.name}</span>
          </div>
        ))}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" 
             style={{ width: `${verificationProgress}%` }}></div>
      </div>
      <div className="text-sm font-medium text-gray-700">{Math.round(verificationProgress)}% Complete</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Document Verification</h1>
          <p className="text-xl opacity-90">AI-powered fraud detection for your documents</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Documents</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors bg-gray-50"
                   onClick={() => fileInputRef.current?.click()}>
                <div className="text-4xl mb-3">📁</div>
                <div className="text-lg font-medium text-gray-700 mb-1">Click to upload</div>
                <div className="text-gray-500">PDF, JPG, PNG (Max 10MB)</div>
                <input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-3">Uploaded Files ({uploadedFiles.length})</h4>
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg bg-white hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => setSelectedFileForPreview(file)}>
                          <span className="text-xl">{getFileIcon(file.type)}</span>
                          <div>
                            <div className="font-medium text-gray-800">{file.name}</div>
                            <div className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setSelectedFileForPreview(file)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Preview">
                            👁️
                          </button>
                          <button onClick={() => removeFile(file.id)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Remove">
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadedFiles.length > 0 && !isVerifying && (
                <button onClick={simulateVerification} className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105">
                  🔍 Start Fraud Detection
                </button>
              )}
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            {isVerifying && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Verification in Progress</h3>
                <VerificationAnimation />
              </div>
            )}

            {verificationResults.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Verification Results</h3>
                <div className="space-y-4">
                  {verificationResults.map((result) => (
                    <div key={result.fileId} className={`border-2 rounded-xl p-4 ${
                      result.isVerified ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{result.isVerified ? "✅" : "❌"}</span>
                          <div>
                            <div className="font-semibold text-gray-800">{result.fileName}</div>
                            <div className="text-sm text-gray-500">Verified: {result.verificationDate.toLocaleTimeString()}</div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                          result.isVerified ? 'bg-green-600' : 'bg-red-600'
                        }`}>
                          {result.isVerified ? "VERIFIED" : "FRAUDULENT"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Fraud Score</div>
                          <div className={`text-2xl font-bold ${result.fraudScore > 50 ? 'text-red-600' : 'text-green-600'}`}>
                            {result.fraudScore}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Confidence</div>
                          <div className="text-2xl font-bold text-blue-600">{result.confidence}%</div>
                        </div>
                      </div>

                      {result.detectedIssues.length > 0 && (
                        <div>
                          <div className="font-semibold text-red-600 mb-2">Detected Issues:</div>
                          <div className="space-y-1">
                            {result.detectedIssues.map((issue, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2 rounded">
                                ⚠️ {issue}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {result.isVerified && (
                        <div className="mt-3 p-3 bg-green-100 text-green-800 rounded-lg text-center font-medium">
                          ✅ Document passed all security checks
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isVerifying && verificationResults.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Verification Results</h3>
                <p className="text-gray-600">Upload documents and start verification to see results here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Advanced Fraud Detection</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔎", title: "Pattern Analysis", desc: "Detect inconsistencies in document patterns" },
              { icon: "📊", title: "Metadata Check", desc: "Verify document metadata authenticity" },
              { icon: "🤖", title: "AI Detection", desc: "Machine learning trained on fraud patterns" },
              { icon: "⚡", title: "Real-time Results", desc: "Instant verification with detailed analysis" },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* File Preview Modal */}
      {selectedFileForPreview && (
        <FilePreview file={selectedFileForPreview} onClose={() => setSelectedFileForPreview(null)} />
      )}

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(128px); }
          100% { transform: translateY(0); }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DocumentVerification;