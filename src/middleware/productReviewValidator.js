const { body } = require('express-validator');

exports.productReviewValidator = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('input vailed'),
];
