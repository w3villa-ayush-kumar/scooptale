import express from "express";
import { login, signup, verifyEmail } from "./auth.controller.js";
import passport from "passport";
import { socialLoginSuccess } from "./auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/verify-email", verifyEmail);
router.post("/login", login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  socialLoginSuccess,
);
router.get("/google/failure", (req, res) => {
  res.status(401).json({ error: "Google authentication failed" });
});

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] }),
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  socialLoginSuccess,
);
export default router;
