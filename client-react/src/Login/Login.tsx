import React, { MouseEvent, useContext, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import './Login.scss';
import { AuthStateService } from '../services/AuthStateService';
import { UserContext, UserState } from '../context/user.provider';

const greet = "DRAKON IDE";
const authStateService = new AuthStateService().getInstance();

export const Login: React.FC = () => {
    const [username, setusername] = useState<string>("");
    const [password, setPasswordValue] = useState<string>("");

    const [passwordShown, setPasswordShown] = useState(false);
    const [errorHidden, setErrorHidden] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    
    const {state, dispatch} = useContext(UserContext);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    const handleLoginSubmit = (e?: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
        e?.preventDefault();
        authStateService.Authentificate(username, password).then(response => {
            if (response.status === 200) {
                const payload : UserState = {
                    token: response.body!.access_token,
                    uuid: response.body!.uuid,
                    role: response.body!.role
                };
                dispatch({
                    type: "LOGIN",
                    payload: payload 
                })
            }
            else {
                setErrorMessage(response.statusText);
                setErrorHidden(false);
            }
        });
    }

    const handleSignupSubmit = (e?: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
        e?.preventDefault();
        authStateService.RegisterUser(username, password).then(response => {
            if (response.status === 201) {
                const payload : UserState = {
                    token: response.body!.access_token,
                    uuid: response.body!.uuid,
                    role: response.body!.role
                };
                dispatch({
                    type: "SIGNUP",
                    payload: payload 
                })
            }
            else {
                setErrorMessage(response.statusText);
                setErrorHidden(false);
            }
        });
    }



    return (
        <div className="background-div bg-dark text-white">
            <div className="container">
                <div className="row my-5 d-flex justify-content-center">
                    <div className="col-4">
                        <h1 className="text-center mb-2">{greet}</h1>
                        <div className="form-group">
                            <div className="form-group">
                                <label>Логин</label>
                                <input className="form-control" type="text" value={username} onChange={e => { setusername(e.target.value) }} ></input>
                            </div>
                            <div className="form-group">
                                <label>Пароль</label>
                                <input 
                                    className="form-control" 
                                    type={passwordShown ? "text" : "password"} 
                                    value={password} 
                                    onChange={e => { setPasswordValue(e.target.value) }}>
                                </input>
                                <img className="img-fluid" src={process.env.PUBLIC_URL + '/icons/eye.ico'} onClick={togglePasswordVisiblity}></img>
                                <Alert hidden={errorHidden} variant="danger">
                                {errorMessage}
                                </Alert>
                            </div>
                            <div className="justify-content-md-center">
                                <Button variant="btn btn-primary btn-block" onClick={(e) => { handleLoginSubmit(e); }}>Вход</Button>{' '}
                            </div>
                            <div className="justify-content-md-center">
                                <Button variant="btn btn-warning btn-block mt-2" onClick={(e) => { handleSignupSubmit(e)} }>Регистрация</Button>{' '}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default Login;