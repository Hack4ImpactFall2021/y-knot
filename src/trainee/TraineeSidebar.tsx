import React from 'react';

import SidebarTile from './TraineeSidebarTile';
import logout from './assets/logout.png';
import { useNavigate } from 'react-router-dom';

export enum NavRoutes { Home = "Home", Settings = "Settings", Profile = "Profile" }

interface Props {
    selected: NavRoutes
}

const TraineeSidebar: React.FC<Props> = ({selected}) => {
    const navigate = useNavigate();

    return (
        <div className='sidebar'>
            <div>
            {
                Object.values(NavRoutes).map(route => {
                    return (<SidebarTile key={route} route={route} selected={selected} />)
                })
            }
            </div>
            <div className='logout-btn' onClick={() => navigate('/login')}>
                <img className='logout-img' src={logout}/>
                <p className='logout-text'>LOG OUT</p>
            </div>
        </div>  
    );
}

export default TraineeSidebar;