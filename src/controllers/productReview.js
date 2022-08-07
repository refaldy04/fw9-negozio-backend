const productReviewModels = require("../models/productReview");
const response = require("../helpers/standardResponse");
const errorResponse = require("../helpers/errorResponse");
const { validationResult } = require("express-validator");

exports.getAllProductReview = async (req, res) => {
  console.log("a");
  //   const { limit = 4 } = req.query;
  const productReview = await productReviewModels.getAllProductReview();
  if (productReview?.length < 1) {
    return response(res, "You dont have product review saved.", null);
  } else {
    return response(res, "This is your product review.", productReview);
  }
};

exports.getProductReview = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const productReview = await productReviewModels.getProductReview(id);
  console.log(productReview);
  if (productReview.length > 0) {
    return response(res, "Product review", productReview[0]);
  } else {
    return response(res, "Not found");
  }
};

// INI MENCARI RATA-RATA YA GUYS BUAT BIKIN REVIEW BINTANG
exports.getProductReviewAverage = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const productReview = await productReviewModels.getProductReviewAverage(id);
  //   console.log(productReview);
  if (productReview) {
    return response(res, "Product review", productReview);
  } else {
    return response(res, "Not found");
  }
};

exports.createProductReview = async (req, res) => {
  console.log(req.body);
  const productReview = await productReviewModels.createProductReview(req.body);
  return response(res, "Create product review address", productReview);
};

exports.updateProductReview = async (req, res) => {
  const { id } = req.params;
  const productReview = await productReviewModels.updateProductReview(
    id,
    req.body
  );
  return response(res, "Edit product review success", productReview);
};

exports.deleteProductReview = async (req, res) => {
  const { id } = req.params;
  const productReview = await productReviewModels.deleteProductReview(id);
  return response(res, "Delete product review success", productReview);
};
