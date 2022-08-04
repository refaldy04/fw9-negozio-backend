const db = require('../helpers/db');

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
  db.query('SELECT * FROM categories WHERE id=$1', [id], (err, res) => {
    cb(err, res);
  });
};

exports.createCategory = (data, picture, cb) => {
  const query =
    'INSERT INTO categories(name, gender, picture ) VALUES($1, $2, $3) RETURNING *';
  const values = [data.name, data.gender, picture];
  db.query(query, values, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};


  let val;
  val = [id];

  const filtered = {};
  const obj = {
    picture,
    name: data.name,
    gender: data.gender,
  };

  for (let x in obj) {
    if (obj[x] !== null) {
      if (obj[x] !== undefined) {
        filtered[x] = obj[x];
        val.push(obj[x]);
      }
    }
  }

  const key = Object.keys(filtered);
  const finalResult = key.map((val, index) => `${val}=$${index + 2}`);
  console.log(finalResult);
  console.log(val);

  const query = `UPDATE categories SET ${finalResult}  WHERE id=$1 RETURNING *`;
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

exports.deleteCategory = (id, cb) => {
  const query = 'DELETE FROM categories WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(query, value, (err, res) => {
    // console.log(res);
    cb(res.rows);
  });
};
