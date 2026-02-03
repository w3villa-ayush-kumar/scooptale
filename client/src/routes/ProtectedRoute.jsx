import { Navigate } from "react-router-dom";
import { useApp } from "../context/useApp.js";

export default function ProtectedRoute({ children }) {
  const { user, loadingUser } = useApp();

  if (loadingUser) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
