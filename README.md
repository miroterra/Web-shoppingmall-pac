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

파일 업로드 - 미리보기 추가 product-form에 css를 넣기 위해 id 값을 추가하고 forms.css에 css 내용 추가 - 이미지가 사용자가 적용하면 미리보기 형식으로 나올수 있도록 자바스크립트를 구현 image-preview.js를 만들어 작성 - new-product,update-product.ejs 파일에 스크립트 추가

제품 삭제기능 만들기 -- 제품의 인스턴스를 제거 하기 위해 product-model에 remove메서드 생성 - 이 메서드를 컨트롤 하는 동작을 실행하기 위해 admin-controller 에 deleteProduct 함수를 만든다 - admin-routes 에 delete route를

Ajax/프론트엔드JS 요청 사용 & DOM 업데이트 -- 프론트엔드 스크립트를 위해 scripts에 product-management.js 생성 - delete 버튼을 클릭하면 그 해당 제품이 삭제가 되도록 만들기 위해 product-item에 있는 delete 버튼에 data-productid를 만들어서 JS에서 지정할 수 있도록 만든다 - csrf토큰이 되도록 내용 추가 하고 JS 파일 완성 - 그 후 에러가 나는 백엔드를 수정(admin-controller.js)

다양한 수정 & 적절한 경로 보호 -- 서버 에러 설정과 추가 보안을 한다 - 404 에러를 만들고 미들웨어로 작동 시킴 - middlewares - protect-routes.js 생성 하여 추가 보안에 대한 function 을 만든다 - app.js에 새 미들 웨어를 추가 - 그 후 새 에러 페이지인 401,403을 만든다 - 이 페이지를 route 하기 위해 base-routes 파일에 get 라우트를 만든다

고객을 위한 제품 출력 -- 일반 고객일 경우 봐야 할 페이지를 구현 - products-controller.js 생성 - customer 폴더에 all-product 에 for 반복문을 이용하여 제품 목록을 출력 - 관리 영역 출력 하는 것이 아닌 고객들에게도 제품을 출력하기 위해 shared-includes 폴더에 product-item.ejs 를 가져가고 파일 경로 맞춘다 - 관리자 일 경우의 상황을 달리 하기 위해 product-item에 내용 추가 - css 파일 추가 및 수정

제품 정보 출력 -- 세부정보 페이지를 위해 customer - product-detail.ejs 생성 - 해당 템플릿을 제공하는 라우트 - product-routes.js - 컨트롤러 - products-controller.js 에 내용 추가

카트 모델 추가 -- 장바구니 버튼을 만들었으니 동작 하도록 만들어야하므로 - cart-model 과 cart-controller를 만든다 - 컨트롤러를 출력 하기 위해 미들웨어를 추가 - cart.js - 해당 미들웨어를 활성화 하기 위해 app.js 에 내용 추가

장바구니 논리 작업 -- 이전 작업에 추가 작업 진행 - 컨트롤러 동작에서 제품에 도달하기 위해 데이터 베이스 접근 - cart-controller.js에 내용 추가 - cart-model에 내용 추가 - 장바구니에 추가된 갯수 배지를 만든다 - base.css에 내용 추가

Ajax요청을 통해 장바구니 항목 추가 -- cart-management.js 생성하여 버튼을 클릭하면 장바구니에 담기는 요청을 보내는 함수를 만든다 - 이 요청을 보내기 위해 라우트 추가 - cart-routes.js 생성 - app.js에 라우트 추가 - 내용정리

장바구니 페이지 추가 -- 장바구니 페이지를 새로 만들기 위해 cart.ejs, cart-item.ejs, cart.css를 추가 - cart관련 다른 js 에 내용 추가

장바구니 페이지 스타일링 -- css 작업

장바구니 품목 업데이트(수량변경) -- 업데이트 버튼을 누르면 요청을 할수 있도록 cart 관련 컨트롤러, 라우트, 모델 내용 추가

Ajax요청을 통한 카트 업데이트(patch 요청) -- updateItemController 동작을 트리거할 에이잭스 요청을 보내기 위해 - cart-item-management.js 추가 - 에이잭스 요청

장바구니 항목 업데이트 후 DOM 업데이트 -- 나머지 장바구니 관련 논리 추가

주문 컨트롤러 & 기본 주문 모델 추가 -- 제품 구매 버튼을 누르면 장바구니 내용을 주문 할 수 있게 만들기 - cart.ejs에 내용 추가 하면서 /order로 연결 되는 form 을 만들고 order 관련 컨트롤러와 라우트, 모델을 만든다 - orders-controller.js, orders-routes.js - app.js에 orderRoutes를 등록 - order-model 내용 추가

데이터베이스에 주문 저장 -- order-model에 새로운 주문을 추가하는 시나리오를 만들고 오더를 넣는 컨트롤러를 만들 떄 - 사용자의 데이터를 가져오기 위해 user-model에 findById 메서드를 만들어서 유저 데이터를 가져온다 - 내용 추가

주문 표시 (고객 & 관리자용) --
