import React from "react";
import { useNavigate } from "react-router-dom";

import "./MentorResources.css";

import logo from "../login/assets/logo.png";
import googleIcon from "./assets/google_logo.png";
import downloadIcon from "./assets/download.png";
import MentorSidebar, { NavRoutes } from "../nav/MentorSidebar";

interface Props {


};

const MentorResources: React.FC<Props> = () => {
  return (
    <div className="dashboard mentor-dashboard"> 
      <MentorSidebar selected={NavRoutes.Resources}/>
      <div className="dashboard-container wrapper">
        <div className="mentoring-resources">
          <div className="header-wrapper">
            <h1>Resources</h1>
            <img src={logo} alt="Where is the logo?"/> 
          </div>

          <div className="resources">
            <div className="resource-card" style={{ borderColor: "#f1da63" }}>
              <h3>MentorMe</h3>
              <p> 
                MentorMe is a free mobile app for android users. 
                This app was created to connect students with mentors to allow for opportunities for mentoring on the go. 
                It is intended to make mentoring more effective and efficient as well as increase the coverage of current programs.
              </p>
              <a target="_blank" href="https://play.google.com/store/apps/details?id=ng.com.alliedcomputer.mentormenew2&hl=en_US&gl=US">
                <button className="resource-btn" style={{ backgroundColor: "#f1da63" }}>
                  <img src={googleIcon} alt=""/>
                  <p style={{fontFamily: "Ubuntu, sans-serif"}}>GET IT ON Google Play</p>
                </button>
              </a>
            </div>
            <div className="resource-card" style={{ borderColor: "#45963b" }}>
              <h3>Activity Guide</h3>
              <p>
                Y-KNOT Inc. has created a book filled with low cost activities that you can explore with your mentee. 
                If you are looking for a new museum, outdoor events, sporting events, or arts and crafts, the 
                ACTIVITY GUIDE should help you come up with fun and innovative ways to spend time with your rambunctious mentee.
              </p>
              <a target="_blank" href="https://www.yknotinc.org/_files/ugd/847801_c005ed89dbf54b4380d58ad5ab6bec3c.pdf">
                <button className="resource-btn" style={{ backgroundColor: "#45963b" }}>
                  <img src={downloadIcon} alt=""/>
                  <p> ACTIVITY RESOURCE GUIDE </p>
                </button>
              </a>
            </div>
            <div className="resource-card" style={{ borderColor: "#2912be"}}>
              <h3>Mentor Guide</h3>
              <p>
                Need a refresher on a certain policy? 
                Can't quite remember something that was mentioned at New Mentor Training? 
                Check out Y-KNOT Inc.'s Mentor Guide to overview the mentor role and responsibilities, FAQ, and more!
              </p>
              <a target="_blank" href="https://www.yknotinc.org/_files/ugd/847801_c005ed89dbf54b4380d58ad5ab6bec3c.pdf">
                <button className="resource-btn" style={{ backgroundColor: "#2912be"}}>
                  <img src={downloadIcon} alt=""/>
                  <p> MENTOR RESOURCE GUIDE </p>
                </button>
              </a>
            </div>
            <div className="resource-card" style={{ borderColor: "#f27f1e"}}>
              <h3>Mentor Re-Clearances</h3>
              <p>
                However long you've been a mentor with Y-KNOT Inc., all mentors must go through the re-clearance process every year. 
                We will contact you directly if you are eligible for re-clearances and you will be required to submit the necessary clearances depending on what year of mentoring you are in. 
                Please read the re-clearance policy to keep yourself up-to-date on what to expect, as well as the additional instructions to complete your re-clearances.
              </p>
              {/* <button className="resource-btn">GET IT ON Google Play</button> */}
            </div>
            <div className="resource-card" style={{  borderColor: "#f1da63"}}>
              <h3>Mandated Reporter</h3>
              <p>
                Child and Family Services Agency (CFSA) takes reports of child abuse and neglect 24 hours a day, seven days a week at
                (202) 671-SAFE or (202) 671-7233.
              </p>
              <p>
                This hotline is the gateway to protection and help for child victims and those at risk up to age 18 in the District of Columbia. 
                If you believe you need to make a call to the hotline, please do so ASAP and inform your Mentoring Support Specialist immediately. 
                If you need assistance, please call BEST Kids at 202-397-3272.m a paragraph. Click here to add your own text and edit me. It's easy.
              </p>
              {/* <button className="resource-btn">GET IT ON Google Play</button> */}
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default MentorResources;