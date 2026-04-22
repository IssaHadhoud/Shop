const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered"],
    default: "pending",
  },
  createAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Order", orderSchema);
