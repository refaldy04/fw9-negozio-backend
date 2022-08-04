const routeServerClient = require('express').Router();

routeServerClient.use('/auth', require('./auth'));
routeServerClient.use('/user', require('./user'));

module.exports = routeServerClient;