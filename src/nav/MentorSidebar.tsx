import React from 'react';

import SidebarTile from './MentorSidebarTile';
import logout from './assets/logout.png';
import { useNavigate } from 'react-router-dom';

<<<<<<< HEAD:src/nav/MentorSidebar.tsx
export enum NavRoutes { Home = "Home", MentorSettings = "Settings", Resources = "Resources", Profile = "Profile" }
=======
export enum NavRoutes { Home = "Home", Settings = "Settings", Resources = "Resources", Profile = "Profile" }
>>>>>>> admin-dashboard:src/mentor-landing/MentorSidebar.tsx

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
<<<<<<< HEAD:src/nav/MentorSidebar.tsx
                    return (<SidebarTile key={route} route={route} selected={selected} id="5188587455818895665"/>)
=======
                    return (<SidebarTile key={route} route={route} selected={selected} />)
>>>>>>> admin-dashboard:src/mentor-landing/MentorSidebar.tsx
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