const addressDetailModels = require('../models/addressDetail');
const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');

exports.getAllAddressDetail = async (req, res) => {
  console.log('a');
  //   const { limit = 4 } = req.query;
  const addressDetail = await addressDetailModels.getAllAddressDetail();
  if(addressDetail?.length < 1){
    return response(res, 'You dont have addresses saved.', null);
  } else {
    return response(res, 'This is you addresses.', addressDetail);
  }
};

exports.getAddressDetail = async (req, res) => {
  const { id } = req.params;
  const addressDetail = await addressDetailModels.getAddressDetail(id);
  if (addressDetail.length > 0) {
    return response(res, 'Details user', addressDetail[0]);
  } else {
    return response(res, 'Not found');
  }
};

exports.createAddressDetail = async (req, res) => {
  const addressDetail = await addressDetailModels.createAddressDetail(req.body);
  return response(res, 'Create detail address success', addressDetail);
};

exports.updateAddressDetail = async (req, res) => {
  const { id } = req.params;
  const addressDetail = await addressDetailModels.updateAddressDetail(
    id,
    req.body
  );
  return response(res, 'Edit address detail success', addressDetail);
};

exports.deleteAddressDetail = async (req, res) => {
  const { id } = req.params;
  const addressDetail = await addressDetailModels.deleteAddressDetail(id);
  return response(res, 'Delete Address Detail success', addressDetail);
};

