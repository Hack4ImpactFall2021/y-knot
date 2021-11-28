import React from 'react';

import UserStatus from './UserStatus/UserStatus';
import Button from './Button/Button';
import './ProfileHeader.css'

interface ProfileHeaderProps {
  status: string
}
const ProfileHeader:React.FC<ProfileHeaderProps> = (props) => {


  const acceptProfile = () => alert('accept profile');
  const rejectProfile = () => alert('deny profile');
  return (
    <div className='profile-header'>
      <div className='profile-header-info'>
        <span className='profile-header-name'>Bobby Smith</span>
        <UserStatus status={props.status} />
      </div>

      <div className='profile-header-actions'>
        <Button type={'ACCEPT'} onClick={acceptProfile}>Accept</Button>
        <Button type={'REJECT'} onClick={rejectProfile}>Reject</Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
