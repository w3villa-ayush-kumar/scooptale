import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div
      onClick={() => {
        if (!movie?.id) return;
        navigate(`/movies/${movie.id}`);
      }}
      className="
        group relative overflow-hidden rounded-2xl
        bg-white/5 border border-white/10
        hover:border-green-400/40
        transition cursor-pointer
        hover:scale-[1.03]
        active:scale-[0.98]
      "
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className="
          aspect-2/3 w-full object-cover
          transition duration-500
          group-hover:scale-110
        "
      />

      <div
        className="
          absolute inset-0
          bg-linear-to-t from-black/80 via-black/30 to-transparent
          opacity-0 group-hover:opacity-100
          transition
        "
      />

      <div
        className="
          pointer-events-none absolute bottom-3 left-3 right-3
          text-md font-semibold text-white
          opacity-0 group-hover:opacity-100
          transition
        "
      >
        {movie.title}
      </div>
    </div>
  );
}
