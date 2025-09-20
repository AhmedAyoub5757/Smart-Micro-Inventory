import mongoose from "mongoose";

const alertModel = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    message: {
      type: String,
      required: true,
    },
    isResolved: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Alert = mongoose.model("Alert", alertModel);

export default Alert;
