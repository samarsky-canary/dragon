import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import './Login.scss';
import { AuthStateService } from '../services/AuthStateService';

const greet = "DRAKON IDE";
const authStateService = new AuthStateService().getInstance();

interface Props {
    setToken: (value: string) => void;
}


export const Login: React.FC<Props> = ({ setToken }: Props) => {
    const [username, setusername] = useState<string>("");
    const [password, setPasswordValue] = useState<string>("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [errorHidden, setErrorHidden] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");


    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    const handleSubmit = (e?: React.FormEvent<HTMLInputElement>) => {
        e?.preventDefault();
        authStateService.Authentificate(username, password).then(isLogged => {
            if (isLogged.success) {
                setToken(authStateService.getToken());
            }
            else {
                setErrorMessage(isLogged.statusText);
                setErrorHidden(isLogged.success);
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
                                <Button variant="btn btn-primary btn-block" onClick={() => { handleSubmit(); }}>Login</Button>{' '}
                            </div>
                            <div className="justify-content-md-center">
                                <Button variant="btn btn-warning btn-block mt-2">Register</Button>{' '}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default Login;