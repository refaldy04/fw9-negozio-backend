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

//create sellers
users.post('/createSeller', validationRules.createNewSellerValidator, validationMiddleware, userController.createUser);
users.patch('/updateSeller/:id', validationRules.createNewSellerValidator, validationMiddleware, userController.updateUser);
//create customers
users.post('/createCustomer', validationRules.createClientValidator, validationMiddleware, userController.createUser);
users.patch('/updateCustomer/:id', validationRules.createClientValidator, validationMiddleware, userController.updateUser);
//create admins
users.post('/createAdmin', validationRules.createClientValidator, validationMiddleware, userController.createUser);

users.delete('/:id', userController.deleteUser);

module.exports = users;