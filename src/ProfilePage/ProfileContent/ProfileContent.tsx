import React, { CSSProperties, useState } from 'react';

import UserInfo from './UserInfoTab/UserInfo';
import Application from './ApplicationTab/Application';
import Interview from './InterviewTab/Interview';
import BackgroundCheck from './BackgroundCheckTab/BackgroundCheck';

import './ProfileContent.css';
import { FileValidated } from '@dropzone-ui/react';


const USER_INFO = 'USER_INFO';
const APPLICATION = 'APPLICATION';
const INTERVIEW = 'INTERVIEW';
const BACKGROUND_CHECK = 'BACKGROUND_CHECK';

interface ProfileContentProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const ProfileContent:React.FC<ProfileContentProps> = (props) => {
  const [backgroundCheckFile, setBackgroundCheckFile] = useState<FileValidated[]>([]);



  const updateFiles = (files: FileValidated[]) => {
    setBackgroundCheckFile(files)
  }

  let content = null;
  if (props.currentTab === USER_INFO) {
    content = <UserInfo />;
  } else if (props.currentTab === APPLICATION) {
    content = <Application />;
  } else if (props.currentTab === INTERVIEW) {
    content = <Interview />;
  } else if (props.currentTab === BACKGROUND_CHECK) {
    content = (
      <BackgroundCheck
        updateFiles={updateFiles}
        files={backgroundCheckFile}
      />
    );
  }


  const getBtnActive  = (tab: string): CSSProperties | undefined=> {
    if (tab === props.currentTab) {
      return {textDecoration: 'underline'}
    } 
    return undefined;
  }
  const handleDisplay = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const newDisplay = e.currentTarget.value;
    props.setCurrentTab(newDisplay);
  };

  return (
    <div className='profile-content'>
      <div className='profile-content-tab-container'>
        <button
          className='profile-content-tab'
          style={getBtnActive(USER_INFO)}
          value={USER_INFO}
          onClick={handleDisplay}
        >
          <span>User Information</span>
        </button>
        <button
          className='profile-content-tab'
          style={getBtnActive(APPLICATION)}
          value={APPLICATION}
          onClick={handleDisplay}
        >
          
          <span>Application</span>
        </button>
        <button
          className='profile-content-tab'
          style={getBtnActive(INTERVIEW)}
          value={INTERVIEW}
          onClick={handleDisplay}
        >
          <span>Interview</span>
        </button>
        <button
          className='profile-content-tab'
          style={getBtnActive(BACKGROUND_CHECK)}
          value={BACKGROUND_CHECK}
          onClick={handleDisplay}
        >
          <span>Background Check</span>
        </button>

      </div>

      <div className='profile-content-body'>
        {content} 
      </div>

    </div>
  ); 
};

export default ProfileContent;