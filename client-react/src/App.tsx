import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { EditorPage } from './Editor/editorPage';
import Login from './Login/Login';
import { NotFoundPage } from './NotFound/NotFound';
import { NavigationHeader } from './components/NavigationHeader';
import { DocPage } from './DocPage/DocPage';


const App : React.FC = () => {

    const [token, setToken] = useState<string>();

    if (!token) {
        return (<Login setToken={setToken}></Login>)
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