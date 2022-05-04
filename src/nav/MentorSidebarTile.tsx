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

interface Props {
    route: NavRoutes,
<<<<<<< HEAD:src/nav/MentorSidebarTile.tsx
    selected: NavRoutes,
    id: string
=======
    selected: NavRoutes
>>>>>>> admin-dashboard:src/mentor-landing/MentorSidebarTile.tsx
}

type routeToimageType = {[key in NavRoutes]: string}

<<<<<<< HEAD:src/nav/MentorSidebarTile.tsx
const MentorSidebarTile: React.FC<Props> = ({route, selected, id}) => {
=======
const MentorSidebarTile: React.FC<Props> = ({route, selected}) => {
>>>>>>> admin-dashboard:src/mentor-landing/MentorSidebarTile.tsx

    const navigate = useNavigate();
    
    const isSelected: boolean = route === selected

    const routeToImage: routeToimageType = {
        [NavRoutes.Home]: isSelected ? home_active : home_inactive,
<<<<<<< HEAD:src/nav/MentorSidebarTile.tsx
        [NavRoutes.MentorSettings]: isSelected ? settings_active : settings_inactive,
=======
        [NavRoutes.Settings]: isSelected ? settings_active : settings_inactive,
>>>>>>> admin-dashboard:src/mentor-landing/MentorSidebarTile.tsx
        [NavRoutes.Resources]: isSelected ? resources_active : resources_inactive,
        [NavRoutes.Profile]: profile_inactive
    }


    // routes user to selected screen if not current screen
    const handleClick = (): void => {
        if (isSelected) return;

        switch (route) {
            case NavRoutes.Home:
<<<<<<< HEAD:src/nav/MentorSidebarTile.tsx
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
=======
                navigate('/trainee/home')
                break;
            case NavRoutes.Settings:
                navigate('/settings')
                break;
            /* PUT PATH FOR RESOURCES */
            case NavRoutes.Resources:
                navigate('/')
                break;
            case NavRoutes.Profile:
                navigate('/');
>>>>>>> admin-dashboard:src/mentor-landing/MentorSidebarTile.tsx
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