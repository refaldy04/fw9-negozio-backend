const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');
const userModel = require('../models/usersModel');

exports.getAllUsers2 = async (req, res) => {
  
  const {search='',searchBy, sortBy, sortType, limit=parseInt(process.env.LIMIT_DATA), page=1} = req.query;
  const type = parseInt(sortType);
  const offset = (page-1) * limit;
  let typeSort='';
  if(type == 0){
    typeSort = 'asc';
  } else {
    typeSort = 'desc';
  }
  if(!type){
    typeSort = 'asc';
  }

  const pageInfo = {};

  const user = await userModel.getAllUsers2(offset, parseInt(limit), searchBy, search, sortBy, typeSort);
  user.map((el)=> {
    if(el.gender === false){
      el.gender = 'female';
    } else {
      el.gender = 'male';
    }
    if(el.role === 1){
      el.role = 'customer';
    } else if (el.role === 2) {
      el.role = 'seller';
    } else {
      el.role = 'admin';
    }
  });
  if(user?.length < 1) {
    return response(res, 'Users not found!!!', null, null, 404);
  } else {
    const countUser = await userModel.countGetAllUsers2(searchBy, search);
    pageInfo.totalDatas = countUser;
    pageInfo.pages = Math.ceil(countUser/limit);
    pageInfo.currentPage = parseInt(page);
    pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
    pageInfo.nextPage = pageInfo.currentPage < pageInfo.pages ? pageInfo.currentPage + 1 : null;
    return response(res, 'Success selected users', user, pageInfo);
  }
};

exports.createUser = async (req, res) => {
  try {
    const createUser = await userModel.createUserModel(req.body);
    if(createUser.role === 1){
      createUser.role = 'customer';
    } else if (createUser.role === 2) {
      createUser.role = 'seller';
    } else {
      createUser.role = 'admin';
    }
    return response(res, 'Success created new users', createUser);
  } catch (error) {
    // console.log(error.message.includes('Unique constraint'));
    // console.log(error.message.includes('email'));
    // console.log(error.code === 'P2002');
    return errorResponse(error, res);
  }
};

exports.updateUser = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await userModel.updateUserModel(id, req.body);
    if(user.role === 1){
      user.role = 'customer';
    } else if (user.role === 2) {
      user.role = 'seller';
    } else {
      user.role = 'admin';
    }
    if(user.gender===true){
      user.gender = 'male';
    } else {
      user.gender = 'female';
    }
    return response(res, 'Update user is successfully', user);
  } catch (error) {
    return errorResponse(error, res);
  }
};

exports.deleteUser = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await userModel.deleteUserModel(id);
    if(user.role === 1){
      user.role = 'customer';
    } else if (user.role === 2) {
      user.role = 'seller';
    } else {
      user.role = 'admin';
    }
    if(user.gender===true){
      user.gender = 'male';
    } else {
      user.gender = 'female';
    }
    return response(res, 'Deleted user is successfully', user);
  } catch (error) {
    return errorResponse(error, res);
  }
};