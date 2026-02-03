import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import MovieHero from "../components/MovieHero";
import MovieActions from "../components/MovieActions";
import ReviewForm from "../components/ReviewForm";
import ReviewsList from "../components/ReviewsList";
import MoviePageSkeleton from "../skeletons/MoviePageSkeleton";

export default function MoviePage() {
  const { tmdbId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovie = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/movies/${tmdbId}/full`);
      setData(res.data);
    } catch (error) {
      console.error("Failed to load movie", error);
    } finally {
      setLoading(false);
    }
  }, [tmdbId]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  if (loading) {
    return <MoviePageSkeleton />;
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

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <MovieActions
          tmdbId={tmdbId}
          userState={data.userState}
          refresh={fetchMovie}
        />

        <ReviewForm
          tmdbId={tmdbId}
          userState={data.userState}
          refresh={fetchMovie}
        />

        <ReviewsList reviews={data.reviews} />
      </div>
    </div>
  );
}
