export const transformShoppingCart = (dbShoppingCart) => ({
	id: dbShoppingCart.id,
	productId: dbShoppingCart.product_id,
	userId: dbShoppingCart.user_cart_id,
	amountInCart: dbShoppingCart.amount_in_cart,
});
