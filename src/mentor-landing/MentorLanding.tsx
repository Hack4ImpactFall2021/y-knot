<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import NetworkManager, { Endpoints } from '../network/NetworkManager';
import { QuerySnapshot, DocumentData } from 'firebase/firestore';
import "./MentorLanding.css";
import logo from "../login/assets/logo.png";
import mentoring from "./assets/mentoring_landing.jpg"
import MentorSidebar, { NavRoutes } from '../nav/MentorSidebar';
import MentorProfile from '../mentor/MentorProfile';

interface Props {
  
};

const MentorLanding: React.FC<Props> = () => {

  const [trainee, setTrainee] = useState<any>();

  useEffect(() => {
     getMentor();
  }, []);

  const getMentor: VoidFunction = async () => {
    try {
      let snap = await NetworkManager.makeRequest(Endpoints.GetCurrentMentorOrTrainee);
      snap = snap as QuerySnapshot<DocumentData>;
      setTrainee(snap.docs[0].data());
    } catch(err) {
      console.log(err);
    }
  }

=======
import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./MentorLanding.css";
import logo from "../login/assets/logo.png";
import mentoring from "./assets/mentoring_landing.jpg"
import MentorSidebar, { NavRoutes } from './MentorSidebar';
import LogsReports from "../logs-and-reports/LogsReports";
interface Props {


};

const MentorLanding: React.FC<Props> = () => {
  const name = "Jason";
>>>>>>> admin-dashboard
  return (
    <div className="dashboard mentor-dashboard"> 
      <MentorSidebar selected={NavRoutes.Home}/>
      <div className="dashboard-container wrapper">
        <div className="mentoring-landing">
          <div className="heading-wrapper">
<<<<<<< HEAD
            <h1>Welcome, {trainee?.first_name}!</h1>
=======
            <h1>Welcome, {name}!</h1>
>>>>>>> admin-dashboard
            <img src={logo} alt="Where is the logo?"/> 
          </div>

          <img className="mentoring-img" src={mentoring} alt="Mentoring Puzzle Piece"></img>

          <div className="mentoring-btn-wrapper">
<<<<<<< HEAD
            {/* needs to be updated with an id variable */}
            <Link to="/mentor/5188587455818895665">
              <button className="mentoring-btn">
                Logs & Reports
              </button>
            </Link>
=======
          {/* ADD LINK TO LOGS AND REPORTS FOR BUTTON */}
            <a target="_blank" href="https://y-knotinc.thinkific.com/">
                <button className="mentoring-btn">
                    Logs & Reports
                </button>
            </a>
>>>>>>> admin-dashboard
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