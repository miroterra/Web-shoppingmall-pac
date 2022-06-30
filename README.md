# Web-shoppingmall-pac

npm install express
npm install --save-dev nodemon
package.json 파일에 "start": "nodemon app.js" 추가

app.js 만들고 express 가져오기 -> 가장 기본적인 서버 생성
views, models, controllers, routes 폴더 생성
views 하위폴더 auth, admin, products, cart

인증 기능을 가장 먼저 시작
routes 폴더에 auth-routes.js 생성
auth-routes.js -> express 요청
라우트 개체 구성
module.exports = router 를 통해 라우터를 노출

MVC 패턴을 하기 위해 라우터에 오는 미들웨어함수를 컨트롤러를 만들어서 사용
controllers 폴더에 auth-controller.js 생성
미들웨어로 쓸 함수 생성
라우트에 auth-controller 요청
/signup 라우트에 authController.getSignup 미들웨어함수 트리거
/login 라우트를 만들고 같은 상황 반복해서 생성

app.js 에 auth라우트 가져오기

ejs 설치
app.js에 ejs 연동
views -> auth 폴더에 signup,login.ejs 생성
views 폴더에 customer 폴더 생성
auth, cart, products 폴더 이동 + includes 폴더 생성
includes 폴더에 head, header.ejs 생성
head,header,footer 만들고 signup.ejs에 include
