const response = require('../helpers/standartResponse');
const userModel = require('../models/usersModel');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUserCustomers = (req, res) => {
  const {
    search = '',
    searchBy,
    sortBy,
    sortType,
    limit = parseInt(process.env.LIMIT_DATA),
    page = 1,
  } = req.query;
  const type = parseInt(sortType);
  const offset = (page - 1) * limit;
  let typeSort = '';
  if (type == 0) {
    typeSort = 'ASC';
  } else {
    typeSort = 'DESC';
  }
  if (!type) {
    typeSort = 'ASC';
  }
  const pageInfo = {};
  userModel.getAllUserCustomers(
    search,
    searchBy,
    sortBy,
    typeSort,
    limit,
    offset,
    (err, result) => {
      console.log(err);
      if (result.length < 1) {
        return res.redirect('/404');
      }
      userModel.countAllUserCustomers(search, searchBy, (err, infoData) => {
        pageInfo.totalDatas = infoData;
        pageInfo.pages = Math.ceil(infoData / limit);
        pageInfo.currentPage = parseInt(page);
        pageInfo.prevPage =
          pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
        pageInfo.nextPage =
          pageInfo.currentPage < pageInfo.pages
            ? pageInfo.currentPage + 1
            : null;
        return response(res, 'test msg', result.rows, pageInfo);
      });
    }
  );
};

exports.getAllUserSellers = (req, res) => {
  const {
    search = '',
    searchBy,
    sortBy,
    sortType,
    limit = parseInt(process.env.LIMIT_DATA),
    page = 1,
  } = req.query;
  const type = parseInt(sortType);
  const offset = (page - 1) * limit;
  let typeSort = '';
  if (type == 0) {
    typeSort = 'ASC';
  } else {
    typeSort = 'DESC';
  }
  if (!type) {
    typeSort = 'ASC';
  }
  const pageInfo = {};
  userModel.getAllUserSellers(
    search,
    searchBy,
    sortBy,
    typeSort,
    limit,
    offset,
    (err, result) => {
      console.log(err);
      if (result.length < 1) {
        return res.redirect('/404');
      }
      userModel.countAllUserSellers(search, searchBy, (err, infoData) => {
        pageInfo.totalDatas = infoData;
        pageInfo.pages = Math.ceil(infoData / limit);
        pageInfo.currentPage = parseInt(page);
        pageInfo.prevPage =
          pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
        pageInfo.nextPage =
          pageInfo.currentPage < pageInfo.pages
            ? pageInfo.currentPage + 1
            : null;
        return response(res, 'test msg', result.rows, pageInfo);
      });
    }
  );
};

exports.getAllUserAdmins = (req, res) => {
  const {
    search = '',
    searchBy,
    sortBy,
    sortType,
    limit = parseInt(process.env.LIMIT_DATA),
    page = 1,
  } = req.query;
  const type = parseInt(sortType);
  const offset = (page - 1) * limit;
  let typeSort = '';
  if (type == 0) {
    typeSort = 'ASC';
  } else {
    typeSort = 'DESC';
  }
  if (!type) {
    typeSort = 'ASC';
  }
  const pageInfo = {};
  userModel.getAllUserAdmins(
    search,
    searchBy,
    sortBy,
    typeSort,
    limit,
    offset,
    (err, result) => {
      console.log(err);
      if (result.length < 1) {
        return res.redirect('/404');
      }
      userModel.countAllUserAdmins(search, searchBy, (err, infoData) => {
        pageInfo.totalDatas = infoData;
        pageInfo.pages = Math.ceil(infoData / limit);
        pageInfo.currentPage = parseInt(page);
        pageInfo.prevPage =
          pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
        pageInfo.nextPage =
          pageInfo.currentPage < pageInfo.pages
            ? pageInfo.currentPage + 1
            : null;
        return response(res, 'test msg', result.rows, pageInfo);
      });
    }
  );
};

exports.createUserCustomer = (req, res) => {
  userModel.createUserCustomer(req.body, (err, result) => {
    // console.log(err);
    return response(res, 'Success created new users', result.rows);
  });
};

exports.updateUserCustomer = (req, res) => {
  const { id } = req.params;
  userModel.updateUsers(req.body, id, (err, result) => {
    // console.log(err);
    return response(res, 'Success for update user', result.rows);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  userModel.deleteUser(id, (err, result) => {
    return response(res, 'Success deleted user', result.rows);
  });
};

exports.userRegister = (req, res) => {
  userModel.userRegister(req.body, (err, result) => {
    // console.log(err);
    return response(res, 'Resgister successfully', result.rows);
  });
};

exports.userLogin = (req, res) => {
  const { email, password } = req.body;
  userModel.getUserByEmail(email, (err, result) => {
    if (result.rows.length < 1) {
      return response(res, 'Email not found', null, null, 400);
    } else {
      const user = result.rows[0];
      brcypt
        .compare(password, user.password)
        .then((checkPass) => {
          if (checkPass) {
            const token = jwt.sign(
              { id: user.id, email: user.email, username: user.username },
              process.env.APP_SECRET || 'thisSecretKey',
              { expiresIn: '7d' }
            );
            return response(res, 'Login success', { token });
          } else {
            return response(
              res,
              'Login failed, Email or Password incorrect',
              null,
              null,
              401
            );
          }
        })
        .catch((e) => {
          return response(res, `Error: ${e.message}`, null, null, 404);
        });
    }
  });
};
