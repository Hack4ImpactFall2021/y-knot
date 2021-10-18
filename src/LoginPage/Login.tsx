import React, {useState} from 'react';

import LoginTextField from './LoginTextField/LoginTextField';
import LoginButton from './LoginButton/LoginButton';
import './Login.css'

function Login() {
  return (
    <div className='login-page'>
    
      <div className='login-page-left'>

        <div className='login-welcome'>
          <h1>Welcome</h1><hr/>
          <h4>Y-KNOT Mentor Application Portal</h4>
        </div>
        
      </div>

      <div className='login-page-right'>

        {/* Logo Goes Here */}

        
        <div className='login-form'>
          <LoginTextField header="Username"/>
          <LoginTextField header="Password" />
          <LoginButton text="Login"/>
        </div>

      </div>
    </div>
  )
}

export default Login
