import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);

// admin (public for now – you should protect later)
orderRouter.get("/list", adminAuth, listOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;
