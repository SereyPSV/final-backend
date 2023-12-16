import { request } from '../utils/request';

export const removeProductFromCart = (id) => {
	return request(`/shoppingCart/${id}`, 'DELETE');
};

// TODO - проверить naming - dispatch(setProductData(productData.res))
