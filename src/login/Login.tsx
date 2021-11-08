import React, {useState} from 'react';

import TextField from './TextField/TextField';
import Button from './Button/Button';
import logo from './logo.png';
import './Login.css'

const Login = () => {

  // email address
  const [email, setEmail] = useState('');

  // password 
  const [password, setPassword] = useState('');

  // validates & authenticates then routes to dashboard page
  const handleClick = () => {
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
          <Button text="Login" onClick={handleClick}/>
        </div>

      </div>
    </div>
  )
}

/*
// create user func
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("User has been created in Firebase.");
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("An error took place during the user creation: " + errorMessage);

  });


  //sign in func

  import { signInWithEmailAndPassword } from "firebase/auth";



  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User has been signed in.");
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      console.log("An error took place during login: " + error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  //reset password func
import { sendPasswordResetEmail } from "firebase/auth";

sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("The reset password email was sent. Please check your email.");
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("There was an error during the password reset: " + errorMessage);
  });


  */

export default Login
