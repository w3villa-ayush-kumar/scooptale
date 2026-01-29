export default function MovieCard({ movie }) {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        bg-white/5 border border-white/10
        hover:border-green-400/40
        transition
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
