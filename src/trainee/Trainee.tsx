import React, { useState, useEffect } from 'react';

import "./Trainee.css";
import logo from '../login/assets/logo.png'
import TraineeSidebar, { NavRoutes } from '../nav/TraineeSidebar';
import ProgressBar from "./ProgressBar";
interface Props {


};

const Trainee: React.FC<Props> = () => {
  const name = "Jason";
  const [percentCompleted, setPercentCompleted] = useState(75);

  // useEffect(() => {
  //   setPercentCompleted
  // })

  return (
    <div className="dashboard trainee-dashboard"> 
      <TraineeSidebar selected={NavRoutes.Home}/>
      <div className="dashboard-container wrapper">
        <div className="trainee-landing">
          <div className="heading-wrapper">
            <h1>Welcome, {name}!</h1>
            <img src={logo} alt="Where is the logo?"/> 
          </div>
          <div className="progress-bar-wrapper"><ProgressBar fillAmount={percentCompleted}/></div>
            <div className="training-btn-wrapper">
            <a target="_blank" href="https://y-knotinc.thinkific.com/">
                <button className="training-btn">
                    Go to Training
                </button>
            </a>
          </div>
          <div className="text-blurb">
            <h2>
              Welcome to Y-KNOT Inc. We are excited that you have found it in your heart to give back. We don't take it lightly
              that giving of your time takes thought  and dedication. I trust that you are mutually excited about your role as a 
              Y-KNOT Inc. Mentor. 
            </h2>
            <h2>
              Before you are matched with a mentee you are required to complete the mandatory mentor training located in our mentor portal. 
            </h2>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default Trainee;