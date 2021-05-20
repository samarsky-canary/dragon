import React, { useContext, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { EditorPage } from './Editor/editorPage';
import Login from './Login/Login';
import { NotFoundPage } from './NotFound/NotFound';
import { NavigationHeader } from './components/NavigationHeader';
import { DocPage } from './DocPage/DocPage';
import { UserContext } from './context/user.provider';
import { AuthStateService } from './services/AuthStateService';

const authService = new AuthStateService().getInstance();

const App : React.FC = () => {

    const {dispatch} = useContext(UserContext);

    const isTokenValid = (token: string) => {
      return authService.TokenVerification(token).then(isLogged => {
        if (isLogged){
          return true;
        }
        return false;
      });
    }
      


    const token = localStorage.getItem('token');
    if (!token) {
      return (<Login></Login>)
    } else {
      if (!isTokenValid(token)) {
        return (<Login></Login>)
      } else {
        console.log( localStorage.getItem('token'))
      }
    }

    return(
      <div className='wrap-0'>
        <NavigationHeader></NavigationHeader>
            <div className="wrapper">
              <BrowserRouter>
                <Switch>
                  <Route exact path="/">
                    <EditorPage />
                  </Route>
                  <Route exact path="/docs">
                    <DocPage />
                  </Route>
                  <Route component={NotFoundPage}/>
                </Switch>
              </BrowserRouter>
            </div>
      </div>
  );
}


export default App;