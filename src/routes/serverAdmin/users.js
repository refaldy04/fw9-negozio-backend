const users = require('express').Router();

const userController = require('../../controllers/UsersController');

users.get('/', userController.getAllUsers);
users.post('/createUser', userController.createUser);

module.exports = users;