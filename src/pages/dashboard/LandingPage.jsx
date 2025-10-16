import React from "react";
import { useAuth } from "../../contexts/authContext";
import StudentDashboard from "../../components/dashboard/StudentDashboard";
import AgencyDashboard from "../../components/dashboard/AgencyDashboard";
import UniversityDashboard from "../../components/dashboard/UniversityDashboard";

export default function LandingPage() {
  const { user } = useAuth();
  console.log(user);
  if (user?.role === "agency") return <AgencyDashboard />;
  else if (user?.role === "university") return <UniversityDashboard />;
  else return <StudentDashboard />;
}
