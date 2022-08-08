// const { v4: uuidv4 } = require('uuid');
// console.log('jalan');
// console.log(uuidv4());

const prisma = require('../helpers/prisma');
const { v4: uuidv4 } = require('uuid');

// const uuid= uuidv4();

// const data = [
//   { name: 'Bob', email: 'bob@prisma.io' , order_code: uuid},
//   { name: 'Bobo', email: 'bob@prisma.io' , order_code: uuid}, // Duplicate unique key!
//   { name: 'Yewande', email: 'yewande@prisma.io' , order_code: uuid},
//   { name: 'Angelique', email: 'angelique@prisma.io' , order_code: uuid},
// ];

// console.log(data);


//create order
exports.createOrderModel = async (data) => {
  const code= uuidv4();
  data.amount = parseInt(data.amount);
  data.address_id= parseInt(data.address_id);
  data.product_option_id= parseInt(data.product_option_id);
  console.log(data);
  const order = await prisma.order.update({
    where:{

    }
  });
  return order;
};


//create order header
// exports.createOrderHeaderModel = async (id, data) => {
//   data.order_code= uuidv4();
//   data.user_id= id;
//   data.payment_id = parseInt(data.payment_id);
//   data.status = parseInt(data.status);
//   const order = await prisma.order_header.create({
//     data:{
//       ...data,
//       order:{
//         create:{}
//       } 
//     },
//     include:{
//       order: true
//     }
//   });
//   return order;
// };



//create bag
//create order
exports.createOrderModel = async (data) => {
  data.amount = parseInt(data.amount);
  data.address_id= parseInt(data.address_id);
  data.product_option_id= parseInt(data.product_option_id);
  console.log(data);
  const order = await prisma.order.update({
    where:{

    }
  });
  return order;
};


//new order
exports.createNewOrder= async(user_id)=>{
  const order = await prisma.order.create({
    data:{
      user_id:user_id
    }
  });
  return order;
}; 

exports.getNewOrder= async(order_id)=>{
  const order = await prisma.order.findMany({
    where:{
      id:order_id
    }
  });
  return order;
};

//new transaksi
exports.createNewTransaction = async(user_id, data)=>{
  if(data.payment_id === null){
    data.status = 1;
  }else{
    data.status= 2;
  }
  if(data.product_id === null){
    data.status = 3;
  }
  if(data.order_id === null){
    data.status = 4;
  }
  console.log(data.payment_id);
  const transaction = await prisma.order_header.create({
    data:{
      address_id: parseInt(data.address_id),
      order_id: parseInt(data.order_id),
      product_id: parseInt(data.product_id),
      payment_id: data.payment_id!==undefined? parseInt(data.payment_id) : null,
      user_id: user_id,
      status: data.status
    }
  });
  return transaction;
};

//
exports.createNewPayment= async()=>{
  const order = await prisma.payment.create({
    data:{
      is_payment:true,
    }
  });
  return order;
};

//
exports.updateTransaction = async(order_id, payment_id)=>{
  const transaction = await prisma.order_header.updateMany({
    where:{
      order_id: order_id
    },
    data:{
      payment_id: payment_id
    }
  });
  return transaction;
};