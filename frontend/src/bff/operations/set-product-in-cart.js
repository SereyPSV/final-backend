import { addProductInCart, getShoppingCart, updateProductInCart } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const setProductInCart = async (hash, productId, userId, basketCounter) => {
	const accessRoles = [ROLE.ADMIN, ROLE.SELLER, ROLE.BUYER];
	const access = await sessions.access(hash, accessRoles);
	console.log('set-in-cart-async', productId, userId, basketCounter);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			rez: null,
		};
	}
	const shoppingCart = await getShoppingCart(productId);

	const numberOfProducts = shoppingCart.find(
		(numberOfProducts) =>
			productId === numberOfProducts.productId &&
			userId === numberOfProducts.userId,
	);
	if (numberOfProducts) {
		await updateProductInCart(numberOfProducts.id, basketCounter);
	} else {
		await addProductInCart(userId, productId, basketCounter);
	}

	const newShoppingCart = await getShoppingCart(productId, userId);

	return {
		error: null,
		res: {
			...shoppingCart,
			newShoppingCart,
		},
	};
};
