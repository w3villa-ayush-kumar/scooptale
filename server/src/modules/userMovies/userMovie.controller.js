import {
  saveMovie,
  removeMovie,
  updateMovie,
  getUserMovies,
  getUserShelves,
} from "./userMovie.service.js";
import { sendError } from "../../utils/sendError.js";

export const save = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tmdbId = Number(req.params.tmdbId);

    const movie = await saveMovie(userId, tmdbId);

    return res.status(201).json({
      success: true,
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
      return sendError(res, 400, "Movie already saved");
    }

    return sendError(res, 500, error.message || "Failed to save movie");
  }
};

export const remove = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tmdbId = Number(req.params.tmdbId);

    const deleted = await removeMovie(userId, tmdbId);

    if (!deleted) {
      return sendError(res, 404, "Saved movie not found");
    }

    return res.json({
      success: true,
      message: "Movie removed successfully",
    });
  } catch {
    return sendError(res, 500, "Failed to remove movie");
  }
};

export const update = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tmdbId = Number(req.params.tmdbId);
    const { rating, review, status } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
      return sendError(res, 400, "Rating must be between 1 and 5");
    }

    const updated = await updateMovie(userId, tmdbId, {
      rating,
      review,
      status,
    });

    if (!updated) {
      return sendError(res, 404, "Saved movie not found");
    }

    return res.json({
      success: true,
      message: "Movie updated",
      movie: updated,
    });
  } catch (err) {
    return sendError(res, 500, err.message || "Failed to update movie");
  }
};

export const getMine = async (req, res) => {
  try {
    const userId = req.user.userId;
    const movies = await getUserMovies(userId);

    return res.json({
      success: true,
      data: movies,
    });
  } catch {
    return sendError(res, 500, "Failed to fetch saved movies");
  }
};

export const getShelves = async (req, res) => {
  try {
    const shelves = await getUserShelves(req.user.userId);

    return res.json({
      success: true,
      data: shelves,
    });
  } catch {
    return sendError(res, 500, "Failed to fetch shelves");
  }
};
