const mongoose = require("mongoose");
const validator = require("validator");

const CategoriesSchema = mongoose.Schema({
  group: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: "Image should be a valid url",
    },
  },
});

const Categories = mongoose.model("Categories", CategoriesSchema);

module.exports = Categories;
