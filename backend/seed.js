import mongoose from "mongoose";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
console.log("Loaded URI:", process.env.URI); // 👈 debug log



const products = [
  { name: "Product A", price: 100, quantity: 10, category: "Electronics" },
  { name: "Product B", price: 50, quantity: 20, category: "Groceries" },
  { name: "Product C", price: 200, quantity: 5, category: "Clothing" },
];

const seedProducts = async () => {
  try {
    await connectDB();

    // optional: clear old data first
    await Product.deleteMany();
    console.log("Old products removed");
    
    await Product.insertMany(products);
    console.log("seeding successful");
    process.exit();
  } catch (err) {
    console.log("Seeding failed: ", err.message);
    process.exit(1);
  }
};

seedProducts();
