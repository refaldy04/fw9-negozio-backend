const response = require('../helpers/standartResponse');
const profilesModel = require('../models/profilesModel');
const{LIMIT_DATA}= process.env;

exports.getAllProfiles = (req, res)=>{
  const {seacrh_by='name', search='', sortBy='id', sorting='ASC', limit=parseInt(LIMIT_DATA), page=1}= req.query;

  const offset = (page - 1) * limit;

  profilesModel.getAllProfiles(seacrh_by ,search, sortBy, sorting, limit, offset, (err, results)=>{
    // console.log(err);
    // console.log(res);
    if(results.length<1){
      return res.redirect('/404');
    }
    const pageInfo = {};
    profilesModel.countAllProfiles(seacrh_by, search, (err, totalData)=>{
      pageInfo.totalData= totalData;
      pageInfo.totalpage= Math.ceil(totalData/limit);
      pageInfo.currentpage= parseInt(page);
      pageInfo.nextPage= pageInfo.currentpage < pageInfo.totalpage ? pageInfo.currentpage + 1 : null;
      pageInfo.prevpage= pageInfo.currentpage > 1 ? pageInfo.currentpage - 1 : null;
      console.log('coba');
      return response(res, 'list all profiles', results, pageInfo);
    });
  });
};

//CREATE
exports.createProfiles = (req, res)=>{
  let filename = null;
  if (req.file){
    filename = req.file.filename;
  }
  profilesModel.createProfiles(filename, req.body, (err, results)=>{
    console.log(err);
    if(err){
      return response(res, `Failed to update ${err.message}`, null,null,400);
    }
    else{
      return response(res, 'Create profile succesfully', results[0]);
    }
  });
};

//UPDATE
exports.updateProfiles = (req, res)=>{
  const {id}=req.params;
  console.log(req.body);
  //console.log(req.file);
  let filename = null;
  if (req.file){
    filename = req.file.filename;
  }
  profilesModel.updateProfiles(id, filename, req.body, (err, results)=>{
    //console.log(req.file);
    //console.log(err);
    if(err){
      return response(res, `Failed to update ${err.message}`, null,null,400);
    }
    else{
      console.log(results);
      return response(res, 'Update profile succesfully', results.rows[0]);
    }
  });
};

//DELETE
exports.deleteProfiles = (req, res)=>{
  const {id}=req.params;
  console.log(id);
  profilesModel.deleteProfiles(id, (results)=>{
    return response(res, 'Delete profile successfully', results[0]);
  });
};