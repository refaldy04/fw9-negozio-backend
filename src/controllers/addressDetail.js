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

//   const validation = validationResult(req);
//   if (!validation.isEmpty()) {
//     return response(res, "Error occured", validation.array(), 400);
//   }
// chatModels.createChat(req.body, (err, result) => {
//   if (err) {
//     return errorResponse(err, res);
//   } else {
//     return response(res, "Chat created", result);
//   }
// });

exports.editChat = (req, res) => {
  const { id } = req.params;

  //   const validation = validationResult(req);
  //   if (!validation.isEmpty()) {
  //     return response(res, "Error occured", validation.array(), 400);
  //   }

  chatModels.editChat(id, req.body, (err, result) => {
    if (err) {
      console.log(err);
      return errorResponse(err, res);
    } else {
      return response(res, 'Edit chat successfully', result);
    }
  });
};

exports.deleteChat = (req, res) => {
  const { id } = req.params;
  chatModels.deleteChat(id, (result) => {
    return response(res, 'Profile deleted', result[0]);
  });
};
