import { fetchUsers } from "./admin.service.js";

export const getUsers = async (req, res) => {
  try {
    const result = await fetchUsers(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
