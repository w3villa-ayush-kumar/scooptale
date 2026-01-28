import express from "express";
import {
  fetchMovieBySearch,
  fetchTrendingMovies,
  fetchMovieDetails,
} from "./movie.controller.js";

const router = express.Router();

router.get("/search", fetchMovieBySearch);
router.get("/trending", fetchTrendingMovies);
router.get("/:tmdbId", fetchMovieDetails);

export default router;
