import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { isAuthenticated, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected
router.post("/", isAuthenticated, authorizeRoles("admin", "editor"), createProduct);
router.put("/:id", isAuthenticated, authorizeRoles("admin", "editor"), updateProduct);
router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteProduct);

export default router;
