import { useState } from "react";
import {
  Check,
  X,
  FileText,
  User,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

import studentApplicationData from "../../json/studentApplicationData.json";

export default function StudentApplicationPage() {
  const [applications, setApplications] = useState(
    studentApplicationData || []
  );

  const [selectedApp, setSelectedApp] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAction = (app, action) => {
    setSelectedApp(app);
    setDialogAction(action);
    setShowDialog(true);
  };

  const confirmAction = () => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApp.id
          ? { ...app, status: dialogAction, notes: feedback }
          : app
      )
    );
    setShowDialog(false);
    setFeedback("");
    setSelectedApp(null);
  };

  const filteredApps = applications.filter((app) =>
    filter === "all" ? true : app.status === filter
  );

  const getStatusBadgeClass = (status) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      accepted: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };
    return variants[status] || variants.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Application Review Dashboard
              </h1>
              <p className="text-slate-600 mt-1">
                Review and manage university applications
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white">
                {applications.filter((a) => a.status === "pending").length}{" "}
                Pending
              </span>
              <span className="px-4 py-2 text-sm border border-green-200 rounded-lg bg-green-50 text-green-700">
                {applications.filter((a) => a.status === "accepted").length}{" "}
                Accepted
              </span>
              <span className="px-4 py-2 text-sm border border-red-200 rounded-lg bg-red-50 text-red-700">
                {applications.filter((a) => a.status === "rejected").length}{" "}
                Rejected
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "accepted", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`cursor-pointer px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                filter === f
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-wrap gap-6">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden flex-1 min-w-[300px] max-w-[400px]"
            >
              {/* Card Header */}
              <div className="p-6 pb-3 border-b border-slate-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-slate-600" />
                      {app.studentName}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      {app.program}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeClass(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <GraduationCap className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium">{app.university}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{app.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{app.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs">{app.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs">
                      Submitted: {app.submittedDate}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      GPA
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {app.gpa}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-600">
                      {app.documents.length} documents uploaded
                    </span>
                  </div>
                </div>

                {app.status === "pending" && (
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleAction(app, "accepted")}
                      className="cursor-pointer flex-1 flex items-center justify-center gap-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(app, "rejected")}
                      className="cursor-pointer flex-1 flex items-center justify-center gap-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}

                {app.status !== "pending" && app.notes && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-600">
                      <span className="font-medium">Feedback: </span>
                      {app.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">
              No applications found
            </h3>
            <p className="text-slate-600 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Confirmation Dialog Modal */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {dialogAction === "accepted"
                ? "Accept Application"
                : "Reject Application"}
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              {dialogAction === "accepted"
                ? `You are about to accept ${selectedApp?.studentName}'s application to ${selectedApp?.university}.`
                : `You are about to reject ${selectedApp?.studentName}'s application to ${selectedApp?.university}.`}
            </p>

            <div className="mb-6">
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Feedback / Notes (Optional)
              </label>
              <textarea
                placeholder="Add any feedback or notes for the student..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent min-h-24 text-sm"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDialog(false);
                  setFeedback("");
                }}
                className="cursor-pointer px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`cursor-pointer px-4 py-2 rounded-lg font-medium text-white transition-colors ${
                  dialogAction === "accepted"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Confirm {dialogAction === "accepted" ? "Accept" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
