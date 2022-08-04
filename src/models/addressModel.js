const db = require('../helpers/db');
const {LIMIT_DATA}=process.env;

//get all
exports.getAllAddress = (search_by, keyword, sortBy, sorting, limit=parseInt(LIMIT_DATA), offset=0,cb)=>{
  db.query(`SELECT * FROM addresses WHERE ${search_by} LIKE '%${keyword}%' ORDER BY ${sortBy} ${sorting} limit $1 offset $2`, [limit, offset], (err, res)=>{
    // console.log(res);
    cb(err, res.rows);
  });
};

//count 
exports.countAllAddress = (search_by, keyword, cb)=>{
  db.query(`SELECT * FROM addresses WHERE ${search_by} LIKE '%${keyword}%'`, (err, res)=>{
    cb(err, res.rowCount);
  });
};

//create
exports.createAddress=(data, cb)=>{
  const q = 'INSERT INTO addresses(address, postal_code, city, address_name, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const val = [data.address, data.postal_code, data.city, data.address_name, data.user_id];
  db.query(q, val, (err, res)=>{
    //console.log(res);
    if(res){
      //console.log(res);
      cb(err, res);
    }else{
      cb(err); 
    }
    // cb(res.rows);
  });
};

//update
exports.updateAddress=(id, data, cb)=>{
  let val = [id];
  const filtered = {};
  const obj ={ 
    address:data.address, 
    postal_code: data.postal_code, 
    city: data.city,
    address_name: data.address_name,
    user_id: data.user_id
  };
  for(let x in obj){
    if(obj[x]!==null){
      if(obj[x]!==undefined){
        console.log(obj[x]);
        filtered[x]=obj[x];
        val.push(obj[x]);
      }
    }
  }
  console.log(val);
  const key = Object.keys(filtered);
  const finalResult = key.map((o, ind)=>`${o}=$${ind+2}`);
  console.log(finalResult);
  const q = `UPDATE addresses SET ${finalResult} WHERE id=$1 RETURNING *`;
  db.query(q, val, (err, res)=>{
    //console.log(err);
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
    // cb(res.rows);
  });
};

//delete
exports.deleteAddress=(id,  cb)=>{
  console.log(id);
  const q = 'DELETE FROM addresses WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res)=>{
    cb(res.rows);
  });
};