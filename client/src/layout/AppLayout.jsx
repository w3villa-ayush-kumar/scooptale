import { Outlet, Link } from "react-router-dom";
import Navbar from "../shared/ui/Navbar";
import MovieSearch from "../features/movies/components/MovieSearch";
import { useApp } from "../context/useApp";
import { Clapperboard } from "lucide-react";

export default function AppLayout() {
  const { user } = useApp();

  return (
    <div className="min-h-screen text-white">
      {/* LEFT SIDE */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
        <MovieSearch />

        {user && (
          <Link
            to="/my-movies"
            className="
    flex items-center gap-2
    px-5 py-2 rounded-full
    bg-black/40 backdrop-blur-lg
    border border-white/10
    hover:bg-white/10
    transition
    text-sm font-medium
  "
          >
            <Clapperboard size={16} />
            Library
          </Link>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="fixed top-6 right-6 z-50">
        <Navbar />
      </div>

      <Outlet />
    </div>
  );
}
