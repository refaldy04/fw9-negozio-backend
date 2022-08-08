const categoryModels = require('../models/category');
const response = require('../helpers/standardResponse');
const upload = require('../helpers/upload').single('picture');
const errorResponse = require('../helpers/errorResponse');
const { validationResult } = require('express-validator');
// console.log(categoryModels);

exports.getAllCategory = (req, res) => {
  console.log('a');
  const { limit = 4 } = req.query;
  categoryModels.getAllCategory(limit, (result) => {
    return response(
      res,
      'message from standard response: request success',
      result
    );
  });
};

exports.getCategoryById = (req, res) => {
  const { id } = req.params;
  categoryModels.getCategoryById(id, (err, result) => {
    if (result.rows.length > 0) {
      return response(res, 'Detail transaction', result.rows[0]);
    } else {
      return res.redirect('/404');
    }
  });
};

exports.createCategory = (req, res) => {
  console.log(req.body);
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return response(res, `Failed to upload: ${err.message}`, null, null, 404);
    }

    let filename = null;
    if (req.file) {
      console.log(req.file);
      filename = req.file.filename;
    }

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      return response(res, 'Error occured', validation.array(), 400);
    }
    categoryModels.createCategory(req.body, filename, (err, result) => {
      if (err) {
        return errorResponse(err, res);
      } else {
        return response(res, 'Profile created', result);
      }
    });
  });
};

exports.editCategory = (req, res) => {
  const { id } = req.params;
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return response(
        res,
        `Failed to update Category: ${err.message}`,
        null,
        null,
        404
      );
    }

    let filename = null;
    if (req.file) {
      console.log(req.file);
      filename = req.file.filename;
    }

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      return response(res, 'Error occured', validation.array(), 400);
    }

    categoryModels.editCategory(id, req.body, filename, (err, result) => {
      if (err) {
        console.log(err);
        return errorResponse(err, res);
      } else {
        return response(res, 'Edit profile successfully', result);
      }
    });
  });
};

exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  categoryModels.deleteCategory(id, (result) => {
    return response(res, 'Profile deleted', result[0]);
  });
};


//with prisma

exports.createCategoryProduct = async (req, res) => {
  let picture = '';
  if(req.file){
    picture = req.file.filename;  
  }
  const category = await categoryModels.createCategoryProduct(picture, req.body);
  return response(res, 'create catagory successfully', category);
};