const routeAdmin = require("express").Router();

//list route
routeAdmin.use("/users", require("./users"));

routeAdmin.use("/profiles", require("./profiles"));

routeAdmin.use("/address", require("./address"));

routeAdmin.use("/category", require("./category"));

routeAdmin.use("/review", require("./review"));

module.exports = routeAdmin;
