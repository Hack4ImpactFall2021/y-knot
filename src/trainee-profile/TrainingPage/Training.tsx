import React from 'react';

import './Training.css';
import ProgressBar from './ProgressBar';

const Training = () => {
    return (
        <div className='training'>
            <div className='progress-bar-wrapper'><ProgressBar fillAmount={50}/></div>

            <div className='training-button-text-wrapper'>
                <button className='training-button'>
                    Thinkific
                </button>

                <p className='click-text'>Click to Start Your Training</p>
            </div>
        </div>
    );
    
}

export default Training;