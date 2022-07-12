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
head,header,footer 만들고 signup.ejs 마크업
head.ejs 에 구글 폰트와 css 넣기

base, auth, forms.css 인증 관련 css 작성
mongodb 사용 데이터베이스 서버 구축
npm install mongodb
data폴더 database.js 생성
database 작성
MVC -> models user.js 작성
암호 해싱을 위해 bcryptjs 설치
auth-controller 작성
login.ejs 작성
CSRF 보호 -> csurf 설치
middlewares 폴더 csrf-token 작성 -> login,signup.ejs input hidden으로 csrf 처리
error-handler.js 작성
npm install express-session connect-mongodb-session
config폴더 session.js 작성
auth-controller, user-model.js 추가 작성
util폴더 authentication.js 작성
auth-controller login function 추가 작성 후 view all-products 작성
routes 폴더 base-routes.js, products.routes.js 생성
app.js에 만든 라우트 연동 - 인증 & 사용자 로그인 구현

middlewares 폴더 check-auth.js 작성
app.js 에 등록
auth-controller.js module.exports에 login 추가
auth-router.js 에 post 라우터 login 추가
header.ejs 에 로그인 시 logout 버튼 생성 되게 작성 - csrf토큰은 모든 post 요청에 필요함
auth-controller에 logout function 작성
util authentication.js 에 destroyUserAuthSession function 작성
auth-router에 logout 포스트 작성
