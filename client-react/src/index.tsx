import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigationBar } from './components/navigationBar';


ReactDOM.render(
  <React.StrictMode>
    <NavigationBar></NavigationBar>
  </React.StrictMode>,
  document.getElementById('root')
);