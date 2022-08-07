const productRoute = require('express').Router();
const productController = require('../../controllers/product');
const authMiddleware = require('../../middleware/auth');
const uploudMiddleware = require('../../middleware/uploudMiddelware');
const uploudFile = require('../../middleware/uploudPhoto');
const validatorRule = require('../validator');
const validationMiddleware = require('../../middleware/validation');

productRoute.post('/', authMiddleware, uploudFile, validatorRule.validationProductForm, validationMiddleware, productController.createProduct );
productRoute.patch('/:idProduct', authMiddleware, validatorRule.validationProductForm, validationMiddleware, uploudMiddleware, productController.updateProduct );
productRoute.patch('/:idProduct/option/:idOption', authMiddleware, uploudMiddleware, validatorRule.validationProductForm, validationMiddleware,  productController.updateProductOption );
productRoute.get('/', authMiddleware, productController.getAllProductsUser );

module.exports = productRoute;