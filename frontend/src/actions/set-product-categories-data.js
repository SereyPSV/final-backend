import { ACTION_TYPE } from './action-type';

export const setProductCategories = (productCategoriesData) => ({
	type: ACTION_TYPE.SET_PRODUCT_CATEGORIES,
	payload: productCategoriesData,
});
