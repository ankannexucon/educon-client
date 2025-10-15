import React from "react";
import { useAuth } from "../contexts/authContext";

export default function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return <div>GuestRoute</div>;
}
