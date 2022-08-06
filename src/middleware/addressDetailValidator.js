const { body } = require("express-validator");

exports.addressDetailValidator = [
  body("address_recipient_phone")
    .isMobilePhone(["id-ID"])
    .withMessage("input vailed"),
  //   body('gender').contains('L'||'P').withMessage('gender is only L or P').optional({nullable:true}),
];
