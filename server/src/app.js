import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import planRoutes from "./modules/plans/plan.routes.js";
import movieRoutes from "./modules/movies/movie.routes.js";
import paymentRoutes from "./modules/payments/payment.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import userMovieRoutes from "./modules/userMovies/userMovie.routes.js";
import reviewRoutes from "./modules/reviews/review.routes.js";
import passport from "passport";
import "./config/passport.js";
import { stripeWebhook } from "./modules/payments/stripe.webhook.js";
import helmet from "helmet";

const app = express();

const allowedOrigins = [process.env.CLIENT_URL];

app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  }),
);

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
app.use("/admin", adminRoutes);
app.use("/user-movies", userMovieRoutes);
app.use("/reviews", reviewRoutes);

export default app;
