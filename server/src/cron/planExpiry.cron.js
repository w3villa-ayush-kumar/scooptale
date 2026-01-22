import cron from "node-cron";
import User from "../modules/users/user.model.js";

export const startPlanExpiryCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const now = new Date();

      const expiredUsers = await User.find({
        isPlanActive: true,
        planExpiresAt: { $lte: now },
      });

      for (const user of expiredUsers) {
        ((user.currentPlan = "Free"),
          (user.isPlanActive = false),
          (user.planActivatedAt = null),
          (user.planExpiresAt = null),
          await user.save());
      }

      if (expiredUsers.length) {
        console.log(
          `Expired ${expiredUsers.length} ${expiredUsers.length < 2 ? "plan" : "plans"}`,
        );
      }
    } catch (error) {
      console.error("Cron error:", err.message);
    }
  });
};
