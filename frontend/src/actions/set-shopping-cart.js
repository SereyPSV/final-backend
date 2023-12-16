import { ACTION_TYPE } from './action-type';

export const setShoppingCart = (shoppingCart) => ({
	type: ACTION_TYPE.SET_SHOPPING_CART,
	payload: shoppingCart,
});
