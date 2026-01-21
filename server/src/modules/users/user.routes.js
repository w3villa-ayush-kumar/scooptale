import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { getMyProfile, updateMyProfile } from "./user.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);

export default router;
