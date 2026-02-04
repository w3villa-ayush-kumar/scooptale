import {
  getMovieDetails,
  getTrendingMovies,
  searchMovies,
} from "../../services/tmdb.service.js";
import { sendError } from "../../utils/sendError.js";

export const fetchTrendingMovies = async (req, res) => {
  try {
    const movies = await getTrendingMovies();
    return res.json({
      success: true,
      data: movies,
    });
  } catch {
    return sendError(res, 500, "Failed to fetch trending movies");
  }
};

export const fetchMovieDetails = async (req, res) => {
  try {
    const { tmdbId } = req.params;
    const movie = await getMovieDetails(tmdbId);

    return res.json({
      success: true,
      data: movie,
    });
  } catch {
    return sendError(res, 500, "Failed to fetch movie details");
  }
};

export const fetchMovieBySearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return sendError(res, 400, "Search query is required");
    }

    const movies = await searchMovies(q);

    const cleaned = movies.map((m) => ({
      id: m.id,
      title: m.title,
      poster: m.poster_path,
      releaseDate: m.release_date,
      rating: m.vote_average,
    }));

    return res.json({
      success: true,
      data: cleaned,
    });
  } catch {
    return sendError(res, 500, "Failed to search movies");
  }
};
