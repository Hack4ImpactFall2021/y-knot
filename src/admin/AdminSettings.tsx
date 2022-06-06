import { useNavigate } from "react-router-dom";
import { AuthError } from "firebase/auth";
import NetworkManager, { Endpoints } from "../network/NetworkManager";

import error from "../settings/assets/error.png";
import success from "../settings/assets/success.png";
import close from "../settings/assets/close.png";

import Sidebar from "../widgets/Sidebar";
import { AdminSidebarOptions, AdminSidebarTiles } from "./AdminSidebarInfo";
import { useState } from "react";
import TextField from "../settings/TextField/TextField";
import Button from "../settings/Button/Button";
import SidebarAndContent from "../SidebarAndContent";
import Toast from "../widgets/Toast";
import Loading from "../widgets/Loading";

import "./AdminSettings.css";

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ 

const AdminSettings = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newConfirmPassword, setNewConfirmPassword] = useState<string>("");

  const [message, setMessage] = useState<[boolean, string]>([false, ""]);

  const [isContentLoading, setIsContentLoading] = useState<boolean>(false);

  const updateEmail = async () => {
    setMessage([false, ""]);
    console.log("update email");


    const regexp = EMAIL_REGEX;
    if (!regexp.test(email)) {
      setMessage([true, "Email address is invalid."]);
      console.log("invalid email");
      return;
    } else if (email.trim().length === 0) {
      setMessage([true, "Email address is blank."]);
      return;
    }

    setIsContentLoading(true);
    try {
      await NetworkManager.makeRequest(Endpoints.UpdateEmail, {email: email});
      setEmail("");
      setMessage([false, "Successfully updated email."]);
      console.log("updated email")
    } catch (error) {
      if ((error as AuthError).code === "auth/requires-recent-login") {
        console.log(error);
        setMessage([true, "Log out and log back in then try again."]);
      } else if ((error as AuthError).code === "auth/email-already-in-use") {
        console.log(error);
        setMessage([true, "Email is already in use."]);
      } else {
        console.log(error);
        setMessage([true, "Oops, something went wrong. Please try again later."]);
      }
    }
    setIsContentLoading(false);
  }

  const updatePassword = async () => {
    setMessage([false, ""]);

    if (password !== confirmPassword) {
      setMessage([true, "Passwords do not match."]);
      return;
    } else if (password.trim().length === 0 || confirmPassword.trim().length === 0) {
      setMessage([true, "Password cannot be blank."]);
      return;
    } else if (password.length < 6) {
      setMessage([true, "Password must be longer than 6 characters."]);
      return;
    }

    setIsContentLoading(true);
    try {
      await NetworkManager.makeRequest(Endpoints.UpdatePassword, {password: password});
      setPassword("");
      setConfirmPassword("");
      setMessage([false, "Successfully updated password."]);
      console.log("updated password");
    } catch (error) {
      if ((error as AuthError).code === "auth/requires-recent-login") {
        console.log(error);
        setMessage([true, "Log out and log back in then try again."]);
      } else {
        console.log(error);
        setMessage([true, "Oops, something went wrong. Please try again later."]);
      }
    }
    setIsContentLoading(false);
  }

  const createNewUser = async () => {
    setMessage([false, ""]);

    if (newEmail.trim().length === 0 ) {
      setMessage([true, "Email address is blank."]);
      return;
    } else if (newPassword !== newConfirmPassword) {
      setMessage([true, "Passwords do not match."]);
      return;
    }
    else if (newPassword.trim().length === 0) {
      setMessage([true, "Password cannot be blank."]);
    } else if (newPassword.length < 6) {
      setMessage([true, "Password must be longer than 6 characters."]);
      return;
    }

    if (!EMAIL_REGEX.test(newEmail)) {
      setMessage([true, "Email address is invalid."]);
      return;
    } 

    setIsContentLoading(true);
    try {
      await NetworkManager.makeRequest(Endpoints.CreateNewUser, { email: newEmail, password: newPassword, role: "admin" });
      await NetworkManager.makeRequest(Endpoints.SendNewAccountCreatedEmail, { email: newEmail, password: newPassword })
      setNewEmail("");
      setNewPassword("");
      setMessage([false, "Created new user"]);
      console.log("Created new user with email and password");
    } catch (error) {
      if ((error as AuthError).code === "auth/requires-recent-login") {
        console.log(error);
        setMessage([true, "Log out and log back in then try again."]);
      }  else if ((error as AuthError).code === "auth/email-already-in-use") {
        console.log(error);
        setMessage([true, "Email is already in use."]);
      } else {
        console.log(error);
        setMessage([true, "Oops, something went wrong. Please try again later."]);
      }
    }
    setIsContentLoading(false);
  }


  const getAdminSettingsContentComponent = () => {
    return (
      <div className="admin-settings" style={{ position: "relative" }}>
        {!isContentLoading ? (
        <div className="wrapper">
          {message[1].length > 0 && 
            <Toast 
              isError={message[0]} 
              message={message[1]} 
              onDelete={() => setMessage([false, ""])} 
              timeout={4000}
            />}

          {/* Header */}
          <div className="header-wrapper">
            <h1>Settings</h1>
          </div>

          <div className="settings">
            {/* Update Email */}
            <div className="settings-box">
              <h2 className="title">Update Email Address</h2>
              <hr />
              <div className="content">
                <div className="input-wrapper">
                  <h3>New Email Address</h3> 
                  <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button className="settings-btn" onClick={() => updateEmail()}>
                  Change Email Address
                </button>
              </div>
            </div>
  
            {/* Update Password */}
            <div className="settings-box">
              <h2 className="title">Update Password</h2>
              <hr />
              <div className="content">
                <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
                  <div className="input-wrapper">
                    <h3>New Password</h3> 
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <div className="input-wrapper" >
                    <h3>Confirm New Password</h3> 
                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                  </div>
                </div>
                <button className="settings-btn" onClick={() => updatePassword()}>
                  Change Password
                </button>
              </div>
            </div>

            {/* Create New Account */}
            <div className="settings-box">
              <h2 className="title">Create New Account</h2>
              <hr />
              <div className="content">
                <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
                  <div className="input-wrapper">
                    <h3>Email Address</h3> 
                    <input onChange={(e) => setNewEmail(e.target.value)}/>
                  </div>
                  <div className="input-wrapper" >
                    <h3>Password</h3> 
                    <input type="password" onChange={(e) => setNewPassword(e.target.value)}/>
                  </div>
                  <div className="input-wrapper" >
                    <h3>Confirm Password</h3> 
                    <input type="password" onChange={(e) => setNewConfirmPassword(e.target.value)}/>
                  </div>
                </div>
                <button className="settings-btn" onClick={() => createNewUser()}>
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>) : <Loading/>}
      </div>

    );
  }

  return (
    <SidebarAndContent
      selectedTile={AdminSidebarOptions.Settings}
      sidebarTiles={AdminSidebarTiles}
      contentComponent={getAdminSettingsContentComponent()}
    />
  )
}

export default AdminSettings;