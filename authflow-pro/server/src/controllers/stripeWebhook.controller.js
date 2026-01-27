import Stripe from "stripe";
import { User } from "../models/User.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("🔔 Stripe Event:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata?.userId;

    if (!userId) {
      console.error("❌ userId missing in metadata");
      return res.status(400).json({ error: "Missing userId" });
    }

    await User.findByIdAndUpdate(userId, {
      isPro: true,
      subscriptionStatus: "active",
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
    });

    console.log("✅ User upgraded to Pro:", userId);
  }

  res.status(200).json({ received: true });
};
