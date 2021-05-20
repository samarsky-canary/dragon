import React, { FC, createContext } from 'react';

export type UserState = {
    token: string | undefined;
    uuid: string | undefined;
    role: string | undefined;
}
const initialState : UserState = {
    token: undefined,
    uuid: undefined,
    role: undefined,
}


type UserAction = {
    type :'LOGIN' | 'LOGOUT' | 'SIGNUP' | "UPDATELOCAL";
    payload: UserState
}

const userReducer = (state : UserState, action : UserAction) :UserState => {
    switch (action.type) {
      case "SIGNUP":
      case "LOGIN":
        localStorage.clear()
        localStorage.setItem("role", JSON.stringify(action.payload.role));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem("uuid", JSON.stringify(action.payload.uuid));
        return  action.payload;
      case "LOGOUT":
        localStorage.clear();
        return {
          token: undefined,
          role: undefined,
          uuid: undefined,
        };
      default:
        return state;
    }
  };

  interface IContextProps {
    state: UserState;
    dispatch: React.Dispatch<UserAction>;
  }

export const UserContext = createContext({} as IContextProps);

  
// eslint-disable-next-line
export const UserProvider : FC = (props: any) => {
    const [state, dispatch] = React.useReducer(userReducer, initialState);

    return(
        <UserContext.Provider value={{state, dispatch}}>
            {props.children}
        </UserContext.Provider>
    )
}