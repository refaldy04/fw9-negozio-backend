const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');
const chatContentModel = require('../models/chatContent');

exports.getAllChat = async (req, res) => {
  
  const {search='content',searchBy, sortBy, sortType, limit=parseInt(process.env.LIMIT_DATA), page=1} = req.query;
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

  const chat = await chatContentModel.getAllChat(offset, parseInt(limit), searchBy, search, sortBy, typeSort);
  if(chat?.length < 1) {
    return response(res, 'Users not found!!!', null, null, 404);
  } else {
    const countChat = await chatContentModel.countGetAllChat(searchBy, search);
    pageInfo.totalDatas = countChat;
    pageInfo.pages = Math.ceil(countChat/limit);
    pageInfo.currentPage = parseInt(page);
    pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
    pageInfo.nextPage = pageInfo.currentPage < pageInfo.pages ? pageInfo.currentPage + 1 : null;

    return response(res, 'Success selected chat', chat, pageInfo);
  }
};

//create chat
exports.createChatContent = async (req, res) => {
  try {
    const createChatContent = await chatContentModel.createChatContentModel(req.body);
    return response(res, 'Success created new chat', createChatContent);
  } catch (error) {
    return errorResponse(error, res);
  }
};

//update chat
exports.updateChatContent = async (req, res) => {
  const {id} = req.params;
  try {
    const updateChatContent = await chatContentModel.updateChatContentModel(id, req.body);
    return response(res, 'Success update new chat', updateChatContent);
  } catch (error) {
    return errorResponse(error, res);
  }
};

//delete chat
exports.deleteChatContent = async (req, res) => {
  const {id} = req.params;
  const data= {is_deleted: true};
  try {
    const deleteChatContent = await chatContentModel.deleteChatContentModel(id, data);
    return response(res, 'Success delete chat', deleteChatContent);
  } catch (error) {
    return errorResponse(error, res);
  }
};