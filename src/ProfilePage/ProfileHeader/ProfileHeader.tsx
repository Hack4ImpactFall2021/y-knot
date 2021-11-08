import React from 'react';

import UserStatus from './UserStatus/UserStatus';
import Button from './Button/Button';
import './ProfileHeader.css'
const ProfileHeader = () => {


  const acceptProfile = () => alert('accept profile');
  const rejectProfile = () => alert('deny profile');
  return (
    <div className='profile-header'>
      <div className='profile-header-info'>
        <span className='profile-header-name'>Bobby Smith</span>
        <UserStatus status={'INTERVIEWING'} />
      </div>

      <div className='profile-header-actions'>
        <Button type={'ACCEPT'} onClick={acceptProfile}>Accept</Button>
        <Button type={'REJECT'} onClick={rejectProfile}>Reject</Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
