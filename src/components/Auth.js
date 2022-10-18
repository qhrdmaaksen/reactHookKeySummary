import React, { useContext } from 'react';

import Card from './UI/Card';
import './Auth.css';
import {AuthContext} from '../context/auth-context';

// 로그인 폼을 보여주는 컴포넌트
const Auth = (props) => {
  // 로그인 폼의 입력값을 관리하기 위한 state

  // context 를 사용하기 위해 useContext 를 사용한다.
  const authContext = useContext(AuthContext);

  const loginHandler = () => {
    authContext.login();
  };

  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
