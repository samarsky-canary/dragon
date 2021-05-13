import React, { FC } from 'react';



export const NavigationHeader : FC = () => {
    
    return(
        <header className="p3 bg-dark text-white">
            <div className="">
            <div className="p-2 d-flex flex-wrap align-items-center justify-content-lg-between justify-content-between ">

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><div className="nav-link px-2 text-secondary">DRAKON IDE</div></li>
                <li><a href="/" className="nav-link px-2 text-white">Редактор</a></li>
                <li><a href="#" className="nav-link px-2 text-white">Курирование</a></li>
                <li><a href="docs" className="nav-link px-2 text-white">Документация</a></li>
                <li><a href="#" className="nav-link px-2 text-white">О продукте</a></li>
                </ul>

                <div className="text-end justify-content-end">
                <button type="button" className="btn btn-outline-light m-1">Выйти</button>
                </div>
            </div>
            </div>
        </header>
    )
}