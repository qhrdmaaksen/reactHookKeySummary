import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import {AuthContext} from './context/auth-context';

const App = (props) => {
  /*useContext 를 통해 context 를 사용할 수 있다.
  useContext 는 context 를 구독하고 있다가 context 의 값이 변경되면 컴포넌트를 리렌더링한다.
  useContext 는 context 의 값을 리턴한다. useContext 는 context 의 값을 변경할 수 없다.
  useContext 는 context 의 값을 변경하기 위해서는 context 의 provider 를 사용해야 한다.*/
  const authContext = useContext(AuthContext);

  // context 의 값을 사용하는 컴포넌트는 context 의 값이 변경되면 리렌더링 된다.
  /*첫 렌더링 시 로그인 화면이 보이며 로그인이됐다면 Ingredients component 를 보여준다*/
  let content = <Auth />;
  if (authContext.isAuth) {
    content = <Ingredients />;
  }
  return content;
};

export default App;
