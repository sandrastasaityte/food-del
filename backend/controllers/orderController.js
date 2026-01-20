import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const promoCodes = {
  SAVE10: { type: "percent", value: 10 },
  SAVE5: { type: "fixed", value: 5 },
};

export const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5177";

  try {
    let { items, address, promoCode, paymentMethod } = req.body;

    paymentMethod = paymentMethod || "card"; // card | cod

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty." });
    }

    // ✅ calculate totals server-side
    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );

    const deliveryFee = subtotal > 0 ? 2 : 0;
    const totalBeforeDiscount = subtotal + deliveryFee;

    // ✅ promo
    let discount = 0;
    if (promoCode && promoCodes[promoCode]) {
      const promo = promoCodes[promoCode];

      discount =
        promo.type === "percent"
          ? (totalBeforeDiscount * promo.value) / 100
          : promo.value;

      discount = Math.min(discount, totalBeforeDiscount);
    }

    const finalAmount = Number((totalBeforeDiscount - discount).toFixed(2));

    const newOrder = new orderModel({
      userId: req.userId,
      items,
      amount: finalAmount,
      address,
      promoCode: promoCode || null,
      discount,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "unpaid",
      orderStatus: "placed",
    });

    await newOrder.save();

    // ✅ COD: clear cart now and finish
    if (paymentMethod === "cod") {
      await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

      return res.json({
        success: true,
        message: "Order placed (Cash on Delivery).",
        orderId: newOrder._id,
      });
    }

    // ✅ CARD: create Stripe session (do NOT clear cart yet)
    const line_items = items.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: { name: item.name },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity,
    }));

    if (deliveryFee > 0) {
      line_items.push({
        price_data: {
          currency: "gbp",
          product_data: { name: "Delivery Charges" },
          unit_amount: Math.round(deliveryFee * 100),
        },
        quantity: 1,
      });
    }

    // ⚠️ Don't add negative discount line items in Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("placeOrder error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error placing order" });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    // Your frontend Verify page usually POSTs these:
    const { success, orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Missing orderId" });
    }

    if (success === true || success === "true") {
      // ✅ mark paid
      const order = await orderModel.findByIdAndUpdate(
        orderId,
        { paymentStatus: "paid" },
        { new: true }
      );

      // ✅ clear cart after successful payment
      if (order?.userId) {
        await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
      }

      return res.json({ success: true, message: "Payment verified" });
    } else {
      // ✅ cancelled / failed
      await orderModel.findByIdAndUpdate(orderId, {
        orderStatus: "cancelled",
        paymentStatus: "unpaid",
      });

      return res.json({ success: true, message: "Payment cancelled" });
    }
  } catch (error) {
    console.error("verifyOrder error:", error);
    return res.status(500).json({ success: false, message: "Verify error" });
  }
};

// ====== keep your existing functions or use these ======

export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { orderStatus });
    res.json({ success: true, message: "Status updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};
