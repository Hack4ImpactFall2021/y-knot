import React, { Children } from 'react';
import {Navigate} from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface Props {
    children: JSX.Element
}

const RequireAuth:React.FC<Props> = ({ children }) => {
    const auth = useAuth();
    
    if (!auth.user) {
      return <Navigate to="/login" />;
    }
  
    return children;
  }
  
export default RequireAuth;