const users = require('express').Router();

const userController = require('../../controllers/user');

const validationMiddleware = require('../../middleware/validation');
const validationRules = require('../validator');

//customer
// users.get('/', userController.getAllUserCustomers);
// users.post('/', validationRules.createClientValidator, validationMiddleware, userController.createUserCustomer);
// users.patch('/:id', validationRules.createClientValidator, validationMiddleware, userController.updateUserCustomer);
// users.delete('/:id', userController.deleteUser);

// //seller
// users.get('/allSellers', userController.getAllUserSellers);
// //admin
// users.get('/allAdmins', userController.getAllUserAdmins);

users.get('/', userController.getAllUsers2);

module.exports = users;