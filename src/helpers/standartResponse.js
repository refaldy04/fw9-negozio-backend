const response = (res, message, results, info, status=200) =>{
  let success = true;
  if(status>=400){
    success=false;
  }
  const data = {
    success, message:message,
  };
  if(info){
    data.info=info;
  }
  if(results){
    data.results = results;
  }

  return res.status(status).json(data);
};
module.exports = response;