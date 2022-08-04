const userModel = require('../models/usersModel');

exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((err, result)=>{
    console.log(result.rows);
  });
};