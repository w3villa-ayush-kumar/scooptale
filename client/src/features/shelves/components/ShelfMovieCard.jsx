import { useNavigate } from "react-router-dom";

export default function ShelfMovieCard({ movie }) {
  const navigate = useNavigate();

  const poster = `https://image.tmdb.org/t/p/w500/${movie.tmdb.poster_path}`;

  if (!movie?.tmdb) return null;

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
      <img src={poster} className="w-full h-60 object-cover" alt="" />
    </div>
  );
}
