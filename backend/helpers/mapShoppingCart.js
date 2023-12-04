module.exports = function (shoppingCart) {
  return {
    id: shoppingCart._id,
    userId: shoppingCart.buyer,
    count: shoppingCart.count,
    product: shoppingCart.product,
  };
};
