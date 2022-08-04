const {validationResult}= require('express-validator');
const response = require('../helpers/standartResponse');

const validation = (req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return response(res, 'Validation error', errors.array(), null, 400);
  }
  next();
};

module.exports=validation;
