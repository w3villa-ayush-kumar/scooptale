import express from "express";
import {
  login,
  signup,
  verifyEmail,
  socialLoginSuccess,
} from "./auth.controller.js";
import passport from "passport";

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
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/oauth-failure`,
  }),
  socialLoginSuccess,
);

router.get("/google/failure", (req, res) => {
  return res.status(401).json({
    success: false,
    message: "Google authentication failed",
  });
});

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  }),
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/oauth-failure`,
  }),
  socialLoginSuccess,
);

router.get("/facebook/failure", (req, res) => {
  return res.status(400).json({
    success: false,
    message:
      "Facebook login failed. Your Facebook account does not have an email. Please sign up using email or Google.",
  });
});

export default router;
