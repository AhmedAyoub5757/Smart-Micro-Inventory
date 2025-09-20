import mongoose from "mongoose";

const saleModel = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "quantity must be min 1"],
    },
    saleDate: {
        type: Date,
        default: Date.now
    }
})

const Sale = mongoose.model("Sale", saleModel);

export default Sale;