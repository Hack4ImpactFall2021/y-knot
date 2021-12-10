import React, { useState } from 'react';

import './Settings.css';
import Sidebar, { NavRoutes } from '../nav/Sidebar';
import TextField from './TextField/TextField';
import Button from './Button/Button';
import NetworkManager, { Endpoints } from '../network/NetworkManager';

const Settings = () => {

  const [email, setEmail] = useState<string>("");
  const [updateEmailError, setUpdateEmailError] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [updatePasswordError, setUpdatePasswordError] = useState<string>("");

  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [createAccountError, setCreateAccountError] = useState<string>("");
  

  const updateEmail = async () => {
    setUpdateEmailError("");

    const regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if (!regexp.test(email)) {
      setUpdateEmailError("Email address is invalid.");
      return;
    } else if (email.trim().length === 0) {
      setUpdateEmailError("Email address is blank.");
      return;
    }
    
    try {
      await NetworkManager.makeRequest(Endpoints.UpdateEmail, {email: email});
      setEmail("");
      console.log("updated email")

    } catch (error) {
      console.log(error);
      setUpdateEmailError("Oops, something went wrong. Please try again later.");
    }
  }

  const updatePassword = async () => {
    setUpdatePasswordError("");

    if (!(password === confirmPassword)) {
      setUpdatePasswordError("Passwords do not match.");
      return;
    } else if (password.trim().length == 0 || confirmPassword.trim().length == 0) {
      setUpdatePasswordError("Password can not be blank.");
      return;
    }

    try {
      await NetworkManager.makeRequest(Endpoints.UpdatePassword, {password: password});
      setPassword("");
      setConfirmPassword("");
      console.log("updated password");
      
    } catch (error) {
      console.log(error);
      setUpdatePasswordError("Oops, something went wrong. Please try again later.")
    }
  }

  const createNewUser = async () => {
    setCreateAccountError("");

    if (newEmail.trim().length === 0 ) {
      setCreateAccountError("Email address is blank.");
      return;
    } else if (newPassword.trim().length === 0) {
      setCreateAccountError("Password can not be blank.")
    }

    const regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if (!regexp.test(newEmail)) {
      setCreateAccountError("Email address is invalid.");
      return;
    } 

    try {
      await NetworkManager.makeRequest(Endpoints.CreateNewUser, {email: newEmail, password: newPassword});
      setNewEmail("");
      setNewPassword("");
      console.log("Created new user with email and password");
    } catch (error) {
      console.log(error);
      setCreateAccountError("Oops, something went wrong. Please try again later.")
    }
  }



  return (
    <div className="settings">
      <Sidebar selected={NavRoutes.Settings}/>
      <div className="settings-container">
        <div className="settings-content">
        <h1 className="settings-title">Settings</h1>

        <div className="settings-box">
          <h2>Update Email Address</h2>
          <hr />
          <div className="main">
            <TextField label="Email Address" value={email} onChange={val => setEmail(val)}/>
            <Button label="Change Email Address" onClick={updateEmail}/>
          </div>
          <p className="error">{updateEmailError}</p>
        </div>
 
        <div className="settings-box">
          <h2>Update Password</h2>
          <hr />
          <div className="main">
            <div className="two">
            <TextField label="New Password"  value={password} onChange={val => setPassword(val)}/>
            <TextField label="Confirm New Password" value={confirmPassword} onChange={val => setConfirmPassword(val)}/>
            </div>
            <Button label="Change Password" onClick={updatePassword}/>
          </div>
          <p className="error">{updatePasswordError}</p>
        </div>

        <div className="settings-box">
          <h2>Create New Account</h2>
          <hr />
          <div className="main">
            <div className="two">
            <TextField label="Email Address" value={newEmail} onChange={val => setNewEmail(val)}/>
            <TextField label="Password" value={newPassword} onChange={val => setNewPassword(val)}/>
            </div>
            <Button label="Create Account" onClick={createNewUser}/>
          </div>
          <p className="error">{createAccountError}</p>
        </div>


      </div>
      </div>
    </div>
  );
};




// //Update Password Field

// //Change this variable to make it the password input
// const newPass = "abc123";

// //Change this variable to make it the confirm password input
// const confirmPass = "abc123";

// if (newPass == confirmPass) { 
 
// } else { 
//   console.log("The password and confirm password are not the same.");
// }


// // Register New Account

// //Change this field to be the email address input for the new user
// const emailInput = "abc@example.com";

// //Change this field to be the password input for the new user
// const passInput = "abc123";



export default Settings;
