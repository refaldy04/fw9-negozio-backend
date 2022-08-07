const response = require('../helpers/standardResponse');
const productModel = require('../models/productModel');

exports.createProduct = async (req, res) => {
  const currentUser = req.authUser;
  let picture = '';
  if(req.files){
    picture = req.files;
  }
  const product = await productModel.createProductWithOption2(currentUser.id, picture, req.body);
  return response(res, 'Succress add new product.', product);
};

exports.getAllProductsUser = async (req, res) => {
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
  const currentUser = req.authUser;
  const pageInfo = {};

  const product = await productModel.getProductsUser(offset, limit, sortBy, typeSort, search,currentUser.id);
  if(product?.length<1){
    return response(res, 'Failed to get data. Data is empty', null, null, 400);
  } else {
    const countProduct = await productModel.countProductSelected(search);
    pageInfo.totalDatas = countProduct;
    pageInfo.pages = Math.ceil(countProduct/limit);
    pageInfo.currentPage = parseInt(page);
    pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
    pageInfo.nextPage = pageInfo.currentPage < pageInfo.pages ? pageInfo.currentPage + 1 : null;
    return response(res, 'Success get product.', product, pageInfo);
  }
};



exports.updateProduct = async (req, res) => {
  const {idProduct} = req.params;
  let picture = '';
  if(req.file){
    picture = req.file.filename;  
  }
  const product = await productModel.updateProductUser(parseInt(idProduct,10), picture, req.body);
  return response(res, 'Success update product.', product);
};

exports.updateProductOption = async (req, res) => {
  const {idProduct, idOption} = req.params;
  let picture = '';
  if(req.file){
    picture = req.file.filename;  
  }
  const productOption = await productModel.updateProductOption(parseInt(idOption, 10), picture, req.body);
  return response(res, 'Success update product option.', productOption);
};