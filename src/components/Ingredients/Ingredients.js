import React, {useCallback, useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
function Ingredients() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  /*ingredients 에 재료 목록이 저장되때문에 배열로 초기값 설정
   * 목록은 항상 전체가 업데이트되기 때문, 재료가 추가되거나 삭제될 경우*/
  const [userIngredients, setUserIngredients] = useState([]);

  /*이제 Search 컴포넌트에서는 onLoadIngredients 로 함수를 받음
    Ingredients 컴포넌트에서 Search 컴포넌트의 해당 프로퍼티에 값을 넣어주며
    함수 포인터를 넘기거나 함수를 추가함, Search 컴포넌트에서 onLoadIngredients 가
    호출됐을 때 실행할 함수*/
  // useCallback 을 사용하여 함수를 캐싱 가능 (최적화)
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  /*이 함수는 새로 추가할 ingredient 를 받으며 받은 값은 배열에 저장되어야함*/
  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    /*fetch() 는 브라우저에서 제공하는 API 로서,  HTTP 요청을 보내는 함수
     * 첫번째 인자로 요청할 URL 을 전달하고, 두번째 인자로 요청에 대한 설정을 전달
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
      `https://react-hooks-update-4630f-default-rtdb.firebaseio.com/ingredients.json`,
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' },
      },
    )
      .then((response) => {
        setIsLoading(false);
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
      }).catch(error => {
        setError('재료 추가 요청 처리 중 에러가 발생했습니다.')
        setIsLoading(false);
    })
  };

  /*이 함수는 삭제할 ingredient 의 id 를 받으며 받은 값은 배열에서 제거되어야함*/
  const removeIngredientHandler = (ingredientId) => {
    setIsLoading(true);
    // Firebase 에서 데이터를 삭제할 때는 해당 데이터의 고유한 ID 값을 사용
    fetch(
      `https://react-hooks-update-4630f-default-rtdb.firebaseio.com/ingredients/${ingredientId}.jon`,
      {
        method: 'DELETE',
      },
    ).then((response) => {
      setIsLoading(false);
      // 삭제가 완료되면, 기존의 배열에서 해당 요소를 제거
      setUserIngredients((prevIngredients) =>
        // filter() 는 배열의 요소를 순회하며, 콜백 함수의 조건에 맞는 요소만 반환
        // 콜백 함수의 인자로 요소, 인덱스, 배열이 순서대로 전달됨
        // 콜백 함수의 조건은 true 를 반환하면 해당 요소를 반환하고, false 를 반환하면 해당 요소를 제외
        // 콜백 함수의 조건은 요소의 id 가 전달받은 ingredientId 와 같지 않은 경우에만 true 를 반환
        // 즉, 전달받은 ingredientId 와 같은 요소는 제외하고, 나머지 요소를 반환 => 전달받은 ingredientId 와 같은 요소를 제거
        // 콜백 함수의 조건이 true 를 반환하는 요소만 반환되므로, 전달받은 ingredientId 와 같은 요소는 제거된 배열이 반환됨
        prevIngredients.filter((ingredient) => ingredient.id !== ingredientId),
      );
    }).catch(error => {
      setError('재료 삭제 요청 처리 중 에러가 발생하였습니다.');
      setIsLoading(false);
    })
  };

  const clearError = () => {
    setError(null);
  }

  return (
      <div className="App">
        {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
        <IngredientForm
          onAddIngredient={addIngredientHandler}
          loading={isLoading}
        />
        <section>
          <Search onLoadIngredients={filteredIngredientsHandler} />
          <IngredientList
            ingredients={userIngredients}
            onRemoveItem={removeIngredientHandler}
          />
        </section>
      </div>
  );
}

export default Ingredients;
