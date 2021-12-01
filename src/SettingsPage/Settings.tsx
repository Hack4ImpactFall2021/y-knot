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
            <label>New Password</label> <br />
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
            <label>New Password</label> <br />
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
            <label>New Email</label> <br />
            <input type="text" />
          </div>
          <div className="input-group row2 col1">
            <label>New Email</label> <br />
            <input type="text" />
          </div>
          <button className="settings-button row2 col2">Create Acount</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
