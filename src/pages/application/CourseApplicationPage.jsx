import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  BookOpen,
  Calendar,
  FileText,
  ChevronRight,
  Mail,
} from "lucide-react";
import { useAuth } from "../../contexts/authContext";

// -----------------------------------------
// CONFIG
// -----------------------------------------
const stageLabels = {
  applied: "Application Submitted",
  agency_review: "Agency Review",
  university_review: "University Review",
  offer_letter: "Offer Letter Issued",
  payment: "Payment Completed",
  visa: "Visa Processing",
  enrolled: "Enrolled",
};

const statusConfig = {
  pending: {
    color: "bg-yellow-500",
    text: "text-yellow-800",
    bg: "bg-yellow-100",
    icon: Clock,
  },
  approved: {
    color: "bg-blue-500",
    text: "text-blue-800",
    bg: "bg-blue-100",
    icon: CheckCircle,
  },
  paid: {
    color: "bg-green-500",
    text: "text-green-800",
    bg: "bg-green-100",
    icon: DollarSign,
  },
  complete: {
    color: "bg-purple-500",
    text: "text-purple-800",
    bg: "bg-purple-100",
    icon: BookOpen,
  },
  rejected: {
    color: "bg-red-500",
    text: "text-red-800",
    bg: "bg-red-100",
    icon: XCircle,
  },
};

// -----------------------------------------
// MOCK APPLICATION DATA
// -----------------------------------------
const mockApplications = [
  {
    id: "APP101",
    courseName: "Master in Computer Science",
    applicant: "John Doe",
    appliedDate: "2025-02-10",
    duration: "24 Months",
    fees: 8000,
    status: "under_review",
    progress: [
      { stage: "applied", status: "completed", date: "2025-02-10" },
      { stage: "agency_review", status: "completed", date: "2025-02-12" },
      { stage: "university_review", status: "current", date: null },
      { stage: "offer_letter", status: "pending", date: null },
      { stage: "payment", status: "pending", date: null },
      { stage: "visa", status: "pending", date: null },
      { stage: "enrolled", status: "pending", date: null },
    ],
  },
  {
    id: "APP102",
    courseName: "MBA in International Business",
    applicant: "Jane Smith",
    appliedDate: "2025-02-05",
    duration: "18 Months",
    fees: 9000,
    status: "pending",
    progress: [
      { stage: "applied", status: "completed", date: "2025-02-05" },
      { stage: "agency_review", status: "current", date: null },
      { stage: "university_review", status: "pending", date: null },
      { stage: "offer_letter", status: "pending", date: null },
      { stage: "payment", status: "pending", date: null },
      { stage: "visa", status: "pending", date: null },
      { stage: "enrolled", status: "pending", date: null },
    ],
  },
];

// -----------------------------------------
// SMALL COMPONENTS
// -----------------------------------------
const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.text} ${config.bg}`}
    >
      <Icon className="w-4 h-4 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ProgressTracker = ({ progress }) => {
  return (
    <div className="flex flex-wrap items-center justify-between mb-6">
      {progress.map((step, index) => (
        <React.Fragment key={step.stage}>
          <div className="flex flex-col items-center w-24">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                step.status === "completed"
                  ? "bg-green-500 text-white"
                  : step.status === "current"
                  ? "bg-blue-500 text-white animate-pulse"
                  : step.status === "rejected"
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step.status === "completed" && (
                <CheckCircle className="w-4 h-4" />
              )}
              {step.status === "current" && <Clock className="w-4 h-4" />}
              {step.status === "rejected" && <XCircle className="w-4 h-4" />}
              {step.status === "pending" && (
                <div className="w-2 h-2 bg-current rounded-full" />
              )}
            </div>
            <p className="text-[11px] text-center mt-2 font-medium text-gray-700 leading-tight">
              {stageLabels[step.stage]}
            </p>
            {step.date && (
              <p className="text-[10px] text-gray-500">
                {new Date(step.date).toLocaleDateString()}
              </p>
            )}
          </div>
          {index < progress.length - 1 && (
            <div
              className={`flex-1 h-1 ${
                progress[index + 1].status === "completed" ||
                progress[index + 1].status === "current"
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// -----------------------------------------
// ROLE-BASED ACTIONS
// -----------------------------------------
const RoleActions = ({ role, application, onAction }) => {
  switch (role) {
    case "agency":
      return (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onAction("mark_reviewed")}
            className="px-3 py-1 bg-green-500 text-white rounded-md text-sm"
          >
            Mark Reviewed
          </button>
          <button
            onClick={() => onAction("forward")}
            className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
          >
            Forward to University
          </button>
        </div>
      );
    case "university":
      return (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onAction("approve")}
            className="px-3 py-1 bg-green-600 text-white rounded-md text-sm"
          >
            Approve Application
          </button>
          <button
            onClick={() => onAction("reject")}
            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
          >
            Reject
          </button>
          <button
            onClick={() => onAction("issue_offer")}
            className="px-3 py-1 bg-purple-500 text-white rounded-md text-sm"
          >
            Issue Offer Letter
          </button>
        </div>
      );
    case "student":
      return (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onAction("pay")}
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
          >
            Complete Payment
          </button>
          <button
            onClick={() => onAction("contact")}
            className="px-3 py-1 bg-gray-600 text-white rounded-md text-sm"
          >
            <Mail className="w-4 h-4 inline mr-1" />
            Contact Support
          </button>
        </div>
      );
    default:
      return null;
  }
};

// -----------------------------------------
// MAIN CARD COMPONENT
// -----------------------------------------
const CourseApplicationCard = ({ application, role }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAction = (action) => {
    alert(`${action} performed for ${application.courseName}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-4 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {application.courseName}
            </h3>
            <p className="text-gray-600">ID: {application.id}</p>
          </div>
          <StatusBadge status={application.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-gray-600 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Applied: {new Date(application.appliedDate).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" /> ${application.fees}
          </div>
          <div>{application.duration}</div>
        </div>

        <ProgressTracker progress={application.progress} />

        <RoleActions
          role={role}
          application={application}
          onAction={handleAction}
        />

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-4"
        >
          <FileText className="w-4 h-4 mr-1" />
          {isExpanded ? "Hide Details" : "View Details"}
          <ChevronRight
            className={`w-4 h-4 ml-1 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>

        {isExpanded && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Application Details
            </h4>
            <p className="text-sm text-gray-700">
              Review the full process and next steps based on your role.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// -----------------------------------------
// MAIN PAGE COMPONENT
// -----------------------------------------
export default function CourseApplicationPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth(); // 👈 role comes from context

  const filteredApplications = mockApplications.filter((app) => {
    const matchesFilter = filter === "all" || app.status === filter;
    const matchesSearch =
      app.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Course Applications
        </h1>
        <p className="text-gray-600 mb-6">
          Track your progress across all stages.
        </p>

        {/* Search + Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <input
              type="text"
              placeholder="Search by course name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="text-sm text-gray-600">
              Showing {filteredApplications.length} of {mockApplications.length}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <CourseApplicationCard
                key={app.id}
                application={app}
                role={user?.role || "student"}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No applications found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
