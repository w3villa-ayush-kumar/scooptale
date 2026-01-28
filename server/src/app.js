import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import planRoutes from "./modules/plans/plan.routes.js";
import movieRoutes from "./modules/movies/movie.routes.js";
import paymentRoutes from "./modules/payments/payment.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import passport from "passport";
import "./config/passport.js";
import { stripeWebhook } from "./modules/payments/stripe.webhook.js";

const app = express();

app.use(cors());

app.use((req, res, next) => {
  if (req.originalUrl.includes("webhook")) {
    console.log("🌐 Incoming request");
    console.log("➡️ Method:", req.method);
    console.log("➡️ URL:", req.originalUrl);
    console.log("➡️ Headers:", req.headers);
  }
  next();
});

app.post(
  "/payments/webhook",
  express.raw({ type: "application/json" }),
  (req, res, next) => {
    console.log("📦 Raw body received (length):", req.body?.length);
    next();
  },
  stripeWebhook,
);

app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Scooptale Backend API");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/plans", planRoutes);
app.use("/movies", movieRoutes);
app.use("/payments", paymentRoutes);
app.use("/admin", adminRoutes);

export default app;
