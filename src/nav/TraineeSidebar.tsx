import React, { useEffect, useState } from 'react';

import NetworkManager, { Endpoints } from '../network/NetworkManager';
import SidebarTile from './TraineeSidebarTile';
import logout from './assets/logout.png';
import { useNavigate } from 'react-router-dom';
import { QuerySnapshot, DocumentData } from 'firebase/firestore';

export enum NavRoutes { Home = "Home", Settings = "Settings", Profile = "Profile" }

interface Props {
    selected: NavRoutes
}

const TraineeSidebar: React.FC<Props> = ({selected}) => {
    const navigate = useNavigate();

    const [trainee, setTrainee] = useState<any>();

    useEffect(() => {
        getTrainee();
     }, []);
   
     const getTrainee: VoidFunction = async () => {
       try {
           let snap = await NetworkManager.makeRequest(Endpoints.GetCurrentMentorOrTrainee);
           snap = snap as QuerySnapshot<DocumentData>;
           setTrainee(snap.docs[0].data());
       } catch(err) {
           console.log(err);
       }
     }

    return (
        <div className='sidebar'>
            <div>
            {
                Object.values(NavRoutes).map(route => {
                    return (<SidebarTile key={route} route={route} selected={selected} id={trainee?.submission_id} />)
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