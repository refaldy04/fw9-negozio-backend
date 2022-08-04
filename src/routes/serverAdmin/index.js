const routeAdmin = require('express').Router();

//list route
routeAdmin.use('/users', require('./users'));

module.exports = routeAdmin;