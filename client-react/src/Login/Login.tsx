import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import './Login.scss';
import { AuthStateService } from '../services/AuthStateService';
import { UserAction } from '../context/user.provider';

const greet = "DRAKON IDE";
const authStateService = new AuthStateService().getInstance();


type Props = {
    setToken: React.Dispatch<UserAction>;
}


export const Login: React.FC<Props> = ({setToken}) => {
    const [username, setusername] = useState<string>("");
    const [password, setPasswordValue] = useState<string>("");

    const [passwordShown, setPasswordShown] = useState(false);
    const [errorHidden, setErrorHidden] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    const handleLoginSubmit = async (e?: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
        e?.preventDefault();
        const response = await authStateService.Authentificate(username, password);
        if (response.status === 200 && response.body) {
            setToken({
                type: "LOGIN",
                payload: {     
                    token: response.body.access_token
                } 
            });
        }
        else {
            setErrorMessage(response.statusText);
            setErrorHidden(false);
        }
    }

    const handleSignupSubmit = async (e?: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
        e?.preventDefault();
        const response = await authStateService.RegisterUser(username, password);
        if (response.status === 201 && response.body) {
            setToken({
                type: "LOGIN",
                payload: {     
                    token: response.body.access_token
                } 
            });
        }
        else {
            setErrorMessage(response.statusText);
            setErrorHidden(false);
        }
    }


    useEffect(()=>{
        document.title = "Вход и регистрация"
    });

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