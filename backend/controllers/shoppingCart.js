const ShoppingCart = require("../models/ShoppingCart");
const User = require("../models/User");

// add
async function addShoppingCart(userId, shoppingCart) {
  const newShoppingCart = await ShoppingCart.create(shoppingCart);

  await User.findByIdAndUpdate(userId, {
    $push: { shoppingCart: newShoppingCart },
  });

  await newShoppingCart.populate("product");

  return newShoppingCart;
}

// get
function getShoppingCart(userId) {
  return ShoppingCart.find({ user_id: userId });
}

// delete
async function deleteShoppingCart(userId, shoppingCartId) {
  await ShoppingCart.deleteOne({ _id: shoppingCartId });
  await User.findByIdAndUpdate(userId, {
    $pull: { shoppingCart: shoppingCartId },
  });
}

module.exports = {
  getShoppingCart,
  addShoppingCart,
  deleteShoppingCart,
};
