const express = require('express'); //익스프레스 가져오기

const authRoutes = require('./routes/auth-routes'); // auth 라우트 가져오기

const app = express();

app.use('authRoutes');

app.listen(3000);
