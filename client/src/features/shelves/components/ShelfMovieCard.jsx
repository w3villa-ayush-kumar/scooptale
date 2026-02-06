import { useNavigate } from "react-router-dom";

export default function ShelfMovieCard({ movie }) {
  const navigate = useNavigate();

  if (!movie?.tmdb) return null;

  const poster = movie.tmdb.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.tmdb.poster_path}`
    : null;
  return (
    <div
      onClick={() => navigate(`/movies/${movie.tmdbId}`)}
      className="
        min-w-40 cursor-pointer
        rounded-xl overflow-hidden
        bg-white/5 border border-white/10
        hover:border-green-400/40
        hover:scale-105
        transition
      "
    >
      {poster ? (
        <img
          src={poster}
          className="w-full h-60 object-cover"
          alt={movie.tmdb.title || "Movie poster"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div className="w-full h-60 flex items-center justify-center bg-slate-800 text-slate-400 text-sm">
          No Poster
        </div>
      )}
    </div>
  );
}
