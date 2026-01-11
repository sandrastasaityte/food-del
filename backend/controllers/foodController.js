import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  try {
    if (!req.file?.filename) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.filename, // ✅ correct
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });

    // ✅ safely delete image if exists
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.log("Image delete warning:", err.message);
    });

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
