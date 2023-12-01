const mapShoppingCart = require("./mapShoppingCart");

module.exports = function (user) {
  return {
    id: user.id,
    login: user.login,
    roleId: user.role,
    // shoppingCart: user.shoppingCart.map((productCart) =>
    //   mongoose.isObjectIdOrHexString(productCart)
    //     ? productCart
    //     : mapShoppingCart(productCart)
    // ),
    registeredAt: user.createdAt,
  };
};
