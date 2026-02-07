import { loginUser, registerUser } from "./auth.service.js";
import { sendVerificationEmail } from "../../utils/email.js";
import User from "../users/user.model.js";
import { env } from "../../config/env.js";
import { generateJwtToken } from "../../utils/jwt.js";
import { sendError } from "../../utils/sendError.js";

export const signup = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    const verificationLink = `${env.backendUrl}/auth/verify-email?token=${user.emailVerificationToken}`;

    sendVerificationEmail(user.email, verificationLink);

    return res.status(201).json({
      success: true,
      message:
        "Signup successful! Please verify your email. If you don't see it, check Spam.",
    });
  } catch (error) {
    return sendError(res, 400, error.message, error);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return sendError(res, 400, "Token missing");
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return sendError(res, 400, "Invalid or expired token");
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;

    await user.save();

    return res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch {
    return sendError(res, 500, "Email verification failed");
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await loginUser(req.body);

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return sendError(res, 401, error.message);
  }
};

export const socialLoginSuccess = async (req, res) => {
  const user = req.user;

  const token = generateJwtToken({
    userId: user._id,
    role: user.role,
  });

  return res.redirect(`${env.clientUrl}/oauth-success?token=${token}`);
};
