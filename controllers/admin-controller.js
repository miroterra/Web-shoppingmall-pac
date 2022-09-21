const Product = require('../models/product-model');
const Order = require('../models/order-model');

async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render('admin/products/all-products', { products: products });
  } catch (error) {
    next(error);
    return;
  }
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

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render('admin/products/update-product', { product: product });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect('/admin/products');
}

async function deleteProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    await product.remove();
  } catch (error) {
    return next(error);
  }

  // res.redirect('/admin/products');
  // 프론트엔드 기반 자바스크립트 요청을 보내고 있는데 리디렉션하고 있어서 에러발생
  // 이런 자바스크립트 기반 요청 뒤에는 새로운 페이지를 로드 하지않고 기존 페이지를 유지하여 리디렉션을 응답하지않음
  // 에이잭스 요청
  res.json({ message: 'Deleted product!' });
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render('admin/orders/admin-orders', {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;
}

try {
  const order = await Order.findById(orderId);

  order.status = newStatus;

  await order.save();

  res.json({ message: 'Order updated', newStatus: newStatus });
} catch (error) {
  next(error);
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getOrders: getOrders,
  updateOrder: updateOrder,
};
