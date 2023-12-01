const mongoose = require("mongoose");

const ShoppingCartSchema = mongoose.Schema(
  {
    userCartId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    amountInCart: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ShoppingCart = mongoose.model("ShoppingCart", ShoppingCartSchema);

module.exports = ShoppingCart;
