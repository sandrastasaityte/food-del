import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";


const Header = () => {
  const handleViewMenu = () => {
    const el = document.getElementById("explore-menu");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="header" id="home">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>

        <p>
          Explore our menu — from mouthwatering starters to irresistible
          desserts. Order now and satisfy your cravings today.
        </p>

        <button type="button" onClick={handleViewMenu} aria-label="View the menu">
          View Menu
        </button>
      </div>
    </header>
  );
};

export default Header;
