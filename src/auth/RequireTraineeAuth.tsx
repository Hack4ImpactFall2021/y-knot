import React, { Children, useEffect, useState } from 'react';
import {Navigate} from 'react-router-dom';
import { useAuth} from './AuthProvider';

interface Props {
    children: JSX.Element
}

const RequireTraineeAuth:React.FC<Props> = ({ children }) => {

    const auth = useAuth();
    if (!auth.user || auth.token.claims.role != "trainee" || auth.token.claims.role != "admin") {
      return <Navigate to="/login" />;
    }

    return children;
  }
  
export default RequireTraineeAuth;