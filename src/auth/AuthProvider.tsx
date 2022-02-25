import { getAuth, onAuthStateChanged } from '@firebase/auth';
import React, { createContext, useContext, useEffect, useState} from 'react';
import app from '../config/firebase';

interface Props {
    children: JSX.Element
}

interface AuthContextType {
    user: any;
}

let AuthContext = createContext<AuthContextType>(null!);

// custom hook to useAuth
export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider: React.FC<Props> = ({children}) => {

    const [user, setUser] = useState<any>(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            setPending(false);
        });
    }, [])


    if (pending) {
        return (<h1>Loading</h1>)
    }

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
};

