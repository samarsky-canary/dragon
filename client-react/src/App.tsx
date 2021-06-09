import React, { useContext, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { EditorPage } from './Pages/Editor/Editor';
import Login from './Pages/Login/Login';
import { NotFoundPage } from './Pages/NotFound/NotFound';
import { NavigationHeader } from './components/NavigationHeader';
import { DocPage } from './Pages/DocPage/DocPage';
import { UserContext } from './context/user.provider';
import { Curators } from './Pages/Curators/Curators';
import { About } from './Pages/About/About';
import { AuthStateService } from './services/AuthStateService';

const App: React.FC = () => {

  const { state, dispatch } = useContext(UserContext)


  // Check if user already have saved logged info
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      const as = new AuthStateService().getInstance();
      if (as.TokenVerification(foundUser.access_token))
      {
          as.setMeta(foundUser.uuid, foundUser.role, foundUser.username, foundUser.access_token)
          dispatch({
            type: "LOGIN",
            payload: foundUser
          });
      }
    }
  }, []);


  if (!state.access_token) {
    return <Login setRegisterData={dispatch} />
  }

  return (
    <div className='wrap-0'>
      <NavigationHeader />
        <Switch>
          <Route exact path="/docs">
            <DocPage />
          </Route>
          <Route exact path="/curators">
            <Curators />
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/">
            <EditorPage />
          </Route>
          <Route path="*" component={NotFoundPage} />
        </Switch>
    </div>
  );
}


export default App;