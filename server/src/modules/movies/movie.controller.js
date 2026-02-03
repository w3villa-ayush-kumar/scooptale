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

    if (!q || q.length < 2) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const movies = await searchMovies(q);

    const cleaned = movies.map((m) => ({
      id: m.id,
      title: m.title,
      poster: m.poster_path,
      releaseDate: m.release_date,
      rating: m.vote_average,
    }));

    res.json(cleaned);
  } catch (error) {
    res.status(500).json({
      error: "Failed to search movies",
    });
  }
};
