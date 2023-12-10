const ShoppingCart = require("../models/ShoppingCart");
const User = require("../models/User");
const Product = require("../models/Product");

function getShoppingCart(userId) {
  return (carts = ShoppingCart.find({ buyer: userId }));
  // carts.forEach((cart) => {
  //   Product.find(cart.product);
  // });
}

//-----add or update in cart
async function addOrUpdateShoppingCart(userId, count) {
  const checkShoppingCart = await ShoppingCart.find({
    buyer: userId,
    product: count.product,
  });
  if (!checkShoppingCart.length) {
    const newShoppingCart = await ShoppingCart.create(count);

    await User.findByIdAndUpdate(userId, {
      $push: { shoppingCart: newShoppingCart },
    });

    return await newShoppingCart.populate("product");
  } else {
    const newShoppingCart = await ShoppingCart.findByIdAndUpdate(
      checkShoppingCart,
      {
        count: count.count,
      },
      { returnDocument: "after" }
    );
    return await newShoppingCart.populate("product");
  }
}

//----- delete
async function deleteShoppingCart(userId, shoppingCartId) {
  await ShoppingCart.deleteOne({ _id: shoppingCartId });
  await User.findByIdAndUpdate(userId, {
    $pull: { shoppingCart: shoppingCartId },
  });
}

module.exports = {
  getShoppingCart,
  addOrUpdateShoppingCart,
  deleteShoppingCart,
};
