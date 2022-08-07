const prisma = require('../helpers/prisma');
const {PATH_ASSETS_IMAGE: imgUrl} = process.env;


//get all payment
exports.getAllPaymentMethod = async (offset, limit, searchBy, keyword, sortBy, sortType) => {
  const keywordContains = {contains: `${keyword}`};
  const payment = await prisma.payment.findMany({
    skip: offset,
    take: limit,
    where: {
      ...(searchBy === 'payment_name' ? {payment_name : keywordContains} : {}),
    },
    orderBy: {
      ...(sortBy === 'id' ? {id : `${sortType}`} : {}),
    },
  });
  return payment;
};

//count all payment
exports.countGetAllPaymentMethod = async (searchBy, keyword) => {
  const keywordContains = {contains: `${keyword}`};
  const payment = await prisma.payment.count({
    where:{
      ...(searchBy === 'payment_name' ? {payment_name : keywordContains} : {}),      
    },
  });
  return payment;
};

//create payment
exports.createPaymentMethodModel = async (logo, data) => {
  if(logo!=''){
    data.payment_logo = `${imgUrl}/${logo}`;
  }
  console.log(data);
  const payment = await prisma.payment.create({
    data
  });
  return payment;
};

//update chat
exports.updatePaymentMethodModel = async (id, logo, data) => {
  if(logo!=''){
    data.payment_logo = `${imgUrl}/${logo}`;
  }
  const paymentId = parseInt(id);
  console.log(data);
  const payment = await prisma.payment.update({
    where: {id: paymentId}
    ,data
  });
  return payment;
};

//delete chat
exports.deletePaymentMethodModel = async (id) => {
  const paymentId = parseInt(id);
  // console.log(data);
  const payment = await prisma.payment.delete({
    where: {id: paymentId}
  });
  return payment;
};

exports.deleteUserModel = async (id) => {
  const idUser = parseInt(id, 10);
  const user = await prisma.users.delete({
    where: {id: idUser}
  });
  return user;
};