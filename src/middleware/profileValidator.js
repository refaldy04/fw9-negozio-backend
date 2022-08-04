const {body} = require('express-validator');

exports.profileValidator = [
  body('name').isLength({min: 4}).withMessage('Fullname length minimal 4 character').optional({nullable:true}),
  body('gender').contains('L'||'P').withMessage('gender is only L or P').optional({nullable:true}),
];

//module.exports = profileValidator;