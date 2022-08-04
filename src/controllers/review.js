const categoryModels = require("../models/category");
const response = require("../helpers/standardResponse");
// const upload = require('../helpers/upload').single('picture');
const errorResponse = require("../helpers/errorResponse");

exports.getAllReview = (req, res) => {
  console.log("a");
  const { limit = 4 } = req.query;
  reviewModels.getAllReview(limit, (result) => {
    return response(
      res,
      "message from standard response: request success",
      result
    );
  });
};
