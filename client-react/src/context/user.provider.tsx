import React, { FC, createContext } from 'react';

type UserState = {
    user?: string;
    token: string;
    uuid: string;
    role: string;
    isAuthenticated: boolean,
}
const initialState : UserState = {
    user: "",
    token: "",
    uuid: "",
    role: "",
    isAuthenticated: false
}


type UserAction = {
    type :'LOGIN' | 'LOGOUT';
    payload: UserState
}

const userReducer = (state : UserState, action : UserAction) :UserState => {
    switch (action.type) {
      case "LOGIN":
        localStorage.clear()
        localStorage.setItem("role", JSON.stringify(action.payload.role));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem("uuid", JSON.stringify(action.payload.uuid));
        return {
          ...action.payload,
          isAuthenticated: true,
        };
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          user: "",
          token: "",
          role: "",
          uuid: "",
          isAuthenticated: false,
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