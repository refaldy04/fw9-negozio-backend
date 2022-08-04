const category = require("express").Router();
const categoryController = require("../../controllers/category");
const { body } = require("express-validator");
// console.log(categoryController);
// console.log(category);

const profileValidation = [
  body("balance").isCurrency().withMessage("Input invalid, number only"),
  body("picture").isURL().withMessage("URL format invalid my friend"),
  body("phone_number")
    .isMobilePhone(["id-ID"])
    .withMessage("You are not from Indonesia"),
];

category.get("/", categoryController.getAllCategory);
category.get("/:id", categoryController.getCategoryById);

module.exports = category;
