import { env } from "../../config/env.js";
import { stripe } from "../../config/stripe.js";
import User from "../users/user.model.js";

export const stripeWebhook = async (req, res) => {
  console.log("🔥 ENTERED stripeWebhook");

  const sig = req.headers["stripe-signature"];
  console.log("🧾 Stripe signature present:", !!sig);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      env.stripeWebhookSecret,
    );
    console.log("✅ Signature verified");
  } catch (err) {
    console.error("❌ Signature verification failed:", err.message);
    return res.status(400).send("Webhook signature failed");
  }

  console.log("📦 Event type:", event.type);

  res.json({ received: true });
};
