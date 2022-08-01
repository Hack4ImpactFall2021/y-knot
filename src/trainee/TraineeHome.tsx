import React, { useState, useEffect } from 'react';

import Sidebar from "../widgets/Sidebar";

import "./TraineeHome.css";
import logo from '../login/assets/logo.png'
import NetworkManager, { Endpoints } from '../network/NetworkManager';
import { QuerySnapshot, DocumentData } from 'firebase/firestore';
import { NavRouteOptions, SidebarTileInfo } from "../SidebarAndContent";

import { TraineeSidebarTiles } from "./TraineeSidebarInfo";

interface Props {
  selected: NavRouteOptions,
}
const TraineeHome: React.FC<Props> = ({ selected }) => {
  const [trainee, setTrainee] = useState<any>();

  const getTrainee: VoidFunction = async () => {
    try {
      let snap = await NetworkManager.makeRequest(Endpoints.GetCurrentMentorOrTrainee);
      snap = snap as QuerySnapshot<DocumentData>;
      setTrainee(snap.docs[0].data());
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(getTrainee, []);
  
  const getSidebarTiles = () => {
    const routes = ["/trainee/home", "/trainee/profile/" + trainee?.submission_id, "/trainee/settings"];
    const ret = [];
    for (let i = 0; i < routes.length; i++) {
      const cur = { ...TraineeSidebarTiles[i], route: routes[i] };
      ret.push(cur);
    }
    return ret;
  }

  return (
    <div className="sidebar-and-content">
      {/* <Loader open={trainee}/> */}
      <Sidebar selected={selected} sidebarTiles={getSidebarTiles()} />
      <div className="dashboard trainee-dashboard"> 
        <div className="dashboard-container wrapper">
          <div className="trainee-landing">
            <div className="heading-wrapper">
              <h1>Welcome, {trainee?.first_name}!</h1>
              <img src={logo} alt="Where is the logo?"/> 
            </div>
            <div className="first-time-msg">
              First-time users ONLY: Please create an account using your Y-KNOT Inc. username and password.
            </div>
            <div className="thinkific-gif">
              <img className="thinkific-gif-img" src="https://support.thinkific.com/hc/article_attachments/360042089974/5d3734ac5ee60.gif" alt = "Thinkific"/>
            </div>
            <div className="training-btn-wrapper">
              <div>
                <a target="_blank" href="https://y-knotinc.thinkific.com/">
                  <button className="training-btn">
                    Go to Training
                  </button>
                </a>
              </div>
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
              <div className="finished-training-btn-wrapper">
                <a target="_blank" href="https://y-knotinc.thinkific.com/">
                  <button className="training-btn">
                    Click When Finished Training
                  </button>
                </a>
              </div>  
            </div>    
          </div>
        </div>
      </div>
    </div>
  );
}

export default TraineeHome;