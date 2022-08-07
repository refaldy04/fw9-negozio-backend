const prisma = require('../helpers/prisma');

exports.createProductWithOption = async (idUser, dataReq) => {
  
  const options = await prisma.product_options.create({
    data:{
      products:{
        create: {
          name: dataReq.name,
          user_id: idUser,
          product_picture: dataReq.product_picture,
          stock: parseInt(dataReq.stock),
          unit_price: parseInt(dataReq.unit_price),
        }
      },
      options: {
        create: {
          option_name: dataReq.option_name[0],
          option_condition: (dataReq.option_condition[0]==='new' ? true : false),
          option_size: parseInt(dataReq.option_size[0]),
          option_color:parseInt(dataReq.option_color[0]),
          option_product_picture: dataReq.option_product_picture[0]
        }
      }
    },
  });
  console.log(options);
};

exports.createProductWithOption2 = async (idUser, dataReq) => {
  const product = await prisma.products.create({
    data: {
      name: dataReq.name,
      user_id: idUser,
      product_picture: dataReq.product_picture,
      stock: parseInt(dataReq.stock),
      unit_price: parseInt(dataReq.unit_price),
      options: {
        create: [
          {
            option_name: dataReq.option_name[0],
            option_condition: (dataReq.option_condition[0]==='new' ? true : false),
            option_size: parseInt(dataReq.option_size[0]),
            option_color:parseInt(dataReq.option_color[0]),
            option_product_picture: dataReq.option_product_picture[0]
          },
          {
            option_name: dataReq.option_name[1],
            option_condition: (dataReq.option_condition[1]==='new' ? true : false),
            option_size: parseInt(dataReq.option_size[1]),
            option_color:parseInt(dataReq.option_color[1]),
            option_product_picture: dataReq.option_product_picture[1]
          }, 
          {
            option_name: dataReq.option_name[2],
            option_condition: (dataReq.option_condition[2]==='new' ? true : false),
            option_size: parseInt(dataReq.option_size[2]),
            option_color:parseInt(dataReq.option_color[2]),
            option_product_picture: dataReq.option_product_picture[2]
          },
          {
            option_name: dataReq.option_name[3],
            option_condition: (dataReq.option_condition[3]==='new' ? true : false),
            option_size: parseInt(dataReq.option_size[3]),
            option_color:parseInt(dataReq.option_color[3]),
            option_product_picture: dataReq.option_product_picture[3]
          }
        ]
      }
    },
    include: {
      options: true
    }
  });
  return product;
};

exports.getProductsUser = async (idUser) => {
  const getProduct = await prisma.products.findMany({
    where: {
      user_id: idUser
    },
    include: {
      options: true
    }
  });
  return getProduct;
};