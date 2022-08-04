const category = require("express").Router();
const categoryController = require("../../controllers/category");
const { body } = require("express-validator");
// console.log(categoryController);
// console.log(category);

category.get("/", categoryController.getAllCategory);
category.get("/:id", categoryController.getCategoryById);
category.post("/", categoryController.createCategory);
category.patch(
  "/:id",

  categoryController.editCategory
);
category.delete("/:id", categoryController.deleteCategory);

module.exports = category;
