import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router();

// Admin-only route
router.get(
  "/stats",
  verifyToken,
  requireRole(["admin"]),
  (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Admin stats data",
    });
  }
);

export default router;
