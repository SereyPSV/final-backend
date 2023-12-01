import { transformProduct } from '../transformers';

export const getProducts = (
	searchPhrase = '',
	sortingCategory = '',
	page = '',
	limit = '',
	sortSelectionProducts = '',
) => {
	return fetch(
		`http://localhost:3030/products?${sortSelectionProducts}group_like=${sortingCategory}&product_name_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then((loadedProducts) =>
			Promise.all([loadedProducts.json(), loadedProducts.headers.get('Link')]),
		)
		.then(([loadedProducts, links]) => ({
			products: loadedProducts && loadedProducts.map(transformProduct),
			links,
		}));
};
