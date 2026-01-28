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

  const pageNumber = Number(page);
  const pageSize = Number(limit);
  const skip = (pageNumber - 1) * pageSize;
  const total = await User.countDocuments(query);

  const users = await User.find(query)

    .select("name email role currentPlan isPlanActive planExpiresAt createdAt")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);

  return {
    data: users,
    meta: {
      total,
      page: pageNumber,
      limit: pageSize,
    },
  };
};
