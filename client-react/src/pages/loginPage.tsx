import React, {useState} from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';

class LoginDTO {
    username: string | undefined;
    password: string | undefined;
}



export const LoginPage = () => {

    const [login, setLoginValue]= useState<string>("");
    const [password, setPasswordValue]= useState<string>("");
    const [jwtToken, setJwtToken]= useState<string>("");

    function handleLogInButtonClick() {
        const baseApiURl = "http://localhost:5000/api/auth/login";

        const userData = new LoginDTO();
        userData.username = login;
        userData.password = password;
        
        axios.post(baseApiURl,userData).then((response: any) => {
            console.log(response);
        }).catch(err=> console.log(err));
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
                </Row>
                <Row className="justify-content-md-center">
                    <Button variant="outline-primary">Register</Button>{' '}
                </Row>
            </Container>
        </div>);
} 