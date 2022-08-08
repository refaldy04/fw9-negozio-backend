const reviewModels = require('../models/review');
const response = require('../helpers/standardResponse');
const upload = require('../helpers/upload').single('picture');
const errorResponse = require('../helpers/errorResponse');
const { validationResult } = require('express-validator');
// console.log(categoryModels);

exports.getAllReview = (req, res) => {
  console.log('a');
  const { limit = 4 } = req.query;
  reviewModels.getAllReview(limit, (result) => {
    return response(
      res,
      'message from standard response: request success',
      result
    );
  });
};

exports.getReviewById = (req, res) => {
  const { id } = req.params;
  console.log(id);
  reviewModels.getReviewById(id, (err, result) => {
    if (result.rows.length > 0) {
      return response(res, 'Detail transaction', result.rows[0]);
    } else {
      return res.redirect('/404');
    }
  });
};

exports.createReview = (req, res) => {
  console.log(req.body);

  reviewModels.createReview(req.body, (err, result) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Review created', result);
    }
  });
};

exports.createReview = (data, cb) => {
  const query =
    'INSERT INTO categories(name, gender ) VALUES($1, $2) RETURNING *';
  const values = [data.name, data.gender];
  db.query(query, values, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};

exports.editReview = (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  //   const validation = validationResult(req);
  //   if (!validation.isEmpty()) {
  //     return response(res, "Error occured", validation.array(), 400);
  //   }

  reviewModels.editReview(id, req.body, (err, result) => {
    if (err) {
      console.log(err);
      return errorResponse(err, res);
    } else {
      return response(res, 'Edit profile successfully', result);
    }
  });
};

exports.deleteReview = (req, res) => {
  const { id } = req.params;
  reviewModels.deleteReview(id, (result) => {
    return response(res, 'Review deleted', result[0]);
  });
};
