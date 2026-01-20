import { registerUser } from "./auth.service.js";
import { sendVerificationEmail } from "../../utils/email.js";
import User from "../users/user.model.js";
import { env } from "../../config/env.js";

export const signup = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    const verificationLink = `${env.backendUrl}/auth/verify-email?token=${user.emailVerificationToken}`;

    await sendVerificationEmail(user.email, verificationLink);

    res.status(201).json({
      message: "Signup successful. Please verify your email.",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        error: "Token missing",
      });
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        error: "Invalid or expire token",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;

    await user.save();

    res.json({
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Email verification failed",
    });
  }
};
