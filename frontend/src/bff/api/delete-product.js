export const deleteProduct = (productId) =>
	fetch(`http://localhost:3030/products/${productId}`, {
		method: 'DELETE',
	});
