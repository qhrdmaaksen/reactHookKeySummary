import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import AuthContextProvider from './context/auth-context';

//react 18 version
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
);
/*react 17 version
ReactDOM.render(<App />, document.getElementById('root'));*/
