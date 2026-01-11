// controllers/promoController.js
import Promo from "../models/promoModel.js";

// =====================
// Apply Promo Code
// =====================
export const applyPromo = async (req, res) => {
  const { code, amount } = req.body; // amount = total before discount
  try {
    if (!code) return res.status(400).json({ success: false, message: "Promo code is required" });

    const promo = await Promo.findOne({ code: code.toUpperCase(), active: true });

    if (!promo) return res.status(400).json({ success: false, message: "Invalid promo code" });
    if (promo.expiresAt && promo.expiresAt < new Date())
      return res.status(400).json({ success: false, message: "Promo code expired" });

    // Calculate discount
    let discount = 0;
    if (promo.type === "percent") discount = (amount * promo.value) / 100;
    else discount = promo.value;

    res.json({
      success: true,
      promoCode: promo.code,
      discount: Number(discount.toFixed(2)),
      type: promo.type,
      value: promo.value,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// =====================
// Create Promo Code (Admin)
// =====================
export const createPromo = async (req, res) => {
  const { code, type, value, expiresAt } = req.body;
  try {
    if (!code || !type || !value) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const existing = await Promo.findOne({ code: code.toUpperCase() });
    if (existing) return res.status(400).json({ success: false, message: "Promo code already exists" });

    const promo = new Promo({
      code: code.toUpperCase(),
      type,
      value,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    });

    await promo.save();
    res.json({ success: true, message: "Promo code created", promo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// =====================
// List Promo Codes (Admin)
// =====================
export const listPromos = async (req, res) => {
  try {
    const promos = await Promo.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: promos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// =====================
// Update / Deactivate Promo (Admin)
// =====================
export const updatePromo = async (req, res) => {
  const { promoId, active, type, value, expiresAt } = req.body;
  try {
    const promo = await Promo.findById(promoId);
    if (!promo) return res.status(404).json({ success: false, message: "Promo code not found" });

    if (active !== undefined) promo.active = active;
    if (type) promo.type = type;
    if (value !== undefined) promo.value = value;
    if (expiresAt) promo.expiresAt = new Date(expiresAt);

    await promo.save();
    res.json({ success: true, message: "Promo updated", promo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
