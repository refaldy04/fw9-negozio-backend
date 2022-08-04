const review = require('express').Router();
const reviewController = require('../../controllers/review');

// const { reviewValidator } = require("../../middleware/reviewValidator");
const { body } = require('express-validator');

const validation = require('../../middleware/validation');
// const rules = require("../../middleware/profileValidator");

const reviewValidator = [
  body('rating').isInt({ min: 0, max: 5 }).withMessage('input vailed'),
  body('time').isISO8601().withMessage('Date format invalid (ISO8601)'),
];

review.get('/', reviewController.getAllReview);
review.get('/:id', reviewController.getReviewById);
review.post('/', ...reviewValidator, validation, reviewController.createReview);
review.patch(
  '/:id',
  ...reviewValidator,
  validation,
  reviewController.editReview
);
review.delete('/:id', reviewController.deleteReview);

module.exports = review;
