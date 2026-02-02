import { PLANS } from "../../config/plan.js";
import User from "../users/user.model.js";

export const activatePlan = async (req, res) => {
  try {
    const { planName } = req.body;
    const plan = PLANS[planName.toLowerCase()];

    if (!plan) {
      return res.status(400).json({
        error: "Invalid plan",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
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

    res.json({
      message: "Plan activated",
      plan: user.currentPlan,
      expiresAt: user.planExpiresAt,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to activate plan",
    });
  }
};
