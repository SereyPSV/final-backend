import { setShoppingCartData } from './set-shopping-cart-data';

export const loadShoppingCartAsync = (requestServer, productId, userId) => (dispatch) =>
	requestServer('fetchShoppingCart', productId, userId).then((shoppingCartData) => {
		if (shoppingCartData.res) {
			dispatch(setShoppingCartData(shoppingCartData.res));
		}

		return shoppingCartData;
	});
