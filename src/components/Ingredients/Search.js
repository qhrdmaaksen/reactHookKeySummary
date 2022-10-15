import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');

  /*useEffect 미 사용 시 무한 루프 발생
데이터를 렌더링 함수 안에서 가져오게 되면, 재료 목록이 렌더링 될 때마다 HTTP 요청을 전송하게
됩니다, 그리고 HTTP 요청을 보낸 뒤에는 상태(state)를 업데이트하죠, 상태를
업데이트하면 무슨 일이 일어나죠? 컴포넌트가 리렌더링 됩니다, 그럼 재료 목록도 리렌더링 되기때문
useEffect 에 의존성배열인 빈 배열을 넣게되면 useEffect 안에 로직은 첫 전체 렌더링 후 한번만 실행되게됨*/
  /*firebase 에 저장된 재료 데이터 GET 요청*/
  /*사용자가 뭔가 입력할 때 필터링한 데이터를 Firebase 에서 가져오도록함
   * onChange 에 등록한 Fn 에서 키입력 들어올때마다 HTTP 요청을 보내도록함*/
  useEffect(() => {
    /*쿼리문 설정, 입력된 필터가 존재한다면 쿼리문으로 타이틀에서 일치하는 타이틀을 query 변수에 대입 */
    const query =
      enteredFilter.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch(
      'https://react-hooks-update-4630f-default-rtdb.firebaseio.com/ingredients.json' +
        query,
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
        onLoadIngredients(loadedIngredients);
      });
  }, [enteredFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
