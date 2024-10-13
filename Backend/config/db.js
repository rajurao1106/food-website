import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://rajurao1107:rajurao1337@cluster0.zjucb.mongodb.net/food-del', {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1); // Exit process with failure
  }
};
