const addressDetail = require("express").Router();
const addressDetailController = require("../../controllers/addressDetail");
const { body } = require("express-validator");

const rules = require("../../middleware/addressDetailValidator");

const validation = require("../../middleware/validation");

addressDetail.get("/", addressDetailController.getAllAddressDetail);
addressDetail.get("/:id", addressDetailController.getAddressDetail);
addressDetail.post(
  "/",
  ...rules.addressDetailValidator,
  validation,
  addressDetailController.createAddressDetail
);
addressDetail.patch(
  "/:id",
  ...rules.addressDetailValidator,
  validation,
  addressDetailController.updateAddressDetail
);
addressDetail.delete("/:id", addressDetailController.deleteAddressDetail);

module.exports = addressDetail;
