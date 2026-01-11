import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";

import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";
import Checkout from "./pages/Checkout/Checkout";


// ✅ Make sure the folder name matches exactly on disk
import LoginPopup from "./Components/LoginPoppup/LoginPopup.jsx";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/checkout" element={<Checkout />} />


          {/* Optional: redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};

export default App;
