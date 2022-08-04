const {body} = require('express-validator');


//profile
exports.profileValidator = [
  body('name').isLength({min: 4}).withMessage('Fullname length minimal 4 character').optional({nullable:true}),
  body('gender').contains('L'||'P').withMessage('gender is only L or P').optional({nullable:true}),
];

//address
exports.addressValidator = [
  body('postal_code').isNumeric().isLength({min: 4}).withMessage('Fullname length minimal 4 character').optional({nullable:true}),
  body('address_name').isLength({min: 4}).withMessage('gender is only L or P').optional({nullable:true}),
];