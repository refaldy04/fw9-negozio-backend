const db = require('../helpers/db');

exports.getAllReview = (limit, cb) => {
  console.log(limit);
  db.query(
    `SELECT * FROM reviews ORDER BY id ASC LIMIT ${limit}`,

    (err, res) => {
      // console.log(res.rows);
      cb(res.rows);
    }
  );
};

exports.getReviewById = (id, cb) => {
  db.query('SELECT * FROM reviews WHERE id=$1', [id], (err, res) => {
    cb(err, res);
  });
};

exports.createReview = (data, cb) => {
  const query =
    'INSERT INTO reviews(rating, feedback, transaction_date ) VALUES($1, $2, $3) RETURNING *';
  const values = [data.rating, data.feedback, data.transaction_date];
  db.query(query, values, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};

exports.editReview = (id, data, cb) => {
  console.log(data);
  let val = [id];
  const filtered = {};
  const obj = {
    rating: data.rating,
    feedback: data.feedback,
    transaction_date: data.transaction_date,
  };

  for (x in obj) {
    if (obj[x] !== null) {
      if (obj[x] !== undefined) {
        filtered[x] = obj[x];
        val.push(obj[x]);
      }
    }
  }
  console.log(val);

  const key = Object.keys(filtered);
  //   console.log(key);
  const finalResult = key.map((val, index) => `${val}=$${index + 2}`);
  //   console.log(finalResult);
  //   console.log(val);

  const query = `UPDATE reviews SET ${finalResult}  WHERE id=$1 RETURNING *`;
  db.query(query, val, (err, res) => {
    if (res) {
      // console.log(res);
      cb(err, res.rows);
    } else {
      console.log(err);
      cb(err);
    }
  });
};

exports.deleteReview = (id, cb) => {
  const query = 'DELETE FROM reviews WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(query, value, (err, res) => {
    // console.log(res);
    cb(res.rows);
  });
};
