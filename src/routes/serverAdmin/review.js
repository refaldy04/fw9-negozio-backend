const review = require("express").Router();
const reviewController = require("../../controllers/review");

review.get("/", reviewController.getAllReview);
// review.get("/:id", reviewController.getreviewById);
// review.post("/", reviewController.createreview);
// review.patch(
//   "/:id",

//   reviewController.editreview
// );
// review.delete("/:id", reviewController.deletereview);

module.exports = review;
