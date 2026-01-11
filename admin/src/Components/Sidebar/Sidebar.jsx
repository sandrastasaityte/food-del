import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/dashboard", icon: assets.dashboard_icon, label: "Dashboard" },
  { to: "/add", icon: assets.add_icon, label: "Add Items" },
  { to: "/list", icon: assets.list_icon, label: "List Items" },
  { to: "/orders", icon: assets.order_icon, label: "Orders" },
];

const Sidebar = ({ open = false, onClose }) => {
  return (
    <>
      {/* mobile overlay */}
      <div
        className={open ? "sidebar-overlay show" : "sidebar-overlay"}
        onClick={onClose}
      />

      <nav className={open ? "sidebar open" : "sidebar"} aria-label="Admin sidebar navigation">
        <div className="sidebar-options">
          {items.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "sidebar-option active" : "sidebar-option"
              }
            >
              <img src={icon} alt={label} loading="lazy" />
              <p>{label}</p>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default React.memo(Sidebar);
