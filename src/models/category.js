const db = require("../helpers/db");

// console.log(db);

exports.getAllCategory = (limit, cb) => {
  console.log(limit);
  db.query(
    `SELECT * FROM categories ORDER BY id ASC LIMIT ${limit}`,
    (err, res) => {
      // console.log(res.rows);
      cb(res.rows);
    }
  );
};

exports.getCategoryById = (id, cb) => {
  db.query("SELECT * FROM categories WHERE id=$1", [id], (err, res) => {
    cb(err, res);
  });
};
