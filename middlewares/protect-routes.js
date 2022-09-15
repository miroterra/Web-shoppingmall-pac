function protectRoutes(req, res, next) {
  //인증을 받지 않은 경우
  if (!res.locals.isAuth) {
    return res.redirect('/401');
  }


  //adminRoute를 방문하지않았거나 Admin이 아닌경우
  if(req.path.startsWith('/admin') && !res.locals.isAdmin) {
    return res.redirect('/403');
  }

  next();
}

module.exports = protectRoutes;