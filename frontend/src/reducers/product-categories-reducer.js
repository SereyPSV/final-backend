import { ACTION_TYPE } from '../actions';

const initialProductCategoriesState = [];

export const productCategoriesReducer = (
	state = initialProductCategoriesState,
	action,
) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCT_CATEGORIES:
			return action.payload;
		default:
			return state;
	}
};
