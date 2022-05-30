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
import { useMentorContext } from '../auth/RequireMentorAuth';

const MentorHome = () => {

  const mentor = useMentorContext();

  const getSidebarTiles = () => {
    const routes = ["/mentor/home", "/mentor/profile/" + mentor.submissionId, "/mentor/resources", "/mentor/settings"];
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
      <div className="wrapper">
        <div className="mentoring-landing">
          {/* Header */}
          <div className="header-wrapper">
            <h1 className="header">Welcome, {mentor.firstName}!</h1>
            <img src={logo} alt="Where is the logo?"/> 
          </div>

          {/* Mentoring Image */}
          <img className="mentoring-img" src={mentoring} alt="Mentoring Puzzle Piece"/>

          {/* Logs and Reports Button */}
          <div className="mentoring-btn-wrapper">
            <Link to={`/mentor/profile/${mentor.submissionId}/logsreports`}>
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