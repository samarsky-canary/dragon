import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import './Login.scss';
import { AuthStateService } from '../../services/AuthStateService';
import { UserAction } from '../../context/user.provider';
import VisibilityIcon from '@material-ui/icons/Visibility';


const greet = "DRAKON IDE";
const authStateService = new AuthStateService().getInstance();


type Props = {
    setRegisterData: React.Dispatch<UserAction>;
}


export const Login: React.FC<Props> = ({ setRegisterData }) => {
    const [username, setusername] = useState<string>("");
    const [password, setPasswordValue] = useState<string>("");
    const [email, setEmail] = useState<string>("");

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
            console.log(response.body)
            setRegisterData({
                type: "LOGIN",
                payload: response.body
            });
        }
        else {
            if (response.statusText) {
                setErrorMessage(response.statusText.replace("QueryFailedError:", ''));
            } else {
                setErrorMessage("No response")
            }
            setErrorHidden(false);
        }
    }

    const handleSignupSubmit = async (e?: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
        e?.preventDefault();
        const response = await authStateService.RegisterUser(username, password, email);
        if (response.status === 201 && response.body) {
            setRegisterData({
                type: "LOGIN",
                payload: response.body
            });
        }
        else {
            if (response.statusText) {
                setErrorMessage(response.statusText);
            } else {
                setErrorMessage("No response")
            }
            setErrorHidden(false);
        }
    }


    useEffect(() => {
        document.title = "Вход и регистрация"
    }, []);

    return (
        <div className="background-div bg-dark text-white">
            <Container className="login-content">
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
                    <Form.Group controlId="email">
                        <Form.Label>Почта</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={e => { setEmail(e.target.value) }} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type={passwordShown ? "text" : "password"}
                            placeholder="Пароль"
                            value={password}
                            onChange={e => { setPasswordValue(e.target.value) }} />
                        <VisibilityIcon onClick={togglePasswordVisiblity} />
                        <Alert hidden={errorHidden} variant="danger">{errorMessage}</Alert>
                    </Form.Group>
                    <Button
                        variant="info btn-block"
                        onKeyPress={(e) => {
                            if (e.key === "Enter")
                                handleLoginSubmit()
                        }} onClick={(e) => { handleLoginSubmit(e); }}
                    >
                        Вход
                    </Button>
                    <Button variant="warning btn-block mt-2" onClick={(e) => { handleSignupSubmit(e) }}>Регистрация</Button>
                </Form>
            </Container >
        </div >);
};

export default Login;