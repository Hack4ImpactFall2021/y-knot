import React from 'react';

import './Sidebar.css'
import SidebarTile from './SidebarTile/SidebarTile';
import logout from './assets/logout.png';
import { useNavigate } from 'react-router-dom';

export enum NavRoutes {Dashboard = "Dashboard", History = "History", Settings = "Settings"}

interface Props {
    selected: NavRoutes
}

const Sidebar: React.FC<Props> = ({selected}) => {

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

export default Sidebar;