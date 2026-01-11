import React, { useEffect, useMemo, useState } from "react";
import "./List.css";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { api, imageUrl, getApiErrorMessage } from "../../api/api";

const List = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // filters
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/food/list");
      if (res.data?.success) setItems(res.data.data || []);
      else {
        const msg = res.data?.message || "Failed to fetch items";
        setError(msg);
        toast.error(msg);
        setItems([]);
      }
    } catch (err) {
      const msg = getApiErrorMessage(err, "Server error fetching items");
      setError(msg);
      toast.error(msg);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    let data = [...items];

    // search
    if (q.trim()) {
      const s = q.toLowerCase();
      data = data.filter(
        (i) =>
          i.name?.toLowerCase().includes(s) ||
          i.description?.toLowerCase().includes(s)
      );
    }

    // category
    if (category !== "All") {
      data = data.filter((i) => i.category === category);
    }

    // sort
    if (sort === "name") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "price-low") {
      data.sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (sort === "price-high") {
      data.sort((a, b) => Number(b.price) - Number(a.price));
    }
    if (sort === "newest") {
      data.reverse(); // assuming backend sends oldest first
    }

    return data;
  }, [items, q, category, sort]);

  const removeFood = async (foodId) => {
    if (!window.confirm("Delete this item permanently?")) return;

    try {
      const res = await api.post("/api/food/remove", { id: foodId });
      if (res.data?.success) {
        toast.success("Item deleted");
        setItems((prev) => prev.filter((x) => x._id !== foodId));
      } else {
        toast.error(res.data?.message || "Delete failed");
      }
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Server error"));
    }
  };

  return (
    <div className="list-page">
      <div className="list-head">
        <div>
          <h2>Products</h2>
          <p className="muted">Manage your food items</p>
        </div>

        <button onClick={fetchItems} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="list-filters">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or description…"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="name">Name A–Z</option>
          <option value="price-low">Price Low → High</option>
          <option value="price-high">Price High → Low</option>
        </select>
      </div>

      {error && !loading && (
        <div className="list-error">
          <div>
            <b>Failed to load products</b>
            <p>{error}</p>
          </div>
          <button onClick={fetchItems}>Try again</button>
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
        <p className="muted" style={{ padding: 12 }}>
          No matching products.
        </p>
      )}

      {!loading && filtered.length > 0 && (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {filtered.map((item) => (
            <div key={item._id} className="list-table-format">
              <img
                src={item.image ? imageUrl(item.image) : assets.upload_area}
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>£{Number(item.price).toFixed(2)}</p>
              <button
                className="remove-btn"
                onClick={() => removeFood(item._id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
