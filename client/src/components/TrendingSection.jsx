import MovieCard from "./MovieCard";

export default function TrendingSection({ movies = [], loading }) {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-slate-950 -z-10" />
      <div
        className="absolute -top-40 right-0 h-125 w-125
                      rounded-full bg-green-500/15 blur-3xl -z-10"
      />
      <div
        className="absolute bottom-0 left-0 h-100 w-100
                      rounded-full bg-emerald-400/10 blur-3xl -z-10"
      />
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="relative inline-block">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Trending this week
          </h2>
          <span
            className="absolute -bottom-2 left-0 h-0.75 w-16
                           bg-green-400 rounded-full"
          />
        </div>

        <p className="mt-6 max-w-xl text-slate-400 text-lg">
          What everyone's watching, discussing, and reviewing right now.
        </p>
      </div>
      <div className="relative">
        <div
          className="absolute inset-0 -rotate-1 mx-6 rounded-3xl
                     bg-white/5 backdrop-blur-xl
                     border border-white/10 -z-10"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 px-10">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="
            aspect-2/3 rounded-2xl
            bg-white/10 animate-pulse
          "
                />
              ))
            : movies
                .slice(0, 10)
                .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    </section>
  );
}
