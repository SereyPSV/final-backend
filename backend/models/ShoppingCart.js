const mongoose = require("mongoose");

const ShoppingCartSchema = mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    count: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const ShoppingCart = mongoose.model("Shopping_Cart", ShoppingCartSchema);

module.exports = ShoppingCart;
