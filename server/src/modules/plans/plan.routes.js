import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { activatePlan } from "./plan.controller.js";

const router = express.Router();

router.post("/activate", authMiddleware, activatePlan);

export default router;
