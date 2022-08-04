const db = require("../helpers/db");

exports.getAllReview = (limit, cb) => {
  console.log(limit);
  db.query(
    `SELECT * FROM categories ORDER BY id ASC LIMIT ${limit}`,
    (err, res) => {
      // console.log(res.rows);
      cb(res.rows);
    }
  );
};
