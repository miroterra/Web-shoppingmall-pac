const Product = require('../models/product-model');

function getProducts(req, res) {
  res.render('admin/products/all-products');
} // 관리 페이지 표시하는 함수

function getNewProduct(req, res) {
  res.render('admin/products/new-products');
} // 새 제품 추가를 하는 페이지를 추가하는 함수

async function createNewProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect('/admin/products');
} //추가한 새 제품을 제출하는 함수

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
};
