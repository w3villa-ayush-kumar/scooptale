import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { checkout } from "./payment.controller.js";

const router = express.Router();

router.post("/checkout", authMiddleware, checkout);

export default router;
