import React from 'react';

import SidebarTile from './MentorSidebarTile';
import logout from './assets/logout.png';
import { useNavigate } from 'react-router-dom';

export enum NavRoutes { Home = "Home", MentorSettings = "Settings", Resources = "Resources", Profile = "Profile" }

interface Props {
    selected: NavRoutes
}

const MentorSidebar: React.FC<Props> = ({selected}) => {
    const navigate = useNavigate();

    return (
        <div className='sidebar'>
            <div>
            {
                Object.values(NavRoutes).map(route => {
                    return (<SidebarTile key={route} route={route} selected={selected} id="5188587455818895665"/>)
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

export default MentorSidebar;