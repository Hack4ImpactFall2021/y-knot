import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import RequireAuth from './auth/RequireAuth';
import Dashboard from './applicant-dashboard/ApplicantDashboard';
import Settings from './settings/Settings';
import Login from './login/Login';
import Profile from './profile/Profile';
import History from './history/History';
import ResetPassword from './login/ResetPassword/ResetPassword';
import MentorProfile from './mentor/MentorProfile';
import MentorLanding from './mentor-landing/MentorLanding';
import LogsReports from './logs-and-reports/LogsReports';
import Trainee from "./trainee/Trainee";
import MenteeProfile from './mentee/MenteeProfile';

// Admin stuff
import { NavRouteOptions as AdminNavRouteOptions } from "./admin/AdminSidebar";
import { NavRoutes as AdminNavRoutes } from "./admin/AdminSidebar";
import Admin from "./admin/Admin";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/resetPassword' element={<ResetPassword/>}/>
          <Route path='/' element={<RequireAuth children={<Dashboard/>} />}/>
          <Route path='/settings' element={<RequireAuth children={<Settings/>} />}/>
          <Route path='/mentor' element={<RequireAuth children={<MentorLanding/>} />}/>
          <Route path='/history' element={<RequireAuth children={<History/>} />}/>
          <Route path='/mentor/:id' element={<RequireAuth children={<MentorProfile />}/>} />
          <Route path='/mentee/:id' element={<RequireAuth children={<MenteeProfile />}/>} />
          <Route path='/:id' element={<RequireAuth children={<Profile/>}/>} />
          <Route path='/trainee/home' element={<RequireAuth children={<Trainee/>} />}/>
          <Route path='/history' element={<RequireAuth children={<History/>} />}/>
          <Route path='/:id' element={<RequireAuth children={<Profile/>}/>} />
          {/* <Route path='/:id' element={<RequireAuth children={<TProfile/>}/>}/> */}
          <Route path="*" element={<div>404 NOT FOUND</div>}/>
          
          {/* Admin stuff. Just a temporary way to do the routing.*/}
          <Route 
            path={AdminNavRoutes[AdminNavRouteOptions.Home].route} 
            element={<RequireAuth children={<Admin selected={AdminNavRouteOptions.Home}/>}/>}
          />
          <Route 
            path={AdminNavRoutes[AdminNavRouteOptions.Trainee].route} 
            element={<RequireAuth children={<Admin selected={AdminNavRouteOptions.Trainee}/>}/>}
          />
          <Route 
            path={AdminNavRoutes[AdminNavRouteOptions.Applicants].route} 
            element={<RequireAuth children={<Admin selected={AdminNavRouteOptions.Applicants}/>}/>}
          />
          <Route 
            path={AdminNavRoutes[AdminNavRouteOptions.Settings].route} 
            element={<RequireAuth children={<Admin selected={AdminNavRouteOptions.Settings}/>}/>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;