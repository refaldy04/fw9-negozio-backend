const paymentMethod = require('express').Router();

const paymentMethodController = require('../../controllers/paymentMethoda');

const validationMiddleware = require('../../middleware/validation');

const validationRules = require('../../middleware/profileValidator');

const uploadFile = require('../../middleware/uploadFile');


paymentMethod.get('/', paymentMethodController.getAllPaymentMethod);
paymentMethod.post('/', uploadFile, validationRules.paymentMethodValidator, validationMiddleware, paymentMethodController.createPaymentMethod);
paymentMethod.patch('/:id', uploadFile, validationRules.paymentMethodValidator, validationMiddleware, paymentMethodController.updatePaymentMethod);
paymentMethod.delete('/:id', paymentMethodController.deletePaymentMethod);

module.exports = paymentMethod;