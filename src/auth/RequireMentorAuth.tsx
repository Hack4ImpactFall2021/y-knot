import React, { Children, useEffect, useState } from 'react';
import {Navigate} from 'react-router-dom';
import { AuthProvider, useAuth} from './AuthProvider';

interface Props {
    children: JSX.Element
}

const RequireMentorAuth:React.FC<Props> = ({ children }) => {

    const auth = useAuth();
    if (!auth.user || (auth.token.claims.role != "mentor" && auth.token.claims.role != "admin")) {
        return <Navigate to="/login" />
    }

    return <AuthProvider children={children}/>;
  }
  
export default RequireMentorAuth;