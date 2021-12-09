import React from 'react';
import './Settings.css';
import { getAuth, updateEmail, User } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updatePassword } from "firebase/auth";
import app from '../config/firebase';
import Sidebar, { NavRoutes } from '../nav/Sidebar';
import TextField from './TextField/TextField';
import Button from './Button/Button';

const Settings = () => {
  return (
    <div className="settings">
      <Sidebar  selected={NavRoutes.Settings}/>
      <div className="settings-container">
        <div className="settings-content">
        <h1 className="settings-title">Settings</h1>

        <div className="settings-box">
          <h2>Update Email Address</h2>
          <hr />
          <div className="main">
            <TextField label="Email Address"/>
            <Button label="Change Email Address"/>
          </div>
        </div>
 
        <div className="settings-box">
          <h2>Update Password</h2>
          <hr />
          <div className="main">
            <div className="two">
            <TextField label="New Password"/>
            <TextField label="Confirm New Password"/>
            </div>
            <Button label="Change Password"/>
          </div>
        </div>

        <div className="settings-box">
          <h2>Create New Account</h2>
          <hr />
          <div className="main">
            <div className="two">
            <TextField label="Email Address"/>
            <TextField label="Password"/>
            </div>
            <Button label="Create Account"/>
          </div>
        </div>

      {/* <div className="">
        <h2>Update Password</h2>
        <hr />

        <div className="grid2r2c">
          <div className="input-group row1 col1">
            <label>New Password</label> <br />
            <input type="text" />
          </div>
          <div className="input-group row2 col1">
            <label>Confirm New Password</label> <br />
            <input type="text" />
          </div>
          <button className="settings-button row2 col2">
            Change Email Address
          </button>

          <button className="settings-button row2 col2">Change Password</button>
        </div>
      </div>

      <div className="">
        <h2>Create New Password </h2>
        <hr />

        <div className="grid2r2c">
          <div className="input-group row1 col1">
            <label>Email Address</label> <br />
            <input type="text" />
          </div>
          <div className="input-group row2 col1">
            <label>Password</label> <br />
            <input type="text" />
          </div>
          <button className="settings-button row2 col2">Create Account</button>
        </div>
      </div> */}

      </div>
      </div>
    </div>
  );
};

//Update Email Address Field

const auth = getAuth(app);
var user = auth.currentUser;

if (user == null) { 
  user = user as unknown as User;
}
// Change this email to make it the text input
const email = "user@example.com";

updateEmail(user, email).then(() => { 

  console.log("Email address has been updated to " + email);

}).catch((error) => { 

  const errorCode = error.code;
  const errorMessage = error.message;
  console.log("An error took place during the email address update: " + errorMessage);

})


//Update Password Field

//Change this variable to make it the password input
const newPass = "abc123";

//Change this variable to make it the confirm password input
const confirmPass = "abc123";

if (newPass == confirmPass) { 
  updatePassword(user, newPass).then(() => { 
    console.log("Password has been updated successfully!");
  }).catch((error) => { 
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("An error took place during the password update: " + errorMessage);
  
  })
} else { 
  console.log("The password and confirm password are not the same.");
}


// Register New Account

//Change this field to be the email address input for the new user
const emailInput = "abc@example.com";

//Change this field to be the password input for the new user
const passInput = "abc123";

createUserWithEmailAndPassword(auth, emailInput, passInput).then((userCredential) => { 
  console.log("User was created successfully in Firebase.");
}).catch((error) => { 
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log("An error took place during the user creation: " + errorMessage);
})

export default Settings;
