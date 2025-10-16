import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to={"*"} /> : children;
}
