import UserMovie from "./userMovie.model.js";
import { getMovieDetails } from "../../services/tmdb.service.js";
import User from "../users/user.model.js";
import { PLANS } from "../../config/plan.js";

export const saveMovie = async (userId, tmdbId) => {
  const user = await User.findById(userId).lean();

  const limits = PLANS[user.currentPlan].limits;

  const details = await getMovieDetails(tmdbId);

  if (!details || details.success === false) {
    throw new Error("Movie not found");
  }

  const savedCount = await UserMovie.countDocuments({ userId });

  if (savedCount >= limits.saves) {
    throw new Error("Save limit reached. Upgrade your plan");
  }

  return UserMovie.create({
    userId,
    tmdbId,
  });
};

export const removeMovie = async (userId, tmdbId) => {
  return UserMovie.findOneAndDelete({
    userId,
    tmdbId,
  });
};

export const updateMovie = async (userId, tmdbId, data) => {
  const user = await User.findById(userId).lean();

  const limits = PLANS[user.currentPlan].limits;

  if (data.review) {
    const reviewCount = await UserMovie.countDocuments({
      userId,
      review: { $exists: true, $ne: "" },
    });

    if (reviewCount >= limits.reviews) {
      throw new Error("Review limit reached. Upgrade your plan.");
    }
  }

  const existing = await UserMovie.findOne({ userId, tmdbId });
  if (!existing) {
    throw new Error("Save movie before updating");
  }

  const finalStatus = data.status !== undefined ? data.status : existing.status;
  const finalRating = data.rating !== undefined ? data.rating : existing.rating;

  if (data.review && finalStatus !== "watched") {
    throw new Error("Mark movie as watched before reviewing");
  }

  if (finalStatus === "watched" && !finalRating) {
    throw new Error("Provide rating when marking movie as watched");
  }

  if (data.status !== undefined) {
    existing.status = data.status;
  }
  if (data.rating !== undefined) {
    existing.rating = data.rating;
  }
  if (data.review !== undefined) {
    existing.review = data.review;
  }

  await existing.save();

  return existing;
};

export const getUserMovies = async (userId) => {
  const saved = await UserMovie.find({ userId }).lean();

  const movies = await Promise.all(
    saved.map(async (m) => {
      const details = await getMovieDetails(m.tmdbId);

      return {
        id: details.id,
        title: details.title,
        poster: details.poster_path,
        releaseDate: details.release_date,
        tmdbRating: details.vote_average,

        userData: {
          status: m.status,
          rating: m.rating,
          review: m.review,
          savedAt: m.createdAt,
        },
      };
    }),
  );

  return movies;
};

export const getUserShelves = async (userId) => {
  const movies = await UserMovie.find({ userId })
    .sort({ updatedAt: -1 })
    .lean();

  const hydratedMovies = await Promise.all(
    movies.map(async (movie) => {
      try {
        const tmdb = await getMovieDetails(movie.tmdbId);

        return {
          ...movie,
          tmdb,
        };
      } catch {
        return movie;
      }
    }),
  );

  const shelves = {
    watchlist: [],
    watched: [],
    reviewed: [],
    stats: {
      watchlist: 0,
      watched: 0,
      reviewed: 0,
    },
  };

  hydratedMovies.forEach((movie) => {
    if (movie.status === "saved") {
      shelves.watchlist.push(movie);
      shelves.stats.watchlist++;
    }

    if (movie.status === "watched") {
      shelves.watched.push(movie);
      shelves.stats.watched++;
    }

    if (movie.review?.trim().length) {
      shelves.reviewed.push(movie);
      shelves.stats.reviewed++;
    }
  });

  return shelves;
};
