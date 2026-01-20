import bcrypt from "bcryptjs";
import User from "../users/user.model.js";
import { generateToken } from "../../utils/token.js";

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const emailVerificationToken = generateToken();
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
