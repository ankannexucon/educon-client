import React, { useState } from "react";
import { 
  X, FileText, Sparkles, Download, Copy, Plus, Eye, Mail, Phone, MapPin, 
  BookOpen, Award, Briefcase, User, GraduationCap, Languages, Globe,
  Trash2
} from "lucide-react";

export default function CvBuilderModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("personal");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [cvData, setCvData] = useState({
    personal: {
      fullName: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      website: "johndoe.dev",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe"
    },
    summary: "Results-driven software engineer with 5+ years of experience in full-stack development. Passionate about creating scalable web applications and AI-powered solutions.",
    skills: ["JavaScript", "Python", "React", "Node.js", "TypeScript"],
    experience: [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Innovations Inc.",
        location: "San Francisco, CA",
        startDate: "2020-03",
        endDate: "2023-12",
        current: true,
        description: "Led development of scalable web applications serving 1M+ users."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        location: "Boston, MA",
        startDate: "2014-09",
        endDate: "2018-05",
        gpa: "3.8",
        honors: "Magna Cum Laude"
      }
    ],
    projects: [
      {
        id: 1,
        name: "AI-Powered Chatbot",
        description: "Built a conversational AI using TensorFlow and NLP",
        technologies: ["Python", "TensorFlow", "NLP"],
        link: "https://github.com/johndoe/chatbot"
      }
    ],
    languages: [
      { id: 1, language: "English", proficiency: "Native" },
      { id: 2, language: "Spanish", proficiency: "Intermediate" }
    ]
  });

  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState({ language: "", proficiency: "Basic" });

  if (!isOpen) return null;

  // Download functions
  const downloadFormattedPDF = () => {
    const content = generatePDFContent();
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cvData.personal.fullName.replace(/\s+/g, '_')}_CV.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert(`CV downloaded successfully!`);
  };

  const downloadTextCV = () => {
    const content = generateTextContent();
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${cvData.personal.fullName.replace(/\s+/g, '_')}_CV.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generatePDFContent = () => {
    return `PROFESSIONAL CV - ${cvData.personal.fullName}

PERSONAL INFORMATION
Name: ${cvData.personal.fullName}
Email: ${cvData.personal.email}
Phone: ${cvData.personal.phone}
Location: ${cvData.personal.location}

PROFESSIONAL SUMMARY
${cvData.summary}

TECHNICAL SKILLS
${cvData.skills.map(skill => `• ${skill}`).join('\n')}

EXPERIENCE
${cvData.experience.map(exp => `
${exp.title} | ${exp.company}
${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
${exp.description}
`).join('\n')}

EDUCATION
${cvData.education.map(edu => `
${edu.degree}
${edu.institution} | GPA: ${edu.gpa}/4.0
${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}
`).join('\n')}

Generated using AI CV Builder | ${new Date().toLocaleDateString()}`;
  };

  const generateTextContent = () => {
    return `PROFESSIONAL CV - ${cvData.personal.fullName}

PERSONAL INFORMATION
• Name: ${cvData.personal.fullName}
• Email: ${cvData.personal.email}
• Phone: ${cvData.personal.phone}
• Location: ${cvData.personal.location}

PROFESSIONAL SUMMARY
${cvData.summary}

TECHNICAL SKILLS
${cvData.skills.map(skill => `• ${skill}`).join('\n')}

EXPERIENCE
${cvData.experience.map(exp => `
• ${exp.title} at ${exp.company}
  ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
  ${exp.description}
`).join('\n')}

EDUCATION
${cvData.education.map(edu => `
• ${edu.degree}
  ${edu.institution} | GPA: ${edu.gpa}/4.0
  ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}
`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const handleGenerateCV = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveTab("preview");
    }, 1000);
  };

  const handleCopyCV = async () => {
    try {
      await navigator.clipboard.writeText(generateTextContent());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy to clipboard.');
    }
  };

  // Handlers
  const addSkill = () => {
    if (newSkill.trim() && !cvData.skills.includes(newSkill.trim())) {
      setCvData({ ...cvData, skills: [...cvData.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setCvData({ ...cvData, skills: cvData.skills.filter(skill => skill !== skillToRemove) });
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      title: "New Position",
      company: "Company Name",
      location: "City, State",
      startDate: "2023-01",
      endDate: "2023-12",
      current: false,
      description: "Describe your responsibilities..."
    };
    setCvData({ ...cvData, experience: [...cvData.experience, newExperience] });
  };

  const updateExperience = (id, field, value) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const removeExperience = (id) => {
    setCvData({ ...cvData, experience: cvData.experience.filter(exp => exp.id !== id) });
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: "Degree Name",
      institution: "Institution Name",
      location: "City, State",
      startDate: "2018-09",
      endDate: "2022-05",
      gpa: "3.5",
      honors: "Honors or Awards"
    };
    setCvData({ ...cvData, education: [...cvData.education, newEducation] });
  };

  const updateEducation = (id, field, value) => {
    setCvData({
      ...cvData,
      education: cvData.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    });
  };

  const removeEducation = (id) => {
    setCvData({ ...cvData, education: cvData.education.filter(edu => edu.id !== id) });
  };

  const addLanguage = () => {
    if (newLanguage.language.trim()) {
      setCvData({
        ...cvData,
        languages: [...cvData.languages, { ...newLanguage, id: Date.now() }]
      });
      setNewLanguage({ language: "", proficiency: "Basic" });
    }
  };

  const removeLanguage = (id) => {
    setCvData({ ...cvData, languages: cvData.languages.filter(lang => lang.id !== id) });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Compact Styles
  const styles = {
    overlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px',
    },
    modal: {
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '900px',
      maxHeight: '85vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    tabs: {
      display: 'flex',
      borderBottom: '1px solid #e2e8f0',
      background: '#f8fafc',
      overflowX: 'auto',
      fontSize: '12px'
    },
    tab: {
      padding: '12px 16px',
      background: 'none',
      border: 'none',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: '#64748b',
      borderBottom: '2px solid transparent',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      whiteSpace: 'nowrap',
      minWidth: 'auto',
      flex: 1,
      justifyContent: 'center'
    },
    activeTab: {
      color: '#667eea',
      borderBottomColor: '#667eea',
      background: 'white'
    },
    content: {
      display: 'flex',
      flex: 1,
      minHeight: 0,
      height: '500px'
    },
    leftPanel: {
      flex: 1,
      padding: '20px',
      borderRight: '1px solid #e2e8f0',
      overflowY: 'auto',
      background: '#fafafa'
    },
    rightPanel: {
      flex: 1,
      padding: '20px',
      background: '#f8fafc',
      overflowY: 'auto'
    },
    section: {
      background: 'white',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      border: '1px solid #e2e8f0',
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '13px',
      marginBottom: '10px',
      background: 'white'
    },
    textarea: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '13px',
      minHeight: '80px',
      resize: 'vertical',
      background: 'white',
      fontFamily: 'inherit'
    },
    button: {
      padding: '8px 12px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      transition: 'all 0.2s ease'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    secondaryButton: {
      background: '#f3f4f6',
      color: '#374151',
      border: '1px solid #d1d5db'
    },
    dangerButton: {
      background: '#fee2e2',
      color: '#dc2626',
      border: '1px solid #fecaca'
    }
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} />
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>AI CV Builder</h2>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '12px' }}>Create professional CV</p>
            </div>
          </div>
          <button
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white'
            }}
            onClick={onClose}
          >
            <X size={14} />
          </button>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {[
            { id: "personal", label: "Personal", icon: User },
            { id: "summary", label: "Summary", icon: FileText },
            { id: "skills", label: "Skills", icon: Award },
            { id: "experience", label: "Experience", icon: Briefcase },
            { id: "education", label: "Education", icon: GraduationCap },
            { id: "preview", label: "Preview", icon: Eye }
          ].map(tab => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <div style={styles.content}>
          {/* Left Panel - Content Editing */}
          <div style={styles.leftPanel}>
            {/* Personal Information */}
            {activeTab === "personal" && (
              <div>
                <h3 style={{ marginBottom: '16px', color: '#1f2937', fontSize: '16px' }}>Personal Information</h3>
                {Object.entries(cvData.personal).map(([key, value]) => (
                  <div key={key} style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600', color: '#374151', fontSize: '12px' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setCvData({
                        ...cvData,
                        personal: { ...cvData.personal, [key]: e.target.value }
                      })}
                      style={styles.input}
                    />
                  </div>
                ))}
                <button
                  onClick={() => setActiveTab("summary")}
                  style={{ ...styles.button, ...styles.primaryButton, marginTop: '16px' }}
                >
                  Next: Summary
                </button>
              </div>
            )}

            {/* Professional Summary */}
            {activeTab === "summary" && (
              <div>
                <h3 style={{ marginBottom: '16px', color: '#1f2937', fontSize: '16px' }}>Professional Summary</h3>
                <textarea
                  value={cvData.summary}
                  onChange={(e) => setCvData({ ...cvData, summary: e.target.value })}
                  style={styles.textarea}
                  placeholder="Describe your professional background..."
                />
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', marginTop: '16px' }}>
                  <button
                    onClick={() => setActiveTab("personal")}
                    style={{ ...styles.button, ...styles.secondaryButton }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveTab("skills")}
                    style={{ ...styles.button, ...styles.primaryButton }}
                  >
                    Next: Skills
                  </button>
                </div>
              </div>
            )}

            {/* Skills */}
            {activeTab === "skills" && (
              <div>
                <h3 style={{ marginBottom: '16px', color: '#1f2937', fontSize: '16px' }}>Skills & Technologies</h3>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add skill..."
                    style={{ ...styles.input, marginBottom: 0, flex: 1 }}
                  />
                  <button onClick={addSkill} style={{ ...styles.button, ...styles.primaryButton }}>
                    <Plus size={14} />
                    Add
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {cvData.skills.map((skill, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 10px',
                      background: '#e0e7ff',
                      color: '#3730a3',
                      borderRadius: '16px',
                      fontSize: '12px'
                    }}>
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        style={{ background: 'none', border: 'none', color: '#3730a3', cursor: 'pointer' }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setActiveTab("summary")}
                    style={{ ...styles.button, ...styles.secondaryButton }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveTab("experience")}
                    style={{ ...styles.button, ...styles.primaryButton }}
                  >
                    Next: Experience
                  </button>
                </div>
              </div>
            )}

            {/* Experience */}
            {activeTab === "experience" && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ color: '#1f2937', margin: 0, fontSize: '16px' }}>Work Experience</h3>
                  <button onClick={addExperience} style={{ ...styles.button, ...styles.primaryButton }}>
                    <Plus size={14} />
                    Add
                  </button>
                </div>
                {cvData.experience.map((exp, index) => (
                  <div key={exp.id} style={styles.section}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <h4 style={{ margin: 0, color: '#1f2937', fontSize: '14px' }}>Experience #{index + 1}</h4>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        style={{ ...styles.button, ...styles.dangerButton, padding: '4px 6px' }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                      placeholder="Job Title"
                      style={styles.input}
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Company"
                      style={styles.input}
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        style={styles.input}
                      />
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      placeholder="Description..."
                      style={styles.textarea}
                    />
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', marginTop: '16px' }}>
                  <button
                    onClick={() => setActiveTab("skills")}
                    style={{ ...styles.button, ...styles.secondaryButton }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveTab("education")}
                    style={{ ...styles.button, ...styles.primaryButton }}
                  >
                    Next: Education
                  </button>
                </div>
              </div>
            )}

            {/* Education */}
            {activeTab === "education" && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ color: '#1f2937', margin: 0, fontSize: '16px' }}>Education</h3>
                  <button onClick={addEducation} style={{ ...styles.button, ...styles.primaryButton }}>
                    <Plus size={14} />
                    Add
                  </button>
                </div>
                {cvData.education.map((edu, index) => (
                  <div key={edu.id} style={styles.section}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <h4 style={{ margin: 0, color: '#1f2937', fontSize: '14px' }}>Education #{index + 1}</h4>
                      <button
                        onClick={() => removeEducation(edu.id)}
                        style={{ ...styles.button, ...styles.dangerButton, padding: '4px 6px' }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Degree"
                      style={styles.input}
                    />
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="Institution"
                      style={styles.input}
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        style={styles.input}
                      />
                      <input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="GPA"
                      style={styles.input}
                    />
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', marginTop: '16px' }}>
                  <button
                    onClick={() => setActiveTab("experience")}
                    style={{ ...styles.button, ...styles.secondaryButton }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleGenerateCV}
                    disabled={isGenerating}
                    style={{ ...styles.button, ...styles.primaryButton }}
                  >
                    <Sparkles size={14} />
                    {isGenerating ? "Generating..." : "Preview CV"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Preview */}
          {activeTab === "preview" && (
            <div style={styles.rightPanel}>
              <div style={{
                background: 'white',
                borderRadius: '8px',
                padding: '20px',
                height: '100%',
                overflowY: 'auto',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                fontSize: '13px'
              }}>
                {/* CV Preview Content */}
                <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                  {/* Header */}
                  <div style={{ textAlign: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '16px' }}>
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0' }}>
                      {cvData.personal.fullName}
                    </h1>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 12px 0' }}>
                      Senior Software Engineer
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', fontSize: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280' }}>
                        <Mail size={12} />
                        {cvData.personal.email}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280' }}>
                        <Phone size={12} />
                        {cvData.personal.phone}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280' }}>
                        <MapPin size={12} />
                        {cvData.personal.location}
                      </span>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div style={{ marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                      Professional Summary
                    </h2>
                    <p style={{ color: '#6b7280', lineHeight: '1.5', fontSize: '12px' }}>
                      {cvData.summary}
                    </p>
                  </div>

                  {/* Skills */}
                  {cvData.skills.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                        Technical Skills
                      </h2>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {cvData.skills.map((skill, index) => (
                          <span key={index} style={{
                            padding: '4px 8px',
                            background: '#f3f4f6',
                            color: '#374151',
                            borderRadius: '12px',
                            fontSize: '11px'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {cvData.experience.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                        Experience
                      </h2>
                      {cvData.experience.map((exp, index) => (
                        <div key={exp.id} style={{ marginBottom: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                              {exp.title}
                            </h3>
                            <span style={{ color: '#6b7280', fontSize: '11px' }}>
                              {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                            </span>
                          </div>
                          <p style={{ color: '#667eea', fontSize: '12px', margin: '0 0 4px 0' }}>
                            {exp.company} | {exp.location}
                          </p>
                          <p style={{ color: '#6b7280', fontSize: '12px', lineHeight: '1.4', margin: 0 }}>
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Education */}
                  {cvData.education.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                        Education
                      </h2>
                      {cvData.education.map((edu, index) => (
                        <div key={edu.id} style={{ marginBottom: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                              {edu.degree}
                            </h3>
                            <span style={{ color: '#6b7280', fontSize: '11px' }}>
                              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                            </span>
                          </div>
                          <p style={{ color: '#10b981', fontSize: '12px', margin: '0 0 4px 0' }}>
                            {edu.institution} | {edu.location}
                          </p>
                          <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
                            GPA: {edu.gpa}/4.0 | {edu.honors}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
                  <button
                    onClick={handleCopyCV}
                    style={{ ...styles.button, ...styles.secondaryButton }}
                  >
                    <Copy size={12} />
                    {isCopied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadTextCV}
                    style={{ ...styles.button, ...styles.secondaryButton }}
                  >
                    <Download size={12} />
                    TXT
                  </button>
                  <button
                    onClick={downloadFormattedPDF}
                    style={{ ...styles.button, ...styles.primaryButton }}
                  >
                    <Download size={12} />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}