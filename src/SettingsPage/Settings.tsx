import React from 'react'
import './Settings.css'
const Settings = ()  => {
  return (
    <div className="settings-page">
      <span className='settings-title'>Settings</span>

      <div className='settings-update-email settings-box'>
        <span>Update Email Address</span>
      </div>

      <div className='settings-update-password settings-box'>
        <span>Update Password</span>
      </div>

      <div className='settings-create-account settings-box'>
        <span>Create New Account</span>
      </div>

    </div>

    
  )
}

export default Settings
