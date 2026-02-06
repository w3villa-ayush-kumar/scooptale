import { Outlet, Link } from "react-router-dom";
import Navbar from "../shared/ui/Navbar";
import MovieSearch from "../features/movies/components/MovieSearch";
import { useApp } from "../context/useApp";
import { Clapperboard, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AppLayout() {
  const { user } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white">
      <div className="fixed top-3 left-3 sm:top-6 sm:left-6 z-50 flex items-center gap-2 sm:gap-3 shrink-0">
        <MovieSearch />

        {user && (
          <Link
            to="/my-movies"
            className="
    flex items-center gap-2
   px-3 py-1.5 sm:px-5 sm:py-2 rounded-full
    bg-black/40 backdrop-blur-lg
    border border-white/10
    hover:bg-white/10
    transition
    text-xs sm:text-sm
 font-medium
  "
          >
            <Clapperboard size={16} />
            <span className="hidden sm:inline">Library</span>
          </Link>
        )}
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/admin/users")}
            className="
      flex items-center gap-2
    px-3 py-1.5 sm:px-5 sm:py-2
 rounded-full
    bg-slate-800 backdrop-blur-lg
    border border-white/10
    hover:bg-slate-700
    transition
    text-xs sm:text-sm
 font-medium
    "
          >
            <Shield size={16} />
            <span className="hidden sm:inline">Admin</span>
          </button>
        )}
      </div>

      <div
        className="fixed top-3 right-3 sm:top-6 sm:right-6
 z-50 shrink-0"
      >
        <Navbar />
      </div>

      <Outlet />
    </div>
  );
}
