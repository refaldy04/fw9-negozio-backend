const response = require('../helpers/standartResponse');
const userModel = require('../models/usersModel');

exports.getAllUserCustomers = (req, res) => {
  const {search='',searchBy, sortBy, sortType, limit=parseInt(process.env.LIMIT_DATA), page=1} = req.query;
  const type = parseInt(sortType);
  const offset = (page-1) * limit;
  let typeSort='';
  if(type == 0){
    typeSort = 'ASC';
  } else {
    typeSort = 'DESC';
  }
  if(!type){
    typeSort = 'ASC';
  }
  const pageInfo = {};
  userModel.getAllUserCustomers(search, searchBy, sortBy, typeSort, limit, offset, (err, result)=>{
    console.log(err);
    if(result.length < 1){
      return res.redirect('/404');
    }
    userModel.countAllUserCustomers(search, searchBy, (err, infoData)=>{
      pageInfo.totalDatas = infoData;
      pageInfo.pages = Math.ceil(infoData/limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.pages ? pageInfo.currentPage + 1 : null;
      return response(res, 'test msg', result.rows, pageInfo);
    });
  });
};

exports.getAllUserSellers = (req, res) => {
  const {search='',searchBy, sortBy, sortType, limit=parseInt(process.env.LIMIT_DATA), page=1} = req.query;
  const type = parseInt(sortType);
  const offset = (page-1) * limit;
  let typeSort='';
  if(type == 0){
    typeSort = 'ASC';
  } else {
    typeSort = 'DESC';
  }
  if(!type){
    typeSort = 'ASC';
  }
  const pageInfo = {};
  userModel.getAllUserSellers(search, searchBy, sortBy, typeSort, limit, offset, (err, result)=>{
    console.log(err);
    if(result.length < 1){
      return res.redirect('/404');
    }
    userModel.countAllUserSellers(search, searchBy, (err, infoData)=>{
      pageInfo.totalDatas = infoData;
      pageInfo.pages = Math.ceil(infoData/limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.pages ? pageInfo.currentPage + 1 : null;
      return response(res, 'test msg', result.rows, pageInfo);
    });
  });
};

exports.getAllUserAdmins = (req, res) => {
  const {search='',searchBy, sortBy, sortType, limit=parseInt(process.env.LIMIT_DATA), page=1} = req.query;
  const type = parseInt(sortType);
  const offset = (page-1) * limit;
  let typeSort='';
  if(type == 0){
    typeSort = 'ASC';
  } else {
    typeSort = 'DESC';
  }
  if(!type){
    typeSort = 'ASC';
  }
  const pageInfo = {};
  userModel.getAllUserAdmins(search, searchBy, sortBy, typeSort, limit, offset, (err, result)=>{
    console.log(err);
    if(result.length < 1){
      return res.redirect('/404');
    }
    userModel.countAllUserAdmins(search, searchBy, (err, infoData)=>{
      pageInfo.totalDatas = infoData;
      pageInfo.pages = Math.ceil(infoData/limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.pages ? pageInfo.currentPage + 1 : null;
      return response(res, 'test msg', result.rows, pageInfo);
    });
  });
};

exports.createUserCustomer = (req, res) => {
  userModel.createUserCustomer(req.body, (err, result)=>{
    // console.log(err);
    return response(res, 'Success created new users', result.rows);
  });
};

exports.updateUserCustomer = (req, res) => {
  const {id} = req.params;
  userModel.updateUsers(req.body, id, (err, result)=>{
    // console.log(err);
    return response(res, 'Success for update user', result.rows);
  });
};

exports.deleteUser = (req, res) => {
  const {id} = req.params;
  userModel.deleteUser(id, (err, result)=>{
    return response(res, 'Success deleted user', result.rows);
  });
};