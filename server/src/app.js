import express from "express";
import { stripeWebhook } from "./modules/payments/stripe.webhook.js";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import planRoutes from "./modules/plans/plan.routes.js";
import movieRoutes from "./modules/movies/movie.routes.js";
import paymentRoutes from "./modules/payments/payment.routes.js";
import passport from "passport";
import "./config/passport.js";

const app = express();

app.use(cors());

app.post(
  "/payments/webhook",
  express.raw({ type: "application/json" }),
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

export default app;
