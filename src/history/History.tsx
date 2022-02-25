import React, { useEffect, useState } from 'react';

import './History.css';
import Sidebar, { NavRoutes } from '../nav/Sidebar';
import { Applicant, ApplicantStages, stagesToText } from '../utils/utils';
import ApplicantTile from '../applicants/ApplicantTile/ApplicantTile';
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import all_applicants from '../assets/all.png';
import FilterButton from '../FilterButton/FilterButton';


const History = () => {

    const [acceptedApplicants, setAcceptedApplicants] = useState<Applicant []>([]);
    const [rejectedApplicants, setRejectedApplicants] = useState<Applicant []>([]);

    const [applicants, setApplicants] = useState<Applicant []>([]);

    const [selected, setSelected] = useState(ApplicantStages.Accepted);

    useEffect(() => {
        getApplicants();
    }, [])

    const getApplicants = async () => {
        console.log('getting accepted applicants');
        try {
            let applicants = await NetworkManager.makeRequest(Endpoints.GetAcceptedApplicants) as Applicant [];
            setAcceptedApplicants(applicants);
            setApplicants(applicants);

       
            applicants = await NetworkManager.makeRequest(Endpoints.GetRejectedApplicants) as Applicant [];
            setRejectedApplicants(applicants);

        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className='history'>
            <Sidebar selected={NavRoutes.History}/>
            <div className='history-container'>
                <div className='history-content'>
                <h1 className='history-title'>History</h1>
                <div className="history-filters">

                    {
                        Object.values(ApplicantStages).map(value => {
                            if (value == ApplicantStages.Accepted || value == ApplicantStages.Rejected) {
                                return (<FilterButton key={value} type={value} count={value === ApplicantStages.Accepted ? acceptedApplicants.length : rejectedApplicants.length} onClick={() => {
                                    setSelected(value);
                                    if (value === ApplicantStages.Accepted) {
                                        setApplicants(acceptedApplicants);
                                    } else {
                                        setApplicants(rejectedApplicants);
                                    }
                                }} selected={selected}/>)
                            }
                        })
                    }
               
               </div>

                <div className='dashboard-applicants'>
                        <h2>{stagesToText[selected]}</h2>
                        <hr/>
                        <div className='tiles'>
                            {
                                applicants.length > 0 ?
                                applicants.map(applicant => {
                                    return (<ApplicantTile key={applicant.createdAt} applicant={applicant}/>)
                                })
                                : 
                                <p >There are no applicants currently in this stage</p>
                            }
                        </div>
                    </div>  

                   
                </div>
            </div>
        </div>
    );
}

export default History;