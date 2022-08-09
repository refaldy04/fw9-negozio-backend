const routeServerClient = require("express").Router();

routeServerClient.use("/auth", require("./auth"));
routeServerClient.use("/user", require("./user"));
routeServerClient.use("/user/product", require("./product"));
routeServerClient.use("/user/chat", require("./chat"));
routeServerClient.use("/order", require("./order"));

module.exports = routeServerClient;
