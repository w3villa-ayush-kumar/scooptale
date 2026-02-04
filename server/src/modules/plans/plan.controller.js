import { PLANS } from "../../config/plan.js";
import User from "../users/user.model.js";
import { sendError } from "../../utils/sendError.js";

export const activatePlan = async (req, res) => {
  try {
    const { planName } = req.body;
    const plan = PLANS[planName?.toLowerCase()];

    if (!plan) {
      return sendError(res, 400, "Invalid plan");
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const now = new Date();

    user.currentPlan = planName;
    user.planActivatedAt = now;
    user.isPlanActive = plan.durationHours > 0;

    user.planExpiresAt =
      plan.durationHours > 0
        ? new Date(now.getTime() + plan.durationHours * 60 * 60 * 1000)
        : null;

    await user.save();

    return res.json({
      success: true,
      message: "Plan activated",
      plan: user.currentPlan,
      expiresAt: user.planExpiresAt,
    });
  } catch {
    return sendError(res, 500, "Failed to activate plan");
  }
};
