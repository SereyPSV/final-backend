export const addProductInCart = (userId, productId, basketCounter) => {
	return fetch(`http://localhost:3030/shopping_cart`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			product_id: productId,
			user_cart_id: userId,
			amount_in_cart: basketCounter,
		}),
	});
};
