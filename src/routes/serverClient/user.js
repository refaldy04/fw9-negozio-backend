const userRoute = require('express').Router();
const userController = require('../../controllers/user');

//list route
userRoute.get('/', userController.getAll);

module.exports = userRoute;