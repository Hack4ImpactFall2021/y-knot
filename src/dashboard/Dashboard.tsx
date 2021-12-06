import React, { useEffect, useState } from 'react';

import "./Dashboard.css"
import Sidebar, { NavRoutes } from '../nav/Sidebar';
import { ApplicantFilters, ApplicantStages, Applicant } from '../utils/utils';
import FilterButton from './FilterButton/FilterButton';
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import ApplicantTile from '../applicants/ApplicantTile/ApplicantTile';


const Dashboard = () => {
    
    const [filter, setFilter] = useState<ApplicantFilters>(ApplicantFilters.AllApplicants);
    const [applicants, setApplicants] = useState<Applicant[]>([]);

    const [allApplicants, setAllApplicants] = useState<Applicant []>([]);
    const [newApplicants, setNewApplicants] = useState<Applicant []>([]);
    const [interviewingApplicants, setInterviewingApplicants] = useState<Applicant []>([]);
    const [backgroundCheckApplicants, setBackgroundCheckApplicants] = useState<Applicant []>([]);

    useEffect(() => {
        getApplicants();
    }, [])

    const filtersToApplicants = {
        [ApplicantFilters.AllApplicants]: allApplicants,
        [ApplicantFilters.NewApplicants]: newApplicants,
        [ApplicantFilters.Interviewing]: interviewingApplicants,
        [ApplicantFilters.BackgroundCheck]: backgroundCheckApplicants
    }

    const getApplicants: VoidFunction = async () => {
        try {
            let applicants = await NetworkManager.makeRequest(Endpoints.GetAllApplicants);
            applicants = applicants as Applicant[];

            let allApplicantsTemp: Applicant[] = [];
            let newApplicantsTemp: Applicant[] = [];
            let interviewingApplicantsTemp: Applicant[] = [];
            let backgroundCheckApplicantsTemp: Applicant[] = [];

            applicants.forEach(applicant => {
                allApplicantsTemp.push(applicant);

                if (applicant.stage === ApplicantStages.New) {
                    newApplicantsTemp.push(applicant);
                } else if (applicant.stage === ApplicantStages.Interviewing) {
                    interviewingApplicantsTemp.push(applicant)
                } else if (applicant.stage === ApplicantStages.BackgroundCheck) {
                    backgroundCheckApplicantsTemp.push(applicant);
                }
            })
            setAllApplicants(allApplicantsTemp);
            setNewApplicants(newApplicantsTemp);
            setInterviewingApplicants(interviewingApplicantsTemp);
            setBackgroundCheckApplicants(backgroundCheckApplicantsTemp);

            setApplicants(allApplicantsTemp);
        } catch(err) {
            console.log(err);
        }
    }

    const handleFilterChange = (value: ApplicantFilters) => {
        
        setFilter(value);
        setApplicants(filtersToApplicants[value])
    }

    return (
        <div className='dashboard'> 
            <Sidebar selected={NavRoutes.Dashboard}/>
            <div className="dashboard-container">
                <div className='dashboard-content'>
                    <h1>Dashboard</h1>
                    <div className="dashboard-filters">
                        {
                        Object.values(ApplicantFilters).map(value => {
                            return (<FilterButton type={value} count={filtersToApplicants[value].length} onClick={() => handleFilterChange(value)} selected={filter}/>)
                        })
                        }
                    </div>
                    <div className='dashboard-applicants'>
                        <h2>{filter}</h2>
                        <hr/>
                        <div className='tiles'>
                            {
                                applicants.length > 0 ?
                                applicants.map(applicant => {
                                    return (<ApplicantTile applicant={applicant}/>)
                                })
                                : 
                                <p >There are no applicants currently in this stage</p>
                            }
                        </div>
                    </div>  
                </div>
            </div>
        </div>
        
    )
}

export default Dashboard