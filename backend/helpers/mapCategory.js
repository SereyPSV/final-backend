module.exports = function (category) {
  return {
    id: category._id,
    group: category.group,
    title: category.title,
    imageUrl: category.image_url,
  };
};

// левую часть отдаем во фронтенд : правую принимаем из Product models
