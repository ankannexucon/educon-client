import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function GuestRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  return !isAuthenticated ? (
    <Navigate to={location.state?.from || "/"} replace />
  ) : (
    children
  );
}
