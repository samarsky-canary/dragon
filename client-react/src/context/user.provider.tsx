import React from 'react';

type IUserContextType = {
    username: string;
    access_token: string;
    uuid: string;
    role: string;
}

export const UserContext = React.createContext<Partial<IUserContextType>>({});

type Props = {
    children: React.ReactNode;
}

export const UserProvider = ({children}: Props) => {
   
    const defaultValue : IUserContextType = {
        username: "",
        access_token: "",
        uuid: "",
        role: ""
    }

    return(
        <UserContext.Provider value={defaultValue}>
            {children}
        </UserContext.Provider>
    )
}