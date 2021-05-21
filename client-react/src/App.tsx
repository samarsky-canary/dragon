import React, { useContext } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { EditorPage } from './Pages/Editor/editorPage';
import Login from './Pages/Login/Login';
import { NotFoundPage } from './Pages/NotFound/NotFound';
import { NavigationHeader } from './components/NavigationHeader';
import { DocPage } from './Pages/DocPage/DocPage';
import { UserContext } from './context/user.provider';
import { Curators } from './Pages/Curators/Curators';
import { About } from './Pages/About/About';

const App: React.FC = () => {

  const { state, dispatch } = useContext(UserContext)

  if (!state.token) {
    return <Login setToken={dispatch} />
  }

  return (
    <div className='wrap-0'>
      <NavigationHeader />
      <div className="wrapper">
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
    </div>
  );
}


export default App;