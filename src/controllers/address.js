const response = require('../helpers/standartResponse');
const addressModel = require('../models/addressModel');
const{LIMIT_DATA}= process.env;

exports.getAllAddress = (req, res)=>{
  const {seacrh_by='address', search='', sortBy='id', sorting='ASC', limit=parseInt(LIMIT_DATA), page=1}= req.query;

  const offset = (page - 1) * limit;

  addressModel.getAllAddress(seacrh_by ,search, sortBy, sorting, limit, offset, (err, results)=>{
    // console.log(err);
    // console.log(res);
    if(results.length<1){
      return res.redirect('/404');
    }
    const pageInfo = {};
    addressModel.countAllAddress(seacrh_by, search, (err, totalData)=>{
      pageInfo.totalData= totalData;
      pageInfo.totalpage= Math.ceil(totalData/limit);
      pageInfo.currentpage= parseInt(page);
      pageInfo.nextPage= pageInfo.currentpage < pageInfo.totalpage ? pageInfo.currentpage + 1 : null;
      pageInfo.prevpage= pageInfo.currentpage > 1 ? pageInfo.currentpage - 1 : null;
      console.log('coba');
      return response(res, 'list all address', results, pageInfo);
    });
  });
};

//CREATE
exports.createAddress = (req, res)=>{
  addressModel.createAddress(req.body, (err, results)=>{
    console.log(err);
    if(err){
      return response(res, `Failed to update ${err.message}`, null,null,400);
    }
    else{
      return response(res, 'Create address succesfully', results[0]);
    }
  });
};

//UPDATE
exports.updateAddress = (req, res)=>{
  const {id}=req.params;
  console.log(req.body);
  addressModel.updateAddress(id,  req.body, (err, results)=>{
    if(err){
      return response(res, `Failed to update ${err.message}`, null,null,400);
    }
    else{
      console.log(results);
      return response(res, 'Update address succesfully', results.rows[0]);
    }
  });
};

//DELETE
exports.deleteProfiles = (req, res)=>{
  const {id}=req.params;
  console.log(id);
  addressModel.deleteAddress(id, (results)=>{
    return response(res, 'Delete address successfully', results[0]);
  });
};