import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import "./App.css";

import Dashboard from "./applicant-dashboard/ApplicantDashboard";
import Settings from "./settings/Settings";
import Login from "./login/Login";
import Profile from "./profile/Profile";
import TProfile from "./trainee-profile/TProfile";
import TraineeSettings from "./settings/TraineeSettings";
import ResetPassword from "./login/ResetPassword/ResetPassword";
import MentorHome from "./mentor/MentorHome";
import MentorProfile from "./mentor/MentorProfile";
import MentorLanding from "./mentor-landing/MentorLanding";
import TraineeHome from "./trainee/TraineeHome";
import MentorSettings from "./mentor/MentorSettings";
import MentorResources from "./mentor/MentorResources";
import MentorMenteeMatch from "./admin/MentorMenteeMatch";

import SidebarAndContent from "./SidebarAndContent";
import {
  AdminSidebarTiles,
  AdminSidebarOptions,
} from "./admin/AdminSidebarInfo";
import {
  TraineeSidebarTiles,
  TraineeSidebarOptions,
} from "./trainee/TraineeSidebarInfo";
import {
  MentorSidebarTiles,
  MentorSidebarOptions,
} from "./mentor/MentorSidebarInfo";

// Authentication
import { AuthProvider } from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import RequireAdminAuth from "./auth/RequireAdminAuth";
import RequireMentorAuth from "./auth/RequireMentorAuth";
import RequireTraineeAuth from "./auth/RequireTraineeAuth";

// Admin stuff
//import { NavRouteOptions as AdminNavRouteOptions } from "./admin/AdminSidebar";
import { NavRoutes as AdminNavRoutes } from "./admin/AdminSidebar";
import Admin from "./admin/Admin";


import AdminHome from "./admin/AdminHome";
import AdminAssignments from "./admin/AdminAssignments";
import AdminApplicants from "./admin/AdminApplicants";
import AdminSettings from "./admin/AdminSettings";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* General */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/resetPassword" element={<ResetPassword />} />

          {/* Trainee */}
          <Route
            path={"/trainee/home"}
            element={<RequireTraineeAuth children={<TraineeHome selected={TraineeSidebarOptions.Home}/>} /> }
          />
          <Route
            path={"/trainee/profile/:id"}
            element={<RequireTraineeAuth children={<TProfile />} />}
          />
          <Route
            path={"/trainee/settings"}
            element={<RequireTraineeAuth children={<TraineeSettings />} /> }
          />

          {/* Mentor */}
          <Route
            path={"/mentor/home"}
            element={<RequireMentorAuth children={<MentorHome />}/>} 
          />
          <Route
            path={"/mentor/profile/:mentorId"}
            element={<RequireMentorAuth children={<MentorProfile defaultTab="Your Profile"/>}/>} 
          />
          <Route
            path={"/mentor/profile/:mentorId/logsreports"}
            element={<RequireMentorAuth children={<MentorProfile defaultTab="Logs and Reports"/>}/>} 
          />
          <Route
            path={"/mentor/resources"}
            element={<RequireMentorAuth children={<MentorResources /> }/>}
          />
          <Route
            path={"/mentor/settings"}
            element={<RequireMentorAuth children={<MentorSettings />}/>}
          />

          {/* Admin */}
          <Route
            path={"/admin/home"}
            element={<RequireAdminAuth children={<AdminHome/>} />}
          />
          <Route
            path={"/admin/assignments"}
            element={<RequireAdminAuth children={<AdminAssignments />}/>}
          />
          <Route
            path="/admin/matching/:id"
            element={<RequireAdminAuth children={<MentorMenteeMatch/>}/>}
          />
          <Route
            path={"/admin/applicants"}
            element={<RequireAdminAuth children={<AdminApplicants/>}/>}
          />
          <Route
            path="/admin/applicants/:id"
            element={<RequireAdminAuth children={<Profile/>}/>}
          />
          <Route
            path={"/admin/settings"}
            element={<RequireAdminAuth children={<AdminSettings/>}/>}
          /> 
          <Route path="*" element={<div>404 NOT FOUND</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
