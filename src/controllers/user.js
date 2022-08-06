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