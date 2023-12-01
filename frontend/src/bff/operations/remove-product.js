import { deleteProductFromCart, deleteProduct, getShoppingCart } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removeProduct = async (hash, productId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.BUYER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			rez: null,
		};
	}

	await deleteProduct(productId);

	const shoppingCart = await getShoppingCart(productId);

	await Promise.all(shoppingCart.map((cart) => deleteProductFromCart(cart.id)));

	return {
		error: null,
		res: true,
	};
};
