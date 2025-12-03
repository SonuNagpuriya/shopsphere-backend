import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protect, createOrder);      // POST /api/orders
router.get("/my", protect, getMyOrders);     // GET /api/orders/my

// Admin routes
router.get("/", protect, admin, getAllOrders);          // GET /api/orders
router.put("/:id/status", protect, admin, updateOrderStatus); // PUT /api/orders/:id/status

export default router;
