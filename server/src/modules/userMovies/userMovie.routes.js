import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  getMine,
  getShelves,
  remove,
  save,
  update,
} from "./userMovie.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/me", getMine);
router.get("/shelves", getShelves);

router.post("/:tmdbId", save);
router.delete("/:tmdbId", remove);
router.patch("/:tmdbId", update);

export default router;
