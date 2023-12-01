export const transformProductCategories = (dbProduct) => {
	return {
		id: dbProduct.id,
		group: dbProduct.group,
		title: dbProduct.title,
		imageUrl: dbProduct.image_url,
	};
};
