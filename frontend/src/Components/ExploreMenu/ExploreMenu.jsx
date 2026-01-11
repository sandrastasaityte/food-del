import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  const onSelect = (name) => {
    setCategory((prev) => (prev === name ? "All" : name));
  };

  return (
    <section className="explore-menu" id="explore-menu">
      <h1>Explore our Menu</h1>

      <p className="explore-menu-text">
        Explore our carefully crafted menu featuring fresh, high-quality
        ingredients. From starters to desserts, every dish is designed to
        delight your taste buds.
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          const name = item.menu_name ?? item.name; // supports both versions
          const image = item.menu_image ?? item.image;

          const isActive = category === name;

          return (
            <button
              type="button"
              key={name ?? index}
              className="explore-menu-list-item"
              onClick={() => onSelect(name)}
              aria-pressed={isActive}
            >
              <img
                className={isActive ? "active" : ""}
                src={image}
                alt={name ? `${name} category` : "Menu category"}
                loading="lazy"
              />
              <p>{name}</p>
            </button>
          );
        })}
      </div>

      <hr />
    </section>
  );
};

export default ExploreMenu;
