import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {
  /*useState 로 두 개의 상태를 관리*/
  /*const inputState = useState({ title: '', amount: '' });*/

  //state 를 배열 구조화
  /*const [inputState, setInputState] = useState({title: '', amount: ''})*/

  //useState 로 각 input의 value를 관리하고, onChange 이벤트가 발생할 때마다 해당 input의 value를 변경해주는 방식으로 구현했다.
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  /*const inputIngredientRef = useRef();  // useRef()를 사용하면 ref 를 만들 수 있다. ref 는 DOM 에 접근할 수 있게 해준다.
  const inputAmountRef = useRef();*/

  const submitHandler = (event) => {
    event.preventDefault();
    // ...
    /*const enteredTitle = inputIngredientRef.current.value; // ref 를 사용하면 DOM 에 접근할 수 있게 해준다.
    const enteredAmount = inputAmountRef.current.value;*/

    /*const ingredientData = {
      title: enteredTitle,
      amount: enteredAmount,
    }*/
    /*console.log(ingredientData);*/

    /*props.onAddIngredient(ingredientData);*/
  };

  /*const ingredientChangeHandler = (event) => {
    setEnteredTitle(event.target.value)
  }

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value)
  }*/
  console.log(enteredTitle, enteredAmount)
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">재료명</label>
            {/*<input type="text" id="title" ref={inputIngredientRef}/>*/}
            <input
              type="text"
              id="title"
              value={enteredTitle}
              onChange={(event) => {
                setEnteredTitle(event.target.value)
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">수량</label>
            {/*<input type="number" id="amount" ref={inputAmountRef}/>*/}
            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={(event)=> {
                setEnteredAmount(event.target.value)
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">재료 추가</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
