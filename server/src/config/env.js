import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  backendUrl: process.env.BACKEND_URL,
  clientUrl: process.env.CLIENT_URL,

  // emailHost: process.env.EMAIL_HOST,
  // emailPort: process.env.EMAIL_PORT,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  // emailFrom: process.env.EMAIL_FROM,

  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

  facebookAppId: process.env.FACEBOOK_APP_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,

  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,

  tmdbApiKey: process.env.TMDB_API_KEY,
  tmdbBaseUrl: process.env.TMDB_BASE_URL,

  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};
