import { useEffect, useRef, useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function MovieSearch() {
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      try {
        const res = await api.get(`/movies/search?q=${query}`);
        setResults(res.data.data);
      } catch {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setQuery("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-64">
      <div
        onClick={handleFocus}
        className="
          flex items-center gap-2
          bg-black/40 backdrop-blur-lg
          border border-white/10
          rounded-full
          px-4 py-2
          shadow-xl
          hover:border-white/20
          transition
          cursor-text
        "
      >
        <Search size={18} className="shrink-0" />

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="
            w-full
            bg-transparent
            outline-none
            text-sm
          "
        />
      </div>

      {results.length > 0 && (
        <div
          className="
            absolute top-14 left-0
            w-80
            bg-slate-900/95
            backdrop-blur-xl
            border border-white/10
            rounded-xl
            shadow-2xl
            max-h-96 overflow-y-auto
            z-50
          "
        >
          {results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                navigate(`/movies/${movie.id}`);
                setQuery("");
                setResults([]);
              }}
              className="
                flex items-center gap-3 p-3
                hover:bg-white/5
                cursor-pointer
                transition
              "
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster}`}
                className="w-10 rounded"
                alt={movie.title}
              />

              <div className="leading-tight">
                <p className="text-sm font-semibold">{movie.title}</p>

                <p className="text-xs text-gray-400">
                  {movie.releaseDate?.slice(0, 4)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
