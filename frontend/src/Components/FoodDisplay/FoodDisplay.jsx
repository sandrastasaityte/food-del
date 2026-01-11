import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <section className="food-display" id="food-display">
      <h2>Top dishes near you</h2>

      <div className="food-display-list">
        {food_list
          .filter(
            (item) => category === "All" || item.category === category
          )
          .map((item) => {
            const id = item._id ?? item.id;
            const image = item.image ?? item.images?.[0];

            return (
              <FoodItem
                key={id}
                id={id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={image}
              />
            );
          })}
      </div>
    </section>
  );
};

export default FoodDisplay;
