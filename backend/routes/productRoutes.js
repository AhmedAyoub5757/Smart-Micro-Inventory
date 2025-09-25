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
router.get("/", isAuthenticated, getProducts);
router.get("/:id", isAuthenticated, getProductById);

// Protected
router.post("/", isAuthenticated, authorizeRoles("admin"), createProduct);

router.put("/:id", isAuthenticated, authorizeRoles("admin", "staff"), updateProduct);

router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteProduct);

export default router;
