const orderRoute = require('express').Router();
const orderController = require('../../controllers/order');
const authMiddleware= require('../../middleware/auth');

orderRoute.post('/', authMiddleware, orderController.createNewOrder);
orderRoute.post('/transaksi', authMiddleware, orderController.createNewTransaction);
orderRoute.post('/:id/payment', authMiddleware, orderController.createPayment);
orderRoute.get('/:id', authMiddleware, orderController.getNewOrder);


module.exports = orderRoute;