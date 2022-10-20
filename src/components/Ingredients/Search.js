import React, { useEffect, useState, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttp from '../../hooks/http'; // custom hooks 임포트
import ErrorModal from '../UI/ErrorModal';

const Search = React.memo((props) => {
  const { sendRequest, data, isLoading, error, clear } = useHttp(); //useHttp 함수 안에서 리턴해준 것을 불러와서 상수에 저장하는 방식으로 사용
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const filterInputRef = useRef();

  /*useEffect 미 사용 시 무한 루프 발생
데이터를 렌더링 함수 안에서 가져오게 되면, 재료 목록이 렌더링 될 때마다 HTTP 요청을 전송하게
됩니다, 그리고 HTTP 요청을 보낸 뒤에는 상태(state)를 업데이트하죠, 상태를
업데이트하면 무슨 일이 일어나죠? 컴포넌트가 리렌더링 됩니다, 그럼 재료 목록도 리렌더링 되기때문
useEffect 에 의존성배열인 빈 배열을 넣게되면 useEffect 안에 로직은 첫 전체 렌더링 후 한번만 실행되게됨*/
  /*firebase 에 저장된 재료 데이터 GET 요청*/
  /*사용자가 뭔가 입력할 때 필터링한 데이터를 Firebase 에서 가져오도록함
   * onChange 에 등록한 Fn 에서 키입력 들어올때마다 HTTP 요청을 보내도록함*/
  useEffect(() => {
    const timer = setTimeout(() => {
      // 500 밀리초가 지난 뒤에 확인하는 코드
      // filterInputRef.current.value 는 현재 입력된 필터값
      // enteredFilter 는 이전 필터값
      // 두 값이 다르면 HTTP 요청을 보냄
      // 두 값이 같으면 HTTP 요청을 보내지 않음
      // 이렇게 하면 사용자가 입력을 빠르게 할 때도 HTTP 요청을 보내지 않음
      // 또한, 이전 필터값을 저장하는 enteredFilter 를 사용하면 이전 필터값을 저장할 필요가 없음
      // enteredFilter 는 이전 필터값을 저장하고 있기 때문
      // value 는 현재 입력된 값이며 inputRef 가 클로저 바깥에 정의되었기 때문에 어떤 값에 고정되어있지않음
      if (enteredFilter === filterInputRef.current.value) {
        /*쿼리문 설정, 입력된 필터가 존재한다면 쿼리문으로 타이틀에서 일치하는 타이틀을 query 변수에 대입 */
        const query =
          enteredFilter.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        console.log('query', query);
        sendRequest(
          'https://react-hooks-update-4630f-default-rtdb.firebaseio.com/ingredients.json' +
            query,
          'GET',
        );
        /*fetch(
          'https://react-hooks-update-4630f-default-rtdb.firebaseio.com/ingredients.json' +
            query,
        )
          .then((response) => response.json())
          .then((responseData) => {*/
      }
    }, 500);
    // useEffect 에서 어떤것도 반환하지 않아도되지만 만약 반환한다면 그것은 반드시 함수여야함
    /*클린업 함수에서 clearTimeout()을 호출합니다, 인수로 타이머를 넘기면 
자바스크립트에서는 타이머를 해제함, 타이머가 지워지는 시점은 현재 이펙트에서 실행한 클린업 함수는 다음 이펙트 실행 전에 동작하므로
타이머는 새로운 타이머가 설정되기 직전에 지워짐, 이렇게 하면 실행중인 타이머의 개수를
한 개로 유지할 수 있죠, 훨씬 낫습니다, 불필요한 타이머를 메모리에 유지할 필요가 없으니까요
타이머를 한 개만 사용하는것임, 메모리 효율이 좋아짐 만든 타이머들을 계속해서 메모리에 들고 있지 않으니까요
대신 한 번에 하나의 타이머만 사용합니다, 이렇게 이펙트를 초기화하는 거죠
웹 서비스를 구독하여 개발에 사용하는 경우도 있을 거고요
어떤 값을 주기적으로 받아서 사용한다면, 이전에 받았던 내용을 지우고 싶을 겁니다
useEffect()에서 새로운 내용을 설정하기 위해서요, 여기서는 그 대상이 타이머죠, 이전 타이머를
지우고 새로운 타이머를 만들면, 안 쓰는 타이머들은 메모리에서 사라집니다
그냥 두면 더 많은 메모리를 차지해서 앱 성능을 저하시키죠*/
    return () => {
      clearTimeout(timer);
      console.log('timer clean up');
    };
  }, [enteredFilter, sendRequest, filterInputRef]);

  // 응답 처리하기기 위한 useEffect
  useEffect(() => {
    if (!isLoading && !error && data) {
      // data는 http custom hooks 에서 받아온 데이터
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadIngredients(loadedIngredients);
    }
    console.log(
      'onLoadIngredients',
      onLoadIngredients,
      'enteredFilter',
      enteredFilter,
    );
  }, [data, isLoading, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>...Loading</span>}
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
            ref={filterInputRef}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
