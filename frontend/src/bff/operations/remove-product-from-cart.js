import { deleteProductFromCart, getShoppingCart, getProduct } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removePostComment = async (hash, productId, userId, id) => {
	const accessRoles = [ROLE.ADMIN, ROLE.SELLER, ROLE.BUYER];
	console.log(productId, userId, id);
	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			rez: null,
		};
	}
	console.log(productId, userId, id);
	// await deleteProductFromCart(userId);

	// const post = await getProduct(productId);

	// const comments = await getShoppingCart(productId);

	// return {
	// 	error: null,
	// 	res: {
	// 		...post,
	// 		comments,
	// 	},
	// };
};
