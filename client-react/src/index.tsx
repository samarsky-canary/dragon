import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { UserProvider } from './context/user.provider';
//import LogRocket from 'logrocket';
import { BrowserRouter } from 'react-router-dom';
import { KonvaProvider } from './context/konvaRef.provider';
//LogRocket.init('kpl3db/drakon');

ReactDOM.render(
  //<React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <KonvaProvider>
        <App/>
        </KonvaProvider>
      </UserProvider>
    </BrowserRouter>
  //</React.StrictMode>,
  ,
  document.getElementById('root')
);