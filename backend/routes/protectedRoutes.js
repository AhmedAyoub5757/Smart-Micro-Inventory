import express from "express";
import { isAuthenticated, authorizeRoles } from "../middleware/authMiddleware.js";  // ✅ FIXED


const router = express.Router();

// Only Admin
router.get("/admin", isAuthenticated, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin! You have full access." });
});

// Staff + Admin
router.get("/editor", isAuthenticated, authorizeRoles("staff", "admin"), (req, res) => {
  res.json({ message: "Welcome Staff/Admin! You can edit resources." });
});

// All roles (admin, staff, user)
router.get("/viewer", isAuthenticated, authorizeRoles("admin", "staff", "user"), (req, res) => {
  res.json({ message: "Welcome! You can view resources." });
});

export default router;
