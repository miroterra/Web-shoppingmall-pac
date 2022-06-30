const path = require('path'); // 노드JS 내장된 경로 패키지

const express = require('express'); //익스프레스 가져오기

const authRoutes = require('./routes/auth-routes'); // auth 라우트 가져오기

const app = express();

app.set('view engine', 'ejs'); // ejs
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'))

app.use(authRoutes);

app.listen(3000);
