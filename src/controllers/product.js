const response = require('../helpers/standardResponse');
const productModel = require('../models/productModel');

exports.createProduct = async (req, res) => {
  const currentUser = req.authUser;
  const product = await productModel.createProductWithOption2(currentUser.id, req.body);
  return response(res, 'Succress add new product.', product);
};

exports.getAllProductsUser = async (req, res) => {
  const currentUser = req.authUser;
  const product = await productModel.getProductsUser(currentUser.id);
  if(product?.length<1){
    return response(res, 'Failed to get data. Data is empty', null, null, 400);
  } else {
    return response(res, 'Success get product.', product);
  }
};