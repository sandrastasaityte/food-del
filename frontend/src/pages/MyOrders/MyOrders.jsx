import React, { useContext, useEffect, useMemo, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    if (!token) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      setOrders(res.data?.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load orders.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const content = useMemo(() => {
    if (!token) {
      return <p className="my-orders-empty">Please sign in to view your orders.</p>;
    }

    if (loading) {
      return <p className="my-orders-loading">Loading your orders…</p>;
    }

    if (error) {
      return (
        <div className="my-orders-error">
          <p>{error}</p>
          <button type="button" onClick={fetchOrders}>
            Try again
          </button>
        </div>
      );
    }

    if (!orders.length) {
      return <p className="my-orders-empty">No orders yet.</p>;
    }

    return (
      <div className="container">
        {orders.map((order, index) => {
          const orderId = order?._id ?? order?.id ?? index;

          const itemsText = (order?.items || [])
            .map((it) => `${it?.name ?? "Item"} x ${it?.quantity ?? 0}`)
            .join(", ");

          const amount = Number(order?.amount ?? 0);

          return (
            <div key={orderId} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel" />

              <p>{itemsText || "No items"}</p>

              <p>£{amount.toFixed(2)}</p>

              <p>Items: {(order?.items || []).length}</p>

              <p>
                <span>&#x25cf;</span> <b>{order?.status ?? "Unknown"}</b>
              </p>

              <button type="button" onClick={fetchOrders} disabled={loading}>
                {loading ? "Refreshing..." : "Track Order"}
              </button>
            </div>
          );
        })}
      </div>
    );
  }, [token, loading, error, orders]);

  return (
    <section className="my-orders">
      <h2>My Orders</h2>
      {content}
    </section>
  );
};

export default MyOrders;
