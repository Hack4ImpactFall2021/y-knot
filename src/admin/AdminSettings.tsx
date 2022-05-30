import { useNavigate } from "react-router-dom";
import { AuthError } from "firebase/auth";
import NetworkManager, { Endpoints } from "../network/NetworkManager";

import error from "../settings/assets/error.png";
import success from "../settings/assets/success.png";
import close from "../settings/assets/close.png";

import "../SidebarAndContent.css";
import Sidebar from "../widgets/Sidebar";
import { AdminSidebarOptions, AdminSidebarTiles } from "./AdminSidebarInfo";
import { useState } from "react";
import TextField from "../settings/TextField/TextField";
import Button from "../settings/Button/Button";

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ 

const AdminSettings = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const [message, setMessage] = useState<[boolean, string]>([false, ""]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const updateEmail = async () => {
    setIsDisabled(true);
    setMessage([false, ""]);



    if (!EMAIL_REGEX.test(email)) {
      setMessage([true, "Email address is invalid."]);
      setIsDisabled(false);
      return;
    } else if (email.trim().length === 0) {
      setMessage([true, "Email address is blank."]);
      setIsDisabled(false);
      return;
    }
    
    try {
      await NetworkManager.makeRequest(Endpoints.UpdateEmail, { email: email });
      setEmail("");
      setMessage([false, "Successfully updated email"]);
      setIsDisabled(false);
      console.log("updated email")

    } catch (error) {
      if ((error as AuthError).code === "auth/requires-recent-login") {
        console.log(error);
        setMessage([true, "Log out and log back in then try again."]);
        setIsDisabled(false);
      } else if ((error as AuthError).code === "auth/email-already-in-use") {
        console.log(error);
        setMessage([true, "Email is already in use."]);
        setIsDisabled(false);
      } else {
        console.log(error);
        setMessage([true, "Oops, something went wrong. Please try again later."]);
        setIsDisabled(false);
      }
    }
  }

  const updatePassword = async () => {
    setIsDisabled(true);
    setMessage([false, ""]);

    if (password !== confirmPassword) {
      setMessage([true, "Passwords do not match."]);
      setIsDisabled(false);
      return;
    } else if (password.trim().length === 0 || confirmPassword.trim().length === 0) {
      setMessage([true, "Password cannot be blank."]);
      setIsDisabled(false);
      return;
    } else if (password.length < 6) {
      setMessage([true, "Password must be longer than 6 characters."]);
      setIsDisabled(false);
      return;
    }

    try {
      await NetworkManager.makeRequest(Endpoints.UpdatePassword, { password: password });
      setPassword("");
      setConfirmPassword("");
      setMessage([false, "Successfully updated password"]);
      setIsDisabled(false);
      console.log("updated password");
      
    } catch (error) {
      if ((error as AuthError).code === "auth/requires-recent-login") {
        console.log(error);
        setMessage([true, "Log out and log back in then try again."]);
        setIsDisabled(false);
      } else {
        console.log(error);
        setMessage([true, "Oops, something went wrong. Please try again later."]);
        setIsDisabled(false);
      }
    }
  }

  const createNewUser = async () => {
    setMessage([false, ""]);
    setIsDisabled(true);

    if (newEmail.trim().length === 0 ) {
      setMessage([true, "Email address is blank."]);
      setIsDisabled(false);
      return;
    } else if (newPassword.trim().length === 0) {
      setMessage([true, "Password cannot be blank."]);
      setIsDisabled(false);
    } else if (newPassword.length < 6) {
      setMessage([true, "Password must be longer than 6 characters."]);
      setIsDisabled(false);
      return;
    }

    if (!EMAIL_REGEX.test(newEmail)) {
      setMessage([true, "Email address is invalid."]);
      setIsDisabled(false);
      return;
    } 

    try {
      await NetworkManager.makeRequest(Endpoints.CreateNewUser, { email: newEmail, password: newPassword, role: "admin" });
      await NetworkManager.makeRequest(Endpoints.SendNewAccountCreatedEmail, { email: newEmail, password: newPassword })
      setNewEmail("");
      setNewPassword("");
      setMessage([false, "Created new user"]);
      setIsDisabled(false);
      console.log("Created new user with email and password");
    } catch (error) {
      if ((error as AuthError).code === "auth/requires-recent-login") {
        console.log(error);
        setMessage([true, "Log out and log back in then try again."]);
        setIsDisabled(false);
      }  else if ((error as AuthError).code === "auth/email-already-in-use") {
        console.log(error);
        setMessage([true, "Email is already in use."]);
        setIsDisabled(false);
      } else {
        console.log(error);
        setMessage([true, "Oops, something went wrong. Please try again later."]);
        setIsDisabled(false);
      }
    }
  }

  const getSidebarTiles = () => {
    const routes = ["/admin/home", "/admin/assignments", "/admin/applicants", "/admin/settings"];
    const ret = [];
    for (let i = 0; i < routes.length; i++) {
      const cur = { ...AdminSidebarTiles[i], route: routes[i] };
      ret.push(cur);
    }
    return ret;
  }

  //RENDER FUNCTIONS
  const renderStatusMessage = () => {
    const isError = message[0];
    const statusMessage = message[1];
    if (statusMessage.length === 0) 
      return;

    return (
      <div className="status-msg-container">
        <img className="status-icon" src={isError ? error: success}/>
        <p className="popup-text">{statusMessage}</p>
        <img className="status-close-btn" src={close} onClick={() => setMessage([false, ""])}/>
      </div>
    );
  }

  return (
    <div className="sidebar-and-content">
      <Sidebar selected={AdminSidebarOptions.Settings} sidebarTiles={getSidebarTiles()}/>
      <div className="settings">
        <div className="settings-container">
          {renderStatusMessage()}
          <div className="settings-content">
            {/* Header */}
            <h1 className="settings-title">Settings</h1>

            {/* Update Email */}
            <div className="settings-box">
              <h2>Update Email Address</h2>
              <hr />
              <div className="main">
                <TextField label="Email Address" value={email} onChange={val => setEmail(val)}/>
                <Button label="Change Email Address" onClick={!isDisabled ? updateEmail : () => {}}/>
              </div>
            </div>

            {/* Update Password */}
            <div className="settings-box">
              <h2>Update Password</h2>
              <hr />
              <div className="main">
                <div className="two">
                <TextField label="New Password" hasHover value={password} onChange={val => setPassword(val)}/>
                <TextField label="Confirm New Password" value={confirmPassword} onChange={val => setConfirmPassword(val)}/>
                </div>
                <Button label="Change Password" onClick={!isDisabled ? updatePassword: () => {}}/>
              </div>
            </div>

            {/* Create New Account */}
            <div className="settings-box">
              <h2>Create New Account</h2>
              <hr />
              <div className="main">
                <div className="two">
                <TextField label="Email Address" value={newEmail} onChange={val => setNewEmail(val)}/>
                <TextField label="Password" hasHover value={newPassword} onChange={val => setNewPassword(val)}/>
                </div>
                <Button label="Create Account" onClick={!isDisabled ? createNewUser : () => {}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;