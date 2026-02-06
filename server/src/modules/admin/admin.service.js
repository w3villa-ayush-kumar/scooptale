import User from "../users/user.model.js";

export const fetchUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  plan,
  isPlanActive,
}) => {
  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  if (plan) {
    query.currentPlan = plan.toLowerCase();
  }

  if (isPlanActive !== undefined) {
    query.isPlanActive = isPlanActive === "true";
  }

  const pageNumber = Math.max(1, Number(page) || 1);
  const pageSize = Math.min(50, Number(limit) || 10);

  const skip = (pageNumber - 1) * pageSize;
  const total = await User.countDocuments(query);

  const users = await User.find(query)

    .select("name email role currentPlan isPlanActive planExpiresAt createdAt")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize)
    .lean();

  const now = new Date();

  const updatedUsers = users.map((u) => ({
    ...u,
    isPlanActive: u.planExpiresAt && u.planExpiresAt > now,
  }));

  return {
    data: updatedUsers,
    meta: {
      total,
      page: pageNumber,
      limit: pageSize,
    },
  };
};
