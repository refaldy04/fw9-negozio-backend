const prisma = require('../helpers/prisma');

// console.log(db);

exports.getAllAddressDetail = async () => {
  const addressDetail = await prisma.address_details.findMany();
  console.log(addressDetail);
  return addressDetail;
};

exports.getAddressDetail = async (id) => {
  id = parseInt(id, 10);
  const addressDetail = await prisma.address_details.findMany({
    where: {
      id,
    },
  });
  return addressDetail;
};

exports.createAddressDetail = async (data) => {
  console.log(data);
  if (data.is_primary === 'false') {
    data.is_primary = false;
  } else {
    data.is_primary = true;
  }

  //   parseInt(data.postal_code);
  data.postal_code = parseInt(data.postal_code);
  const addressDetail = await prisma.address_details.create({
    data,
  });
  return addressDetail;
};

exports.updateAddressDetail = async (id, data) => {
  id = parseInt(id, 10);
  if (data.is_primary === 'false') {
    data.is_primary = false;
  } else {
    data.is_primary = true;
  }

  //   parseInt(data.postal_code);
  data.postal_code = parseInt(data.postal_code);

  const addressDetail = await prisma.address_details.update({
    where: { id },
    data,
  });

  return addressDetail;
};

exports.deleteAddressDetail = async (id) => {
  id = parseInt(id, 10);
  const addressDetail = await prisma.address_details.delete({
    where: { id },
  });
  return addressDetail;
};
