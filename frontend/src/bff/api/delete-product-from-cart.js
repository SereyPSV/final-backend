export const deleteProductFromCart = async (productId) =>
	fetch(`http://localhost:3030/shopping_cart/${productId}`, {
		method: 'DELETE',
	});
