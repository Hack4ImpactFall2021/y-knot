import "./TraineeHome.css";
import logo from '../login/assets/logo.png'
import SidebarAndContent, { NavRouteOptions, SidebarTileInfo } from "../SidebarAndContent";

import { getTraineeSidebarTiles, TraineeSidebarOptions } from "./TraineeSidebarInfo";
import { useTraineeContext } from '../auth/RequireTraineeAuth';

const TraineeHome = () => {
  const trainee = useTraineeContext();

  const getTraineeHomeContentComponent = () => {
    return (
      <div className="trainee-home"> 
        <div className="wrapper">
          <div className="trainee-landing">
            {/* Header */}
            <div className="header-wrapper">
              <h1>Welcome, {trainee.firstName}!</h1>
              <img src={logo} alt="Where is the logo?"/> 
            </div>
            {/* First time users message */}
            <div className="first-time-msg">
              First-time users ONLY: Please create an account using your Y-KNOT Inc. username and password.
            </div>
            {/* Thinkific Gif */}
            <div className="thinkific-gif">
              <img className="thinkific-gif-img" src="https://support.thinkific.com/hc/article_attachments/360042089974/5d3734ac5ee60.gif" alt = "Thinkific"/>
            </div>
            {/* Go to Training Button */}
            <div className="training-btn-wrapper">
              <div>
                <a target="_blank" href="https://y-knotinc.thinkific.com/">
                  <button className="training-btn">
                    Go to Training
                  </button>
                </a>
              </div>
            </div>
            {/* Welcome to Y-KNOT text */}
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
    );
  };

  return (
    <SidebarAndContent
      selectedTile={TraineeSidebarOptions.Home}
      sidebarTiles={getTraineeSidebarTiles(trainee.submissionId)}
      contentComponent={getTraineeHomeContentComponent()}
    />
  );
}

export default TraineeHome;