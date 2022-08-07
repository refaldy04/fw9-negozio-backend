const chatRoute = require('express').Router();
const chatController = require('../../controllers/chatContent');
const authMiddleware = require('../../middleware/auth');
// const uploudMiddleware = require('../../middleware/uploudMiddelware');
// const uploudFile = require('../../middleware/uploudPhoto');
const validatorRule = require('../../middleware/profileValidator');
const validationMiddleware = require('../../middleware/validation');

chatRoute.get('/', authMiddleware, chatController.getAllChat);
chatRoute.post('/', authMiddleware, validatorRule.chatContentValidator, validationMiddleware, chatController.createChatContent);
// chatRoute.patch('/:idProduct', authMiddleware, validatorRule.validationProductForm, validationMiddleware, uploudMiddleware, productController.updateProduct );
// chatRoute.patch('/:idProduct/option/:idOption', authMiddleware, uploudMiddleware, validatorRule.validationProductForm, validationMiddleware,  productController.updateProductOption );
// chatRoute.get('/', authMiddleware, productController.getAllProductsUser );

module.exports = chatRoute;