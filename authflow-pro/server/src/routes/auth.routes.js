import express from "express";
import { getMe, logout, signup, login } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout)
router.get("/me", verifyToken, getMe)

export default router;
