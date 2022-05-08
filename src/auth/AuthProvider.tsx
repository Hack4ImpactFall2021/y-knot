import { getAuth, onAuthStateChanged } from '@firebase/auth';
import React, { createContext, useContext, useEffect, useState} from 'react';
import app from '../config/firebase';

import Loading from "./Loading";

interface Props {
  children: JSX.Element
}

interface AuthContextType {
  user: any;
  token: IdToken;
}

interface IdToken {
  claims: {
    role: String
  }
}

let AuthContext = createContext<AuthContextType>(null!);

// custom hook to useAuth
export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>({claims: {role: "none"}});
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user != null) {
        user.getIdTokenResult().then((token) => {
          setToken(token);
          setPending(false);
        });
      } else {
        setPending(false);
      }
    });
  }, [])


  if (pending) {
    return (<Loading/>);
  }

  return (
    <AuthContext.Provider value={{user, token}}>
      {children}
    </AuthContext.Provider>
  )
};

