import React, { useContext, useMemo, useState } from "react";
import "./Checkout.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, food_list, token, url } = useContext(StoreContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  // ✅ Payment method
  const [paymentMethod, setPaymentMethod] = useState("card"); // card | cod | paypal

  const cartSummary = useMemo(() => {
    return food_list
      .map((item) => {
        const id = item._id ?? item.id;
        const qty = cartItems[id] || 0;
        if (qty <= 0) return null;
        return { ...item, quantity: qty, total: qty * Number(item.price) };
      })
      .filter(Boolean);
  }, [food_list, cartItems]);

  const subtotal = cartSummary.reduce((sum, item) => sum + item.total, 0);
  const delivery = subtotal > 0 ? 2 : 0;
  const totalBeforeDiscount = subtotal + delivery;
  const total = Number((totalBeforeDiscount - discount).toFixed(2));

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Apply promo code
  const applyPromo = () => {
    setError("");
    setPromoMessage("");

    const validPromos = {
      SAVE10: 0.1,
      SAVE5: 5,
    };

    if (!promo) {
      setPromoMessage("Enter a promo code.");
      setDiscount(0);
      return;
    }

    if (validPromos[promo]) {
      const value = validPromos[promo];
      let discountValue = 0;

      if (value < 1) discountValue = totalBeforeDiscount * value;
      else discountValue = value;

      // ✅ never allow discount bigger than total
      discountValue = Math.min(discountValue, totalBeforeDiscount);

      setDiscount(Number(discountValue.toFixed(2)));
      setPromoMessage(`Promo applied! You saved £${discountValue.toFixed(2)}.`);
    } else {
      setDiscount(0);
      setPromoMessage("Invalid promo code.");
    }
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      navigate("/cart");
      return;
    }

    if (cartSummary.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // ✅ block paypal for now (UI only)
    if (paymentMethod === "paypal") {
      setError("PayPal is not set up yet.");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        address: form,
        items: cartSummary.map((item) => ({
          _id: item._id ?? item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        amount: total,
        discount,
        promoCode: promo || null,

        // ✅ send selected payment
        paymentMethod, // "card" or "cod"
      };

      // ✅ If COD -> call a different endpoint OR same endpoint with paymentMethod
      if (paymentMethod === "cod") {
        // Option A: use same endpoint and backend checks paymentMethod
        const res = await axios.post(`${url}/api/order/place`, orderData, {
          headers: { token },
        });

        if (res.data?.success) {
          // go to success page or orders page
          navigate("/order-success"); // create this route/page
        } else {
          setError(res.data?.message || "Order failed");
        }

        setLoading(false);
        return;
      }

      // ✅ Card payment -> Stripe session
      const res = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (res.data?.success && res.data?.session_url) {
        window.location.assign(res.data.session_url);
      } else {
        setError(res.data?.message || "Checkout failed");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <div className="checkout-grid">
        {/* LEFT: FORM */}
        <form className="checkout-form" onSubmit={placeOrder}>
          <h3>Delivery Information</h3>

          <div className="row">
            <input
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={onChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={onChange}
              required
            />
          </div>

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            required
          />
          <input
            name="street"
            placeholder="Street address"
            value={form.street}
            onChange={onChange}
            required
          />

          <div className="row">
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={onChange}
              required
            />
            <input
              name="state"
              placeholder="County / State"
              value={form.state}
              onChange={onChange}
              required
            />
          </div>

          <div className="row">
            <input
              name="zipcode"
              placeholder="Postcode"
              value={form.zipcode}
              onChange={onChange}
              required
            />
            <input
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={onChange}
              required
            />
          </div>

          <input
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={onChange}
            required
          />

          {/* Promo Code */}
          <div className="promo-code">
            <input
              type="text"
              placeholder="Promo code"
              value={promo}
              onChange={(e) => setPromo(e.target.value.toUpperCase())}
            />
            <button type="button" onClick={applyPromo}>
              Apply
            </button>
            {promoMessage && <p className="promo-message">{promoMessage}</p>}
          </div>

          {/* ✅ PAYMENT OPTIONS */}
          <div className="payment-options">
            <h3>Payment Method</h3>

            <label className={`pay-option ${paymentMethod === "card" ? "active" : ""}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div className="pay-option-text">
                <b>Card (Stripe)</b>
                <p>Pay securely with your card.</p>
              </div>
            </label>

            <label className={`pay-option ${paymentMethod === "cod" ? "active" : ""}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div className="pay-option-text">
                <b>Cash on Delivery</b>
                <p>Pay when the order arrives.</p>
              </div>
            </label>

            <label className={`pay-option ${paymentMethod === "paypal" ? "active" : ""}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div className="pay-option-text">
                <b>PayPal (coming soon)</b>
                <p>We’ll enable this soon.</p>
              </div>
            </label>
          </div>

          {error && <p className="checkout-error">{error}</p>}

          <button disabled={loading || cartSummary.length === 0}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>

        {/* RIGHT: SUMMARY */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cartSummary.map((item) => (
            <div key={item._id ?? item.id} className="summary-item">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>£{item.total.toFixed(2)}</span>
            </div>
          ))}

          <hr />

          <div className="summary-line">
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-line">
            <span>Delivery</span>
            <span>£{delivery.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="summary-line discount">
              <span>Discount</span>
              <span>-£{discount.toFixed(2)}</span>
            </div>
          )}

          <div className="summary-total">
            <b>Total</b>
            <b>£{total.toFixed(2)}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
