import { ACTION_TYPE } from '../actions';
import { ROLE } from '../constants';

const initialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
	shoppingCart: [],
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_PRODUCT_IN_CART:
			return {
				...state,
				shoppingCart: [...state.shoppingCart, action.payload],
			};
		case ACTION_TYPE.REMOVE_PRODUCT_FROM_CART:
			return {
				...state,
				shoppingCart: state.shoppingCart.filter(
					(cart) => cart.id !== action.payload,
				),
			};
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.LOGOUT:
			return initialUserState;

		default:
			return state;
	}
};
