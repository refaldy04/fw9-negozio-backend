const db = require('../helpers/db');
const {LIMIT_DATA}=process.env;

//get all
exports.getAllProfiles = (search_by, keyword, sortBy, sorting, limit=parseInt(LIMIT_DATA), offset=0,cb)=>{
  db.query(`SELECT * FROM profiles WHERE ${search_by} LIKE '%${keyword}%' ORDER BY ${sortBy} ${sorting} limit $1 offset $2`, [limit, offset], (err, res)=>{
    // console.log(res);
    cb(err, res.rows);
  });
};

//count 
exports.countAllProfiles = (search_by, keyword, cb)=>{
  db.query(`SELECT * FROM profiles WHERE ${search_by} LIKE '%${keyword}%'`, (err, res)=>{
    cb(err, res.rowCount);
  });
};

//create
exports.createProfiles=(picture, data, cb)=>{
  const val=[];
  console.log(val);
  const filtered = {};
  const obj ={picture, user_id:data.user_id, name:data.name, gender:data.gender, birth_of_date:data.birth_of_date, address_id: data.address_id, store_description: data.store_description};
  for(let x in obj){
    if(obj[x]!==null){
      if(obj[x]!==undefined){
        console.log(obj[x]);
        filtered[x]=obj[x];
        val.push(obj[x]);
      }
    }
  }
  const key = Object.keys(filtered);
  const finalResult = key.map((o, ind)=>`$${ind+1}`);
  const q = `INSERT INTO profiles(${key}) VALUES (${finalResult}) RETURNING *`;
  db.query(q, val, (err, res)=>{
    console.log(err);
    if(res){
      cb(err, res.rows);
    }else{
      cb(err);
    }
    //cb(res.rows);
  });
};

//update
exports.updateProfiles=(id, picture, data, cb)=>{
  let val = [id];
  const filtered = {};
  const obj ={picture, 
    name:data.name, 
    address_id: data.address_id, 
    store_description: data.store_description};
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
  const q = `UPDATE profiles SET ${finalResult} WHERE user_id=$1 RETURNING *`;
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
exports.deleteProfiles=(id,  cb)=>{
  console.log(id);
  const q = 'DELETE FROM profiles WHERE user_id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res)=>{
    cb(res.rows);
  });
};