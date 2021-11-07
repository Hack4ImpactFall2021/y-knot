import React from 'react';
import Button from './Buttons';
import './Dashboard.css'
import bg_check_icon from './bg_check.png';
import new_apps_icon from './new_applicants.png'
import interview_icon from './interview.png'

const Dashboard = () => {
    return (
        <div className='dashboard-page'>

            <div className='dashboard-buttons'>
            <Button text="Total Applicants" barColor="#10275B" totalApps={true} count={61} />
            <Button text="New Applicants" barColor="#F44250" totalApps={false} icon={new_apps_icon} count={23}/>
            <Button text="Interviewing" barColor="#FF8427" totalApps={false} icon={interview_icon} count={4}/>
            <Button text="Background Check" barColor="#FCBB45" totalApps={false} icon={bg_check_icon} count={34}/>
            </div>
            
        </div>
    );
}

export default Dashboard;