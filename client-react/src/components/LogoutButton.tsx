import React, {useContext} from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../context/user.provider';




export const LogoutButton : React.FC = () => {
    const {state,dispatch} = useContext(UserContext);


    function handleLogout(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        dispatch({
            type: "LOGOUT",
            payload: {
                token: undefined,
                uuid: undefined,
                role: undefined
            }
        })
    }

    return (
        <div>
            <Button variant="btn btn-outline-light btn-block mt-1" onClick={(e) => { handleLogout(e)} }>Выйти</Button>{' '}
        </div>
    );
}


