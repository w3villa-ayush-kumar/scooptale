import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { sendError } from "../utils/sendError.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return sendError(res, 401, "Authentication required");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    req.user = decoded;

    next();
  } catch (err) {
    return sendError(res, 401, "Authentication failed");
  }
};
