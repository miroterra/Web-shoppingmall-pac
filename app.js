const path = require('path'); // 노드JS 내장된 경로 패키지

const express = require('express'); //익스프레스 가져오기
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session'); //세션 추가
const db = require('./data/database'); // 데이터서버 연동
const addCsrfTokenMiddleware = require('./middlewares/csrf-token'); // csrf
const errorHandlerMiddleware = require('./middlewares/error-handler'); //에러 페이지
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const authRoutes = require('./routes/auth-routes'); // auth 라우트 가져오기
const productsRoutes = require('./routes/products-routes');
const baseRoutes = require('./routes/base-routes');

const app = express();

app.set('view engine', 'ejs'); // ejs
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public')); // 정적으로 제공
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Failed to connect to the database');
    console.log(error);
  });
