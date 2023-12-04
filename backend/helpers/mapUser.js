const mapShoppingCart = require("./mapShoppingCart");

module.exports = function (user) {
  return {
    id: user.id,
    login: user.login,
    roleId: user.role,
    shoppingCart: user.shoppingCart,
    registeredAt: user.createdAt,
  };
};
