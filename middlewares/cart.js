// 들어오는 요청을 보고 이미 장바구니가 있는 사용자 인지
// 장바구니가 없는 사용자의 요청인지 확인하는 작업
const Cart = require('../models/cart-model');

//초기화
function initializeCart(req, res, next) {
  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  } else {
    const sessionCart = req.session.cart;
    cart = new Cart(req.session.cart.items, sessionCart.totalQuantity, sessionCart.totalPrice);
  }
  res.locals.cart = cart;

  next();
}

module.exports = initializeCart;
