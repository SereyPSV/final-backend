import { ACTION_TYPE } from './action-type';

export const setShoppingCartData = (shoppingCart) => ({
	type: ACTION_TYPE.SET_SHOPPING_CART_DATA,
	payload: shoppingCart,
});
