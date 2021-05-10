import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { EditorPage } from "../Editor/editorPage";
import { Login } from "../Login/Login";

// export const NavigationBar = () => {
//     return (
//         <Router>
//             <div>
//                 <nav>
//                     <ul>
//                         <li>
//                         <Link to="/">Home</Link>
//                         </li>
//                         <li>
//                         <Link to="/editor">Editor</Link>
//                         </li>
//                     </ul>
//                 </nav>

//                 {/* A <Switch> looks through its children <Route>s and
//                     renders the first one that matches the current URL. */}
//                 <Switch>
//                     <Route exact path="/">
//                         <Login />
//                     </Route>
//                     <Route exact path="/editor">
//                         <EditorPage />
//                     </Route>
//                 </Switch>
//             </div>
//         </Router>
//     );
// }