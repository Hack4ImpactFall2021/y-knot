import React, { useState, useEffect } from 'react';

import SidebarTile from './MentorSidebarTile';
import logout from './assets/logout.png';
import { useNavigate } from 'react-router-dom';
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import { QuerySnapshot, DocumentData } from 'firebase/firestore';

export enum NavRoutes { Home = "Home", MentorSettings = "Settings", Resources = "Resources", Profile = "Profile" }

interface Props {
    selected: NavRoutes
}

const MentorSidebar: React.FC<Props> = ({selected}) => {
    const navigate = useNavigate();

    const [mentor, setMentor] = useState<any>();

    useEffect(() => {
        getMentor();
     }, []);
   
     const getMentor: VoidFunction = async () => {
       try {
           let snap = await NetworkManager.makeRequest(Endpoints.GetCurrentMentorOrTrainee);
           snap = snap as QuerySnapshot<DocumentData>;
           setMentor(snap.docs[0].data());
       } catch(err) {
           console.log(err);
       }
     }

    return (
        <div className='sidebar'>
            <div>
            {
                Object.values(NavRoutes).map(route => {
                    return (<SidebarTile key={route} route={route} selected={selected} id={mentor?.submission_id} />)
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