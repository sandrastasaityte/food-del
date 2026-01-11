// models/promoModel.js
import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ["percent", "fixed"], required: true },
  value: { type: Number, required: true },
  active: { type: Boolean, default: true },
  expiresAt: { type: Date },
});

export default mongoose.model("Promo", promoSchema);
