import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { AuthError, getAuth } from '@firebase/auth';

import './Login.css'
import logo from './assets/logo.png'; 

import TextField, {TextFieldTypes} from './TextField/TextField';
import Button from './Button/Button';
import { useAuth } from '../auth/AuthProvider';
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import app from '../config/firebase';

const Login: React.FC<any> = () => {

  // email address
  const [email, setEmail] = useState<string>('');

  // password 
  const [password, setPassword] = useState<string>('');

  // error message
  const [errorMessage, setErrorMessage] = useState<string>('');

  // prevents action when page loads
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = useAuth();
  const navigate = useNavigate();

  // logs out the user whenever they route to the login page
  useEffect(() => {
    getAuth(app).signOut();
  }, [])


  // validates & authenticates then routes to dashboard page
  const handleClick = async () => {

    // clears previous error messages
    setErrorMessage('')
    setIsLoading(true)

    // client side email & password validation
    let errors = ''

    if (password.trim().length == 0 || email.trim().length === 0) {
      errors = "Email or Password can not be blank";
    } else {
      const regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      if (!regexp.test(email)) {
        errors = "Email address is invalid";
      }
    }

    if (errors.length > 0) {
      setErrorMessage(errors);
      setIsLoading(false)
      return;
    }

    console.log("Email and Password are valid");

    // make network request to authenticate user
    try {
      let user = await NetworkManager.makeRequest(Endpoints.AuthenticateUser, {email: email, password: password});
      console.log(user);

      navigate('/');

    // handle errors
    } catch (error) {
      let code = (error as AuthError).code;
      if (code === "auth/user-not-found") {
          setErrorMessage("Account does not exist")
      } else if (code === "auth/wrong-password") {
          setErrorMessage("Incorrect Password")
      } else if (code === "auth/too-many-requests") {
          setErrorMessage("Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later.")
      } else {
          setErrorMessage('Something went wrong, please try again later.');
      }
    } finally {
      setIsLoading(false);
    }

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
          <TextField header="Email Address" isDisabled={isLoading} fieldType={TextFieldTypes.email} onChange={val => setEmail(val)}/>
          <TextField header="Password" isDisabled={isLoading} fieldType={TextFieldTypes.password} onChange={val => setPassword(val)} onSubmit={handleClick}/>
          <Button text="Login" isDisabled={isLoading} onClick={handleClick}/>
          <h4 className='login-errors' style={{opacity: errorMessage.length == 0 ? 0 : 100}}>{errorMessage}</h4>
        </div>

      </div>
    </div>
  )
}


export default Login;
