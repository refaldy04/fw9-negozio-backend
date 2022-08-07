const routeServerClient = require('express').Router();

routeServerClient.use('/auth', require('./auth'));
routeServerClient.use('/user', require('./user'));
routeServerClient.use('/user/product', require('./product'));

module.exports = routeServerClient;