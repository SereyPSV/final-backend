const Product = require("../models/Product");

// add
async function addProduct(product) {
  console.log("----------ppp________", product);
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
async function getProducts(search = "", limit = 6, page = 1) {
  const [products, count] = await Promise.all([
    Product.find({ product_name: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ product_description: -1 })
      .sort({ price: -1 }),
    Product.countDocuments({ product_name: { $regex: search, $options: "i" } }),
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
