const chatModels = require('../models/chat');
const response = require('../helpers/standardResponse');
const upload = require('../helpers/upload').single('picture');
const errorResponse = require('../helpers/errorResponse');
const { validationResult } = require('express-validator');
// console.log(categoryModels);

exports.getAllChat = (req, res) => {
  console.log('a');
  const { limit = 4 } = req.query;
  chatModels.getAllChat(limit, (result) => {
    return response(
      res,
      'message from standard response: request success',
      result
    );
  });
};

exports.getChatById = (req, res) => {
  const { id } = req.params;
  console.log(id);
  chatModels.getChatById(id, (err, result) => {
    if (result.rows.length > 0) {
      return response(res, 'Detail transaction', result.rows[0]);
    } else {
      return res.redirect('/404');
    }
  });
};

exports.createChat = (req, res) => {
  console.log(req.body);

  //   const validation = validationResult(req);
  //   if (!validation.isEmpty()) {
  //     return response(res, "Error occured", validation.array(), 400);
  //   }
  chatModels.createChat(req.body, (err, result) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Chat created', result);
    }
  });
};

exports.editChat = (req, res) => {
  const { id } = req.params;

  //   const validation = validationResult(req);
  //   if (!validation.isEmpty()) {
  //     return response(res, "Error occured", validation.array(), 400);
  //   }

  chatModels.editChat(id, req.body, (err, result) => {
    if (err) {
      console.log(err);
      return errorResponse(err, res);
    } else {
      return response(res, 'Edit chat successfully', result);
    }
  });
};

exports.deleteChat = (req, res) => {
  const { id } = req.params;
  chatModels.deleteChat(id, (result) => {
    return response(res, 'Profile deleted', result[0]);
  });
};
