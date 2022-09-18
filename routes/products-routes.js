const express = require('express'); // express 요청

const productsController = require('../controllers/products-controller');

const router = express.Router(); //라우터 개체 구성

router.get('/products', productsController.getAllProducts);

router.get('/products/:id', productsController.getProductDetails);

module.exports = router;
