import UserMovie from "../userMovies/userMovie.model.js";
import { getMovieDetails } from "../../services/tmdb.service.js";

export const fetchPublicReviews = async (tmdbId) => {
  const movie = await getMovieDetails(tmdbId);

  if (!movie) {
    throw new Error("Movie not found");
  }

  const reviews = await UserMovie.find({
    tmdbId,
    isPublic: true,
    review: { $exists: true, $ne: "" },
  })
    .populate("userId", "name profileImageUrl")
    .sort({ createdAt: -1 })
    .lean();

  return {
    movie: {
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      tmdbRating: movie.vote_average,
      releaseDate: movie.release_date,
    },
    reviews,
  };
};
