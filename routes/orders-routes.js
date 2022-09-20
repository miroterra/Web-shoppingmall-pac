const express = require('express'); // express 요청

const ordersController = require('../controllers/orders-controller');

const router = express.Router(); //라우터 개체 구성

router.post('/', ordersController.addOrder);

module.exports = router;
