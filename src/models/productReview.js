const prisma = require('../helpers/prisma');

exports.getAllProductReview = async () => {
  const productReview = await prisma.reviews.findMany();
  //   console.log(addressDetail);
  return productReview;
};

exports.getProductReview = async (product_id) => {
  console.log(product_id);
  product_id = parseInt(product_id, 10);
  const productReview = await prisma.reviews.findMany({
    where: {
      product_id: product_id,
    },
  });
  return productReview;
};

exports.getProductReviewAverage = async (product_id) => {
  console.log(product_id);
  product_id = parseInt(product_id, 10);
  const productReview = await prisma.reviews.aggregate({
    where: {
      product_id: product_id,
    },
    _avg: {
      rating: true,
    },
  });
  return productReview;
};

exports.createProductReview = async (data) => {
  console.log(data);
  data.rating = parseInt(data.rating);
  data.product_id = parseInt(data.product_id);

  const productReview = await prisma.reviews.create({
    data,
  });
  return productReview;
};

exports.updateProductReview = async (id, data) => {
  id = parseInt(id, 10);

  //   parseInt(data.postal_code);
  data.product_id = parseInt(data.product_id);
  data.rating = parseInt(data.rating);

  const productReview = await prisma.reviews.update({
    where: { id },
    data,
  });

  return productReview;
};

exports.deleteProductReview = async (id) => {
  id = parseInt(id, 10);
  const productReview = await prisma.reviews.delete({
    where: { id },
  });
  return productReview;
};
