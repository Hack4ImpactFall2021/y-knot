import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader/ProfileHeader';

import './Profile.css';
import ProfileContent from './ProfileContent/ProfileContent';

const Profile = () => {


  

  return (
    <div className='profile-page'>
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
};

export default Profile;
