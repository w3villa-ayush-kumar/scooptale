import { env } from "../../config/env";
import { stripe } from "../../config/stripe";
import User from "../users/user.model";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      env.stripeWebhookSecret,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, plan, duration } = session.metadata;

    const expiresAt = new Data();
    expiresAt.setHours(expiresAt.getHours() + Number(duration));

    await User.findByIdAndUpdate(userId, {
      currentPlan: plan,
      planActivatedAt: new Date(),
      planExpiresAt: expiresAt,
    });
  }

  res.json({ received: true });
};
