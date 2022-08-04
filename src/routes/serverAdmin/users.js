const users = require('express').Router();

const userController = require('../../controllers/UsersController');

const validationMiddleware = require('../../middleware/validation');
const validationRules = require('../validator');

users.get('/', userController.getAllUserCustomers);
users.post('/', validationRules.createClientValidator, validationMiddleware, userController.createUserCustomer);
users.patch('/:id', validationRules.createClientValidator, validationMiddleware, userController.updateUserCustomer);
users.delete('/:id', userController.deleteUser);

module.exports = users;