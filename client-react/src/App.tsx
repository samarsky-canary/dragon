import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { EditorPage } from './Editor/editorPage';
import Login from './Login/Login';
import { NotFoundPage } from './NotFound/NotFound';


const App : React.FC = () => {

    const [token, setToken] = useState<string>();

    if (!token) {
        return (<Login setToken={setToken}></Login>)
    }

    return(
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <EditorPage />
          </Route>
          <Route component={NotFoundPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}


export default App;