import ShelfMovieCard from "./ShelfMovieCard";

export default function ShelfRow({ title, movies }) {
  if (!movies?.length) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {movies.map((movie) => (
          <ShelfMovieCard key={movie.tmdbId} movie={movie} />
        ))}
      </div>
    </div>
  );
}
