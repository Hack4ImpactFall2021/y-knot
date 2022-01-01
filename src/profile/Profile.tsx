import React, { useState, useEffect } from 'react';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

import './Profile.css';
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import { Applicant, ApplicantStages } from '../utils/utils';
import ApplicantStageTile from '../applicants/ApplicantStageTile/ApplicantStageTile';
import accept from './assets/check-circle.png';
import reject from './assets/x-circle.png';

enum Tabs {UserInformation = "User Information", Application = "Application", Interview = "Interview", BackgroundCheck = "Background Check"};

const Profile = () => {
    const { id } = useParams();
    const [applicant, setApplicant] = useState<Applicant | null>(null);

    const [tab, setTab] = useState<string>(Tabs.UserInformation);

    useEffect(() => {
        setApplicant({
            firstName: "Test",
            lastName: "User",
            email: "c",
            phoneNumber: "123",
            stage: ApplicantStages.Interviewing,
            submissionId: "1"
        })
        // getApplicant();
    }, []);


    const getApplicant = async () => {
        try {
            let snap = await NetworkManager.makeRequest(Endpoints.GetApplicant, {submissionId: id});
            snap = snap as DocumentSnapshot<DocumentData> 
            if (snap.exists()) {
                const data = snap.data();
                setApplicant({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    phoneNumber: data.phone_number,
                    stage: data.stage,
                    submissionId: data.submission_id
                });
                console.log(applicant);

            } else {
                throw new Error("not-found")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (tab: string) => {
        setTab(tab);
    }

    if (applicant) {
        return (
            <div className='profile'>
                <div className='profile-container'>
                    <div className='profile-header'>
                        <div className='profile-header-left'>
                            <h1 className='name'>{applicant.firstName} {applicant.lastName}</h1>
                            <ApplicantStageTile stage={applicant.stage} maximized/>
                        </div>
                        <div className='profile-header-right'>
                           <button className='button accept'><>Accept <img src={accept}/></></button>
                           <button className='button reject'><>Reject <img src={reject}/></></button>
                        </div>
                    </div>
                    <div className='profile-tabs'>
                        {Object.values(Tabs).map(curr => {
                            return (
                                <h1 className={curr === tab ? 'tab-title selected': 'tab-title'} onClick={e => handleClick(e.currentTarget.innerHTML)}>{curr}</h1>
                            );
                        })}
                    </div>
                    <div className='profile-content'>
                        
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>404 Not Found</div>
        );
    }
}

export default Profile;