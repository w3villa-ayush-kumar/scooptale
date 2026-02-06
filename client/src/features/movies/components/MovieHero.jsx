export default function MovieHero({ movie, ratings }) {
  const backdrop = movie.backdrop
    ? `https://image.tmdb.org/t/p/original${movie.backdrop}`
    : null;

  const poster = movie.poster
    ? `https://image.tmdb.org/t/p/w500${movie.poster}`
    : null;

  return (
    <div
      className="relative h-[60vh] sm:h-[70vh]
 w-full pt-20"
    >
      {backdrop ? (
        <img
          src={backdrop}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => (e.target.style.display = "none")}
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 to-slate-400" />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent" />

      <div
        className="relative max-w-6xl mx-auto
  px-4 sm:px-6
  h-full
  flex flex-col sm:flex-row
  items-start sm:items-end
  pb-6 sm:pb-10
  gap-6 sm:gap-8"
      >
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            className="w-32 sm:w-44 md:w-52
 rounded-xl shadow-2xl"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <div
            className="w-32 h-48 sm:w-44 sm:h-64 md:w-52 md:h-78
 rounded-xl bg-slate-800 flex items-center justify-center shadow-2xl"
          >
            <span
              className="text-slate-500 text-sm text-center px-4 self-center sm:self-auto
"
            >
              No Poster Available
            </span>
          </div>
        )}

        <div>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold
"
          >
            {movie.title}
          </h1>

          <p
            className="text-slate-300 mt-3 max-w-full sm:max-w-2xl
"
          >
            {movie.overview}
          </p>

          <div
            className="flex flex-wrap gap-3 sm:gap-6
 mt-4 text-sm text-slate-400"
          >
            <span>⭐ TMDB: {movie.tmdbRating}</span>
            <span>
              ⭐ Users: {ratings?.average ?? "-"} ({ratings?.count ?? 0})
            </span>
            {movie.runtime && <span>{movie.runtime} mins</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
