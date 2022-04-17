import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import "./MentorLanding.css";
import logo from "../login/assets/logo.png";
import mentoring from "./assets/mentoring_landing.jpg"
import MentorSidebar, { NavRoutes } from '../nav/MentorSidebar';
import LogsReports from "../mentor/logs-and-reports/LogsReports";
interface Props {


};

const MentorLanding: React.FC<Props> = () => {
  const name = "Jason";
  return (
    <div className="dashboard mentor-dashboard"> 
      <MentorSidebar selected={NavRoutes.Home}/>
      <div className="dashboard-container wrapper">
        <div className="mentoring-landing">
          <div className="heading-wrapper">
            <h1>Welcome, {name}!</h1>
            <img src={logo} alt="Where is the logo?"/> 
          </div>

          <img className="mentoring-img" src={mentoring} alt="Mentoring Puzzle Piece"></img>

          <div className="mentoring-btn-wrapper">
            <Link to="/mentor/logs"><button className="mentoring-btn">
                Logs & Reports
            </button>
            </Link>
          </div>

          <div className="text-blurb">
            <h2>
              At Y-KNOT Inc we are doing our very best to support our mentors through a number of avenues which include, trainings, community connections and quality relationship guidance. 
            </h2>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default MentorLanding;