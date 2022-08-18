import { Link } from 'react-router-dom';

import "./MentorHome.css";
import logo from "../login/assets/logo.png";
import mentoring from "./assets/mentoring-landing.png"

import Sidebar from "../widgets/Sidebar";
import SidebarAndContent from "../SidebarAndContent";

import { getMentorSidebarTiles, MentorSidebarTiles, MentorSidebarOptions } from "./MentorSidebarInfo";
import { useMentorContext } from '../auth/RequireMentorAuth';

const MentorHome = () => {

  const mentor = useMentorContext();

  const getMentorHomeContentComponent = () => {
    return (
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
    );
  };

  return (
    <SidebarAndContent
      selectedTile={MentorSidebarOptions.Home}
      sidebarTiles={getMentorSidebarTiles(mentor.submissionId)}
      contentComponent={getMentorHomeContentComponent()}
    />
  );
}

export default MentorHome;