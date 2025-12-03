import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
// GET /api/products
router.get("/", getProducts);

// GET /api/products/:id
router.get("/:id", getProductById);

// Admin only routes
// POST /api/products
router.post("/", protect, admin, createProduct);

// PUT /api/products/:id
router.put("/:id", protect, admin, updateProduct);

// DELETE /api/products/:id
router.delete("/:id", protect, admin, deleteProduct);

export default router;
