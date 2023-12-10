import { request } from '../utils/request';
import { setProductData } from './set-product-data';

export const saveProductAsync = (id, newProduct) => (dispatch) => {
	const saveProduct = id
		? request(`/products/${id}`, 'PATCH', newProduct)
		: request('/products', 'POST', newProduct);
	return saveProduct.then((updatedProduct) => {
		dispatch(setProductData(updatedProduct.res));

		return updatedProduct.res;
	});
};
