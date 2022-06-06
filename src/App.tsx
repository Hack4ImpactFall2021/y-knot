import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./App.css";

import Login from "./login/Login";
import Profile from "./profile/Profile";
import TProfile from "./trainee-profile/TProfile";
import ResetPassword from "./login/ResetPassword/ResetPassword";
import MentorHome from "./mentor/MentorHome";
import MentorProfile from "./mentor/MentorProfile";
import TraineeHome from "./trainee/TraineeHome";
import MentorSettings from "./mentor/MentorSettings";
import MentorResources from "./mentor/MentorResources";
import MentorMenteeMatch from "./admin/MentorMenteeMatch";

import SidebarAndContent from "./SidebarAndContent";
import { TraineeSidebarOptions, } from "./trainee/TraineeSidebarInfo";

// Authentication
import { AuthProvider } from "./auth/AuthProvider";
import RequireAdminAuth from "./auth/RequireAdminAuth";
import RequireMentorAuth from "./auth/RequireMentorAuth";
import RequireTraineeAuth from "./auth/RequireTraineeAuth";


import AdminHome from "./admin/AdminHome";
import AdminAssignments from "./admin/AdminAssignments";
import AdminApplicants from "./admin/AdminApplicants";
import AdminSettings from "./admin/AdminSettings";

import NotFound from "./auth/NotFound";

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
            path="/trainee/home"
            element={<RequireTraineeAuth children={<TraineeHome selected={TraineeSidebarOptions.Home}/>} /> }
          />
          <Route
            path="/trainee/profile/:id"
            element={<RequireTraineeAuth children={<TProfile />} />}
          />
          <Route
            path="/trainee/settings"
            element={<RequireTraineeAuth children={<div></div>} /> }
          />

          {/* Mentor */}
          <Route
            path="/mentor/home"
            element={<RequireMentorAuth children={<MentorHome />}/>} 
          />
          <Route
            path="/mentor/profile/:mentorId"
            element={<RequireMentorAuth children={<MentorProfile defaultTab="Your Profile"/>}/>} 
          />
          <Route
            path="/mentor/profile/:mentorId/logsreports"
            element={<RequireMentorAuth children={<MentorProfile defaultTab="Logs and Reports"/>}/>} 
          />
          <Route
            path="/mentor/resources"
            element={<RequireMentorAuth children={<MentorResources /> }/>}
          />
          <Route
            path="/mentor/settings"
            element={<RequireMentorAuth children={<MentorSettings />}/>}
          />

          {/* Admin */}
          <Route
            path="/admin/home"
            element={<RequireAdminAuth children={<AdminHome/>} />}
          />
          {/* Admin view into trainee profile */}
          <Route
            path="/admin/trainee/:traineeId"
            element={<RequireAdminAuth children={<TProfile/>}/>}
          />
          {/* Admin view into mentor profile */}
          <Route
            path="/admin/mentor/:mentorId"
            element={<RequireAdminAuth children={<MentorProfile defaultTab="Your Profile"/>}/>}
          />
          <Route
            path="/admin/assignments"
            element={<RequireAdminAuth children={<AdminAssignments />}/>}
          />
          <Route
            path="/admin/matching/:menteeId"
            element={<RequireAdminAuth children={<MentorMenteeMatch/>}/>}
          />
          <Route
            path="/admin/applicants"
            element={<RequireAdminAuth children={<AdminApplicants/>}/>}
          />
          <Route
            path="/admin/applicants/:id"
            element={<RequireAdminAuth children={<Profile/>}/>}
          />
          <Route
            path="/admin/settings"
            element={<RequireAdminAuth children={<AdminSettings/>}/>}
          /> 
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
