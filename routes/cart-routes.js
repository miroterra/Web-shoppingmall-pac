const express = require('express'); // express 요청

const cartController = require('../controllers/cart-controller');

const router = express.Router(); //라우터 개체 구성

router.get('/', cartController.getCart);

router.post('/items', cartController.addCartItem);

module.exports = router;
