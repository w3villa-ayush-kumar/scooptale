import { useEffect, useState } from "react";
import api from "../../../services/api";
import Header from "../components/Header";
import TrendingSection from "../components/TrendingSection";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies/trending");
        setMovies(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header movies={movies} loading={loading} />
      <TrendingSection movies={movies} loading={loading} />

      <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        Scooptale • Built for movie lovers
      </footer>
    </div>
  );
}
