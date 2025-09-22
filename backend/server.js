import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRoutes from "./routes/productRoutes.js"
// import { getProductById } from './controllers/productController.js';

dotenv.config();

connectDB();


const app = express();

app.use(express.json());

// app.get('/ping', (req, res)=> {
//     res.send("pong")
// });

app.use('/api/products', productRoutes);
// app.use('/api/products/:id', getProductById);




const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`Serving Running on ${PORT}`)
});