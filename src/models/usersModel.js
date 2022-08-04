const db = require('../helpers/db');

exports.getAllUserCustomers = (keyword,searchBy, sortBy, sortType, limit, offset, cb) => {
  const q = `SELECT id, username, email, role FROM users
  ${searchBy != null ? 
    (`WHERE ${searchBy==='username' ? 'username' : `${searchBy==='email'?'email' : ''}`} LIKE '%${keyword}%'`) : ''} 
    ORDER BY ${sortBy == null ? 'id DESC' : `${sortBy} ${sortType}`} LIMIT $1 OFFSET $2 `;
  const val = [limit, offset];
  db.query(q, val, (err, result)=>{
    cb(err, result);
  });
};

exports.countAllUserCustomers = (keyword, searchBy, cb) => {
  const q = `SELECT id, username, email, role FROM users
  ${searchBy != null ? 
    (`WHERE ${searchBy==='username' ? 'username' : `${searchBy==='email'?'email' : ''}`} LIKE '%${keyword}%'`) : ''} `;
  db.query(q, (err, result)=>{
    cb(err, result.rowCount);
  });
};

exports.createUserCustomer = (data, cb) => {
  const fieldTable = {
    'username': data.username,
    'email': data.email, 
    'password': data.password,
    'store_name': data.store_name,
    'phone_number': data.phone_number,
    'role': data.role
  };

  let val = [];
  let arg = [];
  const argObj = Object.keys(fieldTable);
  const valObj = Object.values(fieldTable);

  for (let data in valObj){
    if(valObj[data]!==undefined){
      arg.push(argObj[data]);
      val.push(valObj[data]);
    }
  }
  const argPosition = arg.map((el, index)=> `$${index+1}`);
  console.log(arg);
  console.log(val);
  console.log(argPosition);
  const q = `INSERT INTO users (${arg}) VALUES (${argPosition}) RETURNING id, username, email, role`;
  db.query(q, val, (err, result)=> {
    cb(err, result);
  });
};

exports.updateUsers = (data, id, cb) => {
  const fieldTable = {
    'username': data.username,
    'email': data.email, 
    'password': data.password,
    'store_name': data.store_name,
    'phone_number': data.phone_number,
    'role': data.role
  };

  let val = [];
  let arg = [];
  const argObj = Object.keys(fieldTable);
  const valObj = Object.values(fieldTable);

  for (let data in valObj){
    if(valObj[data]!==undefined){
      arg.push(argObj[data]);
      val.push(valObj[data]);
    }
  }
  const argPosition = arg.map((el, index)=> `${el}=$${index+1}`);
  console.log(arg);
  console.log(val);
  console.log(argPosition);

  const q = `UPDATE users SET ${argPosition} WHERE id=${id} RETURNING id, username, email, role`;
  db.query(q, val, (err, result)=> {
    cb(err, result);
  });
};

exports.deleteUser = (id, cb) => {
  const q = `DELETE FROM users WHERE id=${id} RETURNING id, username, email, role`;
  db.query(q, (err, result)=>{
    cb(err, result);
  });
};
