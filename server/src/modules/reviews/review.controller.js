import { fetchPublicReviews } from "./review.service.js";

export const getPublicReviews = async (req, res) => {
  try {
    const tmdbId = parseInt(req.params.tmdbId, 10);

    if (!tmdbId) {
      return res.status(400).json({
        error: "Invalid movie id",
      });
    }

    const data = await fetchPublicReviews(tmdbId);

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message || "Failed to fetch reviews",
    });
  }
};
