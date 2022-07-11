const express = require('express'); // express 요청

const router = express.Router(); //라우터 개체 구성

router.get('/', function (req, res) {
  res.redirect('/products');
});

module.exports = router;
