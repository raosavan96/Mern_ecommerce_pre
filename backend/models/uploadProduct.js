const mongoose = require("mongoose");

const uploadProduct = new mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    selling: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("uploadProduct", uploadProduct);
