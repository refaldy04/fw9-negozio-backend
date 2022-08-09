const routeServerClient = require("express").Router();

routeServerClient.use("/auth", require("./auth"));
routeServerClient.use("/user", require("./user"));
// routeServerClient.use('/user/product', require('./product'));
routeServerClient.use("/user/chat", require("./chat"));

module.exports = routeServerClient;
