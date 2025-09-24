import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Footer from './Components/Footer/Footer.jsx';
import LoginPopup from './Components/LoginPoppup/LoginPopup.jsx';

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  // ✅ Add category state here
  const [category, setCategory] = useState("All");

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
     <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        {/* Pass state to Home */}
        <Route path='/' element={<Home category={category} setCategory={setCategory} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
      </Routes>
    </div>
    <Footer/>
    </>
   
  );
};

export default App;
