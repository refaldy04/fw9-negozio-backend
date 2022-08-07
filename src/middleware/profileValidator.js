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


//chat content
exports.chatContentValidator =[
  body('content').isLength({min:1}).withMessage('Can\'t send message').optional({nullable:true}),
];

//payment method
exports.paymentMethodValidator =[
  body('payment_method').isLength({min:4}).withMessage('minmal name 4 character').optional({nullable:true}),
];