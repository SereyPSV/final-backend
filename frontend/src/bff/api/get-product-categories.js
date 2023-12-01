import { transformProductCategories } from '../transformers';

export const getProductCategories = () => {
	return fetch('http://localhost:3030/product_categories')
		.then((loadedProductCategories) => loadedProductCategories.json())
		.then(
			(loadedProductCategories) =>
				loadedProductCategories &&
				loadedProductCategories.map(transformProductCategories),
		);
};
