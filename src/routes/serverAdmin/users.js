const users = require('express').Router();

const userController = require('../../controllers/UsersController');

users.get('/', userController.getAllUsers);

module.exports = users;