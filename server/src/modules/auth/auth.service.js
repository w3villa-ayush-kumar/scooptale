import bcrypt from "bcryptjs";
import User from "../users/user.model.js";
import { generateEmailToken } from "../../utils/token.js";
import { generateJwtToken } from "../../utils/jwt.js";

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const emailVerificationToken = generateEmailToken();
  const emailVerificationTokenExpiry = new Date(
    Date.now() + 24 * 60 * 60 * 1000,
  );

  const user = await User.create({
    name,
    email,
    passwordHash,
    emailVerificationToken,
    emailVerificationTokenExpiry,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+passwordHash");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.isEmailVerified) {
    throw new Error("Please verify your email before logging in");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateJwtToken({
    userId: user._id,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
