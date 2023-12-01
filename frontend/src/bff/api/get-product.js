import { transformProduct } from '../transformers';

export const getProduct = async (productId) => {
	fetch(`http://localhost:3030/products/${productId}`)
		.then((loadedProduct) => loadedProduct.json())
		.then((loadedProduct) => loadedProduct && transformProduct(loadedProduct));
};
