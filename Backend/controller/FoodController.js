import foodModel from "../models/FoodModel.js";
import fs from "fs";
import path from "path";

// Add new food item
const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;

  // Validate required fields
  if (!name || !description || !price || !category) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // Validate image file upload
  const image_filename = req.file ? req.file.filename : null;

  if (!image_filename) {
    return res.status(400).json({ success: false, message: "Image is required." });
  }

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added successfully!", data: food });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding food.", error: error.message });
  }
};

// List all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching food list.", error: error.message });
  }
};

// Remove a food item by ID
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found." });
    }

    // Remove the image file
    const imagePath = path.join('uploads', food.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error removing image file:", err);
        return res.status(500).json({ success: false, message: "Error removing image file." });
      }
    });

    // Remove food item from database
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing food.", error: error.message });
  }
};

export { addFood, listFood, removeFood };
