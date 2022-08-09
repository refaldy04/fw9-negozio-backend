const auth = require("express").Router();
const validationRule = require("../validator");
const validation = require("../../middleware/validation");
const userController = require("../../controllers/auth");

//route list
auth.post(
  "/register",
  validationRule.createNewSellerValidator,
  validation,
  userController.registerUser
);
// auth.post('/registerCustomer', validationRule.createClientValidator, validation, userController.userRegister);
// auth.post('/registerSeller', validationRule.createNewSellerValidator, validation, userController.userRegister);
auth.post(
  "/login",
  validationRule.validatorLogin,
  validation,
  userController.loginUser
);

module.exports = auth;
