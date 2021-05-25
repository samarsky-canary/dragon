import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import './Login.scss';
import { AuthStateService } from '../../services/AuthStateService';
import { UserAction } from '../../context/user.provider';

const greet = "DRAKON IDE";
const authStateService = new AuthStateService().getInstance();


type Props = {
    setToken: React.Dispatch<UserAction>;
}


export const Login: React.FC<Props> = ({ setToken }) => {
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
                    token: response.body.access_token,
                    role: response.body.role,
                    username: response.body.username,
                    uuid: response.body.uuid,
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
                    token: response.body.access_token,
                    role: response.body.role,
                    username: response.body.username,
                    uuid: response.body.uuid,
                }
            });
        }
        else {
            setErrorMessage(response.statusText);
            setErrorHidden(false);
        }
    }


    useEffect(() => {
        document.title = "Вход и регистрация"
    });

    return (
        <div className="background-div bg-dark text-white">
            <Container>
                <h1 className="text-center mb-2">{greet}</h1>
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите Ваш уникальный логин"
                            value={username}
                            onChange={e => { setusername(e.target.value) }} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control 
                            type={passwordShown ? "text" : "password"} 
                            placeholder="Пароль" 
                            value={password}
                            onChange={e => { setPasswordValue(e.target.value) }} />
                        <img className="img-fluid" src={process.env.PUBLIC_URL + '/icons/eye.ico'} onClick={togglePasswordVisiblity}></img>
                        <Alert hidden={errorHidden} variant="danger">{errorMessage}</Alert>
                    </Form.Group>
                    <Button variant="info btn-block" onKeyPress={(e) => { if (e.key === "Enter") handleLoginSubmit() }} onClick={(e) => { handleLoginSubmit(e); }}>Вход</Button>
                    <Button variant="warning btn-block mt-2" onClick={(e) => { handleSignupSubmit(e) }}>Регистрация</Button>
                </Form>
            </Container >
        </div >);
};

export default Login;