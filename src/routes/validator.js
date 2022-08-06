const {body} = require('express-validator');
const brcypt = require('bcrypt');

exports.createClientValidator = [
  body('full_name').isLength({min: 6}).withMessage('Username must be 6 characters or more'),
  body('email').isEmail().withMessage('Format email is invalid'),
  body('password').isLength({min: 8}).withMessage('Password must be 8 character').customSanitizer(async (val) =>{
    const hash = await brcypt.hash(val, 10);
    return hash;
  })
];

exports.createNewSellerValidator = [
  body('full_name').isLength({min: 6}).withMessage('Username must be 6 characters or more'),
  body('email').isEmail().withMessage('Format email is invalid'),
  body('phone_number').isMobilePhone('id-ID').withMessage('Format phone is not support, Please use ID phone zone.').optional({nullable:true}),
  body('store_name').isLength({min: 6}).withMessage('Store name must be 6 characters').optional({nullable:true}),
  body('password').isLength({min: 8}).withMessage('Password must be 8 character').customSanitizer(async (val) =>{
    const hash = await brcypt.hash(val, 10);
    return hash;
  })
];


exports.validatorLogin = [
  body('email').isEmail().withMessage('Format email invalid!!'),
  body('password').isLength({min: 8})
    .withMessage('Password must be 8 characters')
];