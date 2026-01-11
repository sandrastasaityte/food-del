import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Example promo codes
const promoCodes = {
  SAVE10: { type: "percent", value: 10 }, // 10% off
  SAVE5: { type: "fixed", value: 5 },     // $5 off
};

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5177"; // your client
  try {
    let { items, amount, address, promoCode } = req.body;

    // Apply promo code
    let discount = 0;
    if (promoCode && promoCodes[promoCode]) {
      const promo = promoCodes[promoCode];
      if (promo.type === "percent") {
        discount = (amount * promo.value) / 100;
      } else {
        discount = promo.value;
      }
      amount = amount - discount;
    }

    const newOrder = new orderModel({
      userId: req.userId,
      items,
      amount,
      address,
      promoCode: promoCode || null,
      discount,
    });

    await newOrder.save();

    // clear cart
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    // Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity,
    }));

    // delivery
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery Charges" },
        unit_amount: Math.round(2 * 100),
      },
      quantity: 1,
    });

    // Apply discount in Stripe as a separate line item (optional)
    if (discount > 0) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: { name: `Discount (${promoCode})` },
          unit_amount: -Math.round(discount * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};
