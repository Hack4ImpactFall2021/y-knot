import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import NetworkManager, { Endpoints } from '../network/NetworkManager';
import { QuerySnapshot, DocumentData } from 'firebase/firestore';
import "./MentorHome.css";
import logo from "../login/assets/logo.png";
import mentoring from "./assets/mentoring-landing.png"
import MentorProfile from '../mentor/MentorProfile';
import { useAuth } from '../auth/AuthProvider';


import Sidebar from "../widgets/Sidebar";
import { MentorSidebarTiles, MentorSidebarOptions } from "./MentorSidebarInfo";
import Loading from '../auth/Loading';


const a = 0;

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
    const routes = ["/mentor/home", "/mentor/profile/" + mentor?.submission_id, "/mentor/resources", "/mentor/settings"];
    const ret = [];
    for (let i = 0; i < routes.length; i++) {
      const cur = { ...MentorSidebarTiles[i], route: routes[i] };
      ret.push(cur);
    }
    return ret;
  }

  return (
  <div className="sidebar-and-content">
    <Sidebar selected={MentorSidebarOptions.Home} sidebarTiles={getSidebarTiles()} />
    <div className="mentor-home" style={{ position: "relative" }}> 
      {mentor ? (
      <div className="wrapper">
        <div className="mentoring-landing">
          {/* Header */}
          <div className="header-wrapper">
            <h1 className="header">Welcome, {mentor.first_name}!</h1>
            <img src={logo} alt="Where is the logo?"/> 
          </div>

          {/* Mentoring Image */}
          <img className="mentoring-img" src={mentoring} alt="Mentoring Puzzle Piece"/>

          {/* Logs and Reports Button */}
          <div className="mentoring-btn-wrapper">
            <Link to={`/mentor/profile/${mentor.submission_id}/logsreports`}>
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
      </div>) : <Loading/>}
    </div>
  </div>
  );
}

export default MentorHome;