import { request } from '../utils/request';
import { setProductData } from './set-product-data';

export const removeProductFromCartAsync = (id) => (dispatch) =>
	request(`/shoppingCart/${id}`, 'DELETE').then((productData) => {
		dispatch(setProductData(productData.res));
	});

// TODO - проверить naming
