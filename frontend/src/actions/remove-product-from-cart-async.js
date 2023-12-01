import { setProductData } from './set-product-data';

export const removeProductFromCartAsync =
	(requestServer, productId, idInCart, id) => (dispatch) =>
		requestServer('removeProductFromCart', productId, idInCart, id).then(
			(productData) => {
				dispatch(setProductData(productData.res));
			},
		);

// TODO - проверить naming
