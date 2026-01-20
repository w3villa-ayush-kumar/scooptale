import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateJwtToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: "7d",
  });
};
