import { fetchPublicReviews } from "./review.service.js";
import { sendError } from "../../utils/sendError.js";

export const getPublicReviews = async (req, res) => {
  try {
    const tmdbId = parseInt(req.params.tmdbId, 10);

    if (!tmdbId) {
      return sendError(res, 400, "Invalid movie id");
    }

    const data = await fetchPublicReviews(tmdbId);

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, error.message || "Failed to fetch reviews");
  }
};
