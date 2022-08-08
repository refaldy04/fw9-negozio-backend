const prisma = require('../helpers/prisma');
const {PATH_ASSETS_IMAGE: imgUrl} = process.env;

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

exports.createProductWithOption2 = async (idUser, picture, dataReq) => {
  let picture_product;
  let option_picture;
  
  if(picture.length<1){
    picture_product = picture?.product_picture[0].filename;
    option_picture = picture?.option_product_picture.map(e=>e.filename);
  }
  
  const product = await prisma.products.create({
    data: {
      name: dataReq.name,
      // user_id: parseInt(idUser),
      product_picture: `${imgUrl}/${picture_product}`,
      stock: parseInt(dataReq.stock),
      unit_price: parseInt(dataReq.unit_price),
      options: {
        create: [
          {
            option_name: dataReq.option_name[0],
            option_condition: (dataReq.option_condition[0]==='new' ? true : false),
            option_size: parseInt(dataReq.option_size[0]),
            option_color:parseInt(dataReq.option_color[0]),
            option_product_picture: `${imgUrl}/${option_picture !==undefined ? option_picture[0] : ''}`
          },
          {
            option_name: dataReq.option_name[1],
            option_condition: (dataReq.option_condition[1]==='new' ? true : false),
            option_size: parseInt(dataReq.option_size[1]),
            option_color:parseInt(dataReq.option_color[1]),
            option_product_picture: `${imgUrl}/${option_picture !==undefined ? option_picture[1] : ''}`
          }, 
          {
            option_name: dataReq.option_name[2],
            option_condition: (dataReq.option_condition[2]==='new' ? true : false),
            option_size: parseInt(dataReq.option_size[2]),
            option_color:parseInt(dataReq.option_color[2]),
            option_product_picture: `${imgUrl}/${option_picture !==undefined ? option_picture[2] : ''}`
          },
          {
            option_name: dataReq.option_name[3],
            option_condition: (dataReq.option_condition[3]==='new' ? true : false),
            option_size: parseInt(dataReq.option_size[3]),
            option_color:parseInt(dataReq.option_color[3]),
            option_product_picture: `${imgUrl}/${option_picture !==undefined ? option_picture[3] : ''}`
          }
        ]
      },
      users: {
        connect: {
          id: idUser
        }
      }
    },
    include: {
      options: true
    }
  });
  return product;
};

exports.getProductsUser = async (offset, limit, sortBy, sortType, keyword, idUser) => {
  const getProduct = await prisma.products.findMany({
    skip: offset,
    take: limit,
    where: {
      user_id: idUser, 
      AND: {
        name:{
          contains: `${keyword}`
        }
      }
    },
    orderBy: {
      ...(sortBy === 'name' ? {name : `${sortType}`} : sortBy === 'price' ? {unit_price : `${sortType}`} : sortBy==='stock' ? {stock : `${sortType}`}: {}),
    },
    include: {
      options: true
    }
  });
  return getProduct;
};

exports.countProductSelected = async (keyword) => {
  const counData = await prisma.products.count({
    where: {
      name: {
        contains: `${keyword}`
      }
    }
  });
  return counData;
};

exports.updateProductUser = async (idProduct, picture, data) => {
  if(picture!=''){
    data.product_picture = `${imgUrl}/${picture}`;
  }
  data.unit_price =parseInt(data.unit_price);
  data.stock = parseInt(data.stock);
  console.log(data);
  const product = await prisma.products.update({
    where: {
      id: idProduct
    },
    data
  });
  return product;
};

exports.updateProductOption = async (idOption, picture, data) => {
  if(picture!=''){
    data.option_product_picture = `${imgUrl}/${picture}`;
  }
  if(data.option_condition==='baru'){
    data.option_condition = true;
  } else if(data.option_condition==='bekas'){
    data.option_condition = false;
  }
  data.option_size=parseInt(data.option_size);
  data.option_color=parseInt(data.option_color);
  const productOption = await prisma.options.update({
    where: {
      id: idOption,
    },
    data
  });
  return productOption;
};