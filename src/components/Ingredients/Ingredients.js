import React, { useCallback, useState, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

//useReducer 는 useState 보다 더 복잡한 상태 업데이트 로직을 작성할 수 있지만,  useState 보다 더 복잡하다.
const ingredientReducer = (currentIngredients, action) => {
  //action.type 은 dispatch 함수의 인자로 전달된 객체의 type 프로퍼티를 참조한다.
  switch (action.type) {
    case 'SET': //action.type 이 SET 이면 action.ingredients 를 반환 한다.
      return action.ingredients;
    case 'ADD': //action.type 이 ADD 이면 action.ingredient 를 currentIngredients 에 추가 한다.
      return [...currentIngredients, action.ingredient];
    case 'DELETE': //action.type 이 DELETE 이면 action.id 를 currentIngredients 에서 제거 한다.
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error('ingredientReducer::Should not get there!');
  }
};
// httpReducer 는 loading 과 error 를 관리한다.
// loading 은 true/false 로 관리하고, error 는 null/string 으로 관리한다.
// loading 은 http 요청을 보내는 중인지 아닌지를 나타내고, error 는 http 요청이 실패했을 때 에러 메시지를 나타낸다.
// http 요청을 보내는 중이면 loading 을 true 로, 요청이 완료되면 loading 을 false 로 설정한다.
// http 요청이 실패하면 error 에 에러 메시지를 설정하고, http 요청이 성공하면 error 를 null 로 설정한다.
const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...curHttpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...curHttpState, error: null };
    default:
      throw new Error('httpReducer::Should not be reached!');
  }
};

function Ingredients() {
  //useReducer 를 사용하여 userIngredients 를 관리한다.
  /*ingredientReducer 는 reducer 함수이고, [] 는 초기값이다.dispatch 는 reducer 함수를 호출하는 함수이다.
  dispatch 는 action 객체를 인자로 전달 받는다. action 객체는 type 프로퍼티를 가지고 있어야 한다.
  action 객체의 type 프로퍼티에 따라 reducer 함수가 호출된다. reducer 함수는 action 객체를 인자로 전달 받는다.
  reducer 함수는 action 객체의 type 프로퍼티에 따라 다른 로직을 수행한다.*/
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);

  //useReducer 를 사용하여 httpState 를 관리한다.
  //httpReducer 는 reducer 함수이고, {loading: false, error: null} 는 초기값이다.
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  //  const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState();

  /*ingredients 에 재료 목록이 저장되때문에 배열로 초기값 설정
   * 목록은 항상 전체가 업데이트되기 때문, 재료가 추가되거나 삭제될 경우*/
  //const [userIngredients, setUserIngredients] = useState([]);

  /*이제 Search 컴포넌트에서는 onLoadIngredients 로 함수를 받음
    Ingredients 컴포넌트에서 Search 컴포넌트의 해당 프로퍼티에 값을 넣어주며
    함수 포인터를 넘기거나 함수를 추가함, Search 컴포넌트에서 onLoadIngredients 가
    호출됐을 때 실행할 함수*/
  // useCallback 을 사용하여 함수를 캐싱 가능 (최적화)
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    //setUserIngredients(filteredIngredients);
    //dispatch 함수를 호출하여 reducer 함수를 호출한다.
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  /*이 함수는 새로 추가할 ingredient 를 받으며 받은 값은 배열에 저장되어야함*/
  const addIngredientHandler = (ingredient) => {
    //setIsLoading(true);
    dispatchHttp({type: 'SEND'});
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
        //setIsLoading(false);
        dispatchHttp({type: 'RESPONSE'});
        /*response.json() 을 통해 반환된 데이터는 then() 의 콜백 함수의 인자로 전달됨
         * 이 데이터는 Firebase 에서 생성된 고유한 ID 값임*/
        return response.json();
      })
      .then((responseData) => {
        dispatch({
          type: 'ADD',
          ingredient: { id: responseData.name, ...ingredient },
        });
        /*setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          /!*...ingredient 는 기존의 배열에 새로운 요소를 추가하고 새로운 배열을 반환한다.
           * 새로운 요소는 {id: 'id', title: 'title', amount: 'amount'} 형태로 추가된다.*!/
          { id: responseData.name, ...ingredient },
        ]);*/
      })
      .catch((error) => {
        /*setError('재료 추가 요청 처리 중 에러가 발생했습니다.');
        setIsLoading(false);*/
        dispatchHttp({type: 'ERROR', errorMessage: '재료 추가 요청 처리 중 에러가 발생했습니다.'});
      });
  };

  /*이 함수는 삭제할 ingredient 의 id 를 받으며 받은 값은 배열에서 제거되어야함*/
  const removeIngredientHandler = (ingredientId) => {
    //setIsLoading(true);
    dispatchHttp({type: 'SEND'});
    // Firebase 에서 데이터를 삭제할 때는 해당 데이터의 고유한 ID 값을 사용
    fetch(
      `https://react-hooks-update-4630f-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE',
      },
    )
      .then((response) => {
        //setIsLoading(false);
        dispatchHttp({type: 'RESPONSE'});
        // 삭제가 완료되면, 기존의 배열에서 해당 요소를 제거

        dispatch({
          type: 'DELETE',
          id: ingredientId,
        });

        /*setUserIngredients((prevIngredients) =>
          // filter() 는 배열의 요소를 순회하며, 콜백 함수의 조건에 맞는 요소만 반환
          // 콜백 함수의 인자로 요소, 인덱스, 배열이 순서대로 전달됨
          // 콜백 함수의 조건은 true 를 반환하면 해당 요소를 반환하고, false 를 반환하면 해당 요소를 제외
          // 콜백 함수의 조건은 요소의 id 가 전달받은 ingredientId 와 같지 않은 경우에만 true 를 반환
          // 즉, 전달받은 ingredientId 와 같은 요소는 제외하고, 나머지 요소를 반환 => 전달받은 ingredientId 와 같은 요소를 제거
          // 콜백 함수의 조건이 true 를 반환하는 요소만 반환되므로, 전달받은 ingredientId 와 같은 요소는 제거된 배열이 반환됨
          prevIngredients.filter(
            (ingredient) => ingredient.id !== ingredientId,
          ),
        );*/
      })
      .catch((error) => {
        // 에러가 발생하면, 에러 메시지를 출력하고, 로딩 상태를 false 로 변경
        /*setError('재료 삭제 요청 처리 중 에러가 발생하였습니다.');
        setIsLoading(false);*/
        dispatchHttp({type: 'ERROR', errorMessage: '재료 삭제 요청 처리 중 에러가 발생하였습니다.'});
      });
  };

  const clearError = () => {
    // 이후, 에러 메시지를 초기화
    // 이 함수는 IngredientForm 컴포넌트에서 사용됨
    // 에러 메시지가 발생하면, 에러 메시지를 출력하고, 이후에는 에러 메시지를 초기화
    //setError(null);
    dispatchHttp({type: 'CLEAR'});
  };

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
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
