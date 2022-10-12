import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

//react 18 version
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
/*react 17 version
ReactDOM.render(<App />, document.getElementById('root'));*/
