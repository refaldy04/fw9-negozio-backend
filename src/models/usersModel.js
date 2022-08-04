const db = require('../helpers/db');

exports.getAllUsers = (cb) => {
  const q = 'SELECT * FROM users';
  db.query(q, (err, result)=>{
    cb(err, result);
  });
};