import React, { useContext, useMemo } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const imgSrc = useMemo(() => {
    if (!image) return "";
    // If image is already a full URL or a bundled asset path, use it directly
    if (
      typeof image === "string" &&
      (image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("data:") ||
        image.startsWith("/"))
    ) {
      return image;
    }
    // Otherwise assume it's a backend filename
    return `${url}/images/${image}`;
  }, [image, url]);

  const qty = cartItems?.[id] ?? 0;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={imgSrc} alt={name || "Food item"} />

        {qty === 0 ? (
          <button
            type="button"
            className="add"
            onClick={() => addToCart(id)}
            aria-label={`Add ${name} to cart`}
          >
            <img src={assets.add_icon_white} alt="" />
          </button>
        ) : (
          <div className="food-item-counter" aria-label={`${name} quantity controls`}>
            <button
              type="button"
              onClick={() => removeFromCart(id)}
              aria-label={`Remove one ${name}`}
            >
              <img src={assets.remove_icon_red} alt="" />
            </button>

            <p>{qty}</p>

            <button
              type="button"
              onClick={() => addToCart(id)}
              aria-label={`Add one more ${name}`}
            >
              <img src={assets.add_icon_green} alt="" />
            </button>
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_stars} alt="Rating" />
        </div>

        <p className="food-item-desc">{description}</p>

        <p className="food-item-price">£{Number(price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default FoodItem;
