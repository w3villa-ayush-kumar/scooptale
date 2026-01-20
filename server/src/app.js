import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Scooptale Backend API");
});

app.use("/auth", authRoutes);

export default app;
