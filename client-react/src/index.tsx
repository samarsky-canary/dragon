import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { UserProvider } from './context/user.provider';
import LogRocket from 'logrocket';
LogRocket.init('kpl3db/drakon');


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App/>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);