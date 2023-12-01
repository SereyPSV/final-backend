const Categories = require("../models/Categories");

function getCategories() {
  return Categories.find();
}
module.exports = {
  getCategories,
};
