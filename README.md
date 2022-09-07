# Web-shoppingmall-pac

npm install express npm install --save-dev nodemon package.json 파일에 "start": "nodemon app.js" 추가

app.js 만들고 express 가져오기 -> 가장 기본적인 서버 생성 views, models, controllers, routes 폴더 생성 views 하위폴더 auth, admin, products, cart

인증 기능을 가장 먼저 시작 routes 폴더에 auth-routes.js 생성 auth-routes.js -> express 요청 라우트 개체 구성 module.exports = router 를 통해 라우터를 노출

MVC 패턴을 하기 위해 라우터에 오는 미들웨어함수를 컨트롤러를 만들어서 사용 controllers 폴더에 auth-controller.js 생성 미들웨어로 쓸 함수 생성 라우트에 auth-controller 요청 /signup 라우트에 authController.getSignup 미들웨어함수 트리거 /login 라우트를 만들고 같은 상황 반복해서 생성

app.js 에 auth라우트 가져오기

ejs 설치 app.js에 ejs 연동 views -> auth 폴더에 signup,login.ejs 생성 views 폴더에 customer 폴더 생성 auth, cart, products 폴더 이동 + includes 폴더 생성 includes 폴더에 head, header.ejs 생성 head,header,footer 만들고 signup.ejs 마크업 head.ejs 에 구글 폰트와 css 넣기

base, auth, forms.css 인증 관련 css 작성 mongodb 사용 데이터베이스 서버 구축 npm install mongodb data폴더 database.js 생성 database 작성 MVC -> models user.js 작성 암호 해싱을 위해 bcryptjs 설치 auth-controller 작성 login.ejs 작성 CSRF 보호 -> csurf 설치 middlewares 폴더 csrf-token 작성 -> login,signup.ejs input hidden으로 csrf 처리 error-handler.js 작성 npm install express-session connect-mongodb-session config폴더 session.js 작성 auth-controller, user-model.js 추가 작성 util폴더 authentication.js 작성 auth-controller login function 추가 작성 후 view all-products 작성 routes 폴더 base-routes.js, products.routes.js 생성 app.js에 만든 라우트 연동 - 인증 & 사용자 로그인 구현

middlewares 폴더 check-auth.js 작성 app.js 에 등록 auth-controller.js module.exports에 login 추가 auth-router.js 에 post 라우터 login 추가 header.ejs 에 로그인 시 logout 버튼 생성 되게 작성 - csrf토큰은 모든 post 요청에 필요함 auth-controller에 logout function 작성 util authentication.js 에 destroyUserAuthSession function 작성 auth-router에 logout 포스트 작성 auth-controller에 오류 처리 유효성 검사 관련 논리 - util - validation.js 작성
플래싱을 위해 util - session-flash.js 작성 -> auth-controller에 플래싱 오류 & 세션에 데이터 입력 내용 추가 작성 -> 오류 메세지 표시 & 사용자 입력 저장
signup.ejs와 login.ejs에 내용 추가하고 base.css 에 오류 표기 css 추가

관리자 권한 부여를 위해 mongodb 에서 db.users.updateOne({\_id:(...)}, { $set: {isAdmin: true} })로 특정 사용자에게 권한 부여
관리자에 대한 세션을 확인해야하기 떄문에 util - authentication.js에 isAdmin 플래그를 추가 하여 세션에 저장
middlewares - check-auth에서 내용 추출
그 후 header.ejs에 네비 부분에 관리자와 일반 사용자에 대한 네비 제작

기본 탐색 스타일 설정 -- header.ejs 에 태그 및 추가 작성
모바일과 데스크탑 헤더로 나누고 nav-item.ejs에 ul 항목들을 넣고 navigation.css까지 생성

웹사이트 구축 -- 반응형 사이트 구축을 위해 navigation.css 에 미디어쿼리 추가 및 css 추가 작성

