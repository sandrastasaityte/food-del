import React, { useEffect, useState } from "react";
import { api, getApiErrorMessage } from "../../api/api";
import "./Dashboard.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes] = await Promise.all([
        api.get("/api/food/list"),
        api.get("/api/order/list"),
      ]);

      const products = productsRes.data?.data || [];
      const orders = ordersRes.data?.data || [];

      const revenue = orders.reduce(
        (acc, o) => acc + (Number(o.amount) || 0),
        0
      );
      const pendingOrders = orders.filter(o => o.status !== "Delivered").length;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders,
        revenue,
      });
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Failed to fetch dashboard stats"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cardData = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: assets.add_icon,
      action: () => navigate("/list"),
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: assets.parcel_icon,
      action: () => navigate("/orders"),
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: assets.parcel_icon,
      action: () => navigate("/orders"),
    },
    {
      label: "Revenue (£)",
      value: stats.revenue.toFixed(2),
      icon: assets.dashboard_icon,
      action: () => {},
    },
  ];

  return (
    <div className="dashboard-page">
      <h2>Admin Dashboard</h2>
      <p className="muted">Quick overview of your products and orders</p>

      <div className="dashboard-cards">
        {cardData.map(({ label, value, icon, action }, i) => (
          <div
            key={i}
            className="dashboard-card"
            onClick={action}
            role={action ? "button" : undefined}
          >
            <div className="card-icon">
              <img src={icon} alt={label} />
            </div>
            <div className="card-info">
              <p className="card-value">{loading ? "..." : value}</p>
              <p className="card-label">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
