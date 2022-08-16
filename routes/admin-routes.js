const express = require('express'); // express 요청

const adminController = require('../controllers/admin-controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router(); //라우터 개체 구성

router.get('/products', adminController.getProducts); // /admin/products

router.get('/products/new', adminController.getNewProduct);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

module.exports = router;
