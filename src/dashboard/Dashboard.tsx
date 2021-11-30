import React, { useEffect, useState } from 'react';

import "./Dashboard.css"
import Sidebar, { NavRoutes } from '../nav/Sidebar';
import { ApplicantFilters, ApplicantStages } from '../utils/utils';
import FilterButton from './FilterButton/FilterButton';

const Dashboard = () => {
    
    const [filter, setFilter] = useState(ApplicantFilters.AllApplicants);
    const [applicants, setApplicants] = useState();

    useEffect(() => {

    }, [])

    return (
        <div className='dashboard'> 
            <Sidebar selected={NavRoutes.Dashboard}/>
            <div className="dashboard-container">
                <div className='dashboard-content'>
                    <h1>Dashboard</h1>
                    <div className="dashboard-filters">
                        {
                        Object.values(ApplicantFilters).map(value => {
                            return (<FilterButton type={value} count={14} onClick={() => setFilter(value)}/>)
                        })
                        }
                    </div>
                    <div className='dashboard-applicants'>
                        <h2>{filter}</h2>
                        <hr/>
                        {
                            
                        }
                    </div>  
                </div>
            </div>
        </div>
        
    )
}

export default Dashboard