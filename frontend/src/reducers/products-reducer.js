import { ACTION_TYPE } from '../actions';

const initialProductsState = [];

export const productsReducer = (state = initialProductsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCTS_DATA:
			return action.payload;
		default:
			return state;
	}
};
