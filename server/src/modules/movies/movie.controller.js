import {
  getMovieDetails,
  getTrendingMovies,
  searchMovies,
} from "../../services/tmdb.service.js";

export const fetchTrendingMovies = async (req, res) => {
  try {
    const movies = await getTrendingMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch trending movies",
    });
  }
};

export const fetchMovieDetails = async (req, res) => {
  try {
    const { tmdbId } = req.params;
    const movie = await getMovieDetails(tmdbId);
    res.json(movie);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch movie details",
    });
  }
};

export const fetchMovieBySearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const movies = await searchMovies(q);
    res.json(movies);
  } catch (error) {
    res.status(500).json({
      error: "Failed to search movies",
    });
  }
};
