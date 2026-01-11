import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data || []);
  };

  const loadCartData = async (authToken) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token: authToken } });
    setCartItems(response.data.cartData || {});
  };

  useEffect(() => {
    (async () => {
      await fetchFoodList();
      if (token) await loadCartData(token);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist token automatically
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const next = { ...prev };
      const qty = (next[itemId] || 0) - 1;
      if (qty <= 0) delete next[itemId];
      else next[itemId] = qty;
      return next;
    });

    if (token) await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
  };

  const getTotalCartAmount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      const qty = cartItems[itemId];
      if (qty > 0) {
        const product = food_list.find((p) => String(p._id) === String(itemId));
        if (!product) continue; // ✅ prevents crash
        total += Number(product.price) * qty;
      }
    }

    return Number(total.toFixed(2));
  };

  const contextValue = useMemo(
    () => ({
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken,
      loadCartData,
      fetchFoodList,
    }),
    [food_list, cartItems, token]
  );

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
