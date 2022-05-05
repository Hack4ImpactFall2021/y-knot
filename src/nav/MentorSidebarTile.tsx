import React from 'react';
import { useNavigate } from 'react-router-dom';

import home_active from './assets/people_active.png';
import home_inactive from './assets/people_inactive.png';
import settings_active from './assets/settings_active.png';
import settings_inactive from './assets/settings_inactive.png';
import profile_inactive from './assets/profile_inactive.png';
import resources_active from './assets/resources_active.png';
import resources_inactive from './assets/resources_inactive.png';

import { NavRoutes } from './MentorSidebar';

import "./SidebarTile/SidebarTile.css";

interface Props {
    route: NavRoutes,
    selected: NavRoutes,
    id: string
}

type routeToimageType = {[key in NavRoutes]: string}

const MentorSidebarTile: React.FC<Props> = ({route, selected, id}) => {

    const navigate = useNavigate();
    
    const isSelected: boolean = route === selected

    const routeToImage: routeToimageType = {
        [NavRoutes.Home]: isSelected ? home_active : home_inactive,
        [NavRoutes.MentorSettings]: isSelected ? settings_active : settings_inactive,
        [NavRoutes.Resources]: isSelected ? resources_active : resources_inactive,
        [NavRoutes.Profile]: profile_inactive
    }


    // routes user to selected screen if not current screen
    const handleClick = (): void => {
        if (isSelected) return;

        switch (route) {
            case NavRoutes.Home:
                navigate('/mentor')
                break;
            case NavRoutes.MentorSettings:
                navigate('/mentor/settings')
                break;
            case NavRoutes.Resources:
                navigate('/mentor/resources')
                break;
            case NavRoutes.Profile:
                navigate('/mentor/' + id);
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

export default MentorSidebarTile;