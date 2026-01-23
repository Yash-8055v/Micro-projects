import express from "express";
import { getMe, logout, signup, login, refresh } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import passport from "passport";
import {googleCallback} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout)
router.get("/me", verifyToken, getMe)
router.post("/refresh", refresh)

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleCallback
);

export default router;
