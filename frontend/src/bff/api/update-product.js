export const updateProductInCart = (productId, basketCounter) => {
	fetch(`http://localhost:3030/shopping_cart/${productId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			amount_in_cart: basketCounter,
		}),
	});
};
