const shoppingCart = [
	{ id: '5001', numbeOfProducts: 3 },
	{ id: '5005', numbeOfProducts: 2 },
];

const products = [
	{ id: '5001', m2: '11' },
	{ id: '5002', m2: '12' },
	{ id: '5003', m2: '13' },
	{ id: '5004', m2: '14' },
	{ id: '5005', m2: '15' },
];

let resultArray = [];
// products.filter((item) => {
// 	return shoppingCart.some((item2) => item2.id === item.id);
// });

products.forEach((item1) => {
	shoppingCart.forEach((item2) => {
		if (item2.id === item1.id) {
			resultArray.push({ ...item1, numbeOfProducts: item2.numbeOfProducts });
		}
	});
});
