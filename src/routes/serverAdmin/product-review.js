const productReview = require('express').Router();
const productReviewController = require('../../controllers/productReview');
const { body } = require('express-validator');
const rules = require('../../middleware/productReviewValidator');
const validation = require('../../middleware/validation');

productReview.get('/', productReviewController.getAllProductReview);
productReview.get('/:id', productReviewController.getProductReview);

// GUYS INI BUAT KASIH RATING BINTANG
productReview.get(
  '/average/:id',
  productReviewController.getProductReviewAverage
);

productReview.post(
  '/',
  rules.productReviewValidator,
  validation,
  productReviewController.createProductReview
);
productReview.patch(
  '/:id',
  rules.productReviewValidator,
  validation,
  productReviewController.updateProductReview
);
productReview.delete('/:id', productReviewController.deleteProductReview);

module.exports = productReview;
