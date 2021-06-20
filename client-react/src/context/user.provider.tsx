import React, { FC, createContext } from 'react';
import { loginResponseDTO } from '../DTO/IloginResponseDTO';

const initialTokenState : loginResponseDTO = {
    access_token: undefined,
    role : undefined,
    username : undefined,
    uuid : undefined,
    email : undefined,
}


export type UserAction = {
    type :'LOGIN' | 'LOGOUT' | 'SIGNUP' | 'UPDATE';
    payload: loginResponseDTO
}

const userReducer = (state : loginResponseDTO, action : UserAction) :loginResponseDTO => {
    switch (action.type) {
      case "SIGNUP":
      case "LOGIN":
        localStorage.setItem('user', JSON.stringify(action.payload));
        return  action.payload;
      case "LOGOUT":
        localStorage.clear();
        return initialTokenState
      case "UPDATE":
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(action.payload));
        return action.payload;
      default:
        return state;
    }
  };

  interface UserContextProps {
    state: loginResponseDTO;
    dispatch: React.Dispatch<UserAction>;
  }

export const UserContext = createContext({} as UserContextProps);

  
// eslint-disable-next-line
export const UserProvider : FC = (props: any) => {
    const [state, dispatch] = React.useReducer(userReducer, initialTokenState);

    return(
        <UserContext.Provider value={{state, dispatch}}>
            {props.children}
        </UserContext.Provider>
    )
}