import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import MovieHero from "../components/MovieHero";
import MovieActions from "../components/MovieActions";
import ReviewsList from "../components/ReviewsList";
import MoviePageSkeleton from "../skeletons/MoviePageSkeleton";
import { toast } from "sonner";

export default function MoviePage() {
  const { tmdbId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);
        setData(null);

        const res = await api.get(`/movies/${tmdbId}/full`, {
          signal: controller.signal,
        });

        setData(res.data.data);
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          console.error("Failed to load movie", err);

          toast.error(err?.response?.data?.message || "Failed to load movie", {
            id: "movie-load-error",
          });

          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();

    return () => controller.abort();
  }, [tmdbId]);

  if (loading) {
    return <MoviePageSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">Failed to load movie. Please try again.</p>

        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Movie not found
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <MovieHero movie={data.movie} ratings={data.ratings} />

      <div
        className="max-w-6xl mx-auto
  px-4 sm:px-6
  py-6 sm:py-10
  space-y-8 sm:space-y-10"
      >
        <MovieActions
          tmdbId={tmdbId}
          userState={data.userState}
          setData={setData}
        />

        <ReviewsList reviews={data.reviews} />
      </div>
    </div>
  );
}
