import React, { FC, createContext } from 'react';

export type UserState = {
    token: string | undefined;
}
const initialTokenState : UserState = {
    token: undefined,
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
        console.log(sessionStorage.getItem('token'))
        return  action.payload;
      case "LOGOUT":
        localStorage.clear();
        return {
          token: undefined
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