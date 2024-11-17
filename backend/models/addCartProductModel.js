const mongoose = require("mongoose");

const addCartProductModel = new mongoose.Schema(
  {
    productId: {
      ref: "uploadProduct",
      type: String
    },
    quantity: Number,
    userId: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("addCartProduct", addCartProductModel);
