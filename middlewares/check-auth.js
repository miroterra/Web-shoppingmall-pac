function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;

  if (!uid) {
    //인증 실패 시
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuth = true;
  res.locals.isAdmin = req.session.isAdmin;
  next();
}

module.exports = checkAuthStatus;
