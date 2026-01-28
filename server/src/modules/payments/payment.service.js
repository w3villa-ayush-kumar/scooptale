import { env } from "../../config/env.js";
import { stripe } from "../../config/stripe.js";

const PLAN_PRICE = {
  silver: 50000,
  gold: 100000,
};

const VALID_DURATION = [1, 6, 12];

export const createCheckoutSession = async (user, { plan, duration }) => {
  if (!PLAN_PRICE[plan]) {
    throw new Error("Invalid plan selected");
  }

  if (!VALID_DURATION.includes(duration)) {
    throw new Error("Invalid plan duration");
  }

  if (user.plan !== "free" && user.planExpiresAt > new Date()) {
    throw new Error("Active plan already exists");
  }

  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: user.email,

    metadata: {
      userId: user._id.toString(),
      plan,
      duration,
    },

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${plan.toUpperCase()} plan (${duration} hours)`,
          },
          unit_amount: PLAN_PRICE[plan],
        },
        quantity: 1,
      },
    ],

    success_url: `${env.clientUrl}/success`,
    cancel_url: `${env.clientUrl}/cancel`,
  });
};
