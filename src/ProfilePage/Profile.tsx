import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader/ProfileHeader';

import './Profile.css';
import ProfileContent from './ProfileContent/ProfileContent';

import exiticon from './static/x-icon.svg';

const USER_INFO = 'USER_INFO';
const APPLICATION = 'APPLICATION';
const INTERVIEW = 'INTERVIEW';
const BACKGROUND_CHECK = 'BACKGROUND_CHECK';

const Profile = () => {

  const [currentTab, setCurrentTab] = useState<string>(BACKGROUND_CHECK);
  const exitProfilePage = () => alert('exited');
  return (
    <>
    <div style={{width: '30px'}}><img src={exiticon}/></div>
    <div className='profile-page'>
      
      <ProfileHeader status={currentTab}/>
      <ProfileContent currentTab={currentTab} setCurrentTab={setCurrentTab}/>
    </div>
    </>
  );
};

export default Profile;
