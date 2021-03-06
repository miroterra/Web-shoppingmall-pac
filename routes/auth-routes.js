const express = require('express'); // express 요청

const authController = require('../controllers/auth-controller'); // auth-controller 요청

const router = express.Router(); //라우터 개체 구성

router.get('/signup', authController.getSignup); // 가입페이지 라우트

router.post('/signup', authController.signup); // 가입 포스트

router.get('/login', authController.getLogin); // 로그인 페이지 라우트

router.post('/login', authController.login); // 로그인 포스트

router.post('/logout', authController.logout); //로그아웃 포스트

module.exports = router;
