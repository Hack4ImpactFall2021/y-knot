import React from 'react';

import './Training.css';
import ProgressBar from './ProgressBar';

const Training = () => {
    return (
        <div className='training'>
            <div className='progress-bar-wrapper'><ProgressBar fillAmount={50}/></div>

            <img className = "thinkific-gif" src = "https://support.thinkific.com/hc/article_attachments/360042089974/5d3734ac5ee60.gif" alt = "Thinkific"/>

            <div className='training-button-text-wrapper'>
                <form action = "https://y-knotinc.thinkific.com/" target="_blank">
                    <button type = "submit" className='training-button'>
                        Thinkific
                    </button>
                </form>
                <p className='click-text'>Click to Start Your Training</p>
            </div>
        </div>
    );
    
}

export default Training;