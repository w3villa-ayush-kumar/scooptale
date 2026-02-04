import { useApp } from "../context/useApp";
import { Navigate } from "react-router-dom";

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
