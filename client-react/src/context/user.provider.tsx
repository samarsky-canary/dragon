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
   
    return(
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    )
}