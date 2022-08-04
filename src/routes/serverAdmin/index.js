const routeAdmin = require("express").Router();

routeAdmin.use("/profiles", require("./profiles"));

routeAdmin.use("/category", require("./category"));

routeAdmin.use("/review", require("./review"));

module.exports = routeAdmin;
