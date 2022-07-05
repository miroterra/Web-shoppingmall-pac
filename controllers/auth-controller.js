const User = require('../models/user-model');

function getSignup(req, res) {
  res.render('customer/auth/signup');
}

async function signup(req, res) {
  const user = new User(req.body.email, req.body.password, req.body.fullname, req.body.street, req.body.postal, req.body.city);

  await user.signup();

  res.redirect('/login'); //회원가입 후 로그인 페이지로 이동
}

function getLogin(req, res) {
  res.render('customer/auth/login');
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
