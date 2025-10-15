import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";

export default function DevMode() {
  const auth = useAuth();

  // If auth context is not available
  if (!auth) return null;

  const { user, setUserDetails } = auth;
  const [role, setRole] = useState(user?.role || "student");

  const handleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setUserDetails({ ...user, role: selectedRole });
  };

  return (
    <div className="fixed bottom-5 left-5 p-4 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
      <h4 className="text-sm font-semibold mb-2">Dev Role Switch</h4>
      <select
        value={role}
        onChange={handleChange}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="student">Student</option>
        <option value="university">University</option>
        <option value="agency">Agency</option>
      </select>
    </div>
  );
}
