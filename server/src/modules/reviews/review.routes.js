import express from "express";
import { getPublicReviews } from "./review.controller.js";

const router = express.Router();

router.get("/:tmdbId", getPublicReviews);

export default router;
