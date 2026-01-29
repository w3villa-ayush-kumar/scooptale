import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  downloadMyProfile,
  getMyProfile,
  updateMyProfile,
  uploadProfilePicture,
} from "./user.controller.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);
router.post(
  "/me/avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadProfilePicture,
);
router.get("/me/download", authMiddleware, downloadMyProfile);

export default router;
