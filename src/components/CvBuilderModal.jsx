import React, { useState } from "react";
import { 
  X, FileText, Sparkles, Download, Copy, Plus, Eye, Mail, Phone, MapPin, 
  BookOpen, Award, Briefcase, User, GraduationCap, Languages, Globe,
  Trash2, Palette, Layout
} from "lucide-react";

export default function CvBuilderModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("personal");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");

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

  // Template configurations
  const templates = {
    professional: {
      name: "Professional",
      description: "Clean and traditional layout",
      colors: {
        primary: "#1f2937",
        secondary: "#6b7280",
        accent: "#667eea",
        background: "#ffffff"
      },
      layout: "traditional"
    },
    modern: {
      name: "Modern",
      description: "Contemporary design with side panel",
      colors: {
        primary: "#1e40af",
        secondary: "#64748b",
        accent: "#3b82f6",
        background: "#f8fafc"
      },
      layout: "sidebar"
    },
    minimal: {
      name: "Minimal",
      description: "Simple and clean design",
      colors: {
        primary: "#111827",
        secondary: "#4b5563",
        accent: "#059669",
        background: "#ffffff"
      },
      layout: "minimal"
    },
    creative: {
      name: "Creative",
      description: "Bold and colorful design",
      colors: {
        primary: "#7c3aed",
        secondary: "#8b5cf6",
        accent: "#a855f7",
        background: "#faf5ff"
      },
      layout: "creative"
    }
  };

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

  // Template Preview Components
  const renderTemplatePreview = () => {
    const template = templates[selectedTemplate];
    
    switch (template.layout) {
      case "sidebar":
        return renderSidebarTemplate(template);
      case "minimal":
        return renderMinimalTemplate(template);
      case "creative":
        return renderCreativeTemplate(template);
      default:
        return renderProfessionalTemplate(template);
    }
  };

  const renderProfessionalTemplate = (template) => (
    <div style={{
      background: template.colors.background,
      color: template.colors.primary,
      padding: '20px',
      height: '100%',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        borderBottom: `2px solid ${template.colors.accent}`, 
        paddingBottom: '16px', 
        marginBottom: '20px' 
      }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: template.colors.primary, 
          margin: '0 0 8px 0' 
        }}>
          {cvData.personal.fullName}
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: template.colors.secondary, 
          margin: '0 0 12px 0' 
        }}>
          Senior Software Engineer
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '16px', 
          flexWrap: 'wrap', 
          fontSize: '14px' 
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: template.colors.secondary }}>
            <Mail size={14} />
            {cvData.personal.email}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: template.colors.secondary }}>
            <Phone size={14} />
            {cvData.personal.phone}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: template.colors.secondary }}>
            <MapPin size={14} />
            {cvData.personal.location}
          </span>
        </div>
      </div>

      {/* Professional Summary */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: template.colors.primary, 
          marginBottom: '12px',
          borderBottom: `1px solid ${template.colors.accent}20`,
          paddingBottom: '4px'
        }}>
          Professional Summary
        </h2>
        <p style={{ 
          color: template.colors.secondary, 
          lineHeight: '1.6', 
          fontSize: '14px',
          textAlign: 'justify'
        }}>
          {cvData.summary}
        </p>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Left Column */}
        <div style={{ flex: 1 }}>
          {/* Skills */}
          {cvData.skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: template.colors.primary, 
                marginBottom: '12px' 
              }}>
                Technical Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cvData.skills.map((skill, index) => (
                  <span key={index} style={{
                    padding: '6px 12px',
                    background: `${template.colors.accent}15`,
                    color: template.colors.accent,
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '500',
                    border: `1px solid ${template.colors.accent}30`
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {cvData.education.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: template.colors.primary, 
                marginBottom: '12px' 
              }}>
                Education
              </h2>
              {cvData.education.map((edu, index) => (
                <div key={edu.id} style={{ marginBottom: '16px' }}>
                  <h3 style={{ 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    color: template.colors.primary, 
                    margin: '0 0 4px 0' 
                  }}>
                    {edu.degree}
                  </h3>
                  <p style={{ 
                    color: template.colors.accent, 
                    fontSize: '13px', 
                    margin: '0 0 4px 0',
                    fontWeight: '500'
                  }}>
                    {edu.institution}
                  </p>
                  <p style={{ 
                    color: template.colors.secondary, 
                    fontSize: '12px', 
                    margin: '0 0 4px 0' 
                  }}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                  <p style={{ 
                    color: template.colors.secondary, 
                    fontSize: '12px', 
                    margin: 0 
                  }}>
                    GPA: {edu.gpa}/4.0 | {edu.honors}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: 2 }}>
          {/* Experience */}
          {cvData.experience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: template.colors.primary, 
                marginBottom: '12px' 
              }}>
                Experience
              </h2>
              {cvData.experience.map((exp, index) => (
                <div key={exp.id} style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    marginBottom: '6px' 
                  }}>
                    <h3 style={{ 
                      fontSize: '15px', 
                      fontWeight: 'bold', 
                      color: template.colors.primary, 
                      margin: 0 
                    }}>
                      {exp.title}
                    </h3>
                    <span style={{ 
                      color: template.colors.secondary, 
                      fontSize: '12px',
                      background: `${template.colors.accent}15`,
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p style={{ 
                    color: template.colors.accent, 
                    fontSize: '13px', 
                    margin: '0 0 8px 0',
                    fontWeight: '500'
                  }}>
                    {exp.company} | {exp.location}
                  </p>
                  <p style={{ 
                    color: template.colors.secondary, 
                    fontSize: '13px', 
                    lineHeight: '1.5', 
                    margin: 0 
                  }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSidebarTemplate = (template) => (
    <div style={{
      background: template.colors.background,
      color: template.colors.primary,
      height: '100%',
      overflowY: 'auto',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '35%',
        background: template.colors.primary,
        color: 'white',
        padding: '20px'
      }}>
        {/* Profile */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: template.colors.accent,
            borderRadius: '50%',
            margin: '0 auto 12px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            {cvData.personal.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <h1 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            margin: '0 0 4px 0' 
          }}>
            {cvData.personal.fullName}
          </h1>
          <p style={{ 
            fontSize: '14px', 
            opacity: 0.9, 
            margin: 0 
          }}>
            Software Engineer
          </p>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            marginBottom: '12px',
            borderBottom: `1px solid ${template.colors.accent}`,
            paddingBottom: '4px'
          }}>
            Contact
          </h3>
          <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Mail size={12} />
              {cvData.personal.email}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Phone size={12} />
              {cvData.personal.phone}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <MapPin size={12} />
              {cvData.personal.location}
            </div>
          </div>
        </div>

        {/* Skills */}
        {cvData.skills.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              marginBottom: '12px',
              borderBottom: `1px solid ${template.colors.accent}`,
              paddingBottom: '4px'
            }}>
              Skills
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {cvData.skills.map((skill, index) => (
                <span key={index} style={{
                  padding: '4px 8px',
                  background: template.colors.accent,
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '11px'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '30px'
      }}>
        {/* Summary */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: template.colors.primary,
            marginBottom: '12px',
            borderBottom: `2px solid ${template.colors.accent}`,
            paddingBottom: '4px',
            display: 'inline-block'
          }}>
            Professional Summary
          </h2>
          <p style={{ 
            color: template.colors.secondary, 
            lineHeight: '1.6', 
            fontSize: '14px' 
          }}>
            {cvData.summary}
          </p>
        </div>

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '16px', 
              fontWeight: 'bold', 
              color: template.colors.primary,
              marginBottom: '12px',
              borderBottom: `2px solid ${template.colors.accent}`,
              paddingBottom: '4px',
              display: 'inline-block'
            }}>
              Experience
            </h2>
            {cvData.experience.map((exp, index) => (
              <div key={exp.id} style={{ marginBottom: '20px' }}>
                <h3 style={{ 
                  fontSize: '15px', 
                  fontWeight: 'bold', 
                  color: template.colors.primary, 
                  margin: '0 0 4px 0' 
                }}>
                  {exp.title}
                </h3>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '6px'
                }}>
                  <p style={{ 
                    color: template.colors.accent, 
                    fontSize: '13px', 
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {exp.company} | {exp.location}
                  </p>
                  <span style={{ 
                    color: template.colors.secondary, 
                    fontSize: '12px' 
                  }}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
                <p style={{ 
                  color: template.colors.secondary, 
                  fontSize: '13px', 
                  lineHeight: '1.5', 
                  margin: 0 
                }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div>
            <h2 style={{ 
              fontSize: '16px', 
              fontWeight: 'bold', 
              color: template.colors.primary,
              marginBottom: '12px',
              borderBottom: `2px solid ${template.colors.accent}`,
              paddingBottom: '4px',
              display: 'inline-block'
            }}>
              Education
            </h2>
            {cvData.education.map((edu, index) => (
              <div key={edu.id} style={{ marginBottom: '16px' }}>
                <h3 style={{ 
                  fontSize: '14px', 
                  fontWeight: 'bold', 
                  color: template.colors.primary, 
                  margin: '0 0 4px 0' 
                }}>
                  {edu.degree}
                </h3>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '4px'
                }}>
                  <p style={{ 
                    color: template.colors.accent, 
                    fontSize: '13px', 
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {edu.institution}
                  </p>
                  <span style={{ 
                    color: template.colors.secondary, 
                    fontSize: '12px' 
                  }}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                <p style={{ 
                  color: template.colors.secondary, 
                  fontSize: '12px', 
                  margin: 0 
                }}>
                  GPA: {edu.gpa}/4.0 | {edu.honors}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderMinimalTemplate = (template) => (
    <div style={{
      background: template.colors.background,
      color: template.colors.primary,
      padding: '30px',
      height: '100%',
      overflowY: 'auto',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '300', 
          color: template.colors.primary, 
          margin: '0 0 8px 0',
          letterSpacing: '2px'
        }}>
          {cvData.personal.fullName}
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: template.colors.secondary, 
          margin: '0 0 16px 0',
          fontWeight: '300'
        }}>
          SOFTWARE ENGINEER
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          fontSize: '14px',
          color: template.colors.secondary
        }}>
          <span>{cvData.personal.email}</span>
          <span>•</span>
          <span>{cvData.personal.phone}</span>
          <span>•</span>
          <span>{cvData.personal.location}</span>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${template.colors.primary}20`, paddingTop: '20px' }}>
        {/* Summary */}
        <div style={{ marginBottom: '25px' }}>
          <p style={{ 
            color: template.colors.secondary, 
            lineHeight: '1.6', 
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {cvData.summary}
          </p>
        </div>

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '16px', 
              fontWeight: '500', 
              color: template.colors.primary, 
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Experience
            </h2>
            {cvData.experience.map((exp, index) => (
              <div key={exp.id} style={{ marginBottom: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '6px'
                }}>
                  <h3 style={{ 
                    fontSize: '15px', 
                    fontWeight: '500', 
                    color: template.colors.primary, 
                    margin: 0 
                  }}>
                    {exp.title}
                  </h3>
                  <span style={{ 
                    color: template.colors.secondary, 
                    fontSize: '12px' 
                  }}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
                <p style={{ 
                  color: template.colors.accent, 
                  fontSize: '13px', 
                  margin: '0 0 8px 0',
                  fontStyle: 'italic'
                }}>
                  {exp.company}, {exp.location}
                </p>
                <p style={{ 
                  color: template.colors.secondary, 
                  fontSize: '13px', 
                  lineHeight: '1.5', 
                  margin: 0 
                }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Skills & Education Side by Side */}
        <div style={{ display: 'flex', gap: '30px' }}>
          {/* Skills */}
          {cvData.skills.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2 style={{ 
                fontSize: '16px', 
                fontWeight: '500', 
                color: template.colors.primary, 
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Skills
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cvData.skills.map((skill, index) => (
                  <span key={index} style={{
                    color: template.colors.secondary,
                    fontSize: '13px'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {cvData.education.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2 style={{ 
                fontSize: '16px', 
                fontWeight: '500', 
                color: template.colors.primary, 
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Education
              </h2>
              {cvData.education.map((edu, index) => (
                <div key={edu.id} style={{ marginBottom: '16px' }}>
                  <h3 style={{ 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: template.colors.primary, 
                    margin: '0 0 4px 0' 
                  }}>
                    {edu.degree}
                  </h3>
                  <p style={{ 
                    color: template.colors.accent, 
                    fontSize: '13px', 
                    margin: '0 0 4px 0',
                    fontStyle: 'italic'
                  }}>
                    {edu.institution}
                  </p>
                  <p style={{ 
                    color: template.colors.secondary, 
                    fontSize: '12px', 
                    margin: 0 
                  }}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCreativeTemplate = (template) => (
    <div style={{
      background: `linear-gradient(135deg, ${template.colors.background} 0%, ${template.colors.accent}15 100%)`,
      color: template.colors.primary,
      padding: '20px',
      height: '100%',
      overflowY: 'auto'
    }}>
      {/* Header with accent */}
      <div style={{ 
        background: `linear-gradient(135deg, ${template.colors.accent} 0%, ${template.colors.secondary} 100%)`,
        color: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '25px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          margin: '0 0 8px 0' 
        }}>
          {cvData.personal.fullName}
        </h1>
        <p style={{ 
          fontSize: '18px', 
          opacity: 0.9, 
          margin: '0 0 16px 0' 
        }}>
          Senior Software Engineer
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          fontSize: '14px',
          opacity: 0.9
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Mail size={14} />
            {cvData.personal.email}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Phone size={14} />
            {cvData.personal.phone}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} />
            {cvData.personal.location}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '25px' }}>
        {/* Left Column */}
        <div style={{ flex: 1 }}>
          {/* Summary */}
          <div style={{ 
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: template.colors.primary, 
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FileText size={16} />
              Summary
            </h2>
            <p style={{ 
              color: template.colors.secondary, 
              lineHeight: '1.6', 
              fontSize: '14px' 
            }}>
              {cvData.summary}
            </p>
          </div>

          {/* Skills */}
          {cvData.skills.length > 0 && (
            <div style={{ 
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: template.colors.primary, 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Award size={16} />
                Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cvData.skills.map((skill, index) => (
                  <span key={index} style={{
                    padding: '6px 12px',
                    background: `linear-gradient(135deg, ${template.colors.accent} 0%, ${template.colors.secondary} 100%)`,
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: 2 }}>
          {/* Experience */}
          {cvData.experience.length > 0 && (
            <div style={{ 
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: template.colors.primary, 
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Briefcase size={16} />
                Experience
              </h2>
              {cvData.experience.map((exp, index) => (
                <div key={exp.id} style={{ 
                  marginBottom: '20px',
                  paddingLeft: '16px',
                  borderLeft: `3px solid ${template.colors.accent}`
                }}>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: template.colors.primary, 
                    margin: '0 0 6px 0' 
                  }}>
                    {exp.title}
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <p style={{ 
                      color: template.colors.accent, 
                      fontSize: '14px', 
                      margin: 0,
                      fontWeight: '500'
                    }}>
                      {exp.company} | {exp.location}
                    </p>
                    <span style={{ 
                      color: template.colors.secondary, 
                      fontSize: '12px',
                      background: `${template.colors.accent}15`,
                      padding: '4px 8px',
                      borderRadius: '12px'
                    }}>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p style={{ 
                    color: template.colors.secondary, 
                    fontSize: '14px', 
                    lineHeight: '1.5', 
                    margin: 0 
                  }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {cvData.education.length > 0 && (
            <div style={{ 
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: template.colors.primary, 
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <GraduationCap size={16} />
                Education
              </h2>
              {cvData.education.map((edu, index) => (
                <div key={edu.id} style={{ 
                  marginBottom: '16px',
                  paddingLeft: '16px',
                  borderLeft: `3px solid ${template.colors.accent}`
                }}>
                  <h3 style={{ 
                    fontSize: '15px', 
                    fontWeight: 'bold', 
                    color: template.colors.primary, 
                    margin: '0 0 6px 0' 
                  }}>
                    {edu.degree}
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '4px'
                  }}>
                    <p style={{ 
                      color: template.colors.accent, 
                      fontSize: '13px', 
                      margin: 0,
                      fontWeight: '500'
                    }}>
                      {edu.institution}
                    </p>
                    <span style={{ 
                      color: template.colors.secondary, 
                      fontSize: '12px' 
                    }}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p style={{ 
                    color: template.colors.secondary, 
                    fontSize: '13px', 
                    margin: 0 
                  }}>
                    GPA: {edu.gpa}/4.0 | {edu.honors}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

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
      zIndex: 2000,
      padding: '16px',
    },
    modal: {
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '1100px',
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
            { id: "templates", label: "Templates", icon: Layout },
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
                    onClick={() => setActiveTab("templates")}
                    style={{ ...styles.button, ...styles.primaryButton }}
                  >
                    Next: Templates
                  </button>
                </div>
              </div>
            )}

            {/* Templates */}
            {activeTab === "templates" && (
              <div>
                <h3 style={{ marginBottom: '16px', color: '#1f2937', fontSize: '16px' }}>Choose a Template</h3>
                <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>
                  Select a template that best fits your style and industry
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  {Object.entries(templates).map(([key, template]) => (
                    <div
                      key={key}
                      onClick={() => setSelectedTemplate(key)}
                      style={{
                        border: `2px solid ${selectedTemplate === key ? template.colors.accent : '#e5e7eb'}`,
                        borderRadius: '8px',
                        padding: '16px',
                        cursor: 'pointer',
                        background: 'white',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        marginBottom: '8px' 
                      }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: template.colors.accent
                        }} />
                        <h4 style={{ 
                          fontSize: '14px', 
                          fontWeight: 'bold', 
                          color: '#1f2937', 
                          margin: 0 
                        }}>
                          {template.name}
                        </h4>
                      </div>
                      <p style={{ 
                        fontSize: '12px', 
                        color: '#6b7280', 
                        margin: 0,
                        lineHeight: '1.4'
                      }}>
                        {template.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setActiveTab("education")}
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
                padding: '0',
                height: '100%',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Template Preview Header */}
                <div style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#f8fafc'
                }}>
                  <div>
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#6b7280',
                      marginRight: '8px'
                    }}>
                      Template:
                    </span>
                    <span style={{ 
                      fontSize: '12px', 
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      {templates[selectedTemplate].name}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab("templates")}
                    style={{ 
                      ...styles.button, 
                      ...styles.secondaryButton,
                      padding: '4px 8px',
                      fontSize: '11px'
                    }}
                  >
                    <Palette size={12} />
                    Change
                  </button>
                </div>

                {/* CV Preview Content */}
                <div style={{ flex: 1, overflow: 'auto' }}>
                  {renderTemplatePreview()}
                </div>

                {/* Action Buttons */}
                <div style={{ 
                  padding: '16px',
                  borderTop: '1px solid #e5e7eb',
                  background: '#f8fafc'
                }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}