const routeAdmin = require("express").Router();

//list route
routeAdmin.use("/users", require("./users"));

routeAdmin.use("/profiles", require("./profiles"));

routeAdmin.use("/address", require("./address"));

routeAdmin.use("/category", require("./category"));

// routeAdmin.use('/review', require('./review'));

routeAdmin.use("/chat", require("./chat"));

routeAdmin.use("/address-detail", require("./addressDetail"));

routeAdmin.use("/chat-content", require("./chatContent"));

routeAdmin.use("/product-review", require("./product-review"));

routeAdmin.use("/payment-method", require("./paymentMethod"));

module.exports = routeAdmin;
