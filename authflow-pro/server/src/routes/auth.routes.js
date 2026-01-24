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


/**
 * STEP 1: Start Google OAuth
 * This redirects user to Google login page
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // what data we want from Google
  })
);

/**
 * STEP 2: Google redirects back here after login
 * Passport verifies Google user and attaches it to req.user
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false, // we use JWT, not sessions
    failureRedirect: "http://localhost:5173/login",
  }),
  googleCallback
);

export default router;
