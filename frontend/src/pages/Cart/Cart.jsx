import React, { useContext, useMemo, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");

  const subTotal = useMemo(
    () => Number(getTotalCartAmount() || 0),
    [getTotalCartAmount]
  );
  const deliveryFee = subTotal === 0 ? 0 : 2;
  const grandTotal = Number((subTotal + deliveryFee).toFixed(2));

  const resolveImg = (item) => {
    const img = item.image ?? item.images?.[0];
    if (!img) return "";
    if (
      typeof img === "string" &&
      (img.startsWith("http://") ||
        img.startsWith("https://") ||
        img.startsWith("data:") ||
        img.startsWith("/"))
    ) {
      return img;
    }
    return `${url}/images/${img}`;
  };

  return (
    <section className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list
          .filter((item) => {
            const id = item._id ?? item.id;
            return (cartItems?.[id] ?? 0) > 0;
          })
          .map((item) => {
            const id = item._id ?? item.id;
            const qty = cartItems?.[id] ?? 0;
            const price = Number(item.price) || 0;
            const total = Number((price * qty).toFixed(2));
            const imgSrc = resolveImg(item);

            return (
              <div key={id}>
                <div className="cart-items-title cart-items-item">
                  <img
                    src={imgSrc}
                    alt={item.name || "Cart item"}
                    loading="lazy"
                  />
                  <p>{item.name}</p>
                  <p>£{price.toFixed(2)}</p>
                  <p>{qty}</p>
                  <p>£{total.toFixed(2)}</p>

                  <button
                    type="button"
                    className="cross"
                    onClick={() => removeFromCart(id)}
                    aria-label={`Remove one ${item.name}`}
                  >
                    ×
                  </button>
                </div>

                <hr />
              </div>
            );
          })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>£{subTotal.toFixed(2)}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>£{deliveryFee.toFixed(2)}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>£{grandTotal.toFixed(2)}</b>
            </div>
          </div>

          {/* ✅ ONLY button that goes to checkout */}
          <button
            type="button"
            disabled={subTotal === 0}
            onClick={() => navigate("/checkout")}
          >
            Proceed to checkout
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>

            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                type="button"
                onClick={() => alert("Promo codes not implemented yet")}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
