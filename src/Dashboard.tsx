import React from 'react';
import Button from './Buttons';
import './Dashboard.css'

const Dashboard = () => {
    return (
        <div className='dashboard-page'>

            <div className='dashboard-buttons'>
            <Button text="Total Applicants" barColor="#10275B" count={61}/>
            <Button text="New Applicants" barColor="#F44250" count={23}/>
            <Button text="Interviewing" barColor="#FF8427" count={4}/>
            <Button text="Background Check" barColor="#FCBB45" count={34}/>
            </div>
            
        </div>
    );
}

export default Dashboard;