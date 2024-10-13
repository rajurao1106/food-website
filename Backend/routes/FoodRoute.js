import express from "express";
import { addFood, listFood, removeFood } from "../controller/FoodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: "uploads", // folder for storing images
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use cb, not cd
  },
});

// Multer middleware for handling file uploads
const upload = multer({ storage: storage });

// Route for adding food, with image upload handling
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood)
foodRouter.post("/remove",removeFood)

export default foodRouter;
