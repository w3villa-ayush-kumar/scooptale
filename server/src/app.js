import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import passport from "passport";
import "./config/passport.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Scooptale Backend API");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

export default app;
