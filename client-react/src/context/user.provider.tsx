import React, { FC, createContext } from 'react';

export type UserState = {
    token: string | undefined;
    role: string | undefined;
    username: string | undefined;
    uuid: string | undefined;
}
const initialTokenState : UserState = {
    token: undefined,
    role : undefined,
    username : undefined,
    uuid : undefined,
}


export type UserAction = {
    type :'LOGIN' | 'LOGOUT' | 'SIGNUP';
    payload: UserState
}

const userReducer = (state : UserState, action : UserAction) :UserState => {
    console.log(state.token);
    switch (action.type) {
      case "SIGNUP":
      case "LOGIN":
        sessionStorage.setItem('token', JSON.stringify(action.payload.token));
        sessionStorage.setItem('role', JSON.stringify(action.payload.role));
        sessionStorage.setItem('username', JSON.stringify(action.payload.role));
        sessionStorage.setItem('uuid', JSON.stringify(action.payload.role));
        console.log(sessionStorage.getItem('token'))
        return  action.payload;
      case "LOGOUT":
        localStorage.clear();
        return {
          token: undefined,
          role : undefined,
          username : undefined,
          uuid : undefined,
        };
      default:
        return state;
    }
  };

  interface UserContextProps {
    state: UserState;
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