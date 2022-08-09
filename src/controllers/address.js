const response = require("../helpers/standartResponse");
const addressModel = require("../models/addressModel");
const { LIMIT_DATA } = process.env;

exports.getAllAddress = (req, res) => {
  const {
    search_by = "user_id",
    keyword = "1",
    sortBy = "id",
    sorting = "ASC",
    limit = parseInt(LIMIT_DATA),
    page = 1,
  } = req.query;

  const offset = (page - 1) * limit;
  if (search_by !== "user_id" && "address_details_id") {
    return response(
      res,
      `input search_by failed, please input between user_id or address_details_id`,
      null,
      null,
      400
    );
  }

  addressModel.getAllAddress(
    search_by,
    keyword,
    sortBy,
    sorting,
    limit,
    offset,
    (err, results) => {
      // console.log(err);
      // console.log(res);

      if (results.length < 1) {
        return response(res, `input failed`, null, null, 400);
      }

      const pageInfo = {};
      addressModel.countAllAddress(search_by, keyword, (err, totalData) => {
        pageInfo.totalData = totalData;
        pageInfo.totalpage = Math.ceil(totalData / limit);
        pageInfo.currentpage = parseInt(page);
        pageInfo.nextPage =
          pageInfo.currentpage < pageInfo.totalpage
            ? pageInfo.currentpage + 1
            : null;
        pageInfo.prevpage =
          pageInfo.currentpage > 1 ? pageInfo.currentpage - 1 : null;
        // console.log("coba");
        return response(res, "list all address", results, pageInfo);
      });
    }
  );
};

//CREATE
exports.createAddress = (req, res) => {
  addressModel.createAddress(req.body, (err, results) => {
    console.log(err);
    if (err) {
      return response(res, `Failed to update ${err.message}`, null, null, 400);
    } else {
      return response(res, "Create address succesfully", results[0]);
    }
  });
};

//UPDATE
exports.updateAddress = (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  addressModel.updateAddress(id, req.body, (err, results) => {
    if (err) {
      return response(res, `Failed to update ${err.message}`, null, null, 400);
    } else {
      console.log(results);
      return response(res, "Update address succesfully", results.rows[0]);
    }
  });
};

//DELETE
exports.deleteProfiles = (req, res) => {
  const { id } = req.params;
  console.log(id);
  addressModel.deleteAddress(id, (results) => {
    return response(res, "Delete address successfully", results[0]);
  });
};

// with prisma

exports.createAddressUser = async (req, res) => {
  const currentUser = req.authUser;
  const address = await addressModel.createAddressUser(
    currentUser.id,
    req.body
  );
  return response(res, "Success add new address.", address);
};

exports.getAllAddressUser = async (req, res) => {
  const currentUser = req.authUser;
  // const {idAddress} = req.params;
  const address = await addressModel.getAllAddressUser(currentUser.id);
  if (address.length < 1) {
    return response(res, "You dont have address saved.", null, null, 400);
  } else {
    return response(res, "Success get data.", address);
  }
};

exports.getAddressById = async (req, res) => {
  const currentUser = req.authUser;
  const { idAddress } = req.params;
  const address = await addressModel.getAddressById(
    parseInt(idAddress),
    currentUser.id
  );
  return response(res, "Success get data.", address);
};

exports.updateAddressUser = async (req, res) => {
  const currentUser = req.authUser;
  const { idAddress } = req.params;
  const getAddress = await addressModel.getAllAddressUser(currentUser.id);
  if (getAddress.length >= 1) {
    // getAddress.map((el)=>{
    //   if((el.address_details.is_primary===true)>=1) {

    //     // return response(res, 'You just can set 1 address as your primary address.');
    //   }
    // });
    const address = await addressModel.updateAddressUser(
      parseInt(idAddress, 10),
      req.body
    );
    return response(res, "Success updated your address.", address);
  } else {
    return response(res, "Your data is empty.", null, null, 400);
  }
};
