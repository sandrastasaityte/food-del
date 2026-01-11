import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ always stays updated
  const hasCartItems = getTotalCartAmount() > 0;

  // Keep active tab correct when user navigates
  useEffect(() => {
    if (location.pathname === "/") setMenu("home");
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const goToSection = (sectionId, menuKey) => {
    setMenu(menuKey);

    // If we're not on home, go home first then scroll
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="navbar">
      <Link to="/" onClick={() => setMenu("home")} aria-label="Go to home">
        <img src={assets.logo} alt="Tomato" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <li className={menu === "home" ? "active" : ""}>
          <Link to="/" onClick={() => setMenu("home")}>
            Home
          </Link>
        </li>

        <li className={menu === "menu" ? "active" : ""}>
          <button type="button" onClick={() => goToSection("explore-menu", "menu")}>
            Menu
          </button>
        </li>

        <li className={menu === "mobile-app" ? "active" : ""}>
          <button type="button" onClick={() => goToSection("app-download", "mobile-app")}>
            Mobile App
          </button>
        </li>

        <li className={menu === "contact-us" ? "active" : ""}>
          <button type="button" onClick={() => goToSection("footer", "contact-us")}>
            Contact
          </button>
        </li>
      </ul>

      <div className="navbar-right">
        <button type="button" className="navbar-icon-btn" aria-label="Search">
          <img src={assets.search_icon} alt="" />
        </button>

        <div className="navbar-search-icon">
          <Link to="/cart" aria-label="Open cart" className="navbar-cart">
            <img src={assets.basket_icon} alt="Cart" />
            {/* ✅ only render dot when needed */}
            {hasCartItems && <span className="dot" />}
          </Link>

          {!token ? (
            <button type="button" onClick={() => setShowLogin(true)}>
              Sign In
            </button>
          ) : (
            <div className="navbar-profile">
              <button type="button" className="navbar-icon-btn" aria-label="Open profile menu">
                <img src={assets.profile_icon} alt="" />
              </button>

              <ul className="nav-profile-dropdown">
                <li>
                  <button type="button" onClick={() => navigate("/myorders")}>
                    <img src={assets.bag_icon} alt="" />
                    <p>Orders</p>
                  </button>
                </li>

                <hr />

                <li>
                  <button type="button" onClick={logout}>
                    <img src={assets.logout_icon} alt="" />
                    <p>Logout</p>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
