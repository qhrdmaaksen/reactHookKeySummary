## 재료 추가/검색/목록 출력

```js

재료 데이터 관리 프로그램
1. 재료 입력 추가
2. 재료 목록 출력 기능
3. 재료 삭제 기능 추가
4. 재료 검색 기능 추가
5. 요청 실패 예외 처리 추가

React CSS Html

Components
  Auth.js : 로그인 화면 컴포넌트
  Ingredients 폴더 : 재료 관련
    IngredientForm.js : 재료명 수량을 입력 받을 폼 컴포넌트
    IngredientList.js : 재료들을 나열해줄 리스트 컴포넌트
    Ingredients.js : 재료들의 상태 관리 컴포넌트
    Search.js : 재료 검색 컴포넌트
  UI 폴더 : 유저 인터페이스 관련
    Card.js : 래퍼 컴포넌트로 컨텐츠가 담길 틀 역할
    ErrorModal.js : 예외 처리 모달 팝업 컴포넌트
    NewExpense : 새로운 비용 추가
    LoadingIndicator.js : 로딩 스피너 컴포넌트
  context 폴더
    auth-context.js : 로그인 상태관리 컴포넌트
    ChartBar : 차트 출력에 필요한 값을 Chart 에 보내주는 용도
  hooks 폴더 : 사용자 정의 훅
    http.js : 사용자 정의 컴포넌트로 각 컴포넌트에 필요한 데이터 store 로 활용
    

Function
  IngredientForm.js.js
    submitHandler : 사용자 입력 재료명과 수량을 받아 onAddIngredient 함수에 props 전달해줄 함수
  Ingredients.js
    ingredientReducer : 액션을 받아 여러 상태를 관리해줄 리듀서 함수
    filteredIngredientsHandler :  Search 컴포넌트에서 onLoadIngredients 가
                                    호출됐을 때 ingredientReducer 에 action type 넘겨줄 함수
    addIngredientHandler : 새로 추가할 재료를 받으며 받은 값은 배열에 저장해줄 함수
    removeIngredientHandler : 삭제할 ingredient 의 id 를 받으며 받은 값은 배열에서 제거해줄 함수
    ingredientsList : useMemo 를 사용해 재료리스트가 필요할때만 렌더링되도록 해줄 함수
  Search.js.js
    timer : timer 를 사용하여 500 밀리초 후에만 검색을 실행하도록 함
  Auth.js
    loginHandler : auth-context 에 접근하여 로그인 상태 관리해줄 함수
  auth-context.js
    loginHandler : 로그인 상태 관리 함수
  http.js
    httpReducer : 로딩 및 에러 등 여러 상태 관리 리듀서 함수
    clear : 초기화 해줄 함수
    sendRequest : 요청 관리 함수
  
```

로그인 화면

![20221030_235619](https://user-images.githubusercontent.com/75942405/198885460-528676bf-3b1b-48ee-9a5c-daac2670b920.png)

재료 추가 및 리스트 출력 화면

![20221020_030652](https://user-images.githubusercontent.com/75942405/198885491-ca57b6bf-f928-47b7-b911-41fb56743e57.png)

재료 추가된 데이터 서버 화면

![20221020_030709](https://user-images.githubusercontent.com/75942405/198885515-06fcfd25-0335-4531-906b-d09c19d110af.png)

요청 실패시 팝업된 모달 화면

![20221020_030740](https://user-images.githubusercontent.com/75942405/198885532-3e483ca5-013a-4c5c-9e0d-ffd067d4fbeb.png)

검색 시 데이터 서버의 데이터와 일치하면 출력되는 화면

![20221015_231903](https://user-images.githubusercontent.com/75942405/198885568-02880814-3dd3-4135-b71b-f39cfa4c3f2e.png)
