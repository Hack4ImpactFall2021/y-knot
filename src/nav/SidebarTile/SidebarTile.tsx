import React from 'react';
import { useNavigate } from 'react-router-dom';

import './SidebarTile.css'
import dashboard_active from '../assets/dashboard_active.png';
import dashboard_inactive from '../assets/dashboard_inactive.png';
import settings_active from '../assets/settings_active.png';
import settings_inactive from '../assets/settings_inactive.png';
import history_active from '../assets/history_active.png';
import history_inactive from '../assets/history_inactive.png';
import { NavRoutes } from '../Sidebar';

interface Props {
    route: NavRoutes,
    selected: NavRoutes
}

type routeToimageType = {[key in NavRoutes]: string}

const SidebarTile: React.FC<Props> = ({route, selected}) => {

    const navigate = useNavigate();
    
    const isSelected: boolean = route === selected

    const routeToImage: routeToimageType = {
        [NavRoutes.Dashboard]: isSelected ? dashboard_active : dashboard_inactive,
        [NavRoutes.History]: isSelected ? history_active : history_inactive,
        [NavRoutes.Settings]: isSelected ? settings_active: settings_inactive,
        [NavRoutes.Home]: isSelected ? settings_active: settings_inactive
    }


    // routes user to selected screen if not current screen
    const handleClick = (): void => {
        if (isSelected) return;

        switch (route) {
            case NavRoutes.Dashboard:
                navigate('/')
                break;

            case NavRoutes.History:
                navigate('/history')
                break;

            case NavRoutes.Settings:
                navigate('/settings')
                break;
            case NavRoutes.Home:
                navigate('/trainee/home');
                break;
        }
    }

    return (
        <div className={isSelected ? 'option-tile option-tile-active':  'option-tile'} onClick={handleClick}>
            <img src={routeToImage[route]} />
            <h2>{route}</h2>
        </div>
    );
}

export default SidebarTile;