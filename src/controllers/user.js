const userModel = require('../models/usersModel');

exports.getAll = async (req, res) => {
  const user = await userModel.getAll();
  return res.json({
    success: true,
    message: 'List users',
    resuults: user
  });
};