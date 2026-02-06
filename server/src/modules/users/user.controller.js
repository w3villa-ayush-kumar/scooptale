import {
  findUserById,
  updateUserProfile,
  updateProfileImage,
} from "./user.service.js";
import { sendError } from "../../utils/sendError.js";

export const getMyProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.userId);

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        location:
          user.location?.lat != null && user.location?.lng != null
            ? user.location
            : null,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
        currentPlan: user.currentPlan,
        isPlanActive: user.isPlanActive,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch {
    return sendError(res, 500, "Failed to fetch profile");
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const user = await updateUserProfile(req.user.userId, req.body);

    return res.json({
      success: true,
      message: "Profile updated successfully",
      profile: {
        name: user.name,
        address: user.address,
        location: user.location,
      },
    });
  } catch (error) {
    return sendError(res, 404, error.message);
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const imageUrl = req.file.path || req.file.secure_url;

    const profileImageUrl = await updateProfileImage(req.user.userId, imageUrl);

    return res.json({
      success: true,
      message: "Profile picture updated successfully",
      profileImageUrl,
    });
  } catch (error) {
    return sendError(res, 404, error.message);
  }
};
