import { loginUser, registerUser } from "./auth.service.js";
import { sendVerificationEmail } from "../../utils/email.js";
import User from "../users/user.model.js";
import { env } from "../../config/env.js";
import { generateJwtToken } from "../../utils/jwt.js";

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

export const login = async (req, res) => {
  try {
    const { token, user } = await loginUser(req.body);

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

export const socialLoginSuccess = async (req, res) => {
  const user = req.user;

  const token = generateJwtToken({
    userId: user._id,
    role: user.role,
  });

  res.json({
    message: "Social login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      providers: user.providers,
    },
  });
};
