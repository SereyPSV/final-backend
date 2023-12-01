export const transformProduct = (dbProduct) => {
	return {
		id: dbProduct.id,
		group: dbProduct.group,
		imageUrl: dbProduct.image_url,
		productName: dbProduct.product_name,
		price: dbProduct.price,
		productDescription: dbProduct.product_description,
		amount: dbProduct.amount,
	};
};
