const auth = require('express').Router();
const validationRule = require('../validator');
const validation = require('../../middleware/validation');
const userController = require('../../controllers/UsersController');

//route list
auth.post('/register', validationRule.createClientValidator, validation, userController.userRegister);
auth.post('/login', validationRule.validatorLogin, validation, userController.userLogin);

module.exports = auth;