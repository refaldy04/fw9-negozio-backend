const routeAdmin = require('express').Router();

//list route
routeAdmin.use('/profiles', require('./profiles'));


module.exports = routeAdmin;