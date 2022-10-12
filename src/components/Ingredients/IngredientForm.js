import React, {useRef, useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [enteredIngredient, setEnteredIngredient] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  /*const inputIngredientRef = useRef();  // useRef()를 사용하면 ref 를 만들 수 있다. ref 는 DOM 에 접근할 수 있게 해준다.
  const inputAmountRef = useRef();*/

  const submitHandler = event => {
    event.preventDefault();
    // ...
    /*const enteredIngredient = inputIngredientRef.current.value; // ref 를 사용하면 DOM 에 접근할 수 있게 해준다.
    const enteredAmount = inputAmountRef.current.value;*/

    const ingredientData = {
      title: enteredIngredient,
      amount: enteredAmount,
    }
    console.log(ingredientData);

    /*props.onAddIngredient(ingredientData);*/

  };

  const ingredientChangeHandler = (event) => {
    setEnteredIngredient(event.target.value)
  }

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value)
  }

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">재료명</label>
            {/*<input type="text" id="title" ref={inputIngredientRef}/>*/}
            <input type="text" id="title" value={enteredIngredient} onChange={ingredientChangeHandler}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">수량</label>
            {/*<input type="number" id="amount" ref={inputAmountRef}/>*/}
            <input type="number" id="amount" value={enteredAmount} onChange={amountChangeHandler}/>
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