모바일 메뉴 토글을 위한 프론트엔드 자바스크립트 --
모바일 메뉴 토글을 위해 public - scripts - mobile.js 생성
navigation.css 추가 작성

제품 관리 페이지 및 양식 추가 -- 관리 관련 경로를 그룹화 하기 위해 routes - admin-routes.js 생성 -> app.js에 라우트 설정 - 라우트에 대한 컨트롤러 동작을 위해 controllers - admin-controller.js 생성 - 라우트 파일에 함수들 추가
views - admin - products - all-products.ejs, new-products.ejs 파일 생성 / 기존 all-products.ejs 복사하여 admin 페이지 생성하고 수정
admin-controller 내용 추가 후 new-products.ejs 내용 추가 및 css 추가

이미지 업로드 기능 추가 -- new-products.ejs 에 form 태그에 enctype 설정 - 파일이 있으므로 multipart/form-data 로 설정 & POST 요청이므로 CSRF 토큰도 작성하는데 enctype 설정으로 이전처럼 input value hidden은 못하고 다른 방식으로 설정
그 후 파일 업로드 패키지인 multer 설치 - npm install --save multer -> multer 구성을 처리하는 사용자 미들웨어를 만들기 - middlewares - image-upload.js 생성 - 파일 저장 공간도 생성 product-data -> images - filename 작성 과정에서 uuid 패키지 설치 -> 나중에 충돌하는 파일 이름이 없도록 id를 만들고 고유한 파일 이름을 갖도록 함 - 모든 생성한 파일에 내용 추가 작성

더 많은 데이터: 제품 모델 추가 및 데이터베이스에 제품 저장 --
product-model 제품 관련된 논리를 위한 새 모델 생성 및 작성 - admin-controller에 내용 추가

제품 항목 가져오기 & 출력 -- 제품 리스트들을 그리드 형식으로 보여주기 위해 우선 리스트 요소를 만들 all-products를 추가 작성 - admin/products 폴더에 include - product-item.ejs 생성 - 여기서 리스트를 반복해서 가져올 데이터를 논리를 추가하기 위해 product-model에 findAll 메소드 추가 -
admin-controller getProducts function에 추가 작성 - 업로드 된 이미지를 정적으로 제공하기 위해 app.js에 app.use express.static 사용

제품 아이템 스타일링 -- 제품 리스트 css 작성 public-styles-products.css 작성 - product-item.ejs 를 생성해서 작업 후 css 마무리

제품세부정보 페이지 추가 -- 새로운 보기를 위해 update-product.ejs, product-form.ejs 파일 추가 생성 new-product 파일에 form 부분을 product-form 파일로 이전 하고 update-product 파일에 form 부분을 ejs로 처리 - 새로 추가한 업데이트 페이지를 라우트 하기 위해 admin-routes에 라우트 추가 - 추가한 두개의 라우트에 대한 두개의 컨트롤러 작업을 위해 admin-controller 에 두 함수 추가 - 개별적 id를 찾을수 있는 새로운 정적 메서드 findById를 product-model.js에 만든다 - product-form에 데이터 추가 - new-product.js에는 빈 공간으로 형성

제품 업데이트(관리자) -- findById로 얻은 Id 로 제품을 업데이트 할 수 있게 admin-controller updateProduct에 추가 -
product-form, new-product, update-product 세 파일에 내용 추가
- product-model 에 save 메서드에 새 논리를 추가 - replaceImage 메서드 추가와 나머지 내용 수정 - admin-routes 에 post 요청에 미들웨어를 추가하여 데이터를 받음

파일 업로드 - 미리보기 추가  product-form에 css를 넣기 위해 id 값을 추가하고 forms.css에 css 내용 추가 - 이미지가 사용자가 적용하면 미리보기 형식으로 나올수 있도록 자바스크립트를 구현 image-preview.js를 만들어 작성 - new-product,update-product.ejs 파일에 스크립트 추가