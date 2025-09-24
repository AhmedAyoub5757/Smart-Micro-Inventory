import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRoutes from "./routes/productRoutes.js"
import errorHandler from './middleware/errorMiddleware.js';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";


dotenv.config();

connectDB();


const app = express();

// ✅ Allow requests from frontend
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Needed because __dirname is not available in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load YAML file (make sure path is correct!)
const swaggerDocument = YAML.load(path.join(__dirname, "./docs/swagger.yaml"));

app.use(express.json());
app.use(errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use('/api/products', productRoutes);




const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`Serving Running on ${PORT}`)
});