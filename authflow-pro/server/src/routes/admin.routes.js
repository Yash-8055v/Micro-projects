import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/requireRole.js";
import { changeUserRole, deleteUser, listUsers } from "../controllers/admin.controller.js";

const router = express.Router();

// Admin-only route


router.get("/users", verifyToken, requireRole(["admin"]), listUsers);
router.patch("/users/:id/role", verifyToken, requireRole(["admin"]), changeUserRole);
router.delete("/users/:id", verifyToken, requireRole(["admin"]), deleteUser);

export default router;
