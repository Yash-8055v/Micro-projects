import stripe from "../config/stripe.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
  mode: "payment",

  payment_method_types: ["card"],

  line_items: [
    {
      price: process.env.STRIPE_PRICE_ID,
      quantity: 1,
    },
  ],

  success_url: `${process.env.CLIENT_URL}/payment-success`,
  cancel_url: `${process.env.CLIENT_URL}/pricing`,

  customer_email: req.user.email,

  // 🔥 THIS IS THE KEY
  metadata: {
    userId: req.user.userId,
  },
});


    return res.status(200).json({
      status: "success",
      url: session.url,
    });

  } catch (error) {
    console.error("Stripe checkout error:", error);

    return res.status(500).json({
      status: "failure",
      message: "Unable to create checkout session",
    });
  }
};
