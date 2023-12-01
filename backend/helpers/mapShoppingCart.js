module.exports = function (shoppingCart) {
  return {
    id: shoppingCart._id,
    productId: shoppingCart.product_id,
    userId: shoppingCart.user_id,
    amount: shoppingCart.amount,
  };
};
