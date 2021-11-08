import React, { Children } from 'react';
import {Navigate} from 'react-router-dom';

interface Props {
    children: JSX.Element
}

const RequireAuth:React.FC<Props> = ({ children }) => {
    const auth = {user : null}
    
    if (!auth.user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" />;
    }
  
    return children;
  }
  
export default RequireAuth;