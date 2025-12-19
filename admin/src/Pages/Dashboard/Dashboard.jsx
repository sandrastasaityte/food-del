// src/pages/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import './Dashboard.css';
import { assets } from '../../assets/assets';
import { toast } from "react-toastify";

const Dashboard = () => {
  const url = "http://localhost:4000"; // backend URL
  const [stats, setStats] = useState({
    totalItems: 0,
    totalOrders: 0,
    recentOrders: [],
  });

  const fetchStats = async () => {
    try {
      const [itemsRes, ordersRes] = await Promise.all([
        axios.get(`${url}/api/food/list`),
        axios.get(`${url}/api/order/list`)
      ]);

      const totalItems = itemsRes.data.success ? itemsRes.data.data.length : 0;
      const totalOrders = ordersRes.data.success ? ordersRes.data.data.length : 0;
      const recentOrders = ordersRes.data.success ? ordersRes.data.data.slice(-5).reverse() : [];

      setStats({ totalItems, totalOrders, recentOrders });
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch dashboard stats");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card">
          <img src={assets.list_icon} alt="Items" />
          <div>
            <p>Total Items</p>
            <h3>{stats.totalItems}</h3>
          </div>
        </div>

        <div className="card">
          <img src={assets.order_icon} alt="Orders" />
          <div>
            <p>Total Orders</p>
            <h3>{stats.totalOrders}</h3>
          </div>
        </div>
      </div>

      <div className="recent-orders">
        <h3>Recent Orders</h3>
        {stats.recentOrders.length === 0 ? (
          <p>No recent orders</p>
        ) : (
          <ul>
            {stats.recentOrders.map((order) => (
              <li key={order._id}>
                {order.address_firstName} {order.address_lastName} - ${order.amount}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
