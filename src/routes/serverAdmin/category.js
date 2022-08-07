const category = require('express').Router();
const categoryController = require('../../controllers/category');
const uploadFile = require('../../middleware/uploudMiddelware');
category.get('/', categoryController.getAllCategory);
category.get('/:id', categoryController.getCategoryById);
category.post('/', uploadFile, categoryController.createCategoryProduct);
category.patch(
  '/:id',

  categoryController.editCategory
);
category.delete('/:id', categoryController.deleteCategory);

module.exports = category;
