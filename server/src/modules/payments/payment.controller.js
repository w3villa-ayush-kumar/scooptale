import { createCheckoutSession } from "./payment.service.js";

export const checkout = async (req, res) => {
  const session = await createCheckoutSession(req.user, req.body);
  res.json({ url: session.url });
};
