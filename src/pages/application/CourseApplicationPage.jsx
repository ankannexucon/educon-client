import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  BookOpen,
  User,
  Calendar,
  FileText,
  ChevronRight,
} from "lucide-react";

// Mock data for course applications
const mockApplications = [
  {
    id: "APP001",
    courseName: "B.Sc. in Computer Science",
    instructor: "Dr. Sarah Johnson",
    appliedDate: "2024-01-15",
    duration: "12 weeks",
    fees: 9000,
    status: "approved",
    progress: [
      { stage: "applied", status: "completed", date: "2024-01-15" },
      { stage: "under_review", status: "completed", date: "2024-01-18" },
      { stage: "approved", status: "completed", date: "2024-01-20" },
      { stage: "payment", status: "pending", date: null },
      { stage: "enrolled", status: "pending", date: null },
    ],
  },
  {
    id: "APP002",
    courseName: "M.Sc. in Data Science",
    instructor: "Prof. Michael Chen",
    appliedDate: "2024-01-10",
    duration: "10 weeks",
    fees: 12000,
    status: "pending",
    progress: [
      { stage: "applied", status: "completed", date: "2024-01-10" },
      { stage: "under_review", status: "current", date: null },
      { stage: "approved", status: "pending", date: null },
      { stage: "payment", status: "pending", date: null },
      { stage: "enrolled", status: "pending", date: null },
    ],
  },
  {
    id: "APP003",
    courseName: "BBA in Management",
    instructor: "Dr. Emily Rodriguez",
    appliedDate: "2024-01-05",
    duration: "16 weeks",
    fees: 7500,
    status: "paid",
    progress: [
      { stage: "applied", status: "completed", date: "2024-01-05" },
      { stage: "under_review", status: "completed", date: "2024-01-08" },
      { stage: "approved", status: "completed", date: "2024-01-12" },
      { stage: "payment", status: "completed", date: "2024-01-14" },
      { stage: "enrolled", status: "pending", date: null },
    ],
  },
  {
    id: "APP004",
    courseName: "React Advanced",
    instructor: "Ms. Jessica Williams",
    appliedDate: "2024-01-20",
    duration: "8 weeks",
    fees: 450,
    status: "rejected",
    progress: [
      { stage: "applied", status: "completed", date: "2024-01-20" },
      { stage: "under_review", status: "completed", date: "2024-01-22" },
      { stage: "approved", status: "rejected", date: "2024-01-23" },
      { stage: "payment", status: "cancelled", date: null },
      { stage: "enrolled", status: "cancelled", date: null },
    ],
  },
];

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

const stageLabels = {
  applied: "Application Submitted",
  under_review: "Under Review",
  approved: "Approved",
  payment: "Payment",
  enrolled: "Enrolled",
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.text} ${config.bg}`}
    >
      <IconComponent className="w-4 h-4 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ProgressTracker = ({ progress }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      {progress.map((step, index) => (
        <React.Fragment key={step.stage}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.status === "completed"
                  ? "bg-green-500 text-white"
                  : step.status === "current"
                  ? "bg-blue-500 text-white"
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
              {(step.status === "pending" || step.status === "cancelled") && (
                <div className="w-2 h-2 bg-current rounded-full" />
              )}
            </div>
            <span className="text-xs mt-2 text-center text-gray-600">
              {stageLabels[step.stage]}
            </span>
            {step.date && (
              <span className="text-xs text-gray-500 mt-1">
                {new Date(step.date).toLocaleDateString()}
              </span>
            )}
          </div>
          {index < progress.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 ${
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

const CourseApplicationCard = ({ application }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-4 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {application.courseName}
            </h3>
            <p className="text-gray-600">Application ID: {application.id}</p>
          </div>
          <StatusBadge status={application.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              Applied: {new Date(application.appliedDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            {/* <DollarSign className="w-4 h-4 mr-2" /> */}
            <span>€{application.fees}</span>
          </div>
        </div>

        <ProgressTracker progress={application.progress} />

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">
                  Course Duration:
                </span>
                <span className="ml-2">{application.duration}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Next Steps:</span>
                <span className="ml-2">
                  {application.status === "pending" &&
                    "Your application is under review"}
                  {application.status === "approved" &&
                    "Please complete the payment to enroll"}
                  {application.status === "paid" &&
                    "Waiting for course commencement"}
                  {application.status === "complete" &&
                    "Course completed successfully"}
                  {application.status === "rejected" &&
                    "Application was not approved"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { key: "all", label: "All Applications" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "paid", label: "Paid" },
    { key: "complete", label: "Complete" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter.key
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default function CourseApplicationPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApplications = mockApplications.filter((app) => {
    const matchesFilter = filter === "all" || app.status === filter;
    const matchesSearch =
      app.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Course Applications
          </h1>
          <p className="text-gray-600">
            Track the status of all your course applications
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by course name or application ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredApplications.length} of {mockApplications.length}{" "}
              applications
            </div>
          </div>
        </div>

        <FilterButtons activeFilter={filter} onFilterChange={setFilter} />

        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <CourseApplicationCard
                key={application.id}
                application={application}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No applications found
              </h3>
              <p className="text-gray-600">
                {searchTerm || filter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't applied to any courses yet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
