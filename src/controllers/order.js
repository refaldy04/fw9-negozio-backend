const { prisma } = require('@prisma/client');
const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');
const orderModel = require('../models/order');


//create order
exports.createOrder = async (req, res) => {
  try {
    const createPaymentMethod = await orderModel.createOrderModel(req.body);
    return response(res, 'Success created new Order', createPaymentMethod);
  } catch (error) {
    return errorResponse(error, res);
  }
};


//create order header
exports.createOrderHeader = async (req, res) => {
  const id = req.authUser.id;
  try {
    const createPaymentMethod = await orderModel.createOrderHeaderModel(id, req.body);
    return response(res, 'Success created new Order Header', createPaymentMethod);
  } catch (error) {
    return errorResponse(error, res);
  }
};


//create new order
exports.createNewOrder = async (req, res)=>{
  const id = req.authUser.id;
  try{
    const order = await orderModel.createNewOrder(id);
    return response(res, 'Success created new Order', order);
  }catch(err){
    return errorResponse(err, res);
  }
};

exports.getNewOrder = async (req, res)=>{
  const {id_order} = req.params;
  try{
    const order = await orderModel.getNewOrder(id_order);
    return response(res, 'Success created new Order', order);
  }catch(err){
    return errorResponse(err, res);
  }
};

//create new transaction
exports.createNewTransaction = async(req, res)=>{
  const id = req.authUser.id;
  try {
    const transaction = await orderModel.createNewTransaction(id, req.body);
    return response(res, 'Success created new Order', transaction);
  } catch (error) {
    return errorResponse(error, res);
  }
};

exports.createPayment = async(req, res)=>{
  const payment = await orderModel.createNewPayment();
  const id_payment = payment.id;
  const {order_id}= req.params;
  await orderModel.updateTransaction(order_id, id_payment);
  return response(res, 'Success created new Order', payment);
};
