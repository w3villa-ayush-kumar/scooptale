import express from "express";
import {
  fetchMovieBySearch,
  fetchTrendingMovies,
  fetchMovieDetails,
} from "./movie.controller.js";
import { getFullMoviePage } from "./movie.page.controller.js";

const router = express.Router();

router.get("/search", fetchMovieBySearch);
router.get("/trending", fetchTrendingMovies);
router.get("/:tmdbId/full", getFullMoviePage);
router.get("/:tmdbId", fetchMovieDetails);

export default router;
