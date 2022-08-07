const productRoute = require('express').Router();
const productController = require('../../controllers/product');
const authMiddleware = require('../../middleware/auth');
const uploudMiddleware = require('../../middleware/uploadFile');

productRoute.post('/', authMiddleware, uploudMiddleware, productController.createProduct );
productRoute.get('/', authMiddleware, productController.getAllProductsUser );

module.exports = productRoute;