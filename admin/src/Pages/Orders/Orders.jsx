import React, { useEffect, useMemo, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { api, getApiErrorMessage } from "../../api/api";

const formatMoney = (n) => `£${Number(n || 0).toFixed(2)}`;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  // filters
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [payment, setPayment] = useState("All");

  const fetchAllOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/order/list");
      if (res.data?.success) {
        setOrders(res.data.data || []);
      } else {
        const msg = res.data?.message || "Error fetching orders";
        setError(msg);
        toast.error(msg);
        setOrders([]);
      }
    } catch (err) {
      const msg = getApiErrorMessage(err, "Server error fetching orders");
      setError(msg);
      toast.error(msg);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return (orders || []).filter((o) => {
      const s = o?.status || "Food Processing";

      if (status !== "All" && s !== status) return false;

      if (payment !== "All") {
        const paid = o?.payment === true;
        if (payment === "Paid" && !paid) return false;
        if (payment === "Unpaid" && paid) return false;
      }

      if (!query) return true;

      const name = `${o?.address?.firstName || ""} ${o?.address?.lastName || ""}`.toLowerCase();
      const phone = String(o?.address?.phone || "").toLowerCase();
      const street = String(o?.address?.street || "").toLowerCase();
      const city = String(o?.address?.city || "").toLowerCase();
      const id = String(o?._id || o?.id || "").toLowerCase();
      const itemsText = (o?.items || [])
        .map((it) => `${it?.name || ""} ${it?.quantity || ""}`)
        .join(" ")
        .toLowerCase();

      return (
        name.includes(query) ||
        phone.includes(query) ||
        street.includes(query) ||
        city.includes(query) ||
        id.includes(query) ||
        itemsText.includes(query)
      );
    });
  }, [orders, q, status, payment]);

  const statusClass = (s) => String(s || "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  const onChangeStatus = async (orderId, nextStatus) => {
    setUpdatingId(orderId);

    // optimistic update
    const prev = orders;
    setOrders((curr) =>
      curr.map((o) =>
        (o?._id ?? o?.id) === orderId ? { ...o, status: nextStatus } : o
      )
    );

    try {
      const res = await api.post("/api/order/status", { orderId, status: nextStatus });
      if (!res.data?.success) {
        setOrders(prev);
        toast.error(res.data?.message || "Failed to update status");
        return;
      }
      toast.success("Status updated");
    } catch (err) {
      setOrders(prev);
      toast.error(getApiErrorMessage(err, "Server error updating status"));
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-head">
        <div>
          <h3>Orders</h3>
          <p className="muted">
            Manage customer orders, update delivery status, and track payments.
          </p>
        </div>

        <button type="button" onClick={fetchAllOrders} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="orders-filters">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, phone, address, item, order id…"
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Food Processing">Food Processing</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
        </select>

        <select value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value="All">All Payments</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      {error && !loading && (
        <div className="orders-error">
          <div>
            <b>Couldn’t load orders</b>
            <p>{error}</p>
          </div>
          <button type="button" onClick={fetchAllOrders}>
            Try again
          </button>
        </div>
      )}

      {loading && (
        <div className="skeleton-list">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="skeleton-row" key={i} />
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="muted" style={{ padding: 10 }}>
          No matching orders.
        </p>
      )}

      {!loading && filtered.length > 0 && (
        <div className="orders-list">
          {filtered.map((o) => {
            const orderId = o?._id ?? o?.id;
            const items = o?.items || [];
            const itemsText = items
              .map((it) => `${it?.name ?? "Item"} × ${it?.quantity ?? 0}`)
              .join(", ");

            const amount = formatMoney(o?.amount || 0);
            const s = o?.status || "Food Processing";
            const paid = o?.payment === true;

            const addr = o?.address || {};
            const customer = `${addr?.firstName || "Customer"} ${addr?.lastName || ""}`.trim();

            return (
              <div key={orderId} className="order-card">
                <div className="order-icon">
                  <img src={assets.parcel_icon} alt="Parcel" />
                </div>

                <div className="order-body">
                  <div className="order-top">
                    <div className="order-customer">
                      <div className="customer-name">{customer}</div>
                      <div className="badges">
                        <span className={`badge ${statusClass(s)}`}>{s}</span>
                        <span className={`pill ${paid ? "paid" : "unpaid"}`}>
                          {paid ? "Paid" : "Unpaid"}
                        </span>
                      </div>
                    </div>

                    <div className="order-amount">{amount}</div>
                  </div>

                  <div className="order-items">
                    <b>Items:</b> <span className="muted">{itemsText || "No items"}</span>
                  </div>

                  <div className="order-address muted">
                    {addr?.street ? `${addr.street}, ` : ""}
                    {addr?.city ? `${addr.city}, ` : ""}
                    {addr?.state ? `${addr.state}, ` : ""}
                    {addr?.country ? `${addr.country}, ` : ""}
                    {addr?.zipcode || ""}
                  </div>

                  <div className="order-bottom">
                    <div className="muted">
                      Phone: <b>{addr?.phone || "—"}</b>
                    </div>

                    <div className="order-actions">
                      <select
                        value={s}
                        onChange={(e) => onChangeStatus(orderId, e.target.value)}
                        disabled={updatingId === orderId}
                      >
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>

                      <button
                        type="button"
                        className="small-btn"
                        onClick={() => navigator.clipboard.writeText(String(orderId))}
                        title="Copy Order ID"
                      >
                        Copy ID
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
