export const removeProductAsync = (requestServer, productId) => () =>
	requestServer('removeProduct', productId);
