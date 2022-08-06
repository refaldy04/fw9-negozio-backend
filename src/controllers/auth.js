const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standartResponse');
const userModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const user = await userModel.createUserModel(req.body);
    if(user.role === 1){
      user.role = 'customer';
    } else if (user.role === 2) {
      user.role = 'seller';
    } else {
      user.role = 'admin';
    }
    return response(res, 'Success created new users', user);
  } catch (error) {
    return errorResponse(error, res);
  }
};

exports.loginUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await userModel.getProfileByEmailUser(email);
    if(user?.length < 1){
      return response(res, 'Email or password is incorrect.', null, null, 400);
    } else {
      const dataUser = user[0];
      bcrypt.compare(password, dataUser.password).then((checkPassword)=>{
        if(checkPassword){
          const token = jwt.sign({id: dataUser.id, email: dataUser.email, full_name: dataUser.full_name}, process.env.APP_SECRET || 'thisSecrectKey', {expiresIn: '3d'});
          return response(res, 'Login successfully', {token});
        } else {
          return response(res, 'Login failed !!! Email or password incorrect', null, null, 401);
        }
      }).catch((e)=>{
        return response(res, `Error: ${e.message}`, null, null, 404);
      });
    }
  } catch (error) {
    return errorResponse(error, res);
  }
};

exports.loginAsSeller = () => {};

