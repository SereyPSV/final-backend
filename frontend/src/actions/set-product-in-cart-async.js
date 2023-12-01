import { setProductData } from './set-product-data';

export const setProductInCartAsync =
	(requestServer, productId, userId, basketCounter) => (dispatch) => {
		console.log('set-in-cart-async', productId, userId, basketCounter);
		// requestServer('setProductInCart', userId, productId, basketCounter);
		// .then(
		// 	(productData) => {
		// 		dispatch(setProductData(productData.res));
		// 	},
		// );
	};
