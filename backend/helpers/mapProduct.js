module.exports = function (product) {
  return {
    id: product._id,
    group: product.group,
    imageUrl: product.image_url,
    productName: product.product_name,
    description: product.product_description,
    price: product.price,
    amount: product.amount,
  };
};

// левую часть отдаем во фронтенд : правую принимаем из Product models
