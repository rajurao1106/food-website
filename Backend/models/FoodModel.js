import mongoose from "mongoose";

// Define the food schema
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
}, { timestamps: true }); // Adding timestamps to track created and updated time

// Check if the model already exists to prevent re-compiling
const FoodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default FoodModel;
