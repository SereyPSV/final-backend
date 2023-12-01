import { getProductCategories } from '../api';

export const fetchProductCategories = async () => {
	const productCategories = await getProductCategories();
	return {
		error: null,
		res: productCategories,
	};
};
