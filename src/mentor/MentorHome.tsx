import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import NetworkManager, { Endpoints } from '../network/NetworkManager';
import { QuerySnapshot, DocumentData } from 'firebase/firestore';
import "./MentorHome.css";
import logo from "../login/assets/logo.png";
import mentoring from "./assets/mentoring_landing.jpg"
import MentorSidebar, { NavRoutes } from '../nav/MentorSidebar';
import MentorProfile from '../mentor/MentorProfile';
import { useAuth } from '../auth/AuthProvider';


import Sidebar from "../widgets/Sidebar";
import { MentorSidebarTiles, MentorSidebarOptions } from "./MentorSidebarInfo";
import Loading from '../auth/Loading';


const MentorHome = () => {

  const [mentor, setMentor] = useState<any>();

  const getMentor: VoidFunction = async () => {
    try {
      let snap = await NetworkManager.makeRequest(Endpoints.GetCurrentMentorOrTrainee);
      snap = snap as QuerySnapshot<DocumentData>;
      setMentor(snap.docs[0].data());
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(getMentor, []);

  const getSidebarTiles = () => {
    const routes = ["/mentor/home", "/mentor/profile/" + mentor.submission_id, "/mentor/settings"];
    const ret = [];
    for (let i = 0; i < routes.length; i++) {
      const cur = { ...MentorSidebarTiles[i], route: routes[i] };
      ret.push(cur);
    }
    return ret;
  }

  if (!mentor) { 
    return <Loading/>
  }

  return (
  <div className="sidebar-and-content">
    <Sidebar selected={MentorSidebarOptions.Home} sidebarTiles={getSidebarTiles()} />
    <div className="dashboard mentor-dashboard"> 
      <div className="dashboard-container wrapper">
        <div className="mentoring-landing">
          <div className="heading-wrapper">
            <h1>Welcome, {mentor?.first_name}!</h1>
            <img src={logo} alt="Where is the logo?"/> 
          </div>

          <img className="mentoring-img" src={mentoring} alt="Mentoring Puzzle Piece"></img>

          <div className="mentoring-btn-wrapper">
            <Link to={"/mentor/" + mentor?.submission_id}>
              <button className="mentoring-btn">
                Logs & Reports
              </button>
            </Link>
          </div>

          <div className="text-blurb">
            <h2>
              At Y-KNOT Inc., we are doing our very best to support our mentors through a number of avenues 
              which include trainings, community connections and quality relationship guidance. 
            </h2>
          </div>  
        </div>
      </div>
    </div>
  </div>
  );
}

export default MentorHome;