import React, { useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import './Login.module.scss';
import {AuthStateService} from '../services/AuthStateService';
const greet = "DRAKON IDE";

const authStateService = new AuthStateService().getInstance();


interface Props {
    setToken: (value: string) => void;
}

export const Login: React.FC<Props> = ({setToken} : Props) => {
  const [username, setusername]= useState<string>("");
  const [password, setPasswordValue]= useState<string>("");

  const handleSubmit = (e? : React.FormEvent<HTMLInputElement>)=> {
      e?.preventDefault();
      authStateService.Authentificate(username, password).then(isLogged => {
          if (isLogged) {
            setToken(authStateService.getToken());
          }
      });
  }

  return (
      <div>
          <Container className="login-wrapper">
          <div className="my-5">
              <Row className="justify-content-md-center">
                  <h1>{greet}</h1>
              </Row>
              <Row className="justify-content-md-center">
                  <input type="text" value={username} onChange={e=>{setusername(e.target.value)}} ></input>
              </Row>
              <Row className="justify-content-md-center">
                  <input type="password" value={password} onChange={e=>{setPasswordValue(e.target.value)}}></input>
              </Row>
              <Row className="justify-content-md-center">
                  <Button variant="outline-primary" onClick={()=>{handleSubmit();}}>Login</Button>{' '}
              </Row>
              <Row className="justify-content-md-center">
                  <Button variant="outline-primary">Register</Button>{' '}
              </Row>
              </div>
          </Container>
      </div>);
};

export default Login;
