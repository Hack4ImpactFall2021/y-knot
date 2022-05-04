import React from 'react';
import { useNavigate } from 'react-router-dom';

import home_active from './assets/people_active.png';
import home_inactive from './assets/people_inactive.png';
import settings_active from './assets/settings_active.png';
import settings_inactive from './assets/settings_inactive.png';
import profile_inactive from './assets/profile_inactive.png';

import { NavRoutes } from './TraineeSidebar';

interface Props {
    route: NavRoutes,
    selected: NavRoutes
<<<<<<< HEAD:src/nav/TraineeSidebarTile.tsx
    id: string 
=======
>>>>>>> admin-dashboard:src/trainee/TraineeSidebarTile.tsx
}

type routeToimageType = {[key in NavRoutes]: string}

<<<<<<< HEAD:src/nav/TraineeSidebarTile.tsx
const TraineeSidebarTile: React.FC<Props> = ({route, selected, id}) => {
=======
const TraineeSidebarTile: React.FC<Props> = ({route, selected}) => {
>>>>>>> admin-dashboard:src/trainee/TraineeSidebarTile.tsx

    const navigate = useNavigate();
    
    const isSelected: boolean = route === selected

    const routeToImage: routeToimageType = {
        [NavRoutes.Home]: isSelected ? home_active : home_inactive,
        [NavRoutes.Settings]: isSelected ? settings_active : settings_inactive,
        [NavRoutes.Profile]: profile_inactive
    }


    // routes user to selected screen if not current screen
    const handleClick = (): void => {
        if (isSelected) return;

        switch (route) {
            case NavRoutes.Home:
                navigate('/trainee/home')
                break;
            case NavRoutes.Settings:
<<<<<<< HEAD:src/nav/TraineeSidebarTile.tsx
                navigate('/trainee/settings')
                break;
            case NavRoutes.Profile:
                navigate('/trainee/' + id);
=======
                navigate('/settings')
                break;
            case NavRoutes.Profile:
                navigate('/');
>>>>>>> admin-dashboard:src/trainee/TraineeSidebarTile.tsx
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

export default TraineeSidebarTile;