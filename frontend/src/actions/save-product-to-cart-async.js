import { request } from '../utils/request';
// import { setShoppingCartData } from './set-shopping-cart-data';

export const saveShoppingCartAsync = (newCart) => (dispatch) =>
	request('/shoppingCart', 'POST', newCart);
// return saveProduct.then((updatedCart) => {
// 	dispatch(setShoppingCartData(updatedCart.res));

// 	return updatedCart.res;
// });
// };
