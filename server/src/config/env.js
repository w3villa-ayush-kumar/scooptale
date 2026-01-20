import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,

  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_POST,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  emailFrom: process.env.EMAIL_FROM,

  backendUrl: process.env.BACKEND_URL,
};
