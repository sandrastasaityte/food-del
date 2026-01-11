import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/react-router";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="navbar" aria-label="Admin navigation">
      <div className="navbar-left">
        <button
          type="button"
          className="navbar-burger"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <img className="navbar-logo" src={assets.logo} alt="Food-Del Admin" />
        <div className="navbar-title">Food-Del Admin</div>
      </div>

      <div className="navbar-right">
        <span className="navbar-badge">Admin Panel</span>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
