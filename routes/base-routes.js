const express = require('express'); // express 요청

const router = express.Router(); //라우터 개체 구성

router.get('/', function (req, res) {
  res.redirect('/products');
});

router.get('/401', function (req, res) {
  res.status(401).render('shared/401');
});
router.get('/403', function (req, res) {
  res.status(403).render('/shared/403');
});

module.exports = router;
