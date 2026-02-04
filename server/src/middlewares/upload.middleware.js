import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { sendError } from "../utils/sendError.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "scooptale/profile-pictures",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 300, height: 300, crop: "fill" }],
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export const uploadSingle = (field) => (req, res, next) => {
  upload.single(field)(req, res, (err) => {
    if (err) return sendError(res, 400, "File upload failed");
    next();
  });
};
