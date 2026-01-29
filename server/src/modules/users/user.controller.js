import {
  findUserById,
  updateUserProfile,
  updateProfileImage,
  getProfileForDownload,
} from "./user.service.js";

export const getMyProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      location: user.location,
      profileImageUrl: user.profileImageUrl,
      role: user.role,
      currentPlan: user.currentPlan,
      isEmailVerified: user.isEmailVerified,
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const user = await updateUserProfile(req.user.userId, req.body);

    res.json({
      message: "Profile updated successfully",
      profile: {
        name: user.name,
        address: user.address,
        location: user.location,
      },
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const imageUrl = req.file.path || req.file.secure_url;

    const profileImageUrl = await updateProfileImage(req.user.userId, imageUrl);

    res.json({
      message: "Profile picture updated successfully",
      profileImageUrl,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const downloadMyProfile = async (req, res) => {
  try {
    const profileData = await getProfileForDownload(req.user.userId);

    res.setHeader("Content-Disposition", "attachment; filename=profile.json");
    res.setHeader("Content-Type", "application/json");

    res.status(200).send(JSON.stringify(profileData, null, 2));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
