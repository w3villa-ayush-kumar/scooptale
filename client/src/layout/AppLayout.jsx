import { Outlet } from "react-router-dom";
import Navbar from "../shared/ui/Navbar";
import MovieSearch from "../features/movies/components/MovieSearch";

export default function AppLayout() {
  return (
    <div className="min-h-screen text-white">
      <div className="fixed top-6 left-6 z-50">
        <MovieSearch />
      </div>

      <div className="fixed top-6 right-10 z-50">
        <Navbar />
      </div>

      <Outlet />
    </div>
  );
}
