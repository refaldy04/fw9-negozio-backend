const response = require('../helpers/standartResponse');
const userModel = require('../models/usersModel');

exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((err, result)=>{
    return response(res, 'test msg', result.rows);
  });
};

