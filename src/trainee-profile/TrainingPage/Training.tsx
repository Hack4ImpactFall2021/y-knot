import React from 'react';

import './Training.css';
import ProgressBar from './ProgressBar';

const Training = () => {
    return (
        <div className='training'>
            <div className="progress-bar-wrapper"><ProgressBar fillAmount={26}/></div>

            <button className='thinkify'>
                Thinkify
            </button>

            <p className='click-text'>Click to Start Your Training</p>
        </div>
    );
    
}

export default Training;