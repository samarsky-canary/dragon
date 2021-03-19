import { inherits } from 'node:util';
import React, {useState} from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

class LoginDTO {
    userName: string | undefined;
    password: string | undefined;
}



export const LoginPage = () => {

    const [login, setLoginValue]= useState<string>("");
    const [password, setPasswordValue]= useState<string>("");


    function handleLogInButtonClick() {
        const userData = new LoginDTO();
        userData.userName = login;
        userData.password = password;
         
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(userData),
        };
        const baseURL = "http://localhost:5000/api/users";
        fetch(baseURL,requestOptions).then(response => console.log(response));
    }

    const greet = "DRAKON IDE";
    return (
        <div>
            <Container>
                <Row className="justify-content-md-center">
                    <h1>{greet}</h1>
                </Row>
                <Row className="justify-content-md-center">
                    <input type="text" value={login} onChange={e=>{setLoginValue(e.target.value)}} ></input>
                </Row>
                <Row className="justify-content-md-center">
                    <input type="password" value={password} onChange={e=>{setPasswordValue(e.target.value)}}></input>
                </Row>
                <Row className="justify-content-md-center">
                    <Button variant="outline-primary" onClick={e=>{handleLogInButtonClick();}}>Login</Button>{' '}
                    <Button variant="outline-primary">Register</Button>{' '}
                </Row>
            </Container>
        </div>);
} 