import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  /*ingredients 에 재료 목록이 저장되때문에 배열로 초기값 설정
   * 목록은 항상 전체가 업데이트되기 때문, 재료가 추가되거나 삭제될 경우*/
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    /*useEffect 미 사용 시 무한 루프 발생
데이터를 렌더링 함수 안에서 가져오게 되면, 재료 목록이 렌더링 될 때마다 HTTP 요청을 전송하게
됩니다, 그리고 HTTP 요청을 보낸 뒤에는 상태(state)를 업데이트하죠, 상태를
업데이트하면 무슨 일이 일어나죠? 컴포넌트가 리렌더링 됩니다, 그럼 재료 목록도 리렌더링 되기때문
useEffect 에 의존성배열인 빈 배열을 넣게되면 useEffect 안에 로직은 첫 전체 렌더링 후 한번만 실행되게됨*/
    /*firebase 에 저장된 재료 데이터 GET 요청*/
    fetch(
        'https://react-hooks-update-4630f-default-rtdb.firebaseio.com/ingredients.json',
    )
        .then((response) => response.json())
        .then((responseData) => {
          const loadedIngredients = [];
          for (const key in responseData) {
            loadedIngredients.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount,
            });
          }
          setUserIngredients(loadedIngredients);
        });
  }, []);

  /*이 함수는 새로 추가할 ingredient 를 받으며 받은 값은 배열에 저장되어야함*/
  const addIngredientHandler = (ingredient) => {
    /*fetch() 는 브라우저에서 제공하는 API로서,  HTTP 요청을 보내는 함수
     * 첫번째 인자로 요청할 URL을 전달하고, 두번째 인자로 요청에 대한 설정을 전달
     * 설정에는 method, body, header 등이 있음
     * method 는 요청의 종류를 설정하며, GET, POST, PUT, DELETE 등이 있음
     * body 는 요청에 포함할 데이터를 설정하며, JSON 형식으로 전달
     * string 형식으로 전달하려면 JSON.stringify() 를 사용
     * header 는 요청에 포함할 헤더를 설정하며, JSON 형식으로 전달
     * fetch() 는 Promise 를 반환하며, then() 을 통해 응답을 처리할 수 있음
     * 응답은 response 객체로 전달되며, response.json() 을 통해 JSON 형식의 데이터를 반환
     * 반환된 데이터는 then() 의 콜백 함수의 인자로 전달됨
     * catch() 를 통해 에러를 처리할 수 있음*/
    fetch(
      'https://react-hooks-update-4630f-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' },
      },
    )
      .then((response) => {
        /*response.json() 을 통해 반환된 데이터는 then() 의 콜백 함수의 인자로 전달됨
         * 이 데이터는 Firebase 에서 생성된 고유한 ID 값임*/
        return response.json();
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          /*...ingredient 는 기존의 배열에 새로운 요소를 추가하고 새로운 배열을 반환한다.
           * 새로운 요소는 {id: 'id', title: 'title', amount: 'amount'} 형태로 추가된다.*/
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
