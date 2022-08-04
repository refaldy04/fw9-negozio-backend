const db = require('../helpers/db');

// console.log(db);

exports.getAllChat = (limit, cb) => {
  console.log(limit);
  db.query(`SELECT * FROM chats ORDER BY id ASC LIMIT ${limit}`, (err, res) => {
    // console.log(res.rows);
    cb(res.rows);
  });
};

exports.getChatById = (id, cb) => {
  console.log(id);
  db.query(`SELECT * FROM chats WHERE id=${id}`, (err, res) => {
    cb(err, res);
  });
};

exports.createChat = (data, cb) => {
  const query =
    'INSERT INTO chats(sender_id, recipient_id, date, content ) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [data.sender_id, data.recipient_id, data.date, data.content];
  db.query(query, values, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};

exports.editChat = (id, data, cb) => {
  let val;
  val = [id];

  const filtered = {};
  const obj = {
    sender_id: data.sender_id,
    recipient_id: data.recipient_id,
    date: data.date,
    content: data.content,
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

  const query = `UPDATE chats SET ${finalResult}  WHERE id=$1 RETURNING *`;
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

exports.deleteChat = (id, cb) => {
  const query = 'DELETE FROM chats WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(query, value, (err, res) => {
    // console.log(res);
    cb(res.rows);
  });
};
