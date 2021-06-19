import React, {useContext} from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../context/user.provider';




export const LogoutButton : React.FC = () => {
    const {dispatch} = useContext(UserContext);


    function handleLogout(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.preventDefault();
        dispatch({
            type: "LOGOUT",
            payload: {
                access_token: undefined,
                role : undefined,
                username: undefined,
                uuid: undefined,
                email: undefined,
            }
        })
    }

    return (
        <div>
            <Button variant="outline-info btn-block mt-1" onClick={(e) => { handleLogout(e)} }>Выйти</Button>{' '}
        </div>
    );
}


