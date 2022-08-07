const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');
const paymentMethodModel = require('../models/paymentMethod');

exports.getAllPaymentMethod = async (req, res) => {
  
  const {search='payment_name',searchBy, sortBy, sortType, limit=parseInt(process.env.LIMIT_DATA), page=1} = req.query;
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

  const PaymentMethod = await paymentMethodModel.getAllPaymentMethod(offset, parseInt(limit), searchBy, search, sortBy, typeSort);
  if(PaymentMethod?.length < 1) {
    return response(res, 'Users not found!!!', null, null, 404);
  } else {
    const countPaymentMethod = await paymentMethodModel.countGetAllPaymentMethod(searchBy, search);
    pageInfo.totalDatas = countPaymentMethod;
    pageInfo.pages = Math.ceil(countPaymentMethod/limit);
    pageInfo.currentPage = parseInt(page);
    pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
    pageInfo.nextPage = pageInfo.currentPage < pageInfo.pages ? pageInfo.currentPage + 1 : null;

    return response(res, 'Success selected payment method', PaymentMethod, pageInfo);
  }
};

//create payment method
exports.createPaymentMethod = async (req, res) => {
  let payment_logo = '';
  if(req.file){
    payment_logo = req.file.filename;  
  }
  try {
    const createPaymentMethod = await paymentMethodModel.createPaymentMethodModel(payment_logo ,req.body);
    return response(res, 'Success created new payment method', createPaymentMethod);
  } catch (error) {
    return errorResponse(error, res);
  }
};

//update payment method
exports.updatePaymentMethod = async (req, res) => {
  let payment_logo = '';
  if(req.file){
    payment_logo = req.file.filename;  
  }
  const {id} = req.params;
  try {
    const updatePaymentMethod= await paymentMethodModel.updatePaymentMethodModel(id, payment_logo, req.body);
    return response(res, 'Success update payment method', updatePaymentMethod);
  } catch (error) {
    return errorResponse(error, res);
  }
};

//delete chat
exports.deletePaymentMethod = async (req, res) => {
  const {id} = req.params;
  try {
    const deletePaymentMethod = await paymentMethodModel.deletePaymentMethodModel(id);
    return response(res, 'Success delete Payment Method', deletePaymentMethod);
  } catch (error) {
    return errorResponse(error, res);
  }
};