import { ACTION_TYPE } from '../actions';

const initialShoppingCartState = [];

export const shoppingCartReducer = (state = initialShoppingCartState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_SHOPPING_CART_DATA:
			return action.payload;
		case ACTION_TYPE.RESET_SHOPPING_CART_DATA:
			return initialShoppingCartState;
		default:
			return state;
	}
};
