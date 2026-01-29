import { useMemo } from "react";
import { Link } from "react-router-dom";

function getRandomMovies(movies, count = 3) {
  if (!movies || movies.length === 0) return [];

  const shuffled = [...movies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function Header({ movies = [], loading }) {
  const randomPosters = useMemo(() => getRandomMovies(movies, 3), [movies]);
  return (
    <header className="relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-black">
      <div
        className="absolute -top-32 -left-32 h-125 w-125 rounded-full
                      bg-green-500/20 blur-3xl"
      />
      <div
        className="absolute bottom-0 right-0 h-100 w-100 rounded-full
                      bg-emerald-400/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div
            className="absolute inset-0 -rotate-2 rounded-3xl
                          bg-white/5 backdrop-blur-xl
                          border border-white/10"
          />

          <div className="relative p-10 rotate-1">
            <span className="text-xs tracking-widest uppercase text-green-400">
              Community powered cinema
            </span>

            <h1 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">
              Movies aren't just watched.
              <span className="block text-green-400 mt-2">
                They're experienced.
              </span>
            </h1>

            <p className="mt-6 text-slate-400 text-lg leading-relaxed">
              Scooptale is where movie lovers explore trending films, revisit
              classics, and publish honest reviews — raw, personal, and human.
            </p>

            <div className="mt-10 flex gap-4">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold
                           hover:bg-green-400 transition"
              >
                Write a review
              </Link>

              <Link
                to="/movies"
                className="px-6 py-3 rounded-xl border border-white/20
                           text-slate-200 hover:border-white/40 transition"
              >
                Browse films
              </Link>
            </div>
          </div>
        </div>

        <div className="relative hidden md:flex items-center justify-center">
          {loading
            ? [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`
          absolute w-40 h-60 rounded-xl
          bg-white/10 animate-pulse
          ${i === 0 && "-rotate-10 -translate-x-30"}
          ${i === 1 && "z-10"}
          ${i === 2 && "rotate-12 translate-x-30"}
        `}
                />
              ))
            : randomPosters.slice(0, 3).map((movie, i) => (
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={`
                absolute w-50 lg:w-70 rounded-xl shadow-2xl
                border border-white/10
                transition duration-350 ease-in-out hover:scale-115 hover:z-11
                ${i === 0 && "-rotate-10 -translate-x-30"}
                ${i === 1 && "w-55 lg:w-75 z-10"}
                ${i === 2 && "rotate-12 translate-x-30"}
              `}
                />
              ))}
        </div>
      </div>
    </header>
  );
}
