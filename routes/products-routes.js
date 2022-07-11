const express = require('express'); // express 요청

const router = express.Router(); //라우터 개체 구성

router.get('/products', function (req, res) {
  res.render('customer/products/all-products');
});

module.exports = router;
