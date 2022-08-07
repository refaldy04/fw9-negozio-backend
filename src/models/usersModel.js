const db = require('../helpers/db');
const prisma = require('../helpers/prisma');
const {PATH_ASSETS_IMAGE: imgUrl} = process.env;

exports.getAllUserCustomers = (keyword,searchBy, sortBy, sortType, limit, offset, cb) => {
  const q = `SELECT id, username, email, role FROM users WHERE 
  ${searchBy != null ? 
    (`${searchBy==='username' ? 'username' : `${searchBy==='email'?'email' : ''}`} LIKE '%${keyword}%' AND`) : ''} role='customer' 
    ORDER BY ${sortBy == null ? 'id DESC' : `${sortBy} ${sortType}`} LIMIT $1 OFFSET $2 `;
  const val = [limit, offset];
  db.query(q, val, (err, result)=>{
    cb(err, result);
  });
};

exports.getAllUserAdmins = (keyword,searchBy, sortBy, sortType, limit, offset, cb) => {
  const q = `SELECT id, username, email, role FROM users WHERE 
  ${searchBy != null ? 
    (`${searchBy==='username' ? 'username' : `${searchBy==='email'?'email' : ''}`} LIKE '%${keyword}%' AND`) : ''} role='admin' 
    ORDER BY ${sortBy == null ? 'id DESC' : `${sortBy} ${sortType}`} LIMIT $1 OFFSET $2 `;
  const val = [limit, offset];
  db.query(q, val, (err, result)=>{
    cb(err, result);
  });
};

exports.getAllUserSellers = (keyword,searchBy, sortBy, sortType, limit, offset, cb) => {
  const q = `SELECT id, username, email, store_name, phone_number, role FROM users WHERE 
  ${searchBy != null ? 
    (`${searchBy==='username' ? 'username' : `${searchBy==='email'?'email' : `${searchBy==='store_name' ? 'store_name' : ''}`}`} LIKE '%${keyword}%' AND`) : ''} role='seller' 
    ORDER BY ${sortBy == null ? 'id DESC' : `${sortBy} ${sortType}`} LIMIT $1 OFFSET $2 `;
  const val = [limit, offset];
  db.query(q, val, (err, result)=>{
    cb(err, result);
  });
};

exports.countAllUserCustomers = (keyword, searchBy, cb) => {
  const q = `SELECT id, username, email, role FROM users WHERE
  ${searchBy != null ? 
    (`${searchBy==='username' ? 'username' : `${searchBy==='email'?'email' : ''}`} LIKE '%${keyword}%' AND`) : ''} role='customer' `;
  db.query(q, (err, result)=>{
    cb(err, result.rowCount);
  });
};
exports.countAllUserSellers = (keyword, searchBy, cb) => {
  const q = `SELECT id, username, email, role FROM users WHERE
  ${searchBy != null ? 
    (`${searchBy==='username' ? 'username' : `${searchBy==='email'?'email' : ''}`} LIKE '%${keyword}%' AND`) : ''} role='seller' `;
  db.query(q, (err, result)=>{
    cb(err, result.rowCount);
  });
};
exports.countAllUserAdmins = (keyword, searchBy, cb) => {
  const q = `SELECT id, username, email, role FROM users WHERE
  ${searchBy != null ? 
    (`${searchBy==='username' ? 'username' : `${searchBy==='email'?'email' : ''}`} LIKE '%${keyword}%' AND`) : ''} role='admin' `;
  db.query(q, (err, result)=>{
    cb(err, result.rowCount);
  });
};

exports.createUserCustomer = (data, cb) => {
  const fieldTable = {
    'username': data.username,
    'email': data.email, 
    'password': data.password,
    'store_name': data.store,
    'phone_number': data.phone,
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
  const q = `INSERT INTO users (${arg}) VALUES (${argPosition}) RETURNING *`;
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


exports.userRegister = (data, cb) =>{
  const fieldTable = {
    'username': data.username,
    'email': data.email, 
    'password': data.password,
    'store_name': data.store,
    'phone_number': data.phone,
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
  db.query('BEGIN', err => {
    if(err) {
      cb(err);
    } else {
      const q = `INSERT INTO users (${arg}) VALUES (${argPosition}) RETURNING *`;
      db.query(q, val, (err, result)=> {
        if(err){
          cb(err);
        } else {
          const data = result.rows[0];
          const idUser = data.id;
          const insertProfile = 'INSERT INTO profiles(user_id) VALUES ($1)';
          const valInsertProfile = [idUser];
          db.query(insertProfile, valInsertProfile, (err)=>{
            if(err){
              cb(err);
            } else {
              db.query('COMMIT', err => {
                if(err){
                  cb(err);
                } else {
                  cb(err, result);
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.getUserByEmail = (email, cb) => {
  const q = `SELECT * FROM users WHERE email='${email}'`;
  db.query(q, (err, result)=> {
    cb(err, result);
  });
};

exports.getAllUsers2 = async (offset, limit, searchBy, keyword, sortBy, sortType) => {
  const keywordContains = {contains: `${keyword}`};
  const users = await prisma.users.findMany({
    skip: offset,
    take: limit,
    where: {
      ...(searchBy === 'email' ? {email : keywordContains} : searchBy === 'phone_number' ? {phone_number : keywordContains}: searchBy === 'store_name' ? {store_name : keywordContains} : searchBy === 'full_name' ? { full_name : keywordContains}:{}),
    },
    orderBy: {
      ...(sortBy === 'full_name' ? {full_name : `${sortType}`} :{}),
    },
  });
  return users;
};

exports.countGetAllUsers2 = async (searchBy, keyword) => {
  const keywordContains = {contains: `${keyword}`};
  const users = await prisma.users.count({
    where:{
      ...(searchBy === 'email' ? {email : keywordContains} : searchBy === 'phone_number' ? {phone_number : keywordContains}: searchBy === 'store_name' ? {store_name : keywordContains} : searchBy === 'full_name' ? { full_name : keywordContains}:{}),      
    },
  });
  return users;
};

exports.createUserModel = async (data) => {
  if(data.role){
    data.role = parseInt(data.role);
  }
  const user = await prisma.users.create({
    data
  });
  return user;
};

exports.updateUserModel = async (id,picture, data) => {
  const idUser = parseInt(id, 10);
  
  if(picture!=''){
    data.profile_picture = `${imgUrl}/${picture}`;
  }
  // console.log(data);
  if(data.date_of_birth) {
    data.date_of_birth = new Date(data.date_of_birth);
  }
  if(data.role){
    data.role = parseInt(data.role);
  }
  if(data.gender==='male'){
    data.gender = true;
  } else if (data.gender==='female') {
    data.gender = false;
  }
  const user = await prisma.users.update({
    where:{id: idUser},
    data
  });
  return user;
};

exports.deleteUserModel = async (id) => {
  const idUser = parseInt(id, 10);
  const user = await prisma.users.delete({
    where: {id: idUser}
  });
  return user;
};

exports.getProfileByEmailUser = async (email) => {
  const user = await prisma.users.findMany({
    where: {
      email: email
    }
  });
  return user;
};

exports.getUserByUserId = async (id) => {
  const user = await prisma.users.findMany({
    where: {
      id: id
    }
  });
  return user;
};