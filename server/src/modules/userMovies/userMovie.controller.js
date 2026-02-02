import {
  saveMovie,
  removeMovie,
  updateMovie,
  getUserMovies,
} from "./userMovie.service.js";

export const save = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tmdbId = Number(req.params.tmdbId);

    const movie = await saveMovie(userId, tmdbId);

    res.status(201).json({
      message: "Movie saved successfully",
      movie: {
        id: movie._id,
        tmdbId: movie.tmdbId,
        status: movie.status,
        createdAt: movie.createdAt,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Movie already saved",
      });
    }

    res.status(500).json({
      error: error.message || "Failed to save movie",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tmdbId = Number(req.params.tmdbId);

    const deleted = await removeMovie(userId, tmdbId);

    if (!deleted) {
      return res.status(404).json({
        error: "Saved movie not found",
      });
    }

    res.json({
      message: "Movie removed successfully",
    });
  } catch {
    res.status(500).json({
      error: "Failed to remove movie",
    });
  }
};

export const update = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tmdbId = Number(req.params.tmdbId);
    const { rating, review, status } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        error: "Rating must be between 1 and 5",
      });
    }

    const updated = await updateMovie(userId, tmdbId, {
      rating,
      review,
      status,
    });

    if (!updated) {
      return res.status(404).json({
        error: "Saved movie not found",
      });
    }

    res.json({
      message: "Movie updated",
      movie: updated,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message || "Failed to update movie",
    });
  }
};

export const getMine = async (req, res) => {
  try {
    const userId = req.user.userId;

    const movies = await getUserMovies(userId);

    res.json(movies);
  } catch {
    res.status(500).json({
      error: "Failed to fetch saved movies",
    });
  }
};
