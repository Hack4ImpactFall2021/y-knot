import React from 'react';
import './Settings.css';
const Settings = () => {
  return (
    <div className="settings-page">
      <span className="settings-title">Settings</span>

      <div className="settings-update-email settings-box">
        <span>Update Email Address</span>
        <hr />

        <div className="grid1r2c">
          <div className="input-group row1 col1">
            <label>Email Address</label> <br />
            <input type="text" />
          </div>
          <button className="settings-button row1 col2">
            Change Email Address
          </button>
        </div>
      </div>

      <div className="settings-update-password settings-box">
        <span>Update Password</span>
        <hr />

        <div className="grid2r2c">
          <div className="input-group row1 col1">
            <label>Current Password</label> <br />
            <input type="text" />
          </div>
          <div className="input-group row2 col1">
            <label>New Password</label> <br />
            <input type="text" />
          </div>
          <button className="settings-button row2 col2">
            Change Email Address
          </button>

          <button className="settings-button row2 col2">Change Password</button>
        </div>
      </div>

      <div className="settings-create-account settings-box">
        <span>Create New Account</span>
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
      </div>
    </div>
  );
};

//Update Email Address Field

import { getAuth, updateEmail } from "firebase/auth";
const auth = getAuth();
const user = auth.currentUser;
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

import { updatePassword } from "firebase/auth";

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

import { createUserWithEmailAndPassword } from "firebase/auth";

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
