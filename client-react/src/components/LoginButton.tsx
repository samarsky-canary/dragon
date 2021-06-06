import React, {useContext} from 'react';
import { Button } from 'react-bootstrap';
import { UserAction, UserContext } from '../context/user.provider';
import { AuthStateService } from '../services/AuthStateService';


type Props = {
    setRegisterData: React.Dispatch<UserAction>;
    setErrorHidden: (value: boolean) => void;
    setErrorMessage: (value: string) => void;
    username: string;
    password: string;
    authStateService: AuthStateService
}


export const LoginButton : React.FC<Props> = ({
        username,
        password,
        setRegisterData,
        setErrorMessage,
        setErrorHidden,
        authStateService}) => {
    const {dispatch} = useContext(UserContext);

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
            setErrorMessage(response.statusText);
            setErrorHidden(false);
        }
    }

    return (
        <div>
            <Button variant="info btn-block" onKeyPress={(e) => { if (e.key === "Enter") handleLoginSubmit() }} onClick={(e) => { handleLoginSubmit(e); }}>Вход</Button>
        </div>
    );
}


