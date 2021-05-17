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

    const {state,dispatch} = useContext(UserContext);



    const isTokenValid = (token: string) :boolean => {
      if (authService.TokenVerification(token)){
        dispatch({
          type: "LOGIN",
          payload: {
            user: "",
            token: token,
            role: localStorage.getItem('role')!,
            uuid: localStorage.getItem('uuid')!,
            isAuthenticated: true
          }
        })
        return true;
      }
      return false;
    }


    const token = localStorage.getItem('token')!;
    if (isTokenValid(token)) {
      return (<Login></Login>)
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