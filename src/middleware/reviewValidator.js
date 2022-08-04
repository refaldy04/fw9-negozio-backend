const { body } = require("express-validator");

exports.reviewValidator = [
  body("name").isInt({ min: 0, max: 5 }).withMessage("input vailed"),
  //   body('gender').contains('L'||'P').withMessage('gender is only L or P').optional({nullable:true}),
];
