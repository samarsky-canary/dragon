import React, {FC, useState} from 'react';
import { InputForm } from './components/inputForm';


export const LoginPage = () => {

    const [login, setLoginValue]= useState<string>("login");
    const [password, setPasswordValue]= useState<string>("password");

    const val = "";
    return (
        <div>
            <h1>{login}</h1>
            <InputForm textValue={login}></InputForm>
            <InputForm textValue={password} isPassword={true}></InputForm>
        </div>);
} 