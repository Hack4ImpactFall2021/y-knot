import React, {useState} from 'react';

import TextField from './TextField/TextField';
import Button from './Button/Button';
import logo from './logo.png';
import './Login.css'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const showState = () => {
    alert("hello");
    console.log(email);
    console.log(password);
  }

  return (
    <div className='login-page'>
    
      <div className='login-page-left'>

        <div className='login-welcome'>
          <h1>Welcome</h1><hr/>
          <h4>Y-KNOT Mentor Application Portal</h4>
        </div>
      </div>

      <div className='login-page-right'>   
        <img className='login-logo' src={logo}/>
        <div className='login-form'>
          
          <TextField header="Email Address" onChange={val => setEmail(val)}/>
          <TextField header="Password" onChange={val => setPassword(val)}/>
          <Button text="Login" onClick={showState}/>
        </div>

      </div>
    </div>
  )
}

export default Login
