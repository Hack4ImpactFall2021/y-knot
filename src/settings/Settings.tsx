import React from 'react';
import Sidebar, { NavRoutes } from '../nav/Sidebar';

import './Settings.css'

const Settings = () => {
    return (
        <div className='settings'>
            <Sidebar selected={NavRoutes.Settings}/>
            <div className='settings-container'>
                <h1>Settings</h1>
            </div>
        </div>
    )
}

export default Settings;