import React, { createContext, useContext, useMemo, useState} from 'react';

interface Props {
    children: JSX.Element
}

interface AuthContextType {
    user: string;
    login: (user: string, callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
  }

let AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider: React.FC<Props> = ({children}) => {

    const [user, setUser] = React.useState<any>(null);

    let login = (newUser: string, callback: VoidFunction) => {
        setUser(newUser);
        callback();
    };
  
    let logout = (callback: VoidFunction) => {
        setUser(null);
        callback();
    };

    const value = {user, login, logout}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

