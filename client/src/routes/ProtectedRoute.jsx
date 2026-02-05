import { useApp } from "../context/useApp";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loadingUser } = useApp();

  if (loadingUser) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
