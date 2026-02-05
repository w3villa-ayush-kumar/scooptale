import UserMovie from "../userMovies/userMovie.model.js";
import { getMovieDetails } from "../../services/tmdb.service.js";

export const fetchPublicReviews = async (tmdbId, currentUserId = null) => {
  const movie = await getMovieDetails(tmdbId);

  if (!movie) {
    throw new Error("Movie not found");
  }

  const reviews = await UserMovie.find({
    tmdbId,
    isPublic: true,
    review: { $exists: true, $ne: null },
  })
    .populate("userId", "name profileImageUrl")
    .sort({ createdAt: -1 })
    .lean();

  const cleanedReviews = reviews
    .map((r) => ({
      _id: r._id,
      rating: r.rating,
      review: r.review?.trim(),
      user: {
        _id: r.userId?._id,
        name: r.userId?.name,
        profileImageUrl: r.userId?.profileImageUrl,
        isCurrentUser:
          currentUserId &&
          r.userId?._id.toString() === currentUserId.toString(),
      },
    }))
    .filter((r) => r.review);

  return {
    movie: {
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      tmdbRating: movie.vote_average,
      releaseDate: movie.release_date,
    },
    reviews: cleanedReviews,
  };
};
