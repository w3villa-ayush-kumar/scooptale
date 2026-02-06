import User from "./user.model.js";

export const findUserById = async (userId) => {
  const user = await User.findById(userId).lean();

  if (!user) return null;

  const now = new Date();

  const isActive = user.planExpiresAt && new Date(user.planExpiresAt) > now;

  return {
    ...user,
    isPlanActive: isActive,
    currentPlan: isActive ? user.currentPlan : "free",
  };
};

export const findUserByIdLean = async (userId) => {
  return User.findById(userId).lean();
};

export const updateUserProfile = async (
  userId,
  { name, address, location },
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (name) user.name = name;
  if (address) user.address = address;
  if (location) user.location = location;

  await user.save();
  return user;
};

export const updateProfileImage = async (userId, imageUrl) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.profileImageUrl = imageUrl;
  await user.save();

  return user.profileImageUrl;
};
