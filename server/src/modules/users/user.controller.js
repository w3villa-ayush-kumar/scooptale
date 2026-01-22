import User from "./user.model.js";

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
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
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch profile",
    });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const { name, address, location } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (name) user.name = name;
    if (address) user.address = address;
    if (location) user.location = location;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      profile: {
        name: user.name,
        address: user.address,
        location: user.location,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update profile",
    });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    user.profileImageUrl = req.file.path || req.file.secure_url;
    await user.save();

    res.json({
      message: "Profile picture updated successfully",
      profileImageUrl: user.profileImageUrl,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update profile picture",
    });
  }
};
