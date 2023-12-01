import { getShoppingCart } from '../api';

export const fetchShoppingCart = async (userId) => {
	console.log('fetch', userId);
	const shoppingCart = await getShoppingCart(userId);

	return {
		error: null,
		res: shoppingCart,
	};
};
