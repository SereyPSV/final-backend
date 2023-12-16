import { request } from '../utils/request';
import { setShoppingCart } from './set-shopping-cart';

export const addProductToCart = (newCart) => (dispatch) =>
	request('/shoppingCart', 'POST', newCart).then((updatedCart) =>
		dispatch(setShoppingCart(updatedCart.res)),
	);
