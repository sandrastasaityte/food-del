import express from "express";
import { applyPromo, createPromo, listPromos, updatePromo } from "../controllers/promoController.js";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Apply promo code (any logged-in user)
router.post("/apply", authMiddleware, applyPromo);

// Admin routes
router.post("/create", adminAuth, createPromo);
router.get("/list", adminAuth, listPromos);
router.post("/update", adminAuth, updatePromo);

export default router;
