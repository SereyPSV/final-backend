import { transformShoppingCart } from '../transformers';

export const getShoppingCart = (userId) => {
	console.log('get-userId', userId);

	return fetch(`http://localhost:3030/shopping_cart?&user_cart_id=${userId}`)
		.then((loadedShoppingCart) => loadedShoppingCart.json())
		.then(
			(loadedShoppingCart) =>
				loadedShoppingCart && loadedShoppingCart.map(transformShoppingCart),
		);
};
