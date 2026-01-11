import React, { useEffect, useMemo, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { api } from "../../api/api";

const MAX_IMAGE_MB = 2;
const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;

const categories = [
  "Salad",
  "Rolls",
  "Desserts",
  "Sandwich",
  "Cake",
  "Vegetarian",
  "Pasta",
  "Noodles",
];

const getApiErrorMessage = (err, fallback = "Server error") =>
  err?.response?.data?.message ||
  err?.message ||
  fallback;

const Add = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [inlineError, setInlineError] = useState("");

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const isValid = useMemo(() => {
    const nameOk = data.name.trim().length >= 2;
    const descOk = data.description.trim().length >= 10;
    const priceNum = Number(data.price);
    const priceOk = Number.isFinite(priceNum) && priceNum > 0;
    const catOk = categories.includes(data.category);
    return nameOk && descOk && priceOk && catOk && !!image;
  }, [data, image]);

  // preview image
  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInlineError("");
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onPickImage = (file) => {
    setInlineError("");
    if (!file) {
      setImage(null);
      return;
    }

    // validate type
    if (!file.type?.startsWith("image/")) {
      setImage(null);
      setInlineError("Only image files are allowed.");
      return;
    }

    // validate size
    if (file.size > MAX_IMAGE_BYTES) {
      setImage(null);
      setInlineError(`Image must be under ${MAX_IMAGE_MB}MB.`);
      return;
    }

    setImage(file);
  };

  const validateBeforeSubmit = () => {
    if (!image) return "Please upload an image.";
    if (data.name.trim().length < 2) return "Product name must be at least 2 characters.";
    if (data.description.trim().length < 10) return "Description must be at least 10 characters.";
    const priceNum = Number(data.price);
    if (!Number.isFinite(priceNum) || priceNum <= 0) return "Please enter a valid price.";
    if (!categories.includes(data.category)) return "Please select a valid category.";
    return "";
  };

  const resetForm = () => {
    setData({ name: "", description: "", price: "", category: "Salad" });
    setImage(null);
    setPreview("");
    setInlineError("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInlineError("");

    const msg = validateBeforeSubmit();
    if (msg) {
      setInlineError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      const priceNum = Number(data.price);

      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("description", data.description.trim());
      formData.append("price", priceNum);
      formData.append("category", data.category);
      formData.append("image", image);

      const res = await api.post("/api/food/add", formData);

      if (res.data?.success) {
        toast.success(res.data?.message || "Product added!");
        resetForm();
      } else {
        const errMsg = res.data?.message || "Failed to add product";
        setInlineError(errMsg);
        toast.error(errMsg);
      }
    } catch (err) {
      const errMsg = getApiErrorMessage(err, "Server error adding product");
      setInlineError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add">
      <div className="add-head">
        <div>
          <h2>Add Item</h2>
          <p className="muted">Upload an image, add details, and publish a new product.</p>
        </div>
      </div>

      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>

          <label htmlFor="image" className="upload-card" aria-label="Upload product image">
            <img
              src={image ? preview : assets.upload_area}
              alt="Upload preview"
              loading="lazy"
            />
            <span className="upload-hint">
              {image ? "Click to change image" : `PNG/JPG, up to ${MAX_IMAGE_MB}MB`}
            </span>
          </label>

          <input
            onChange={(e) => onPickImage(e.target.files?.[0] || null)}
            type="file"
            id="image"
            hidden
            accept="image/*"
            disabled={loading}
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="E.g. Greek Salad"
            required
            disabled={loading}
            maxLength={60}
          />
          <span className="field-hint">{data.name.trim().length}/60</span>
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write a short, clear description…"
            required
            disabled={loading}
            maxLength={240}
          />
          <span className="field-hint">{data.description.trim().length}/240</span>
        </div>

        <div className="add-category price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
              disabled={loading}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="E.g. 9.99"
              min="0"
              step="0.01"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="add-btn"
            disabled={loading || !isValid}
            title={!isValid ? "Fill in all fields and upload an image" : "Add item"}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {inlineError && <div className="inline-error">{inlineError}</div>}
      </form>
    </div>
  );
};

export default Add;
