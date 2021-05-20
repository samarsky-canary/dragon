import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { LogoutButton } from './LogoutButton';



export const NavigationHeader : React.FC = () => {
    
    return(
        <header className="p3 bg-dark text-white">
            <div className="">
            <div className="p-2 d-flex flex-wrap align-items-center justify-content-lg-between justify-content-between ">

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <BrowserRouter>
                <li><div className="nav-link px-2 text-secondary">DRAKON IDE</div></li>
                <li>
                    <Link to="/" className = "nav-link px-2 text-white">Редактор</Link>
                </li>
                <li>
                    <Route>
                        <Link to="/" className = "nav-link px-2 text-white">Курирование</Link>
                    </Route>
                </li>
                <li>
                    <Link to="/docs" className = "nav-link px-2 text-white">Документация</Link>
                </li>
                <li>
                    <Link to="/" className = "nav-link px-2 text-white">О программе</Link>
                </li>
                </BrowserRouter>
                </ul>

                <div className="text-end justify-content-end">
                <LogoutButton/>                
                </div>
            </div>
            </div>
        </header>
    )
}