const path = require('path'); // 노드JS 내장된 경로 패키지

const express = require('express'); //익스프레스 가져오기

const db = require('./data/database'); // 데이터서버 연동
const authRoutes = require('./routes/auth-routes'); // auth 라우트 가져오기

const app = express();

app.set('view engine', 'ejs'); // ejs
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public')); // 정적으로 제공

app.use(authRoutes);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Failed to connect to the database');
    console.log(error);
  });
