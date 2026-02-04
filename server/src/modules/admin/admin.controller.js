import { fetchUsers } from "./admin.service.js";
import { sendError } from "../../utils/sendError.js";

export const getUsers = async (req, res) => {
  try {
    const result = await fetchUsers(req.query);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return sendError(res, 400, error.message || "Failed to fetch users");
  }
};
