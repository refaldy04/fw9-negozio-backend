const {body} = require('express-validator');
const brcypt = require('bcrypt');

exports.createClientValidator = [
  body('username').isLength({min: 6}).withMessage('Username must be 6 characters or more'),
  body('email').isEmail().withMessage('Format email is invalid'),
  body('password').isLength({min: 8}).withMessage('Password must be 8 character').customSanitizer(async (val) =>{
    const hash = await brcypt.hash(val, 10);
    return hash;
  })
];

