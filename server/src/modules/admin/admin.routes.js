import express from "express";
import {
  authMiddleware,
  roleMiddleware,
} from "../../middlewares/auth.middleware.js";
import { getUsers } from "./admin.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.get("/users", getUsers);

export default router;
