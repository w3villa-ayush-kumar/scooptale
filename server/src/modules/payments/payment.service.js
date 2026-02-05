import { PLANS } from "../../config/plan.js";
import { stripe } from "../../config/stripe.js";
import { env } from "../../config/env.js";

export const createCheckoutSession = async (user, { plan }) => {
  const selectedPlan = PLANS[plan];

  if (!selectedPlan || plan === "free") {
    throw new Error("Invalid plan selected");
  }

  if (user.currentPlan !== "free" && user.planExpiresAt > new Date()) {
    throw new Error("Active plan already exists");
  }

  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],

    billing_address_collection: "required",

    metadata: {
      userId: user.userId,
      plan,
      duration: selectedPlan.durationHours,
    },

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${plan.toUpperCase()} plan`,
          },
          unit_amount: selectedPlan.price,
        },
        quantity: 1,
      },
    ],

    success_url: `${env.clientUrl}/billing/success`,
    cancel_url: `${env.clientUrl}/plans`,
  });
};
