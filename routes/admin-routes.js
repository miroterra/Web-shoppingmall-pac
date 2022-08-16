const express = require('express'); // express 요청

const adminController = require('../controllers/admin-controller');

const router = express.Router(); //라우터 개체 구성

router.get('/products', adminController.getProducts); // /admin/products

router.get('/products/new', adminController.getNewProduct);

module.exports = router;
