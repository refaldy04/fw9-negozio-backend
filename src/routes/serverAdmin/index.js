const routeAdmin = require('express').Router();

//list route
routeAdmin.use('/profiles', require('./profiles'));


routeAdmin.use('/category', require('./category'));



module.exports = routeAdmin;
