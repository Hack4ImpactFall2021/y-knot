import React from 'react';
import './UserStatus.css';

interface UserStatusProps {
  status: string;
}

interface UserStatusStyle {
  style: {
    backgroundColor: string;
  };
  text: string;
}

const UserStatus: React.FC<UserStatusProps> = (props) => {
  const getInfo = (): UserStatusStyle => {
    if (props.status === 'NEW_APPLICANT') {
      return {
        style: {
          backgroundColor: '#F44250',
        },
        text: 'New Applicant',
      };
    }
    if (props.status === 'INTERVIEWING') {
      return {
        style: {
          backgroundColor: '#FF8427',
        },
        text: 'Interviewing',
      };
    }

    if (props.status === 'BACKGROUND_CHECK') {
      return {
        style: {
          backgroundColor: '#FCBB45',
        },
        text: 'Background Check',
      };
    } else {
      return {
        style: {
          backgroundColor: '#ccc',
        },
        text: 'Error',
      };
    }
  };

  const { style, text } = getInfo();
  return (
    <div className='profile-status' style={style}>
      {text}
    </div>
  );
};

export default UserStatus;
