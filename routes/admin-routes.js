const express = require('express'); // express 요청

const adminController = require('../controllers/admin-controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router(); //라우터 개체 구성

router.get('/products', adminController.getProducts); // /admin/products

router.get('/products/new', adminController.getNewProduct);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

router.get('/products/:id', adminController.getUpdateProduct);

router.post('/products/:id', imageUploadMiddleware, adminController.updateProduct);

router.delete('/products/:id', adminController.deleteProduct);

router.get('/orders', adminController.getOrders);

router.patch('/orders/:id', adminController.updateOrder);

module.exports = router;
