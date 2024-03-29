const express = require('express'); // express 요청

const ordersController = require('../controllers/orders-controller');

const router = express.Router(); //라우터 개체 구성

router.post('/', ordersController.addOrder);

router.get('/', ordersController.getOrder);

router.get('/success', ordersController.getSuccess);

router.get('failure', ordersController.getFailure);

module.exports = router;
