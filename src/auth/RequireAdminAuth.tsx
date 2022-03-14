import React, { Children } from 'react';
import {Navigate} from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface Props {
    children: JSX.Element
}

interface IdToken {
    claims: {
        role: String
    }
}

const RequireAdminAuth:React.FC<Props> = ({ children }) => {
    const auth = useAuth();
    if (!auth.user) {
      return <Navigate to="/login" />;
    }

    auth.user.getIdTokenResult()
        .then((token: IdToken) => {
            if(token.claims.role == "admin") {
                return true;
            }
        });
  
    return children;
  }
  
export default RequireAdminAuth;