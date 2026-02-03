export default function MovieHero({ movie, ratings }) {
  const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop}`;
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster}`;

  return (
    <div className="relative h-[70vh] w-full">
      <img
        src={backdrop}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/70 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 h-full flex items-end pb-10 gap-8">
        <img
          src={poster}
          alt={movie.title}
          className="w-52 rounded-xl shadow-2xl"
        />

        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <p className="text-slate-300 mt-3 max-w-2xl">{movie.overview}</p>

          <div className="flex gap-6 mt-4 text-sm text-slate-400">
            <span>⭐ TMDB: {movie.tmdbRating}</span>
            <span>
              ⭐ Users: {ratings.average} ({ratings.count})
            </span>
            <span>{movie.runtime} mins</span>
          </div>
        </div>
      </div>
    </div>
  );
}
