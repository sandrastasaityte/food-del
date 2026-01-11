import React, { useContext, useEffect, useMemo, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = Number(getTotalCartAmount() || 0);
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = Number((subtotal + deliveryFee).toFixed(2));

  useEffect(() => {
    if (!token || subtotal === 0) {
      navigate("/cart");
    }
  }, [token, subtotal, navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ supports both _id and id in food items
  const orderItems = useMemo(() => {
    return (food_list || [])
      .map((item) => {
        const id = item?._id ?? item?.id;
        const qty = cartItems?.[id] ?? 0;
        if (qty <= 0) return null;

        return {
          ...item,
          _id: id, // keep backend compatibility if it expects _id
          quantity: qty,
        };
      })
      .filter(Boolean);
  }, [food_list, cartItems]);

  const placeOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Please sign in to continue.");
      navigate("/cart");
      return;
    }

    if (subtotal === 0 || orderItems.length === 0) {
      setError("Your cart is empty.");
      navigate("/cart");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        address: data,
        items: orderItems,
        amount: total,
      };

      const res = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (res.data?.success && res.data?.session_url) {
        window.location.assign(res.data.session_url);
      } else {
        setError(res.data?.message || "Error placing order. Please try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Server error placing order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            disabled={loading}
            autoComplete="given-name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            disabled={loading}
            autoComplete="family-name"
          />
        </div>

        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
          disabled={loading}
          autoComplete="email"
        />

        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          disabled={loading}
          autoComplete="street-address"
        />

        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            disabled={loading}
            autoComplete="address-level2"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="County / State"
            disabled={loading}
            autoComplete="address-level1"
          />
        </div>

        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Postcode / Zip"
            disabled={loading}
            autoComplete="postal-code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
            disabled={loading}
            autoComplete="country-name"
          />
        </div>

        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="tel"
          placeholder="Phone"
          disabled={loading}
          autoComplete="tel"
        />

        {error && <p className="place-order-error">{error}</p>}
      </div>

      <div className="place-order-right">
        <h2>Cart Totals</h2>

        <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>£{subtotal.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>£{deliveryFee.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>£{total.toFixed(2)}</b>
          </div>
        </div>

        <button type="submit" disabled={subtotal === 0 || loading}>
          {loading ? "Redirecting..." : "Proceed to Payment"}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
