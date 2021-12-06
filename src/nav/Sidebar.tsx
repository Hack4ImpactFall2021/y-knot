import React from 'react';

import './Sidebar.css'
import SidebarTile from './SidebarTile/SidebarTile';

export enum NavRoutes {Dashboard = "Dashboard", Settings = "Settings"}

interface Props {
    selected: NavRoutes
}

const Sidebar: React.FC<Props> = ({selected}) => {
    return (
        <div className='sidebar'>
            {
                Object.values(NavRoutes).map(route => {
                    return (<SidebarTile route={route} selected={selected} />)
                })
            }
        </div>  
    );
}

export default Sidebar;