import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import Product from './models/Product.js';
import Sale from './models/Sale.js';
import Alert from './models/Alert.js';

dotenv.config();

connectDB();


const app = express();

app.use(express.json());

app.get('/ping', (req, res)=> {
    res.send("pong")
});


const testProduct = async () => {
  const p = new Product({ name: "Test Item E", price: 100, stock: 10 });  // id: 68ce59acbe50ce7493e7f16a
  const saved = await p.save();
  console.log(saved);
};

testProduct();

const testSale = async (productId) => {
  const sale = new Sale({ productId, quantity: 2 });
  const savedSale = await sale.save();
  console.log(savedSale);
};

testSale("68ce5a064c6b0235b628d4e5");


const testAlert = async (productId) => {
  const alert = new Alert({ productId, message: "Low stock!" });
  const savedAlert = await alert.save();
  console.log(savedAlert);
};

testAlert("68ce5a064c6b0235b628d4e5");



const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`Serving Running on ${PORT}`)
});