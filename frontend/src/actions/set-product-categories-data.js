import { ACTION_TYPE } from './action-type';

export const setProductCategoriesData = (productCategoriesData) => ({
	type: ACTION_TYPE.SET_PRODUCT_CATEGORIES_DATA,
	payload: productCategoriesData,
});
