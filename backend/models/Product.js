import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product is required"],
        trim: true,
        unique: true
    },
    category: {
        type: String,
        default: "general"
    },
    price: {
        type: Number,
        required: [true, "number is required"],
        min: [0, "price can not be negative"]
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "stock can not be negative"]
    },
    lowStockThreshold: {
        type: Number,
        default:5,
        min: [0, "threshold can not be negative"]
    },


},
      {timestamps: true}
)


const Product = mongoose.model("Product", productSchema);
export default Product;