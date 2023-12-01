import { getProducts } from '../api';

export const fetchProducts = async (
	searchPhrase,
	sortingCategory,
	page,
	limit,
	sortSelectionProducts,
) => {
	const products = await getProducts(
		searchPhrase,
		sortingCategory,
		page,
		limit,
		sortSelectionProducts,
	);

	return {
		error: null,
		res: products,
	};
};
