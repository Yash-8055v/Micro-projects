import express from "express";
import { stripeWebhook } from "../controllers/stripeWebhook.controller.js";

const router = express.Router();

// Stripe requires RAW body
router.post(
  "/stripe", stripeWebhook
);

export default router;
