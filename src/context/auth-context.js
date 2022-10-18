import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = () => {
    setIsAuthenticated(true);
  };
  //provider 는 value 로 값을 받으며 이 값이 변경되면 provider 를 구독하는 모든 컴포넌트에게 변경된 값을 전달한다.
  //이를 통해 컴포넌트 간의 데이터 전달이 가능하다.
  return (
    <AuthContext.Provider
      value={{ isAuth: isAuthenticated, login: loginHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
