const userRoute = require('express').Router();
const userController = require('../../controllers/user');
const authMiddleware = require('../../middleware/auth');
//list route
// userRoute.get('/', userController.getAll);

module.exports = userRoute;