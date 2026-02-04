import multer from "multer";
import pkg from "multer-storage-cloudinary";
const { CloudinaryStorage } = pkg;
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "scooptale/profile-pictures",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 300, height: 300, crop: "fill" }],
  },
});

export const upload = multer({ storage });
