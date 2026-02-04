import { Outlet } from "react-router-dom";
import Navbar from "../shared/ui/Navbar";

export default function AuthLayout() {
  return (
    <div className="min-h-screen text-white">
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50">
        <Navbar variant="auth" />
      </div>

      <Outlet />
    </div>
  );
}
