import React, { useEffect, useState } from 'react';
import './List.css';   // Make sure the CSS exists here
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the food list
  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message || "Error fetching list");
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
    setLoading(false);
  };

  // Remove a food item
  const removeFood = async (foodId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message || "Error removing item");
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) return <p className="loading">Loading food items...</p>;

  if (list.length === 0) return <p className="no-items">No food items available.</p>;

  return (
    <div className="list add flex-col">
      <h2>Food List</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img
              src={item.image ? `${url}/images/${item.image}` : assets.upload_area}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor remove-btn">
              ×
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
