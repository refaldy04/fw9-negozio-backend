const { body } = require('express-validator');

//profile
exports.chatValidator = [
  body('date').isISO8601().withMessage('Date format invalid (ISO8601)'),
];
