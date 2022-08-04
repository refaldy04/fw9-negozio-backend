const categoryModels = require("../models/category");
const response = require("../helpers/standardResponse");
// console.log(categoryModels);

exports.getAllCategory = (req, res) => {
  console.log("a");
  const { limit = 4 } = req.query;
  categoryModels.getAllCategory(limit, (result) => {
    return response(
      res,
      "message from standard response: request success",
      result
    );
  });
};

exports.getCategoryById = (req, res) => {
  const { id } = req.params;
  categoryModels.getCategoryById(id, (err, result) => {
    if (result.rows.length > 0) {
      return response(res, "Detail transaction", result.rows[0]);
    } else {
      return res.redirect("/404");
    }
  });
};
