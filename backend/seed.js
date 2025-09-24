// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // adjust path if needed

dotenv.config();

const products = [
  { name: "Pepsi 500ml", price: 60, quantity: 20, category: "Beverages" },
  { name: "Sprite 1L", price: 120, quantity: 15, category: "Beverages" },
  { name: "Coca Cola 1.5L", price: 180, quantity: 12, category: "Beverages" },
  { name: "Milk Pack 1L", price: 160, quantity: 25, category: "Dairy" },
  { name: "Yogurt Cup 250g", price: 80, quantity: 18, category: "Dairy" },
  { name: "Eggs (Dozen)", price: 240, quantity: 8, category: "Poultry" },
  { name: "Chicken Breast 1kg", price: 750, quantity: 5, category: "Poultry" },
  { name: "Rice 5kg Bag", price: 1500, quantity: 5, category: "Grocery" },
  { name: "Flour 10kg Bag", price: 1200, quantity: 7, category: "Grocery" },
  { name: "Cooking Oil 5L", price: 2500, quantity: 6, category: "Grocery" },
  { name: "Bread (Large)", price: 80, quantity: 10, category: "Bakery" },
  { name: "Burger Buns (Pack of 6)", price: 150, quantity: 9, category: "Bakery" },
  { name: "Shampoo 200ml", price: 350, quantity: 15, category: "Personal Care" },
  { name: "Soap Bar", price: 70, quantity: 30, category: "Personal Care" },
  { name: "Detergent Powder 1kg", price: 400, quantity: 12, category: "Household" },
  { name: "Dishwashing Liquid 500ml", price: 250, quantity: 10, category: "Household" },
  { name: "Chips (Pack)", price: 50, quantity: 40, category: "Snacks" },
  { name: "Biscuits (Pack)", price: 120, quantity: 25, category: "Snacks" },
  { name: "Tea 500g", price: 950, quantity: 6, category: "Beverages" },
  { name: "Instant Coffee 100g", price: 650, quantity: 8, category: "Beverages" },
  { name: "Sugar 5kg Bag", price: 950, quantity: 5, category: "Grocery" },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to DB ✅");

    await Product.deleteMany(); // Clear old data
    await Product.insertMany(products);

    console.log("Database seeded with products 🌱");
    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding error ❌", err);
    mongoose.connection.close();
  }
}

seedDB();
