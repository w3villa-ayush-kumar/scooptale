import { useApp } from "../context/useApp";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user, loadingUser } = useApp();

  if (loadingUser) {
    return <div className="min-h-screen bg-slate-950" />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
