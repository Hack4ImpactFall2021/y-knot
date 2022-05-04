import React, { useEffect, useState } from 'react';

import "./ApplicantDashboard.css"
import Sidebar, { NavRoutes } from '../nav/Sidebar';
import { ApplicantStages, Applicant, stagesToText } from '../utils/utils';
import FilterButton from '../FilterButton/FilterButton';
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import ApplicantTile from '../applicants/ApplicantTile/ApplicantTile';


const Dashboard = () => {
  
  const [filter, setFilter] = useState<ApplicantStages | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  const [allApplicants, setAllApplicants] = useState<Applicant []>([]);
  const [newApplicants, setNewApplicants] = useState<Applicant []>([]);
  const [interviewingApplicants, setInterviewingApplicants] = useState<Applicant []>([]);
  const [backgroundCheckApplicants, setBackgroundCheckApplicants] = useState<Applicant []>([]);

  useEffect(() => {
    getApplicants();
  }, [])

  const filtersToApplicants = {
    [ApplicantStages.New]: newApplicants,
    [ApplicantStages.Interviewing]: interviewingApplicants,
    [ApplicantStages.BackgroundCheck]: backgroundCheckApplicants,
    [ApplicantStages.Rejected]: newApplicants,
    [ApplicantStages.Accepted]: newApplicants,
  }

    const getApplicants: VoidFunction = async () => {
        try {
            let applicants = await NetworkManager.makeRequest(Endpoints.GetAllApplicants);
            applicants = applicants as Applicant[];
            
            let allApplicantsTemp: Applicant[] = [];
            let newApplicantsTemp: Applicant[] = [];
            let interviewingApplicantsTemp: Applicant[] = [];
            let backgroundCheckApplicantsTemp: Applicant[] = [];

            applicants.forEach((applicant: Applicant) => {
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

  const handleFilterChange = (value: ApplicantStages | null) => {
    setFilter(value);
    if (value) {
      setApplicants(filtersToApplicants[value])
    } else {
      setApplicants(allApplicants);
    }
  }

  return (
    <div className='dashboard'> 
      <div className="dashboard-container">
        <div className='dashboard-content'>
          <h1>Applicants</h1>
          <div className="dashboard-filters">
          <FilterButton key={'all_applicants'} type={null} count={allApplicants.length} onClick={() => handleFilterChange(null)} selected={null}/>
            {
            Object.values(ApplicantStages).map(value => {
                if (value != ApplicantStages.Accepted && value != ApplicantStages.Rejected) {
                    return (<FilterButton key={value} type={value} count={filtersToApplicants[value].length} onClick={() => handleFilterChange(value)} selected={filter}/>)
                }
            })
            }
          </div>
          <div className='dashboard-applicants'>
            {filter ? 
                <h2>{stagesToText[filter]}</h2>
                :
                <h2>All Applicants</h2>
            }
            <hr/>
            <div className='tiles'>
              {applicants.length > 0 ?
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