const routeAdmin = require('express').Router();


routeAdmin.use('/category', require('./category'));



module.exports = routeAdmin;
