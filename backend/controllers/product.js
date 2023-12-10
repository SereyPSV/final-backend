const Product = require("../models/Product");

// add
async function addProduct(product) {
  const newProduct = await Product.create(product);
  return newProduct;
}

// edit
async function editProduct(id, product) {
  const newProduct = await Product.findByIdAndUpdate(id, product, {
    returnDocument: "after",
  });

  return newProduct;
}

// delete
function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

// get list with search and pagination
async function getProducts(search = "", limit = 6, page = 1, sort = "") {
  let sortParam = {};
  switch (sort) {
    case "priceIncrease":
      sortParam = { price: 1 };
      break;
    case "priceReduction":
      sortParam = { price: -1 };
      break;
    case "alphabetical":
      sortParam = { product_name: 1 };
      break;
    case "reverseAlphabetical":
      sortParam = { product_name: -1 };
      break;
    default:
      sortParam = {};
  }
  const [products, count] = await Promise.all([
    Product.find({
      group: ["1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008"],
      product_name: { $regex: search, $options: "i" },
    })
      .sort(sortParam)
      .limit(limit)
      .skip((page - 1) * limit),
    Product.countDocuments({
      group: ["1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008"],
      product_name: { $regex: search, $options: "i" },
    }),
  ]);

  return {
    products,
    lastPage: Math.ceil(count / limit),
  };
}

// get item
function getProduct(id) {
  return Product.findById(id);
}

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getProduct,
};
