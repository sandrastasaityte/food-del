import React from "react";
import { UserButton } from "@clerk/clerk-react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">MangoMuse Admin</div>
      <div className="user-controls">
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
