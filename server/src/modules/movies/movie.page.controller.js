import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import UserMovie from "../userMovies/userMovie.model.js";
import { getMovieDetails } from "../../services/tmdb.service.js";

export const getFullMoviePage = async (req, res) => {
  try {
    const tmdbId = parseInt(req.params.tmdbId, 10);

    if (!tmdbId) {
      return res.status(400).json({
        error: "Invalid movie id",
      });
    }

    let userState = {
      saved: false,
    };

    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, env.jwtSecret);

        const userMovie = await UserMovie.findOne({
          userId: decoded.userId,
          tmdbId,
        }).lean();

        if (userMovie) {
          userState = {
            saved: true,
            status: userMovie.status,
            rating: userMovie.rating,
            review: userMovie.review,
          };
        }
      } catch {}
    }

    const movie = await getMovieDetails(tmdbId);

    if (!movie) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    const reviews = await UserMovie.find({
      tmdbId,
      isPublic: true,
      review: { $exists: true, $ne: "" },
    })
      .populate("userId", "name profileImageUrl")
      .sort({ createdAt: -1 })
      .lean();

    const ratingData = await UserMovie.aggregate([
      {
        $match: {
          tmdbId,
          rating: { $exists: true },
        },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    const stats = ratingData[0] || {
      avgRating: 0,
      reviewCount: 0,
    };

    const shapedReviews = reviews.map((r) => ({
      rating: r.rating,
      review: r.review,
      createdAt: r.createdAt,
      user: {
        name: r.userId?.name,
        avatar: r.userId?.profileImageUrl,
      },
    }));

    res.json({
      movie: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster: movie.poster_path,
        backdrop: movie.backdrop_path,
        releaseDate: movie.release_date,
        tmdbRating: movie.vote_average,
        runtime: movie.runtime,
      },

      ratings: {
        average: Number(stats.avgRating?.toFixed(1)) || 0,
        count: stats.reviewCount,
      },

      reviews: shapedReviews,
      userState,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch movie page",
    });
  }
};
