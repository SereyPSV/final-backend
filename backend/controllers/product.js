const Product = require("../models/Product");
const GROUPS = require("../constants/groups");

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
async function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

// get list with search and pagination
async function getProducts(
  searchPhrase = "",
  searchGroup = GROUPS,
  limit = 6,
  page = 1,
  sort = ""
) {
  const sortGroup = !searchGroup.length ? GROUPS : searchGroup.split(",");
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
      group: sortGroup,
      product_name: { $regex: searchPhrase, $options: "i" },
    })
      .sort(sortParam)
      .limit(limit)
      .skip((page - 1) * limit),
    Product.countDocuments({
      group: searchGroup.split(","),
      product_name: { $regex: searchPhrase, $options: "i" },
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
