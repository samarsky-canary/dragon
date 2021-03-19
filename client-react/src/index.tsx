import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { LoginPage } from './loginPage';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <LoginPage></LoginPage>
  </React.StrictMode>,
  document.getElementById('root')
);