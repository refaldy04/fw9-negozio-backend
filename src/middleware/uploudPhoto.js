const upload = require('../helpers/upload').fields([{name: 'product_picture'}, {name: 'option_product_picture'}]);
const response = require('../helpers/standartResponse');

const uploadFile = (req, res, next)=>{
  upload(req, res, function (err){
    if(err){
      return response(res, `Error ${err.message}`, null, null, 400);
    }
    next();
  });
};

module.exports=uploadFile;