import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    items: { type: Array, required: true },

    amount: { type: Number, required: true },

    address: { type: Object, required: true },

    // ✅ Order lifecycle
    orderStatus: {
      type: String,
      default: "placed", // placed | preparing | dispatched | delivered | cancelled
    },

    // ✅ Payment tracking
    paymentMethod: {
      type: String,
      default: "card", // card | cod
    },

    paymentStatus: {
      type: String,
      default: "unpaid", // unpaid | paid | pending
    },

    // ✅ Promo support
    promoCode: { type: String, default: null },
    discount: { type: Number, default: 0 },

    // ✅ Proper timestamp
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // adds createdAt + updatedAt automatically
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
