import React from 'react';
// import styles from './buttons.module.css';
import './ApplicantButtons.css'

interface ApplicantButtonProps {
    name: string;
}

const ApplicantButton = ({name}: ApplicantButtonProps) => {
    return (
        <button className='applicant-button'
            style = {{background: "#F4F4F4"}}
            >
                {name} 
        </button> 
    )
}

export default ApplicantButton;